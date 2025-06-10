export function Hours() {
  return (
    <div className='bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Hours of Operation
        </h2>
        <p className='mt-6 text-lg text-gray-500 max-w-3xl'>
          Feel free to contact us at any time for any questions or concerns you
          may have. Our team is here to help you.
        </p>
        <div className='mt-10 grid grid-cols-2 gap-10 lg:grid-cols-5'>
          {[
            { day: 'Monday', time: '9:00am - 5:00pm' },
            { day: 'Tuesday', time: '9:00am - 5:00pm' },
            { day: 'Wednesday', time: '9:00am - 5:00pm' },
            { day: 'Thursday', time: '9:00am - 5:00pm' },
            { day: 'Friday', time: '9:00am - 5:00pm' },
            { day: 'Saturday', time: 'Closed' },
            { day: 'Sunday', time: 'Closed' },
          ].map(({ day, time }) => (
            <div key={day}>
              <h3 className='text-lg font-medium text-gray-900'>{day}</h3>
              <p className='mt-2 text-base text-gray-500'>
                <span className='block'>{time}</span>
              </p>
            </div>
          ))}
        </div>

        {/* <div className='mt-16'>
          <div className='flex items-center'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Out of Hours
            </h2>
          </div>
          <p className='mt-4 text-lg text-gray-800'>
            <b>Phone</b>: <span className='font-medium'>07988 298 635</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
