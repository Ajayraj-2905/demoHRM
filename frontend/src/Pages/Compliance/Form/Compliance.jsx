import React, { useState } from 'react'

const Compliance = () => {
    const [formData, setFormData] = useState({
        natureOfCompliance: '', typeOfAct: '', nameOfForm: '', applicableLabourAct: '', priorityType: '',
        calenderType: '', dueDate: '', activity: '', state: '', section: '', applicability: '', score: '',
        frequencyOfCompliance: '', document: null
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
    }
    const handleCancel = () => {
        setFormData({
            natureOfCompliance: '', typeOfAct: '', nameOfForm: '', applicableLabourAct: '', priorityType: '',
            calenderType: '', dueDate: '', activity: '', state: '', section: '', applicability: '', score: '',
            frequencyOfCompliance: '', document: null
        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, document: file })
            // setPreviewImage(URL.createObjectURL(file))
        }
    }
    const handleDate = () => {
        const date = new Date()
        console.log(date.toLocaleDateString())
        console.log(date.toLocaleString())
        console.log(date.toLocaleTimeString())
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <h1 className='text-xl font-semibold'>Create Compliance</h1>
            <form onSubmit={handleSubmit}>
                <div className='my-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-10'>
                    <div className='w-full flex flex-col gap-2 -order-1'>
                        <label className='text-md font-semibold'>Nature of compliance</label>
                        <select value={formData.natureOfCompliance} onChange={(e) => setFormData({ ...formData, natureOfCompliance: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a nature of compliance</option>
                            <option value="Statutory Payment">Statutory Payment</option>
                            <option value="Registration">Registration</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-1'>
                        <label className='text-md font-semibold'>Type of act</label>
                        <select value={formData.typeOfAct} onChange={(e) => setFormData({ ...formData, typeOfAct: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a type of act</option>
                            <option value="Financial calender">Financial calender</option>
                            <option value="Formal calender">Formal calender</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-3'>
                        <label className='text-md font-semibold'>Name of form</label>
                        <input type="text" placeholder='Enter the name of form' value={formData.nameOfForm}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, nameOfForm: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-5'>
                        <label className='text-md font-semibold'>Applicable labour act</label>
                        <input type="text" placeholder='Enter the applicable labour act' value={formData.applicableLabourAct}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, applicableLabourAct: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-7'>
                        <label className='text-md font-semibold'>Priority type</label>
                        <select value={formData.priorityType} onChange={(e) => setFormData({ ...formData, priorityType: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a priority type</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-9'>
                        <label className='text-md font-semibold'>Calender type</label>
                        <select value={formData.calenderType} onChange={(e) => setFormData({ ...formData, calenderType: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a priority type</option>
                            <option value="Central">Financial calender</option>
                            <option value="Central">Formal calender</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-11'>
                        <label className='text-md font-semibold'>Due date</label>
                        <input type="text" placeholder='Enter the priority type' value={formData.dueDate}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-0'>
                        <label className='text-md font-semibold'>Activity</label>
                        <input type="text" placeholder='Enter the section' value={formData.activity}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, activity: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-2'>
                        <label className='text-md font-semibold'>State</label>
                        <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a state</option>
                            <option value="Central">Tamilnadu</option>
                            <option value="Central">Kerala</option>
                            <option value="Central">Karnataka</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-4'>
                        <label className='text-md font-semibold'>Section</label>
                        <input type="text" placeholder='Enter the section' value={formData.section}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, section: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-6'>
                        <label className='text-md font-semibold'>Applicability</label>
                        <input type="text" placeholder='Enter the applicability' value={formData.applicability}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, applicability: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-8'>
                        <label className='text-md font-semibold'>Score</label>
                        <select value={formData.score} onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a score</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-10'>
                        <label className='text-md font-semibold'>Frequency of compliance</label>
                        <select value={formData.frequencyOfCompliance} onChange={(e) => setFormData({ ...formData, frequencyOfCompliance: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a frequency of compliance</option>
                            <option value="Central">Monthly</option>
                            <option value="Central">Yearly</option>
                            <option value="Central">Bi-yearly</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-12'>
                        <label className='text-md font-semibold'>Upload Document</label>
                        <label htmlFor="documentUpload" className="cursor-pointer">
                            <div className="w-36 h-[35px] bg-customYellow-default border border-customYellow-default text-white overflow-hidden flex items-center justify-center gap-3 rounded-md">
                                <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.623 19.6016V24.6016C26.623 25.2646 26.3597 25.9005 25.8908 26.3693C25.422 26.8382 24.7861 27.1016 24.123 27.1016H6.62305C5.96001 27.1016 5.32412 26.8382 4.85528 26.3693C4.38644 25.9005 4.12305 25.2646 4.12305 24.6016V19.6016M21.623 10.8516L15.373 4.60156M15.373 4.60156L9.12305 10.8516M15.373 4.60156V19.6016" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>Upload
                            </div>
                            <input
                                id="documentUpload"
                                type="file"
                                accept="document/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <button type="button" onClick={handleDate}>Date</button>
                    <button type='button' className='bg-white w-[130px] py-1.5 rounded border border-gray-400' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='bg-customYellow-default w-[130px] py-1.5 text-white rounded border border-customYellow-default'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Compliance