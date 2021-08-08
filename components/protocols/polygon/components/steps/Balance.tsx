/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';
import { LoadingOutlined } from '@ant-design/icons';

import { getPolygonAddressExplorerURL } from 'components/protocols/polygon/lib'
import { PolygonAccountT } from 'components/protocols/polygon/types'
import { useAppState } from '../../hooks';

const { Text } = Typography

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any

const Balance = () => {
  const [balance, setBalance] = useState<string>("")
  const [fetching, setFetching] = useState<boolean>(false)
  const { state } = useAppState()
  const account = state?.account 

  const checkBalance = async () => {
    setFetching(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const selectedAddress = window.ethereum.selectedAddress;

    // TODO
    // Define those two variables

    setBalance(balanceToDisplay)
    setFetching(false)
  }

  const explorerUrl = getPolygonAddressExplorerURL(account as string)

  return (
    <Col style={{ width: "100%" }}>
      <Space direction="vertical"  style={{ width: "100%" }} size="large">
        <Button type="primary" onClick={checkBalance}>Check Balance</Button>
        {fetching && <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />}
        {!fetching
          ? balance
            ? <Alert
                message={
                  <Space direction="horizontal">
                    <Text strong>{`This address has a balance of ${balance} MATIC`}</Text>
                    <a href={explorerUrl} target="_blank" rel="noreferrer">(View on PolygonScan)</a>
                  </Space>
                }
                description={
                  <Text>Fund your address using the <a href={"https://faucet.matic.network/"} target="_blank" rel="noreferrer">official Matic Faucet</a></Text>
                }
                type="success"
                showIcon
              />
            : <Alert message="No balance to display" type="error" showIcon />
          : null
        }
      </Space>
    </Col>
  )
}

export default Balance