import React from 'react';
import { Modal, Tag } from 'antd';
import moment from 'moment';
import youtubeLogo from '../assets/youtube-logo.png';
import wikiLogo from '../assets/wiki-logo.png';
import NASALogo from '../assets/nasa-logo.png';

const ModalComponent = ({ data, isModalOpen, setIsOpen, setModalData }: { data: any, isModalOpen: boolean, setIsOpen: any, setModalData: any }) => {
    const TitleComponent = () => {
        return (
            <div className='flex-container-logo'>
                <div className='flex-item max-width'>
                    <img src={data?.links?.mission_patch_small} alt='logo' className='img' />
                </div>
                <div className='flex-item'>
                    <div className="flex-container-details">
                        <div className="flex-item">
                            <div className="flex-container-logo">
                                <div className="flex-item margin-none">
                                    <h4 style={{ margin: 0 }}>
                                        {data?.mission_name}
                                    </h4>
                                </div>
                                <div className="flex-item">
                                    {data?.upcoming ? (<Tag color='orange'>Upcoming</Tag>) : data?.launch_success ? (<Tag color='green'>Success</Tag>) : (<Tag color='red'>Failed</Tag>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex-item">
                            <p>
                                {data?.rocket?.rocket_name}
                            </p>
                        </div>
                        <div className="flex-item">
                            <div className="flex-container-logo">
                                <div className='flex-item margin-none max-width'>
                                    <a href={data?.links?.article_link} target='_blank'>
                                        <img src={NASALogo} alt='logo-nasa' className='icon-img' />
                                    </a>
                                </div>
                                <div className='flex-item max-width'>
                                    <a href={data?.links?.wikipedia} target='_blank'>
                                        <img src={wikiLogo} alt='logo-wiki' className='icon-img' />
                                    </a>
                                </div>
                                <div className='flex-item max-width'>
                                    <a href={data?.links?.video_link} target='_blank'>
                                        <img src={youtubeLogo} alt='logo-youtube' className='icon-img' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Modal
            title={<TitleComponent />}
            open={isModalOpen}
            destroyOnClose
            footer={null}
            centered
            className='modal'
            onCancel={() => {
                setModalData({});
                setIsOpen(false);
            }} >
            <div>
                <p>
                    {data?.details}. <span><a href={data?.links?.wikipedia}>Wikipedia</a></span>
                </p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Flight Number</p>
                <p className='flex-item'>{data?.flight_number}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Mission Name</p>
                <p className='flex-item'>{data?.mission_name}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Rocket type</p>
                <p className='flex-item'>{data?.rocket?.rocket_type}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Rocket Name</p>
                <p className='flex-item'>{data?.rocket?.rocket_name}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Manufacturer</p>
                <p className='flex-item'>{data?.rocket?.second_stage?.payloads[0]?.manufacturer}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Nationality</p>
                <p className='flex-item'>{data?.rocket?.second_stage?.payloads[0]?.nationality}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Launch Date</p>
                <p className='flex-item'>{moment(data?.launch_date_utc).format('DD MMMM YYYY, HH:mm')}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Payload Type</p>
                <p className='flex-item'>{data?.rocket?.second_stage?.payloads[0]?.payload_type}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Orbit</p>
                <p className='flex-item'>{data?.rocket?.second_stage?.payloads[0]?.orbit}</p>
            </div>
            <div className='flex-container'>
                <p className='flex-item title'>Launch Site</p>
                <p className='flex-item'>{data?.launch_site?.site_name}</p>
            </div>
        </Modal>
    )
}

export default ModalComponent;