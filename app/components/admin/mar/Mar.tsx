import React from 'react'
import MarSubmissionList from './marSubmissionList/MarSubmissionList';
import { useAdminMarDataQuery } from '@/redux/features/api/admin/adminApi';
import AdminLoading from '@/app/utils/AdminLoading';

type Props = {}

const Mar = (props: Props) => {
  const { data,isFetching,isLoading } = useAdminMarDataQuery({});

  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">Mar</h2>
      {isLoading ? (
        <AdminLoading/>
      ) : (
        data && <MarSubmissionList mar={data.marData} />
      )}
    </div>
  )
}

export default Mar