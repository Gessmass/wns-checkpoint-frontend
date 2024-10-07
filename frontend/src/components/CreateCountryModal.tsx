import {FC, useEffect, useState} from "react";
import {Form, Input, Modal, Select} from "antd";
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_ALL_COUNTRIES} from "@/pages";

interface CreateCountryModalProps {
    open: boolean,
    onCancel: () => void
}

const GET_ALL_CONTINENTS = gql`
    query getAllContinents {
        continents {
            id
            name
        }
    }
`

const CREATE_NEW_COUNTRY = gql`
    mutation Mutation($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
            code
            name
            emoji
            continent {
                id
            }
        }
    }
`

const {Item} = Form;

const CreateCountryModal: FC<CreateCountryModalProps> = ({open, onCancel}) => {
    const [form] = Form.useForm();
    const [continentOptions, setContinentOptions] = useState([]);
    const [createNewCountry] = useMutation(CREATE_NEW_COUNTRY, {
        onCompleted(data) {
            console.log("mutation completed data", data);
        },
        onError(error) {
            console.log("error after executing mutation", error);
        },
        refetchQueries: [{query: GET_ALL_COUNTRIES}],
    });

    const {data, loading, error} = useQuery(GET_ALL_CONTINENTS);

    useEffect(() => {
        if (data) {
            const options = data.continents.map((continent: { id: any; name: any; }) => ({
                value: continent.id,
                label: continent.name,
            }));
            setContinentOptions(options);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        console.log("error", error);
        return <p>Erreur</p>;
    }

    const handleCreateCountry = async (values: any) => {
        console.log("handleCreateCountry", values);
        try {
            await createNewCountry({
                variables: {data: {...values, continent: {id: values.continent}}},
            });
            onCancel();
        } catch (error) {
            console.error("Error when creating a country:", error);
        }
    }

    return (
        <Modal open={open} title="Create Country" onOk={form.submit} okText="Create" onCancel={onCancel}>
            <Form
                form={form}
                wrapperCol={{span: 14}}
                labelCol={{span: 5}}
                onFinish={handleCreateCountry}
            >
                <Item name='name' label="Name" rules={[{required: true, message: "Country missing"}]}>
                    <Input/>
                </Item>
                <Item name='code' label="Code" rules={[{required: true, message: "Code missing"}]}>
                    <Input maxLength={2}/>
                </Item>
                <Item name='emoji' label="Emoji" rules={[{required: true, message: "Emoji missing"}]}>
                    <Input/>
                </Item>
                <Item name='continent' label="Continent">
                    <Select options={continentOptions}/>
                </Item>
            </Form>
        </Modal>
    )
}

export default CreateCountryModal;
