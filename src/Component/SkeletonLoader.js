import React from 'react'
import Skeleton from 'react-loading-skeleton'
const SkeletonLoader = () => {
  return (
    <div className="card shadow-lg w-80" >
    <Skeleton height={300} />
        <div className='content'>
        <div className="flex justify-between">
                  <Skeleton width={`45%`} height={15} />
                  <Skeleton width={`45%`} height={15} />
                </div>
                <Skeleton count={3} />
        </div>
</div>
  )
}

export default SkeletonLoader