import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const SkeletonStoresList = () => {
    return (
        <>

            {
                Array(10).fill().map((item, index) => {
                    return (
                        <tr className="text-center" key={index}>
                            <td>
                                <Skeleton height='100' width='100%' />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                        </tr>
                    )
                })
            }

        </>
    )
}