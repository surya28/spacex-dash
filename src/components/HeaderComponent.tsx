import logo from '../assets/spacex-logo.png';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";


const HeaderComponent = () => {
    const navigate = useNavigate();
    const [dateFilter, setDateFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    let { duration, status } = useParams();
    const handleDateFilterChange = (value: string) => {
        setDateFilter(value)
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value)
    };

    useEffect(() => {
        if (dateFilter?.length > 0) {
            navigate(`/${dateFilter || '/'}/${statusFilter || 'all'}`)
        } else {
            navigate('/')
        }
    }, [dateFilter, statusFilter])
    return (
        <header>
            <div>
                <img src={logo} alt="logo" className="header" />
            </div>
            <div className='flex-container-logo' style={{
                justifyContent: 'space-between',
                padding: '2rem 5rem'
            }}>
                <Select
                    style={{ width: 220 }}
                    onChange={handleDateFilterChange}
                    defaultValue={duration || null}
                    allowClear
                    options={[
                        { value: 'six_months', label: 'Last 6 months' },
                        { value: 'last_year', label: 'Last year' },
                    ]}
                />
                <Select
                    style={{ width: 220 }}
                    onChange={handleStatusFilterChange}
                    defaultValue={status || null}
                    allowClear
                    options={[
                        { value: 'all', label: 'All launches' },
                        { value: 'successful', label: 'Successful Launches' },
                        { value: 'upcoming', label: 'Upcoming Launches' },
                        { value: 'failed', label: 'Failed Launches' }
                    ]}
                />
            </div>
        </header>
    )
}

export default HeaderComponent;