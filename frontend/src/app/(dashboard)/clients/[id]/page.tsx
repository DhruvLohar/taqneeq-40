import PageContainer from "@/components/layout/page-container";

export default function ClientDetails({ params }: { params: { id: number } }) {
    return (
        <PageContainer>
            <h1>Client page sab idhar jayega : for the client {params.id}</h1>
        </PageContainer>
    )
}