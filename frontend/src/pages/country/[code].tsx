import {FC} from "react";
import {gql, useQuery} from "@apollo/client";
import styled from "@emotion/styled";
import {Descriptions} from "antd";
import {useRouter} from "next/router";

const GET_COUNTRY_DETAILS = gql`
    query GET_COUNTRY_DETAILS($code: String!) {
        country(code: $code) {
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

const CountryDetails: FC = () => {
    const router = useRouter()

    const {data, loading, error} = useQuery(GET_COUNTRY_DETAILS, {variables: {code: router.query.code as string}})

    if (loading) {
        return <p>Loading</p>;
    }
    if (error) {
        console.log("error", error);
        return <p>Erreur</p>;
    }

    console.log(data)

    const descriptionItems = [
        {
            key: 'name',
            label: "Name",
            children: data?.country?.name
        },
        {
            key: 'code',
            label: "Code",
            children: data?.country?.code
        },
        {
            key: 'emoji',
            label: "Emoji",
            children: data?.country?.emoji
        },
        {
            key: 'continent',
            label: "Continent",
            children: data?.country?.continent?.name || 'N/A'
        }
    ]

    return (
        <PageWrapper>
            <Title>{data?.country?.name} {data?.country?.emoji}</Title>
            <Descriptions items={descriptionItems} style={{
                maxWidth: 800,
                background: 'lightgray',
                padding: 10,
                borderRadius: 6
            }}/>
        </PageWrapper>
    )
}

const Title = styled.h2`
    font-size: 150;
`

const PageWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
`

export default CountryDetails