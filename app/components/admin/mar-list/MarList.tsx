import React, { useEffect } from 'react'
import MarCategoryList from './mar-category-list/MarCategoryList';
import { useAdminMarCategoryListQuery } from '@/redux/features/api/admin/adminApi';
import { toast } from 'react-hot-toast';
import AdminLoading from '@/app/utils/AdminLoading';

type Props = {}

const MarList = (props: Props) => {

  const { data,error,isLoading,isFetching } = useAdminMarCategoryListQuery({});

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        if(errorData.data.message === "jwt expired"){

        }
      }
    }
  }, [ error]);
  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">
        Mar Course List
      </h2>
      {isLoading ? (
        <AdminLoading/>
      ) : (
        data && <MarCategoryList marCategoryList={data.marList} />
      )}
    </div>
  )
}

export default MarList