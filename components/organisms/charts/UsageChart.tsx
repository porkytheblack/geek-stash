import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Grid } from '@mantine/core';
import { useGetUsageDataQuery } from '../../../redux/data/usageApi';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


function UsageChart() {

    const { data, isLoading, isError } = useGetUsageDataQuery('', {
        pollingInterval: 10000
      })

  return (
    <Grid w="100%" >
        <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const
                    },
                    title: {
                        display: true,
                        text: "Your API Usage"
                    }
                }
            }}
            data={{
                labels: data ? Object.keys(data) : [],
                datasets: [
                    {
                        label: "Successful Requests",
                        data: data ?  Object.values(data) : [],
                        borderColor: "green",

                    }
                ]
            }}
        />
    </Grid>
  )
}

export default UsageChart