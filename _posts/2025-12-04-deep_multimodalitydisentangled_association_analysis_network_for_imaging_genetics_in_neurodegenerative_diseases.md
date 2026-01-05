---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSRF5H7F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7TejJlanUf68SxOuqGhPAamFAYP3WicpyuWIp0JiwAAiEArjsEXgxxjbX389RaR%2ByovrLP4SVHh5YO8pOblqcBIe4q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDG7QFFzK5d%2BTh6rqXircA%2Bv3fRJlMRe4ylbDYzvizXQmZgXVB8r4RVMLlCtsaCESdl0Aozn72NV7Ku0bscXTa256ll%2BvYor9XFYWjj%2BQBRIiyCLjCMdzEpHiGRKkHAZStDdAuFSSmA7wbPzx7gRuFVP2SmWci%2BEAIlvMJPDkPEZ6xqRw8mb5DFq6g6BWPTILboWKYRCv3%2BfV%2F2I3mauVBaBYxvKXgAmJRF8cu2cCiJMrUBsGhc%2FNNHJ47UPvLzErzMCb9Yn5nqQyFgnMn5YWI6csmv6rQuntc7EsHYGkyj3Wtc5WcudGVM1vLuxeJ4xcTZnjVBcLCawYxRV8maPbRMhhuaupDlFVPuwbk%2FJF55yKi0ww39JdHLrooffYldYPau2Fg3B7duPfL5bWJEZ7dYkhGgqWhfSrdII9IpStvGXbuZryIKWq%2B2MU2I7Kh0UqVBniY4pE5kl7sk2G%2F7o%2B9YBlCyadJtGq3qznNdpIb0XRoBvgrUCwW5fNvlHY4iSVXCqw3k38Sflr5bNMqYAKd%2BC5wrFYrBhD8ZzSMAansr9g8b0rL5namrO3Dsqlvm3mPBTMu5IFpCI4ZsTrDzHwcey7pAfWnaS6%2Fumshdj%2B27xHXPIMKZUAPAiV2bPRKxBT4B1WSER3GroUmmswMK%2FG8MoGOqUBcnokzOMgBMTS6hPKTE1WXEtrFLi8HyH6R3Zfo2ddKXZDQivkARVZ67QGT%2BlWXm9r8LNEDB46say0i%2Fw%2BAnI73Mr9uiS1nf1c17nHf1nMEK9b1wzZfHeBlgaca4ivH2K4rs6HMftiOuB74x0PmOea3dHUQfPGVQdmrW5zIwDKY3Bz5QYdFwDuvqETGruxDfh8daHqha7xpYgrjY3bJiv%2FCMRXJg%2B0&X-Amz-Signature=706b1320f511f7a7a0ca11217d00e121ef828a6e70535fc0a3c2ffa8550e7777&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSRF5H7F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE7TejJlanUf68SxOuqGhPAamFAYP3WicpyuWIp0JiwAAiEArjsEXgxxjbX389RaR%2ByovrLP4SVHh5YO8pOblqcBIe4q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDG7QFFzK5d%2BTh6rqXircA%2Bv3fRJlMRe4ylbDYzvizXQmZgXVB8r4RVMLlCtsaCESdl0Aozn72NV7Ku0bscXTa256ll%2BvYor9XFYWjj%2BQBRIiyCLjCMdzEpHiGRKkHAZStDdAuFSSmA7wbPzx7gRuFVP2SmWci%2BEAIlvMJPDkPEZ6xqRw8mb5DFq6g6BWPTILboWKYRCv3%2BfV%2F2I3mauVBaBYxvKXgAmJRF8cu2cCiJMrUBsGhc%2FNNHJ47UPvLzErzMCb9Yn5nqQyFgnMn5YWI6csmv6rQuntc7EsHYGkyj3Wtc5WcudGVM1vLuxeJ4xcTZnjVBcLCawYxRV8maPbRMhhuaupDlFVPuwbk%2FJF55yKi0ww39JdHLrooffYldYPau2Fg3B7duPfL5bWJEZ7dYkhGgqWhfSrdII9IpStvGXbuZryIKWq%2B2MU2I7Kh0UqVBniY4pE5kl7sk2G%2F7o%2B9YBlCyadJtGq3qznNdpIb0XRoBvgrUCwW5fNvlHY4iSVXCqw3k38Sflr5bNMqYAKd%2BC5wrFYrBhD8ZzSMAansr9g8b0rL5namrO3Dsqlvm3mPBTMu5IFpCI4ZsTrDzHwcey7pAfWnaS6%2Fumshdj%2B27xHXPIMKZUAPAiV2bPRKxBT4B1WSER3GroUmmswMK%2FG8MoGOqUBcnokzOMgBMTS6hPKTE1WXEtrFLi8HyH6R3Zfo2ddKXZDQivkARVZ67QGT%2BlWXm9r8LNEDB46say0i%2Fw%2BAnI73Mr9uiS1nf1c17nHf1nMEK9b1wzZfHeBlgaca4ivH2K4rs6HMftiOuB74x0PmOea3dHUQfPGVQdmrW5zIwDKY3Bz5QYdFwDuvqETGruxDfh8daHqha7xpYgrjY3bJiv%2FCMRXJg%2B0&X-Amz-Signature=706b1320f511f7a7a0ca11217d00e121ef828a6e70535fc0a3c2ffa8550e7777&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2DXCHYC%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDlST2PqyZpom7%2B4iCNVNBc26RAMK4WSzwTDKgGcwps0AIhAIyrT7BrdbwvrxDoAOpNaEA6%2FciMncK6TW11uV2yTFZgKv8DCE4QABoMNjM3NDIzMTgzODA1IgxKoGeOxFZhwCWGLQoq3AOpQmBYvpEiJyBikVhxoqR%2FdprgtihPANG0oPUGHI1zoVmZQbUjCSarus%2BtBW3GSZ36nI89vNVg0wASRMGpfeKbyJkr6OD9fyYXwJLrcgUfiQoppYqIgFuZhkxAZLVgrD50v%2Bshnm2u1V1id3UYFIJsXkUrhw6FNrtM7EN%2BBD1R2TpyD1e9fYn6Z0%2BpaPII3BGnuy0kTc5fAmjcgNPl%2B5WLo0%2BTTk2LTUwt1YKHvSdXQoyTsmRAa84XRBy7%2FfaQAW4lCKC5Dj6ZhmswI6QkQN6PmYB2AvgP9RLhb%2FPVQrO0Vbc0FGg3SSr4gihuW%2BXN5Ab1Tikc77JyUqDVteGmEHum80%2BK%2FBiYVhX0tEAzUBTODK41aB6UvZD19VvCCNe3v%2BBdbyd6VPqC6oTrBNhLrU1Xs6e6mLjn7L%2BDf5RtbkdsJtjgdLeaH8OORJ5wHWAqbSOtDW0WhWMCGRu3IkNfk3fo2PFbXFEr8tkHi6kSEPqX%2Bpt21ku1Z76BDifRygTbJIMmd2YFZX9YwtZEBSMkAvWR7hFnCoFVgPeITKpq%2BYelmRWEszrR%2F94dczsnlBMWta6Mg%2B7Pwq20RtwXCko7kaGKVlj9FW8VwYpQlESld2e1rCo6q7yf31n%2ByhyU7TDYxfDKBjqkAb90xAZ9vjXgHd7JwlkmW%2FDevCePs7Nz4bzL4Bkh2T3oNnluEUQAgZdDUDXDBChppA4EGssce4elsP882O8ojlk%2F7i38ZE97w4UvKB7awOZY90iqcu9RDPwAETr2YPTu6DCHCGTOZTw0xmuVcItIK6B4GJdBGcpKty96K2HPngTLnRS2M09UGKAvY9nD0CDEAmKvqBjX4WSkM1yoG8NKAQ5zrRFD&X-Amz-Signature=4fd39ced51bc2eb231cc898e1dd5c189f75da38705c81f5f08d655796f313481&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3WTJQJD%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHPHWi32nynaVDK7wNpDNG4k12U5rj%2B6RI596XWAba6wIgE%2BOSz09uEFQNXqVHDhKd2mlrEYpse5IrkntDbljYbgAq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOzR1a4C%2F%2FH7Oh0aHSrcA8GICx%2FhPdNMm0yic%2B8Q70JgfXCWnBxu50kC7DJ9vJUqY%2Bq5X6wblroVvIUyDcw24C8RI12xPYfCErc%2FmZKXCkY%2B7Wrst1XtP85h1ujO5mAWbs4E4I9PgGdus4ly5g7elMSLDcgfMezKNehrQHap6XrNcFhILoq3lsThSlGBfYFnQdzMXikfN1cSn2CqNMhTpP3I0rGfghiickXCUv8mrv2djKGW8sJvHve23FZ%2BXFlN8erm%2FOwietXis1nBTpCDptmvVlt0BRCUqBqr3bUzLuRNeznzuHACDqqWOiZ717NmuVtcUiP%2Fx9vlHbcyd0NUjcmp5MxEH9AkKrlpXng209YPB3iEgZWaUOKcEUSL6d5J1eysvw6mIFh504jaCUM2vDE5I6GbeqMsGYLjxafphPvYKIZJODUv5Igtx2NmQs2bKrW9AH3kIHd%2FJ8keHBx2UGk5ovnYYORkotT4fKYS4tA3Gpv6sBYbGJ1gbtE80bsq4ejLAepeEM%2F%2B06VmLtPoWWQJCjXETDDm3LvEEChqNHtaEBbOtRJHqyUkxlkzeHYd5KVMJ%2B3iNNPCJ%2BPY%2FFD3Yr77RUF5Q485Hho4GIi04M3cesRYY%2FFcimwdcIViTIBz2clUucZLkym6g0swMIDG8MoGOqUBWQ415bWKs6fGOGnD%2F%2FGXcqoZ%2FMdsm7OQ%2BnRLIb6aHKDyQk3RXQd9mZQFQAnyFoxyMZ70DQ%2Bql3M5HYAGWtAifadgi5Gdbq3l28unmEkulwhzG%2BqdiDrrEjoTdk8qLH25mgx4Gezy3es559WGzA5ZKe9BboCrg%2BapwmtBEIk45tp2tUSALrP0aaXV4sSCF5njlmEG7M4hhngJZCa1TCmj6XEeiOU%2F&X-Amz-Signature=0c7720756ccd67b5e0964e034a3740a91433c438d68ee58c9d64934b419b61b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3WTJQJD%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHPHWi32nynaVDK7wNpDNG4k12U5rj%2B6RI596XWAba6wIgE%2BOSz09uEFQNXqVHDhKd2mlrEYpse5IrkntDbljYbgAq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOzR1a4C%2F%2FH7Oh0aHSrcA8GICx%2FhPdNMm0yic%2B8Q70JgfXCWnBxu50kC7DJ9vJUqY%2Bq5X6wblroVvIUyDcw24C8RI12xPYfCErc%2FmZKXCkY%2B7Wrst1XtP85h1ujO5mAWbs4E4I9PgGdus4ly5g7elMSLDcgfMezKNehrQHap6XrNcFhILoq3lsThSlGBfYFnQdzMXikfN1cSn2CqNMhTpP3I0rGfghiickXCUv8mrv2djKGW8sJvHve23FZ%2BXFlN8erm%2FOwietXis1nBTpCDptmvVlt0BRCUqBqr3bUzLuRNeznzuHACDqqWOiZ717NmuVtcUiP%2Fx9vlHbcyd0NUjcmp5MxEH9AkKrlpXng209YPB3iEgZWaUOKcEUSL6d5J1eysvw6mIFh504jaCUM2vDE5I6GbeqMsGYLjxafphPvYKIZJODUv5Igtx2NmQs2bKrW9AH3kIHd%2FJ8keHBx2UGk5ovnYYORkotT4fKYS4tA3Gpv6sBYbGJ1gbtE80bsq4ejLAepeEM%2F%2B06VmLtPoWWQJCjXETDDm3LvEEChqNHtaEBbOtRJHqyUkxlkzeHYd5KVMJ%2B3iNNPCJ%2BPY%2FFD3Yr77RUF5Q485Hho4GIi04M3cesRYY%2FFcimwdcIViTIBz2clUucZLkym6g0swMIDG8MoGOqUBWQ415bWKs6fGOGnD%2F%2FGXcqoZ%2FMdsm7OQ%2BnRLIb6aHKDyQk3RXQd9mZQFQAnyFoxyMZ70DQ%2Bql3M5HYAGWtAifadgi5Gdbq3l28unmEkulwhzG%2BqdiDrrEjoTdk8qLH25mgx4Gezy3es559WGzA5ZKe9BboCrg%2BapwmtBEIk45tp2tUSALrP0aaXV4sSCF5njlmEG7M4hhngJZCa1TCmj6XEeiOU%2F&X-Amz-Signature=ec3f5be60eb69926f08cb2b91c6017dc21dea63f7ac82fd0adbcf531f2890d8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAS4SL72%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFfB2AQog8ad57yHhMaISVm7qUZq0TW4PTpLg6yO%2BuN8AiBZfB0E%2Fk%2FgPhfv7fEFSK5byO3cPMvSycn9Xp1SjT3Mgyr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMbAoojkmHDB23hJchKtwDG%2Frk8UK8%2B9p%2BBwKeZD1mol8HS4r1%2B%2F8Dzt2FFBxKqrCbFQMNRwGi12eNXIY%2FBqY7arCtif%2B1vK%2BFsZ5Z9H7P4pvqgVLGBR74Lge8Do7FhxY7cfcW9pVGNUkYxgrDBI8qydS9p1xW16ybipvhfF8yUACdZzPj4EwqYkYdhI1LKiMc6F6xntHGt%2B3PpYrjbBTPvuV8Mn4nFSB4AgBBsa9jnDmYXw05wJquL4XAlKQZpOA1yKqjxYkJOjcYT4lI4zyJD%2Bp5sJ76vh7PT3WOpsFV%2F%2BFQ%2BeEJ4Oa6o98dPuvOiJV9HTaXsmQQIBreD%2BJD%2FscAT%2BOOAMDvWz%2BdWua7A8Ek2ZmNMnaId21DTWqiElbFLSJ3bPgzISsd5lZ9sUkO1V4qAg21WPp2z1OI2f3nK0YKv5g%2FVSX4t0N4gFKFj7AsuMlyNmtgZ%2BoB5IWPi8KtH57kZStPxSbaEnn1fYCId2e0jBRhjPEKbie%2F58yaKyg6ulu1YhASM2xcDJaCezR%2B7WKAby8E8BXm%2BDVsiMQNbsk%2BLhQAcDYchTLLm8eA09Y%2BI%2F%2Fz8YgV24isSQ27H6oo00uksbrXgC5T%2FGDINkICJEtYrzLFSBm%2FmW6pJ1RoaqP2zYfi1XIlMcKGewg0kr0wpsbwygY6pgFA8CibIl89aBmvRRSxI8IR6FtDfjjp8m%2FEwMpdLaACDDe3tdM1V77vQO7x0qntyyIr%2B0C8vjWdqEpeJ0r5q%2F6tMe6mB9qHvPxqT7dPzeKXbnVN64UIQ9J%2F%2FdgXQ4g2AUbUjEYREuYJ5ZQVhAuNX0l4CkJwm5cCHZ6jMEPrFPTsiPZHQZmX4XVR8cr61eq9WxO2L4N%2BJn86h5MF3HH1n%2BYc%2BpzaBcas&X-Amz-Signature=4773c1d8c811aff6a3111a1e28b057e1ed42506827e417afe3bc298db7cff427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMGCUM3I%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHwxwtZ6cjDlSWmYsZ1JS%2BL2%2BWgi6zO1KzuND4L1HcjLAiBEnAd30X2x7s0DRb6d%2FsXI3Np4fb2RBrLbAyf3uv07eir%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMxAc%2Ffc6nuZq73wJ4KtwDmMg8M2rjlSbx9yrKaVWVUvxLTV2sNoJRnhnOTuh7O3dyRog5oPEZq5CHTydz%2FK3Mm%2Bas5hWQ2%2FgFzce9n4DtHn6r6%2Fook1LNf6nUuLGcjl6kOBk4ZV1n1Mi4HhnFb5YdMbUESElpqNtlhl1fakmkU7LoOAXZRix0pmha7%2FPo2qCHXHrjeCaOXH1agaUfvXaeX7easMP38VccVUvjg2HNgxg%2FLyMJebSYSWRDdMwnXxR3DQnc3%2BjbwpVyIkHwT1QSqsZxccV5sLAduUkBbVPBli5XHCVN%2Fm%2BQbGsk6Aj1jHdDwUP2LUrrH8dsInH6Wv6PBLu7i%2Fl6NE%2F4BopAktIThYiSJSByOejGCk0rQLwqg7wLX%2BglHAJIdd9mr%2B3wnh5veDjG9fKEmppFBxnkDvLS4kjiGyjGm4eBWgkolWwvsaajuRvjPdXnLvw1V3g3lbD7rtIfJG%2Fpa9oAWXjSC3Kv%2B4yWD6n9tSJtnmsABi02U64Zdt9UFQlhCSOt0ouKaFFFXivT7peR22tWt29ZB7u9mwRbygiQWKQKjYEvTO%2Bpbp4LQVyFmAAsUdZBLNtUi57tK3SModhelGDM%2FVE%2BSYSHhmF%2FrTMcot3P5sGYgaG1oUEb0rBZXzu1OUG1eNYwpcXwygY6pgHyUFEqdnZEwM%2BIbds6auzOISjAtlTyvpa1Ad9ApMoBsl9kSRQ7nf1X%2FlFzAgagems53nvH4Q2PjM4iBNUsRekTJmcu8AbqipmJ7BLAT2juZqa1vNFPCrxNOfVO9zohtGfE0HltjdNbMJBD6ocs4qzmuPi84boyXmIW8bgyQLKLpJ8wLl%2BHEZ3LewyOrhRG14gaskEWOUPLCeQxxTmgAdtPIDBkU0tc&X-Amz-Signature=a9f411a4cfc538bbcfb7e2a47519ed403a43374e49bc38f75c3875424b30de9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IVZFGFG%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDVA0tvmliCDTKUKemjyLY5%2BhmrfF8ugRfSiJ1aS8J%2FPAiBFX2FiBGmDOUWLnqeHz7kkEvJR%2BBaqfqTTzJhYpE6HhCr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMDnDm8HPrWdh5WbPoKtwDYrz3iFEBX1fFiAwce8M%2BH%2FZ46ouOTH9Vcyus7o6r3GmoOrLMCCxp0B9KmxDNa5EmSu07VhNDL5UNmEya9JwBm1Vj%2FKb4nJLtuNQh%2BqxKvVTKAgRG6Vytm%2FZt%2BoSUW9VZZxH4daQDoVSHYOLkxxnA2NpSmwTscVaIxyAtvzy001LZnXKxbaef1ZUYI1gnmL%2FB34GgnghkujCvoGatqyBI4OCyueByy351u%2BN1SI7VYFgzGXhpVYeVjNBQbxKpO3KSze6X8X0mM2Jj2KIk21O5i8ENg9M2A7Wghc9KRQykn0xAfrdeEIzGF0%2B%2FObGr0UC83k6kN960s3hthWfcko0HrGDN6gMTdW3MOXEHy0%2FE%2FF9ixNQk8IPvJYlfNDKgtBuF4%2Fkprx14Ru5Arr%2F4D6x3jLlPMzitpXhGiAVjbjcZtorps8okoIoPg0p1PRRA8V%2B%2BzhvLP1%2FAq6U1J%2FQ7LDxkqUcIsgcDIoHy%2BbaanMEhDqHom%2F4NrwtMcpNrniHQKMG%2BDzYN6QspDrH2MrpA%2F4PX7pURqSv0AYZaFBSEa2H2L2qxuIqFczhVd8T7l%2Fpd7jkEjr4T%2FxJ8Rdvo2ZBfunaGXWR65jnt4abGI79e0Dx4qdrJXj%2Bu%2Bjrcb97c2Hcw9MXwygY6pgGur92%2B6Z0pdfgHKpmRLmmjEYon6BrY38nX7ecH%2Fo%2BUuspvlagwMkXJCySRy3Lp0F97HTPX3dv03vnENAMSFTprYD8X9bZ0L76neJ6SFEFhqQfw5crqNEr5etdiayw22ZunR%2FFh9bxMU2SN3v0LmAiNj9VdiVgR8yrbr4hyRa7sNVV0gw3OOMv0C04wMuAqPwZq8N2qWt73ix82dDZxOzNAZK7ITxqN&X-Amz-Signature=0d5b524f5d8bc80657ac070d54d314096ceeffbdd910e3e985145848593669b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6EZHE3Z%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKC99addLkYIjnConBB6J77uz01bOgZKq7HQCNeTq4vAiB5TiViLEtfm5xKuutDBhWvTqu3Zm%2BAiwTqD7WvpEHcoir%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMsQ2uEOX2kFWq9yHxKtwDvgmOA537lt1KjFBa0qf1mQAv6jHCNPrujKltjmBkBX2cdz2O%2BdH%2Bvo4mVrVMaCHTl3wqNVDrtjd3hoCOBOUiuiISWChKzKM8X8B26eUHL3jhLYiOc6prg5Ol%2FemkLGeFEmR47UBQ9GullqyYJc%2BH%2B272OX1fADWdKvrYuqhu43Hm1pzpQhgkOmZG1RMd5pcGeyv%2BGbk19Sj0WdlMitEeG1LUKrQiBSdAhqLUXxQmK%2BaeIjzIJyE1wbDLycrxoPZhYhTHIw6BQTXx7%2BtVgx0fc3FuPoCVYnLcHOYO6w2xJjxgRe9RY3RQ6PVsyUOesFezvDZChnqgj9L9zS%2Bkj6Pti7PlcUp4Jlua0KlsFySoCwYCspiNP5VYOGDMZM9dMmm0cnKRMVuE8jU%2BRKkJ%2B3p2BKLaTJ1Cc9TqlubAmF6atfgAC1Z2ibUe7I6MrlMRH6uPkW8rbmtD7HtXqeI29TGI91ip2%2FfXtWbT07mrrzdRT6672ljEWMSdmRm%2Bj9CoTUV30bs1MmKErmJexTR%2B0dsQDJvCJnAibNO8QzaHmVLElXanfTk0cpfhhhEHrpwQV2Og4rUwv46r3NcvQSUbu3NbjrlVFnN2JyY2jK98tKXdyC9UE%2FaTk8YO7xz0by4w0cXwygY6pgFVOapy4R3ZrEC9l1LfEBXaB%2B%2FTnPLUVf465tGg3LkRCMkXy0gS5EW0ng15MWMl54fhkzIC9TCYcbb8bFbdl0taPT9KQJSS3Czg7yS1FcaWtkKMJ5odldZ0fi7ULLwocvy9uzjUio%2F1Ucyj7WYYt427K3zng%2BLPwGYji7vrSfgs1J1eQGOff4meCOE78gxlh%2FFANHlOyOhOUz6brnJNEWjd1ArOSUDV&X-Amz-Signature=c742c8305627849e76b8d8fbaa05e1141109e94fbd872522d8a77f5c51f034eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6EZHE3Z%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKC99addLkYIjnConBB6J77uz01bOgZKq7HQCNeTq4vAiB5TiViLEtfm5xKuutDBhWvTqu3Zm%2BAiwTqD7WvpEHcoir%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMsQ2uEOX2kFWq9yHxKtwDvgmOA537lt1KjFBa0qf1mQAv6jHCNPrujKltjmBkBX2cdz2O%2BdH%2Bvo4mVrVMaCHTl3wqNVDrtjd3hoCOBOUiuiISWChKzKM8X8B26eUHL3jhLYiOc6prg5Ol%2FemkLGeFEmR47UBQ9GullqyYJc%2BH%2B272OX1fADWdKvrYuqhu43Hm1pzpQhgkOmZG1RMd5pcGeyv%2BGbk19Sj0WdlMitEeG1LUKrQiBSdAhqLUXxQmK%2BaeIjzIJyE1wbDLycrxoPZhYhTHIw6BQTXx7%2BtVgx0fc3FuPoCVYnLcHOYO6w2xJjxgRe9RY3RQ6PVsyUOesFezvDZChnqgj9L9zS%2Bkj6Pti7PlcUp4Jlua0KlsFySoCwYCspiNP5VYOGDMZM9dMmm0cnKRMVuE8jU%2BRKkJ%2B3p2BKLaTJ1Cc9TqlubAmF6atfgAC1Z2ibUe7I6MrlMRH6uPkW8rbmtD7HtXqeI29TGI91ip2%2FfXtWbT07mrrzdRT6672ljEWMSdmRm%2Bj9CoTUV30bs1MmKErmJexTR%2B0dsQDJvCJnAibNO8QzaHmVLElXanfTk0cpfhhhEHrpwQV2Og4rUwv46r3NcvQSUbu3NbjrlVFnN2JyY2jK98tKXdyC9UE%2FaTk8YO7xz0by4w0cXwygY6pgFVOapy4R3ZrEC9l1LfEBXaB%2B%2FTnPLUVf465tGg3LkRCMkXy0gS5EW0ng15MWMl54fhkzIC9TCYcbb8bFbdl0taPT9KQJSS3Czg7yS1FcaWtkKMJ5odldZ0fi7ULLwocvy9uzjUio%2F1Ucyj7WYYt427K3zng%2BLPwGYji7vrSfgs1J1eQGOff4meCOE78gxlh%2FFANHlOyOhOUz6brnJNEWjd1ArOSUDV&X-Amz-Signature=d021adfc84b7c1951234e09546199d097d2048fe3aa46409ea9341dd86e47f0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VQFXNI3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBhxM3IX36npiS%2B6Kiboq6%2FQQYR4MlsjYQ%2BniQVcQu8JAiEA35hfTHYT%2FM0VY5B%2B6kZY5hBUkR0wWKOEVLlmfXQKNXIq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDGxewIO1a7au%2FF6T6ircA1VGdAIgden3fUau3EkR5Ut9%2FYCZQERGzZ3agspOxxjj3ZBvVo%2FgI3HOKrRnuf6OdfBYBoposhv%2BrsjUtLEVHiwm%2BQW3aUym4Iclj8SBltUQ4mcIAo7rU3%2BQbBK0X17f2PbwqUIaAPWwz6R2%2FhBQhGbm1MVFaD6ZmM6djVblXZBXZTBroRuxPQTMOTk%2FEO6AFn9TsE135bPXlTdAK6qc%2FqO8byQRMWqxVXvmLLyZGvVE%2F%2Bh0xTK%2BUeo3vSuQqgZR3XjCyLGkT%2FYZHAPTp%2B7Fp1e8fLv4SGLsSzcxOmuFNk7HK7H4ww5emD%2FI%2FhgLrUoq6MO3pDC7poQxsbvu59ElqPNvdyXhQKARH%2FBxuM8xZmHrQp81mE4tRNROAdg5Yz3ezsTXRJk4UdPTo6%2Bna5HATiy95S%2BcZTG89abvwV%2B19KNTsboIS7dYHYUPPqDmlLd2C9Jx7QLRhgQ3q1ta7xM9JsJqH01iOAQj1zVyiJIAhnaHPfZleofc13iZNzy1Z2MNb581YA70RBcMy1oPvTwapnJvcFSj5909%2BUJKaGFMKlqAFK1a6E6S5BUZQrQphYFaCSgXJ48y%2BsvQwQN3aC6YcBOI8BdhJvvXrKA3%2FYzfJFSeNYHuTqVSz4BpH9B7MJrF8MoGOqUBOp5qcIf6HLWN%2Fo%2FTHoZVY4PE3jVMG5cORBWA5x1Gjy3MIKYMnnu6OP%2BDbHZ6UJ9bcyUI5pc5qsZ2qkY2IJ8Hx2Tkf1eBaPDHfrJvztQv208LvoreiM4nDktefcd0FmjAfMKQzw3y8SLXafPgD1QSW3jGlESGsxGT2YU1qG6HGCzhqzDm46jMoUhcclA6EpJTJFBDu7bM23MQCJV3FpvznebhzUlH&X-Amz-Signature=e6c26247b16b6d43d28a81d91e86bcee9d2f8d6c2dff3abf4af0af27b7f9ce6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VR3SVA5N%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDx5LvJ9Gnpp2FeRUh9mF%2BoVqsL9YYjW3VrAfRkfWVYEgIgCfAqPjZZr8Z9fSOpk32W3Wjh44y24JaejEWAyIwCcgYq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOvRo0pWXbzIo7m21SrcA1s7ps%2Bheo1yUaSLQYlSv8G4GnBrM7vhmqSP74Y860aY1zDgMrhu9%2FSLpyE2feJuCv51jP5L4z%2BC6Up%2FyH%2B5y05yqZ4R8TYUh7UlmTDfgMPoSZiY3qkkiDRNXwGRjdZyoRFmZ57nWQcbvgQJO5M0%2Bn1gk7p%2BVcyVT6d0BsS3K7%2BvLpeXTYOsTRUF4M9YciGpz%2FfqhMuv7OxOTmmR6nU8fKmA9G%2Fg%2FOKezRkMMLczoGrML9MMKyosU%2FKQVsSAQdrFchsqPeOGVpyOrOG%2Fcx1MGk7f1gBDSHHpR2Q0J%2BqGhGnVDoBmj2R9WKF8bvur1uw2h5sjsSiWogF3TzEp4tcPDZ3YgG8q3NSggvgLyWGL2iYccYN0pJGub7Q1zvK8pKrjlwEjFIUUQDgaFZAmQ47xobODjwR8T5GG0%2BGiZy4qrTa9Y6%2BQXDxjTysSvlXm5Gggo2wW288SH17Se4NggSNu450WyYThwoiijLULkSRcG1otHOiSKXz1IQ6mKiB4klfDIZRi2g4kR1LwWxBGh2YbFtZUbBI6B3EM3Z250bElTGuvL4anSHx8txkeIS3otpUDBMHJkX4KgCXWSoAVSp3ooLu8y6YNddEYu4PVRvQfJLQ6PVeaznpAeMFXnxpTMO3F8MoGOqUBFjOt7pXUWe29DrW5dwksPf4MmlwS8uT%2FvtU1mc6UTgAcgu%2B2ay6%2BbxM4Wf0y3x%2F%2B4uzGgA%2BCy5vn9oag5JnHSQS038Qum4LxtUxFO0KWg5%2BvWBqiSoLz98lgt5JVn3hbLyICHLnACEnxR1V4FnQr%2F2EV0KgxGFE618dWS53a5oTfmskJytCKMtKr5LMMLfaQqvUT6VMe9zpDsIcpoA6DIJTIrAhI&X-Amz-Signature=7f1518d49a0d8b8f9d32d93a189cbb00aeb0194d0b9a5816db354a834a128ca5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VR3SVA5N%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDx5LvJ9Gnpp2FeRUh9mF%2BoVqsL9YYjW3VrAfRkfWVYEgIgCfAqPjZZr8Z9fSOpk32W3Wjh44y24JaejEWAyIwCcgYq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOvRo0pWXbzIo7m21SrcA1s7ps%2Bheo1yUaSLQYlSv8G4GnBrM7vhmqSP74Y860aY1zDgMrhu9%2FSLpyE2feJuCv51jP5L4z%2BC6Up%2FyH%2B5y05yqZ4R8TYUh7UlmTDfgMPoSZiY3qkkiDRNXwGRjdZyoRFmZ57nWQcbvgQJO5M0%2Bn1gk7p%2BVcyVT6d0BsS3K7%2BvLpeXTYOsTRUF4M9YciGpz%2FfqhMuv7OxOTmmR6nU8fKmA9G%2Fg%2FOKezRkMMLczoGrML9MMKyosU%2FKQVsSAQdrFchsqPeOGVpyOrOG%2Fcx1MGk7f1gBDSHHpR2Q0J%2BqGhGnVDoBmj2R9WKF8bvur1uw2h5sjsSiWogF3TzEp4tcPDZ3YgG8q3NSggvgLyWGL2iYccYN0pJGub7Q1zvK8pKrjlwEjFIUUQDgaFZAmQ47xobODjwR8T5GG0%2BGiZy4qrTa9Y6%2BQXDxjTysSvlXm5Gggo2wW288SH17Se4NggSNu450WyYThwoiijLULkSRcG1otHOiSKXz1IQ6mKiB4klfDIZRi2g4kR1LwWxBGh2YbFtZUbBI6B3EM3Z250bElTGuvL4anSHx8txkeIS3otpUDBMHJkX4KgCXWSoAVSp3ooLu8y6YNddEYu4PVRvQfJLQ6PVeaznpAeMFXnxpTMO3F8MoGOqUBFjOt7pXUWe29DrW5dwksPf4MmlwS8uT%2FvtU1mc6UTgAcgu%2B2ay6%2BbxM4Wf0y3x%2F%2B4uzGgA%2BCy5vn9oag5JnHSQS038Qum4LxtUxFO0KWg5%2BvWBqiSoLz98lgt5JVn3hbLyICHLnACEnxR1V4FnQr%2F2EV0KgxGFE618dWS53a5oTfmskJytCKMtKr5LMMLfaQqvUT6VMe9zpDsIcpoA6DIJTIrAhI&X-Amz-Signature=7f1518d49a0d8b8f9d32d93a189cbb00aeb0194d0b9a5816db354a834a128ca5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMMREZBF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T210145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCm9Kx2PmhDZzJYWVuRhPC727g8udMAdbpIIrAIj642TgIhAK92xzIGv7OeLCIam1YylMPBWFxJITysuRN8viIIT%2F1TKv8DCE4QABoMNjM3NDIzMTgzODA1IgzAR1nmV1CACkqgomQq3AOxSetngJlSgDoib9%2Flwvys2NErIc3W%2BMI%2BQDMVfXiEui1NNfLChO6afcQVij1bhyPuNW2JTn6%2FhgmJm3%2BNSg9x56zfGAfiB6uFfAYHdYXCbPBDZue5wFL12fnSUnTcyJO%2BwTPFu1fAAHPG09%2BC1nF9MzR1Zcb8hWzjIU9gsoohVowSCH%2FGAZl2vQS4WCs%2F3zsKS4gjAVkfXqAhK4yGqu7YHmD1uYT6aNaQsk0P8t%2B3G8onOrIvOWJmAPYUkqUOlKyNQgderZPNR7LPFgTCW6gB4lq%2Ft%2Flz8hAo7Ag9AejHjJxAucBFaovaYafA4c1ENgPgJ9oBb3yBo51pjqjQFSB%2FFljHIbFx1UHWQ0obAguFRHkcPShiCfPG9iXogqsP%2B%2B%2FE8yhysuWncVFsJxNH4f7R9xTw5c8QI0TwGI%2FXyS0Q2Di2zZgCTOoI05IGzJBM%2Basm8ZgLGJ2B31uUc6hTRDHKuAETC5h7R0DxW5bHUwq5LpQfEf1QzyYL500bT3HLHUHc%2FsYgDaBhREAGJ6AtfOZpLNgHG%2FLRESpX90mHUW84U8kYS%2BYSq5pHBO6kHVlVJNPKlYHMtCJpwZOJJTluKip%2FY7%2FNMhyu0UOR%2FSDcg05SFXSGINiWfJKCpXD5NjC5xvDKBjqkAU%2FvgVssbE0tAWabBGUJD9j0ZkkkZkm900UQDkeCOd7uePJ9P3ItmzFL9o7jPkQxdXZq44pgKmIeSgGwDOdA8ok4Ys6jvPq0GPZ3NeyEmOqZvtwcRH9yayW8EBsgy2GQ7W5SHEUyOwT9CsNebhXChDA52QYvTuJhldwLPYp6U8%2F4Q7iE%2FzbriLYZr8a%2FoVR7w5Y6vYp%2F5ERagpJ9ZGDvU%2FDsV137&X-Amz-Signature=e6949413bf18bd79cdca6f91e6722fff95a50cf8d3917c8f2c3ad5506f00181e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

