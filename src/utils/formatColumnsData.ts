
const preferredOrder = ["Backlog", "To do", "In Progress", "In Review", "Done"];

const formatColumnsData = (tasks: any[]) => {
    const statusMap = tasks.reduce((acc, task) => {
        const { status, id } = task;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(id);
        return acc;
    }, {});

    const columns = Object.keys(statusMap).map(status => ({
        id: status,
        title: status,
        cardsIds: statusMap[status]
    }))
    .sort((a, b) => preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id));

    return { columns };
}

export default formatColumnsData;
