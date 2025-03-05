export default function BrokerPage({ params }: { params: { brokerId: string, clientId: string } }) {

    const { brokerId, clientId } = params;

    return (
        <div>
            <h1>Chat Page</h1>
            <p>Broker ID: {brokerId}</p>
            <p>Client ID: {clientId}</p>
        </div>
    );
}