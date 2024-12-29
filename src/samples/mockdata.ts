export const mockData = {
    data: [
        {
            serialNumber: 1,
            description: "Bi-weekly Brass 13.0",
            position: "1",
            amount: "$1500",
            date: "2024-11-01",
            status: "Paid",
        },
        {
            serialNumber: 2,
            description: "Bi-weekly Silver 8.2",
            position: "1",
            amount: "$120",
            date: "2024-11-05",
            status: "Upcoming",
        },
        {
            serialNumber: 3,
            description: "Bi-weekly Gold 6.5",
            position: "1",
            amount: "-$200",
            date: "2024-11-10",
            status: "Failed",
        },
        {
            serialNumber: 4,
            description: "Bi-weekly Brass 20.1",
            position: "1",
            amount: "$300",
            date: "2024-11-12",
            status: "Paid",
        },
        {
            serialNumber: 5,
            description: "Bi-weekly Silver 15.3",
            position: "1",
            amount: "$1000",
            date: "2024-11-13",
            status: "Upcoming",
        },
        {
            serialNumber: 6,
            description: "Bi-weekly Gold 18.7",
            position: "1",
            amount: "$250",
            date: "2024-11-14",
            status: "Paid",
        },
    ],
    pagination: {
        page: 1,
        pageSize: 10,
        totalRows: 40,
    },
};

 export const allData: any = {
    "7d": {
      xAxisLabel: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [
        { name: "Deposits", data: [30, 40, 45, 50, 49, 60, 70] },
        { name: "Withdrwals", data: [13, 50, 42, 60, 34, 63, 43] },
      ],
    },
    "6M": {
      xAxisLabel: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      seriesData: [
        { name: "Deposits", data: [100, 90, 80, 85, 95, 110] },
        { name: "Withdrwals", data: [70, 75, 60, 65, 55, 60] },
      ],
    },
    "1Y": {
      xAxisLabel: ["J", "F", "M", "A", "M", "J", "JY", "AG", "S", "O", "N", "D"],
      seriesData: [
        { name: "Deposits", data: [30, 40, 45, 50, 49, 60, 70, 30, 20, 50, 70, 100] },
        { name: "Withdrwals", data: [13, 50, 42, 60, 34, 63, 43, 45, 50, 49, 60, 90] },
      ],
    },
    Max: {
      xAxisLabel: ["2019", "2020", "2021", "2022", "2023", "2024"],
      seriesData: [
        { name: "Deposits", data: [200, 250, 300, 350, 400, 450] },
        { name: "Withdrwals", data: [150, 180, 210, 190, 220, 240] },
      ],
    },
  };