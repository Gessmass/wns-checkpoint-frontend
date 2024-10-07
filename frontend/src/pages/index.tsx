import {Button, Table} from "antd";
import {gql, useQuery} from "@apollo/client";
import styled from "@emotion/styled";
import {useRouter} from "next/navigation";
import {useState} from "react";
import CreateCountryModal from "@/components/CreateCountryModal";

export const GET_ALL_COUNTRIES = gql`
    query GetAllCountries {
        countries {
            id
            code
            name
            emoji
            continent {
                id
                name
            }
        }
    }
`

const {Column} = Table

export default function Home() {
    const router = useRouter()
    const [openModal, setOpenModal] = useState<boolean>(false)

    const {loading, error, data} = useQuery(GET_ALL_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error: {error.message}</p>;
    }

    return (
        <ComponentWrapper>
            <Button type='primary' onClick={() => setOpenModal(true)}>Add Country</Button>
            <Table dataSource={data.countries} loading={loading}>
                <Column title="Emoji" dataIndex='emoji' key='emoji'/>
                <Column title="Name" dataIndex='name' key='name'/>
                <Column title="Code" dataIndex='code' key='code'/>
                <Column key='action' render={(_text, element) => (
                    <a onClick={() => router.push(`/country/${element.code}`)}>See details</a>
                )}/>
            </Table>
            <CreateCountryModal open={openModal} onCancel={() => setOpenModal(false)}/>
        </ComponentWrapper>
    );
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 20px;
    gap: 20px;
`
