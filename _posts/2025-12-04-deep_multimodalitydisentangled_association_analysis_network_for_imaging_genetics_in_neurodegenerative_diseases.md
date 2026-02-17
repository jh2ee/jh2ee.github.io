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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634RK4FSI%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZdfCssDv9z7ThYptA2M0RXwfAB1kj6TEj7ktome9O0wIgW6LDQ21TJFVRUIC47p5FDIi%2FTIuPaw8uVTwwaj%2BlG%2FQq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDLYZjRl7tF5jI77qTSrcA4Vn1%2B01olMm1bk8%2FZazrmXj2C7tHMO9OJ381eNxpxg4%2Ff9m1C4JGFjpHd804eDHO8z%2Blw8D5SOztrHM7tO4ebeTtSwgx53AmbseOIMchJdahm6NcgiFD%2FPin0A7DGnFqDvj9S7sBDy%2FF5KXSOhtXxFV9hJHQ6HlgP9x3aqqqR5qceGni%2Ft%2Fq1Jvm3ENJRYw%2FA7HlUJGdj8y1q7yqTdrxKmNaJvF9MUaUqz1dLN%2B2mhB%2FUqpAlGIrS1l1XCr4c%2FYsUCKRpHzYWG9eNfXK9D07jI6hCqYbS1vm0v9H%2Fa0m6bzFQaRYnYWoI9wrEf5BvvN83lNyPZvZPRI%2BltlpeG3qdRNZaVPbaPPmsMSfp1TkhxmdacMEReSesriR129SwLhSCkVJIuidCVtrjReBw8NN95rUK3Mv7KFyA5m8qwn4BeZQN8PK1Ph0z7snBKR7kHCOMqKtqFb7pWlPYvnCXU%2Btq8Bm3XknKBFk9ux90xpOXcGI5x%2FGsR%2FktY8NPtCPFQpcZIIb9p64k97bopqsXdRvKoeRSqeZMWNcxI4sg5EEvpEF3DAgmNldeN5YCN3vNYnsBJdxqMkfTZhRmDqetHUG5M8O4A2oaKQkMz%2FkosjHa5gp9XmKO31ktugTIkkMKHg0swGOqUBoZi2whUDMlrniEk4Zo4CxmRWYCT%2B%2FbDk6iQrZlOaFqKsp%2BlEptbvfoNmIgx7Sufdw1XIyUUpE4%2FRYjNBNwTOAUFquTTDovsKlDQ3BVgS1ocqvZuefI15l8A127EmSQMGBNjj7PmcxXAZBXzpwyDiktNMJSub%2BZzZzy%2FggtbbXijKQynI1ypcrab%2BY5QOGd3FkMKpv0RzI5UG4cNdGadpJRe89gh7&X-Amz-Signature=f4c7f6f384c1ca5ec9d27c6f869f697a9cb5fd0a673f2aa6cc3c878f9c5bd343&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634RK4FSI%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZdfCssDv9z7ThYptA2M0RXwfAB1kj6TEj7ktome9O0wIgW6LDQ21TJFVRUIC47p5FDIi%2FTIuPaw8uVTwwaj%2BlG%2FQq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDLYZjRl7tF5jI77qTSrcA4Vn1%2B01olMm1bk8%2FZazrmXj2C7tHMO9OJ381eNxpxg4%2Ff9m1C4JGFjpHd804eDHO8z%2Blw8D5SOztrHM7tO4ebeTtSwgx53AmbseOIMchJdahm6NcgiFD%2FPin0A7DGnFqDvj9S7sBDy%2FF5KXSOhtXxFV9hJHQ6HlgP9x3aqqqR5qceGni%2Ft%2Fq1Jvm3ENJRYw%2FA7HlUJGdj8y1q7yqTdrxKmNaJvF9MUaUqz1dLN%2B2mhB%2FUqpAlGIrS1l1XCr4c%2FYsUCKRpHzYWG9eNfXK9D07jI6hCqYbS1vm0v9H%2Fa0m6bzFQaRYnYWoI9wrEf5BvvN83lNyPZvZPRI%2BltlpeG3qdRNZaVPbaPPmsMSfp1TkhxmdacMEReSesriR129SwLhSCkVJIuidCVtrjReBw8NN95rUK3Mv7KFyA5m8qwn4BeZQN8PK1Ph0z7snBKR7kHCOMqKtqFb7pWlPYvnCXU%2Btq8Bm3XknKBFk9ux90xpOXcGI5x%2FGsR%2FktY8NPtCPFQpcZIIb9p64k97bopqsXdRvKoeRSqeZMWNcxI4sg5EEvpEF3DAgmNldeN5YCN3vNYnsBJdxqMkfTZhRmDqetHUG5M8O4A2oaKQkMz%2FkosjHa5gp9XmKO31ktugTIkkMKHg0swGOqUBoZi2whUDMlrniEk4Zo4CxmRWYCT%2B%2FbDk6iQrZlOaFqKsp%2BlEptbvfoNmIgx7Sufdw1XIyUUpE4%2FRYjNBNwTOAUFquTTDovsKlDQ3BVgS1ocqvZuefI15l8A127EmSQMGBNjj7PmcxXAZBXzpwyDiktNMJSub%2BZzZzy%2FggtbbXijKQynI1ypcrab%2BY5QOGd3FkMKpv0RzI5UG4cNdGadpJRe89gh7&X-Amz-Signature=f4c7f6f384c1ca5ec9d27c6f869f697a9cb5fd0a673f2aa6cc3c878f9c5bd343&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QM7DULGU%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMhtUDJchPHeSORXSPbgu0qag6R%2FYo%2FpxI%2F4HMMcOWWgIgfVghFHr%2BbRjA0YUcCCaWKm2o4l3gUtu7Nugl93hXDSwq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDDNaEdri0wd3Rv4RyyrcA5OzVZfVCCKby0k783S3GQTBTyuDgJMnu31Hz5ExWx8YlI%2BpiVVmPyQE2wEYuedH%2BAOM6U3jozSNBEO4FOhS0wl9y9hoMhLldBs3d47auY3fdknY4jGuILDvaCNxq2EbOOlgQPMh0aYeWlUu4xBzPPVJ9AW1N6q8eDeVq1GoGc5T%2BT6fj0QfKQKrEgYUXv5Q4q2J16qxBoTMD9V%2Fx2BIynD6Sl3Plm7gqjYyH0DHHQonsr45rlQQjd2RJ3XXYvCBuO%2FiKvdtfOFiQNc05LscYmfUEQb%2BiKpV4%2BACGFzpaKzwiTdVoBJoSD9WopHhGQ3SLgH9pHajQpMm6AOLpsppHxOt7zJEkf2GtYwNFLFJDlTaUrK4br%2BxlS29rRrWfOXOQvvFG%2BZGJR%2B8cpOVaLaPOCU3XlVq6IB069m9vgQArZo1qg8X6Jp00HALX%2BsaYQVG%2FS5Fc6mCK6q0QCNVVPcL0OLcMc16XAGUHRfrkmYsxl3vjIA%2BTSGKmHouJPoSLUILSqGGed8ymct6GS4tOlNvbVd4tUdWY%2BgWsA%2FXhr9sh3YWFvZcPfGxn875tuq1qqNTqzkDNE2xHXTuc2UZagujnGqzTrUDO%2FXEfiojNgrL28H6el30J4DkIhMY43aQMNrf0swGOqUBiGOnLOskuWtsB0qx1QLTAZhHQ8sKjFHB3qV7Ovy4ySSJwSchW0HF%2FszrgzAKJZhe0rJPWGHoP7ixAtovi9P%2Fdqwv5AAtrFCpcXaLp1dQkfwcbEsosXMfm%2Bc8%2BumoKiKYlts236qfelr0cK6gE5H5keiwdcHVXNoeqS%2BNcO8xqJrygiHGRZ0TsusVb4BA8pMrtSty0rpcOZKyKpntM4SXHLIVgplP&X-Amz-Signature=e167696e5cf80984782b12b64f148a3e73a377e3c2e0b0749a8cd34d5a39c664&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QITTRBA%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcSJZ2%2BIiozQugn6jsfxC96Lz8Qt8tLUTdFWIW9lMuLwIgBY5z3o0hkkjq94gX9tR1oXlmMcDByCSdRGu9cXJKu9Aq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDFG3m53DPRLkSgJ%2BOCrcA1fJH9yfcGSzUZmMBSyXb75KVi9DfutYR7Z6ySupWeW8LkXVVLi99EC72hpoF6AHwSi%2Fzn%2BDL2pr572ZPDRSydGotOYk36pddAkP3FAw59vCK6Run68dDB0zRJXAJH4fOkqeYhgKVRBgcl2e%2FqOU0d5oRXtQqzLqthcv4x2Tu8MMml%2BFEwdrjva0E2qFvyoGgFFG19XN9TP%2FGp70kBddwviSPVh%2FVc5saoTggZo9GPainK6YmZydgXIoyZRKVYPHuOPd8gn04k2JMfrC8rTlIVZchz4mLNingUI3VmUfc8m9TIJMmH7mwcJxRWjgG0XYmIZMAAppezCW6gBEg7e1FoqakVAerSAz4TbmocriRWd6jqWmpR6mVz9U4APKSxhVoJfWBwGbNjiN4HjVfLJbCzpaCBBzbecmgHcjhzR5%2BMx0rIHZ7wVThsg6kIEe8K%2Biss9krHaHwKRlo4V7hG5BvNtPqun3cptCQkp6798LGJ%2BY319AyRILKO%2BIfP0cxSpbfvXRQoqgvlwET5pePmtZDx6Rmpe1%2F7oqdtbSYEh1FkN1R4B5bkdKMh8eDDtPWT3ZjQqPIHewBv00reEv1tr12zNR%2FSA%2BtBb55MAVDKOojYKgSyecWapxugqKMFpGMNrf0swGOqUBtmOPzX%2Fcypj%2FBqScfAd5mr0k3Rr1oGW9A5bgLcMG2%2FkFubXIKLBNHlP4%2Bf9TVjJv5svzwVJkx2rMUAw%2Bhv53A1KN46pCuf5P7KuJ50Q6xd4Ce5PvGnrob4R1jEYo9MnkcepBPl63M63Ypr1EVyLj3ALTby6n0uojVya05Vlvbm6DB42emv91iPctZHdnY3QItPsAbPbAOtsyKEbU7uIGSEFgDU0T&X-Amz-Signature=668d72898a401fd6347fdb2bfa0c3fe5e279ad90831298203ee6577075d85ed8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QITTRBA%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcSJZ2%2BIiozQugn6jsfxC96Lz8Qt8tLUTdFWIW9lMuLwIgBY5z3o0hkkjq94gX9tR1oXlmMcDByCSdRGu9cXJKu9Aq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDFG3m53DPRLkSgJ%2BOCrcA1fJH9yfcGSzUZmMBSyXb75KVi9DfutYR7Z6ySupWeW8LkXVVLi99EC72hpoF6AHwSi%2Fzn%2BDL2pr572ZPDRSydGotOYk36pddAkP3FAw59vCK6Run68dDB0zRJXAJH4fOkqeYhgKVRBgcl2e%2FqOU0d5oRXtQqzLqthcv4x2Tu8MMml%2BFEwdrjva0E2qFvyoGgFFG19XN9TP%2FGp70kBddwviSPVh%2FVc5saoTggZo9GPainK6YmZydgXIoyZRKVYPHuOPd8gn04k2JMfrC8rTlIVZchz4mLNingUI3VmUfc8m9TIJMmH7mwcJxRWjgG0XYmIZMAAppezCW6gBEg7e1FoqakVAerSAz4TbmocriRWd6jqWmpR6mVz9U4APKSxhVoJfWBwGbNjiN4HjVfLJbCzpaCBBzbecmgHcjhzR5%2BMx0rIHZ7wVThsg6kIEe8K%2Biss9krHaHwKRlo4V7hG5BvNtPqun3cptCQkp6798LGJ%2BY319AyRILKO%2BIfP0cxSpbfvXRQoqgvlwET5pePmtZDx6Rmpe1%2F7oqdtbSYEh1FkN1R4B5bkdKMh8eDDtPWT3ZjQqPIHewBv00reEv1tr12zNR%2FSA%2BtBb55MAVDKOojYKgSyecWapxugqKMFpGMNrf0swGOqUBtmOPzX%2Fcypj%2FBqScfAd5mr0k3Rr1oGW9A5bgLcMG2%2FkFubXIKLBNHlP4%2Bf9TVjJv5svzwVJkx2rMUAw%2Bhv53A1KN46pCuf5P7KuJ50Q6xd4Ce5PvGnrob4R1jEYo9MnkcepBPl63M63Ypr1EVyLj3ALTby6n0uojVya05Vlvbm6DB42emv91iPctZHdnY3QItPsAbPbAOtsyKEbU7uIGSEFgDU0T&X-Amz-Signature=828be67c8ef957af676e1fd3e2329c73af132c951291d7aaa3fb43725fbc5e5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZJ34T3G%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFnXQ1Wv9%2B46AQamn7aJOtj7eFLPm3XCiV6OgWVtZclKAiEAnwYFg1ESEDrbYyw8nFgPv9XwPBZtutgrp08xs1%2FOIgQq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDP%2BTwnt%2FOPv5CwndKircA4fMUWPk9EIEGfzJ3ZtsA2gN9yZqe%2FlUcFMdHUkh6O5cdbzi5P5fwu7mqgc9YHnLc%2F5zmVnm6Dfji54orT%2BGVh2t8joHztQt3ra0Edy7SllkJPi3LBz0K5lagW9KUw5MY5xca1Vz4wzRcpM8ggGUxmZJfv3Bg7BaGMIUFFCRxAqzV30tMyqPBkfE0bW1%2Bh4DqJvbCwj1nzyBmCmp8u6EfRoYywFzk3H9gSmAL%2FHuxk8m1k1YYraMv6GbOo5BxQ6n9qVhgXOVEr2yIJALntlW4zybFSW5RzWqxNMinDaFvxnUFtqccwI9DgOATqfAro5qZorWkI0L6wW5hCQbcwS4KMvoesp6TJ7XngnFIQRz4kaTpEfAWxYhd1ep9MRMGJJ%2FXiOMxvVYUulsI8d49HqNicPj3ydEvwYpeVb%2FP%2FDalMJPM2JZ%2FsDf67d2SCd3deWs8UI8dNl5mDiuJSVQ8ixHhd5NChhAlrMYC6ksOi5%2Bi%2B2g45MhDfr3Zfg43KjfL8gEsZRPEQC9jf9lsaWLwv936HN2jocAz%2BcL9lRNzPYpRjSuvB8JlkHLO69w5XVsXZ6uef0TsTKTfsII94xWTmKXNDLZ65xAs1jjVV5wUnvWpOKhWecTiWjEUqDUn6ZeMP7f0swGOqUBetdGeA9Dub1wpLJTYtxFiIv7zq%2FbBwCdHGA%2Bf%2Fw741hyExkSvHJyTZB5KEnD8MRMSeAvr5thVa0SkAAVtiL6E1re6WblcUUT5%2BMFeJLUqtx92NTG8Ona42Khnm76IEW8iLoXMS4c1f2t%2BgFfw6LdWOgwmwWo7fz5ZHNpzs%2BdZl1Kox0RjuzoGeJTx5usnLBQmM%2F83boBrHFSazkYj%2BhSRsq8lgDp&X-Amz-Signature=3c8b8906838aaf1e71f8b006e310807e0b4960bfaa662e2cba7969c19e8a7dee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGC7TUZW%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICsCPmereYSBcqNE43jET55MLsK0CsYjBwOY82uwpVhpAiB9KFwJJP7mVGjtbk4dfQPfza3FHT4PFN98Qw8IdtR8TCr%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPa5jfU3Hege2K1%2BKKtwDUxbrCNI51MGhc2bHHGA%2FxXPGU%2FHOtTMluXhdT6rAtbl9rjXUvBb8tdO1vAUKE6Pe7CvDEBFy9DaPKlBWxFdPMEYOa38eOWqkbf%2B8qeSMlsIf6ZVSbXz9Dnm3wP1AmZRp4hTsG31W8S%2BPP3Nao6M6o6MrfMiRedbEemiA81WPIKynYQuAq%2F63TpuzcLmxOnUkNmEeagn7hmRIlpUdGrWBu%2BO612D6TmaLrW3Dstm12mXk0C4l7WOBWR5y4cJzVa3WXY3nLB1k64v%2BkB3JgFL7FU%2Bi6ItQ6O3NSzaaeSGsZj%2BvYRa0PCF7rdQUj313z5tTgtQzK4IFD0LzA%2BwMy0kSp8rz%2BivuwWn2cw7%2FjyF1gq50BJypbL22XaIJ3vuvXJLsd6JaZWWISCpbDueMSzr0QJ80Tyw86MLw63x2NDKiBDjV70bZG5uW4f97mHWdKGAmH%2FwxuIme3GR1S%2F%2B822mBPWRG2inXto9gltzvIbpDSFf8j3YQO1n6Pa5PTTg%2BP9sAfuS6qpaQOiwCOQcT8eOo1DePoPhEzbt7XDBEs6ytiY3%2FO8rXlvojDeDc7SqgvBYDqs1SNkvbCrMXFNNmSP8ohzu7CBT2yjg3GLL5mUtY%2FKAweVGpxKuXYZV8bPMwwd%2FSzAY6pgG1lDPlOc7hi9I4TU%2BXiwqtjafvoE8PhhmIUK%2Fxq4ad2kIp0yncOU%2FfUxLEPbfbkgyngyr5vWNdzoN4yA4iU%2FkcZAbBJ3TLha7t8PEg6FHrFO1TxgvE5F%2BtU916LSOqF5rW%2Bwqf8SR2C74%2BaPPJb17UPVIrB2x%2Bi8h64djhUtNFgpz6FOjechffaJLA8TkBSmMK7N6M0GFEwvrepixX7cHmzztkRF0u&X-Amz-Signature=29b5efc2804630703cd837d09bef30acf3855e5710a549bf74a15ee6fd720ebb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A2QPXOC%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFdGB3mUyS3Who1i1Z6J7QO%2BBbc4SFDYJTZ0U6UDq7juAiEAulIWP9Ty27NR6r5LfLCBYPxiToeXuRkhO7dVeYLyfdEq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDPIo%2BCecHgxit%2BDDJyrcA2LEPVT%2FxG8JX5uFQSrA6iHhozGXi41Tj9Q2arWzgrj5ViT62QWfBnq6eDu6%2B3YE87nUp4loKRDDPqU5N5CydzPVkVDsJeFgSnivvYjDsx9r6BcgfY2qbthInl0eJP8QGCBQZeyesLPYfj5WnblTJYmUIZH%2B%2FTeMjJP0G6Lj%2FVpRjl%2FIK4jjGkCLEo1mV2xhBn085g%2FEq3miVpZAhiDjQtfx1vhbCfjs3q4LfR8zP1qg4ME6mT%2FEacLlqMnTPSHMibgW0rju%2FMljJDu3C9k%2Bov9eB4iMpYbW5yaoTO2vvHub2gzz%2BivLReYGcR6lLpxuH8fm%2Frx1sWwhlFfTxdIRoKbfDlL13wq0ekYtZv2GaWilJdzQ8%2FyrYxLiGi5UZCcN4LoAjnXj0RJDod1jeHWfr33TFXDPodDiJiCCbOOHS%2B%2BNzG2MuZuEtvLazuv5D6kWptNZz8b9QaNLadWy8NxSD2nmodp6Syx1KWwAncDOxtQ%2BeoBQR4iPIc4TR4KmJrh0I0cpzIMiSpCROIe0dxXAa3cwJKybuXmcr5TeXKwKJbh0UyMfNOUAOoAFu6It0K06ouMKOjKDM3ehs7GC5RkXCqoIH%2BoY8oyp3%2BbYDaIwsT4HrFvmXXXHGFWEs6H5MPPg0swGOqUB9aBkUjSbsaqnYegrVtuWAxFTKDDOsPdAvmtBCNq9oGTVtX29wA2VTplyopYrZjWgGkzR6FuJxq30Kl7V5qFpj6E9UifYab5uc%2BBApcuzdAF9pmQY7n0H1cmy4F90RwZ8pjD5koWJdy1DS3lh6WfTTqhbI53jIDLG4FzHmAW6ZvfC2%2Bn8r6s8D0VVkkN6a799jV0oG0x9bqCrjRW0WfiAUyZZjueH&X-Amz-Signature=6647f1b455ca6bcaabf342741a6f5b5d1e88ff95be85f8950991c5e0e36305b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGORDETX%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEK3cGqjFHvvUiA%2F8LTLTVJi8Db84SVzK1cAdl5daTfyAiEA4A5B2DewOEDtcr7AJ5hQy6JKOaP8RnmnkvJQvphBB7Yq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDNR9%2F9oiXcMvcPbKPyrcA4gVgGY0NNyq39%2FtwXrQIjjqM0rIT3oBb7ukh%2BRC1ZduLUQSr9GWfNH%2BiVpocmcc0PS0rakGn2fX3hf2%2FliiBulVPXAQHDB4ECAFFLQ2h6jRamLg4Fp9wFtL81QbwNZdG7GgYVBCclaNWJRzwlLFYKlFuxf49MKWGtaDoSunglkI6ZyyfRWevrPGrZF8S2HLCHZQCZCHA1%2FV8dwXJdo6BjGQj6YTza1amhN66T4Qi2Y9lo%2BKrt22LZplN01itH1C7j8W%2F5CDBM5ZhP20eHLWQ0fk3uByIoAf10WlO5P9I4WxTNwhQTHpUj9JRkqQ5dbrYkTQyCA5rgwPuoPs%2BYAoi6k%2FKkZ21V5XH8T3lpl3Irh3dan843K%2B3PqKVGdPJjraZzTKCPmsFrTZy0YrUVbbYdcJNoPYhc8hgElYjrPzEQQWYXzuYxXx7xbyyyHbl2iNxgYigOODsMrjRVgW0esQZuZ6SqMEf5vKg7STzI2XxkszwVs0%2BUz4KUsBo7oCbWAGINctQgpW2%2BLXlQMwzSdB%2F4U2xVae%2B158Sfg%2BI6h8UxekYEMH%2B592DaTu54m02TruhYxcjL6rkS0CeFgagCqCI8gjToP1lMODuOpKvk7LTRLZD%2B8gE%2FyGvT5f8ItcMOnf0swGOqUB2D%2FfUK40W126IfKR%2BKQqye0iGJZHoTIYu42SrIyWmetHALfKBpyd2jlqGLSTAUlnhEbO6Cy17D6%2BWfZ48AqxBe4c9hEC4mkOPViS8F%2BsOmhgZZp0YyEC9yWKgdbcKx8h3BaaT0IaM9RchSf9t2WOGxw88VLJnZUFg1fKLqiG%2F9wK2QYlo0rqootOcaXwovlk0EUOn79S8gpnst2m0Y3dP9lwnGM%2F&X-Amz-Signature=71a378ed3a9941ff489c54be437494f357ba78800f60c83feeebfe9bfeb47e6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGORDETX%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEK3cGqjFHvvUiA%2F8LTLTVJi8Db84SVzK1cAdl5daTfyAiEA4A5B2DewOEDtcr7AJ5hQy6JKOaP8RnmnkvJQvphBB7Yq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDNR9%2F9oiXcMvcPbKPyrcA4gVgGY0NNyq39%2FtwXrQIjjqM0rIT3oBb7ukh%2BRC1ZduLUQSr9GWfNH%2BiVpocmcc0PS0rakGn2fX3hf2%2FliiBulVPXAQHDB4ECAFFLQ2h6jRamLg4Fp9wFtL81QbwNZdG7GgYVBCclaNWJRzwlLFYKlFuxf49MKWGtaDoSunglkI6ZyyfRWevrPGrZF8S2HLCHZQCZCHA1%2FV8dwXJdo6BjGQj6YTza1amhN66T4Qi2Y9lo%2BKrt22LZplN01itH1C7j8W%2F5CDBM5ZhP20eHLWQ0fk3uByIoAf10WlO5P9I4WxTNwhQTHpUj9JRkqQ5dbrYkTQyCA5rgwPuoPs%2BYAoi6k%2FKkZ21V5XH8T3lpl3Irh3dan843K%2B3PqKVGdPJjraZzTKCPmsFrTZy0YrUVbbYdcJNoPYhc8hgElYjrPzEQQWYXzuYxXx7xbyyyHbl2iNxgYigOODsMrjRVgW0esQZuZ6SqMEf5vKg7STzI2XxkszwVs0%2BUz4KUsBo7oCbWAGINctQgpW2%2BLXlQMwzSdB%2F4U2xVae%2B158Sfg%2BI6h8UxekYEMH%2B592DaTu54m02TruhYxcjL6rkS0CeFgagCqCI8gjToP1lMODuOpKvk7LTRLZD%2B8gE%2FyGvT5f8ItcMOnf0swGOqUB2D%2FfUK40W126IfKR%2BKQqye0iGJZHoTIYu42SrIyWmetHALfKBpyd2jlqGLSTAUlnhEbO6Cy17D6%2BWfZ48AqxBe4c9hEC4mkOPViS8F%2BsOmhgZZp0YyEC9yWKgdbcKx8h3BaaT0IaM9RchSf9t2WOGxw88VLJnZUFg1fKLqiG%2F9wK2QYlo0rqootOcaXwovlk0EUOn79S8gpnst2m0Y3dP9lwnGM%2F&X-Amz-Signature=bdd10f7be690f9a175dbcd9ea173e04ddb9d814b5df67d2ef37689566e5d82ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFKTTEXH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH89KVKnGCKcURZHKPzMyCxzh7OlN%2FvAPPg9Vosp%2FEhtAiBtiFtKyge6Zoe1CN%2BuRqDu0BQFYf0aDBIo3AC%2FWoiOxir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIM054hWniPqlpxx96HKtwDhAMlgY9U74i6PSHw0n0Db8fC2ZESwr5zrY1lNBSCPHOnkrscx1DYwWFuFyXhvPmeX1T0IaXHSGITfM1LpdXs5JyrCNPII8DVC0dM9vgKY3rgh%2BjUNLl06UGDoU0rF%2F0pvqGkvP5XEcLxPDrrUI2F7J65HsbiQ1KDImk%2BF4eeAFm5sUaPC%2F5%2BHxSSgU1C50xeBBU4Oh1y8gvnz2k5lrXobiIV69TQMfuGwWdI%2B09iLnqEGYpaqHd6j%2FrePrbaqe2GiLB92zcmshy%2FPNdJiv9q3jmdcWSJG5OaCMYNNGOHuquDYHFi26BizZIl84Ln4UCAXnZLhnpXFTYsnUhGxPyPNz65vnU%2Fk8kEAy7zG4kBd8UBubt%2F%2BxxPFHl4SzE1QT2Jkt9FLMB6rFqsMid%2B2S7txDGP2JiDwuFM3KQeOfQ5nRi4HF5YBRon2GdJmwHo0sexTTfeSOZz7W6dT5h5lwElFryYrr7e%2BYnj4PEFuwdVYoDtOpblNRJ4ABmXrbzdRHqjvMRI6gn%2FcAmNIq2JCSWND2TP%2Fij8P7mKtS9P3wCPpk5WZM2ECKzpcx3TZYrYHlKHLCdQFVCb2kFlABWVmE3raUm5UA229lZTCZYZqQrjMbMhLoRQpUih6CV9h%2F8wieDSzAY6pgFcy2RGX8nu%2FFbdL7Y5i%2BA4QcB3G7fUfaQ5BzG7HZ4iGOW51UYkLML3%2FzKLr3Qn7Eoy7zG1UULgQsPfaAG87t%2BBKFSyXaTCHA%2FeXbZ7WdSHg%2F5%2Bj4xpJ%2F9nWS1e8brXsEuq4a7RZ63tN6H7IYxXdWJk1V%2B6wsHAj4UnElxd%2FJJ%2Bb4tivJm2MycK8vTlur6dEYoc2I1eKsYYAFBra05DrGWyyE6mR%2BSo&X-Amz-Signature=ab82f064347d0068dd83464171330cc705fb3374414264a4a605c7019a338c48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIEJGKRH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8zNLhQZL48wlWn1eNfx5fAhDDqietRGpku%2FLO54lfGAiA9bG1WoyKhL%2Bw7mlo%2B5OZgDknFnjX587SBhkFYU1UWwyr%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIM5RSYVHBJJPnq1uEyKtwDl0UzwUXg1KiSdVTAjKhEtWdxXxBN17SE54SDePuc3nGpUooK4V4Y71imreOOGH8vxCW%2FgSbssXom5dNOhfIAUYBvOutUChl0jIFLr64EXrZUNxZ5QvJMSQTA8GJKG5emJkSzhBgEj5i1gAidJ3AsVioBAAfXVer%2FfY7Sz9VW7wfmstk3aK4BRRxdVmUxLdHzxbrBeL2%2BglM4LBnpEvmRIzGlUknHXQEacEQSxXKntD7Y23lgMHRddGj0M3NbD4lM7uNQy61%2Fay9xwHfmPWez1lykSyUom8VA6H%2BObQE85XqqwxEPy%2B1ODdx0S3x66FNR1TdjMTi9EA%2BMvpiGq5wvPk7vpoW3nBylNWmA0Pb51I8vUtNMXVd7A7q9%2BtOhlLhIAhKbg54XeaL0KVKOp%2FF8rQ0%2BMhq60SnbfWTzffcv4sZXbhNCngJ41dX9941Uid55HFqtWE0Vigmq3wBTs3TMNLpjnJpgwnB3aiKZR4JBxTAgv5wIDUxGB9RydYAjLXvFvKeL8sBx0DGJlquQSEUmfjT7zugSWlAQTdeeSESUoTIG7aSGR9KmLfYGWaDkipzEaTaPaU1YzwFspScGv5Bz9aZEwQkMOMNwKbhYHla8syvynIYzn0GStZM3%2BaIw5t%2FSzAY6pgHZst5g8Rb2tYPZ91vq9ISxIgA0Ez6SWpVam4dYy%2FhHuRbMpbDHEdcxxnGvB2%2FzJ6U%2Fl9ZbvLcc2en9sViqIL6ob%2BHXvU%2BqFoIJOHtuCupTLHKaC6ou4SpJyXF2ZNLeDYPLmB8Wk1c9OhZ%2BvN09i7SP3Euc8Q0vy9idOfIJePQ1UU7HYbPRhAr%2B3XW1swa4CHYuawgBGzlR3H%2F%2BJ81ImF%2BSKl0beHeW&X-Amz-Signature=f83876f0db4752fb1809ed7f3ee7d4086a2b9d3b3ba4e83a1490fea082b6a006&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIEJGKRH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8zNLhQZL48wlWn1eNfx5fAhDDqietRGpku%2FLO54lfGAiA9bG1WoyKhL%2Bw7mlo%2B5OZgDknFnjX587SBhkFYU1UWwyr%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIM5RSYVHBJJPnq1uEyKtwDl0UzwUXg1KiSdVTAjKhEtWdxXxBN17SE54SDePuc3nGpUooK4V4Y71imreOOGH8vxCW%2FgSbssXom5dNOhfIAUYBvOutUChl0jIFLr64EXrZUNxZ5QvJMSQTA8GJKG5emJkSzhBgEj5i1gAidJ3AsVioBAAfXVer%2FfY7Sz9VW7wfmstk3aK4BRRxdVmUxLdHzxbrBeL2%2BglM4LBnpEvmRIzGlUknHXQEacEQSxXKntD7Y23lgMHRddGj0M3NbD4lM7uNQy61%2Fay9xwHfmPWez1lykSyUom8VA6H%2BObQE85XqqwxEPy%2B1ODdx0S3x66FNR1TdjMTi9EA%2BMvpiGq5wvPk7vpoW3nBylNWmA0Pb51I8vUtNMXVd7A7q9%2BtOhlLhIAhKbg54XeaL0KVKOp%2FF8rQ0%2BMhq60SnbfWTzffcv4sZXbhNCngJ41dX9941Uid55HFqtWE0Vigmq3wBTs3TMNLpjnJpgwnB3aiKZR4JBxTAgv5wIDUxGB9RydYAjLXvFvKeL8sBx0DGJlquQSEUmfjT7zugSWlAQTdeeSESUoTIG7aSGR9KmLfYGWaDkipzEaTaPaU1YzwFspScGv5Bz9aZEwQkMOMNwKbhYHla8syvynIYzn0GStZM3%2BaIw5t%2FSzAY6pgHZst5g8Rb2tYPZ91vq9ISxIgA0Ez6SWpVam4dYy%2FhHuRbMpbDHEdcxxnGvB2%2FzJ6U%2Fl9ZbvLcc2en9sViqIL6ob%2BHXvU%2BqFoIJOHtuCupTLHKaC6ou4SpJyXF2ZNLeDYPLmB8Wk1c9OhZ%2BvN09i7SP3Euc8Q0vy9idOfIJePQ1UU7HYbPRhAr%2B3XW1swa4CHYuawgBGzlR3H%2F%2BJ81ImF%2BSKl0beHeW&X-Amz-Signature=f83876f0db4752fb1809ed7f3ee7d4086a2b9d3b3ba4e83a1490fea082b6a006&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SO7LXDJG%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T193826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC5UBQGu79rmu2mLs0wNmc%2BIMLfTTrY5Bod%2FhgXOGZe%2FQIhAKbP3T1MUAgSYeDt%2Bgx59ABpduMPRx5ZWPCKO%2BHJVdYlKv8DCFMQABoMNjM3NDIzMTgzODA1IgxGNx0gPpcuKAoaY0Aq3AOwPMPRH9S2ZjwRmjJW%2BK2V6SuZMflIsTMfW5Mk3sWc%2FkDX4lpyKvD6%2FlU8DvCMu7NdYS3yNx0mhrMyMpK%2Bxq%2Ft0dxmWDzIB0uOK2JzhDgYuFIcVpelNuFO7p8ouuC27QnSvlTy0PcNgt2xq4FgG2kY4AYU3UAugQtNuRZdCDdg88Qv4sjmGBRL%2BwEYzYaabqbxY55lsT8Ktj8GTFrYSYVAiFPLRKyAbRjtVuBBNytjMsx%2BM79Lk2%2FvXnwCIiBBP4i%2Bt6FCzlUZKQzlrnRRjB7laB3p0VTWUoyc1HvVZZJigkWqI4Xt0NT5vKHecSr7zK1JloqOIBZKBeYPtZbI9ENoURPnAWdj4ivcHCIgVYbN4MTSi7C7eoEgmN3GO%2BUSeWtzImez%2FyP1eW7Zpb5kgh3Q7jK50hUmupKVW04DQrckVRnWP34yWhBHlVPEYBftsZpMJWPqzhhbQtXFZytr%2FwXBbSaFYoZouYp5tcvXIaDCsqHbgCxOS08zfeolA%2Bx9v7hQLDM00zjqP1fCSE7q9WRTPc7wK%2FXiO82d9PcpdgLfrJRjyXpAHzDviiUZ%2F61c%2Fuyx2Z6q%2BNbq7WvbZ9cKu%2BY4VkWJzlXtjxpXVN2frjFgSi%2FWzvRc31J%2B0MYaLDDR39LMBjqkAbHhHKO8cDOJN%2BX5QEmI%2FQdtTWUWOAMaL%2F%2BPce%2FP9ASL1EIzal9iVEHmekOBfN0Dtqksi4UFzIxg6Fa11Qf59xV6AE4pF0uCIQjAMy71jrX5T8tYypIOFyXZoUHKdDvbkYOvh6gN6jjSi5YjW0woebBpZ%2Blw9T%2BdE8qeZldPjWRJ3IeZqGjwLShXjNI1vNbnZ%2FsXoRAPzOWa%2BMsnIpLguyRjiDo1&X-Amz-Signature=4be4f67b8fb52c4268587ed7b42926264457ec1ac78ed492136ab77fc526c550&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

