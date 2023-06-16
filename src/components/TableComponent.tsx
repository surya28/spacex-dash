import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import useApi from '../hook/useAPI';
import ModalComponent from './ModalComponent';

const TableComponent = () => {
    const { data, loading, error } = useApi('https://api.spacexdata.com/v3/launches');
    const [tableData, setTableData] = useState<any>([])
    const [page, setPage] = useState<number>(1);
    const [modalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>({});

    let { duration, status } = useParams();

    useEffect(() => {
        if (data?.length > 0) {
            setTableData(data);
        }
    }, [data]);

    useEffect(() => {
        if (!status && !duration) {
            setTableData(data)
        }
        if (status) {
            switch (status) {
                case 'all': setTableData(data)
                    break;
                case 'successful': setTableData(() => {
                    let copy = [...data];
                    return copy?.filter((row: any) => row?.launch_success === true)
                })
                    break;
                case 'failed': setTableData(() => {
                    let copy = [...data];
                    return copy?.filter((row: any) => row?.launch_success === false)
                })
                    break;
                case 'upcoming': setTableData(() => {
                    let copy = [...data];
                    return copy?.filter((row: any) => row?.upcoming === true)
                })
                    break;
            }
        }

        if (duration) {
            let today = moment();
            switch (duration) {
                case 'six_months':
                    let last_6_months_date = moment().subtract(6, 'month');

                    setTableData(() => {
                        let copy = [...data]
                        return copy.filter((row: any) => moment(row?.launch_date_utc).isBetween(today, last_6_months_date))
                    })
                    break;
                case 'last_year':
                    let last_year_date = moment().subtract(1, 'year');

                    setTableData(() => {
                        let copy = [...data]
                        return copy.filter((row: any) => moment(row?.launch_date_utc).isBetween(today, last_year_date))
                    })
            }
        }
    }, [duration, status])


    const columns: ColumnsType<any> = [
        {
            title: "Index",
            key: "index",
            render: (_, __, index) => (page - 1) * 10 + index + 1
        },
        {
            title: 'Launched(UTC)',
            dataIndex: 'launch_date_utc',
            key: 'date',
            render: (data) => {
                return (
                    <p>{moment(data).format('DD MMMM YYYY, HH:mm')}</p>
                )
            }
        },
        {
            title: 'Location',
            dataIndex: 'launch_site',
            key: 'site',
            render: (data) => {
                return (
                    <p>{data?.site_name || 0}</p>
                )
            }
        },
        {
            title: 'Mission',
            dataIndex: 'mission_name',
            key: 'mission',
        },
        {
            title: 'Orbit',
            key: 'orbit',
            dataIndex: 'rocket',
            render: (data) => {
                return (
                    <p>{data?.second_stage?.payloads[0]?.orbit || 0}</p>
                )
            }
        },
        {
            title: 'Launch Status',
            dataIndex: 'address',
            key: 'address',
            render: (_, row) => (
                <>
                    {
                        row?.upcoming ? (<Tag color='orange'>Upcoming</Tag>) : row?.launch_success ? (<Tag color='green'>Success</Tag>) : (<Tag color='red'>Failed</Tag>)
                    }
                </>
            ),
        },
        {
            title: 'Rocket',
            dataIndex: 'rocket',
            key: 'rocket',
            render: (data) => {
                return (
                    <p>{data?.rocket_name || '-'}</p>
                )
            }
        },
    ];

    if (loading) {
        return <Spin size='large' />
    }

    if (error) {
        return <h2>An unexpected error occurred</h2>
    }
    return (
        <div style={{
            padding: '0 5rem 5rem 5rem',
            margin: 'auto'
        }}>
            <Table
                bordered
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => { setModalData(record); setIsModalOpen(true) }
                    }
                }}
                columns={columns}
                dataSource={tableData}
                pagination={{ position: ['bottomCenter'], onChange(current) { setPage(current) } }}
                size='small' />
            <ModalComponent data={modalData} isModalOpen={modalOpen} setModalData={setModalData} setIsOpen={setIsModalOpen} />
        </div>
    )
}

export default TableComponent;