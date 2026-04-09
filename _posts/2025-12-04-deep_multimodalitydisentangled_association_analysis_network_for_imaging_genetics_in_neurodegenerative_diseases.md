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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYCBSRSZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIDpZV1WvJ5Gunl6Tu%2B62%2BwSa4F4vXoZNNO4hpZxdZRn1AiEA%2BUtcTmsBmVS7930mEk8vK3lcqGBPptRu33Q25SI8aKQq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDOTnRDTJyeZsnaL%2BpSrcA81N0F2IOEVwOvVIdyF4o%2F8ARrva2hmssB6ApVlAE3Q7lOI%2FWSnaBYSyNXJiRIeg1yhxc5Iq3BUZ%2FMLhc2ekjrKT1IE3Qzat4gkqIhP%2Bly8r9O0VaE%2BpaJUHGPjLEJE3bvhIp5Pyf7FmZEgrPHRfnzWOQALCS3%2B7kj78eMObNI%2F5V2srO36PaqbIIjn4S5iQFP14Ikhsc6sK%2BPZJLOhbDrKrsstC%2FezMng9OcfMPtujEehfpExPmN2liJVokcVjtfIb4KTskRL7%2FAdbXjmyRT3x1txllOXiGkAeeh0pNuW6oJYxxGT1jqXkdo5VJeE2Z7Dregql4SJBdM902Nralab%2BUAWlFwHTXjhlqEdmn5CvYkwk9IaqasxRfuuMog7CGuYo2OHye0%2F8b%2BKTYDA9kpbG5fla6sXGqHuPACsEn3j4Hzxq7MUMxq%2BJJZZdTbYkQT1A1c6b%2BYyW9Z9eDykK%2BFgrw%2B9MakdtuIsm7T%2BzuAYsb%2FqMM%2Fwa8ETOcofNSEIAyKYKVEHgT6nEBshqyYkLqhSWi9Wviez4no%2FvDClZ1trYqFfu%2Fl4hX6Bhn6%2BREz7UXY61t8MJ6TZQarnYqWNBk6c7LLb46d%2Fq8e%2BONYzXczVO4T3igIo0BrH6PL%2FGcMIiG4M4GOqUB3Y0wLb1Z5ZhcuGpEueyMFOGGDhNS9Rs7qaVDMdq6tdthUXOZbFUPa7D3YXFf3QNmd3jzYnqHcLKBQdLPsPoyHFo5RODuEhpibee59H2wcM%2BlFCT5OtVjz8yDeCpz7TAFvAUfodqZDbCpmpUeA9zu143kvUqEaLmR08IfDjSuP0%2FBA7HuYkOWA0TPCD921sKK%2F8NOpYjkhzPzC4hvKAkiErQ9Imjb&X-Amz-Signature=96363a14b71e03f6f20fba1863e7ba63712d65b1714eaa025e07cf6277fbb165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYCBSRSZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIDpZV1WvJ5Gunl6Tu%2B62%2BwSa4F4vXoZNNO4hpZxdZRn1AiEA%2BUtcTmsBmVS7930mEk8vK3lcqGBPptRu33Q25SI8aKQq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDOTnRDTJyeZsnaL%2BpSrcA81N0F2IOEVwOvVIdyF4o%2F8ARrva2hmssB6ApVlAE3Q7lOI%2FWSnaBYSyNXJiRIeg1yhxc5Iq3BUZ%2FMLhc2ekjrKT1IE3Qzat4gkqIhP%2Bly8r9O0VaE%2BpaJUHGPjLEJE3bvhIp5Pyf7FmZEgrPHRfnzWOQALCS3%2B7kj78eMObNI%2F5V2srO36PaqbIIjn4S5iQFP14Ikhsc6sK%2BPZJLOhbDrKrsstC%2FezMng9OcfMPtujEehfpExPmN2liJVokcVjtfIb4KTskRL7%2FAdbXjmyRT3x1txllOXiGkAeeh0pNuW6oJYxxGT1jqXkdo5VJeE2Z7Dregql4SJBdM902Nralab%2BUAWlFwHTXjhlqEdmn5CvYkwk9IaqasxRfuuMog7CGuYo2OHye0%2F8b%2BKTYDA9kpbG5fla6sXGqHuPACsEn3j4Hzxq7MUMxq%2BJJZZdTbYkQT1A1c6b%2BYyW9Z9eDykK%2BFgrw%2B9MakdtuIsm7T%2BzuAYsb%2FqMM%2Fwa8ETOcofNSEIAyKYKVEHgT6nEBshqyYkLqhSWi9Wviez4no%2FvDClZ1trYqFfu%2Fl4hX6Bhn6%2BREz7UXY61t8MJ6TZQarnYqWNBk6c7LLb46d%2Fq8e%2BONYzXczVO4T3igIo0BrH6PL%2FGcMIiG4M4GOqUB3Y0wLb1Z5ZhcuGpEueyMFOGGDhNS9Rs7qaVDMdq6tdthUXOZbFUPa7D3YXFf3QNmd3jzYnqHcLKBQdLPsPoyHFo5RODuEhpibee59H2wcM%2BlFCT5OtVjz8yDeCpz7TAFvAUfodqZDbCpmpUeA9zu143kvUqEaLmR08IfDjSuP0%2FBA7HuYkOWA0TPCD921sKK%2F8NOpYjkhzPzC4hvKAkiErQ9Imjb&X-Amz-Signature=96363a14b71e03f6f20fba1863e7ba63712d65b1714eaa025e07cf6277fbb165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQLIKMM6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIAV1YG2VS%2F5WDZ7Vi14QJvZKdNJfcHhYSyYxBa9W3tr8AiEAma3ipTyWJ0%2BKbEJaWWCtXYXLTrwlNs6sE0tt9FTPOZsq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDKGy5PcslwrSEJulGircA0e6uyniXQUvtz8bzvj0USM3VQSUQ%2F9CgxfefHpK%2FWPDM7hSTmmayhA8wa2PJ5z%2BWnULilJg3SY%2BamG%2FApSxzjUZQ3ETg%2BlLlnb3f0l2zudsagm9AVh%2FmsaaI4rQz%2FgnVnPPD8MkbCKFJPhiDK7mzKBUuiqn2ODRxOGzmlIGSkDuBda4RcLiDumRURg6%2FJR4fGghVECSgm38NTtKb2ghgEuvI3PG1dw7vz6ylbPnCS0pjYM%2F7Vl39uogfeI5Y0xQzM1aUscre4zfLEqxmmEAvZY1bbhDR%2BURETrYjzUWiOpcYA9gnlNC48uKF5fQ8I0skh%2BrH5FBTw3YZ2VWMTuGFUIk4MKzO2TU3la44MeGpw7LMiygsLIG8bxI1nI%2FGkuxUUt9EBzahTlAxA%2F4aAl8t%2BcuN6JuDZ5amrTE%2BzQ0UgYkdfn1wgKj1kDjV4KWz34o6C9N44QhUDaISPmAWiWxIkScH%2Bn6AFxgFgAswz79Jj%2FaFIwuBoRqiDl9VN9IR0tzf2rOt%2FBPkGB%2FRz30%2B6vo11%2BvBMHCCQ3uhLbAf7DHeAl1KUP2oPMA3uKtD5GtqPNoUOtktJhKYE%2BSqI33sEdOaJoWU1nMxzrOxIIlQDJDaSgm%2BruL3ZUpi0iROj83MK2G4M4GOqUBNAMQ5AmusLU292veZ8IaVr6MyG402%2Bl77xgBroRK6AsVhoNmtUCVqZj1PktSRU7vmKfKX6%2BlBElhXqdqalnwMD%2BfZU44KZGBMShGzIklrWNYl2IZg%2BwfRWL%2BivehszZu7JdQ2jU0T6TX%2B6GckvOfN2S0mycrWpqDysxjwad%2FQ8ZSgGoxdjlsveWH9kH5QB0GBHPlfeFdSWjD66CXg25cbszNBk%2Bq&X-Amz-Signature=fbd7e16a64667711cd5a8279584f472f363cc181c3a295ed18731769034b59dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UJN2UN3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIG%2FJPgEphJxcR3CnLQ6h69HEJHIwyjussfklMS34DJOYAiEA9lxDv%2BwBVEub5mmyAFjKtQSYOSEwO4BGbp3x1VgiIqMq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDBdLAFTFkOyRd7%2B8MyrcA5rfDk6XbMz1cQd7ce7YG54FETLJWWUBXHwxSCbPAFaVbxtOsCHvbuYEy%2BV2ZfPbamPV4OwENpbicfYHihAFeKBPnFpAJAkRhGt8Anudw5wYACH1cMLYNFl1GEt6FOCmk1cEr4hqH2NNNY0eRcPL6tActHvQBpM1xtmVjngDuoGyIsxI4%2B1Uwr9%2FRHEAKaaYAs2xgS91M5JDWVU5CnMCM018qVfWfAQCc5G7TQDvgKLVQgaQ61VMBSHJQyTTIITleYhZi8LMDUYYtk%2FbWp4MqOGpfaOa0wgIJ6n%2FADDPFSCV%2FNcg2%2FAS2ubMuas65UPzvoYwi77YIgPi1qREl8Mp1bitiFFbUYrn53ghKQD2%2FVnpj%2BpAjAxD0UaNVRXmV8kmq7rg1vcrFOVIyXEsmIh%2FF4I5lsuM75t%2BhfvLCI1kwuFSwzZXv7i5HbGG5NrRJi5AJ9DU6akRtptpa%2BPtHrpFT0DxZ7eVaGPq3iasfs9k9umOB5dOL%2BWcoYjgdBAmO0dMWSrGqsZrL6coiEkSvQ3Ue9KOViC%2FhQhOqwSOkg6gmm6AjEwzWC8xjsKfk2cBTgDeQ6RjvDMSBa%2Fp5RlE89CJfbNQJP0xPtGligxMOOjb5rKP9csRXCbk7%2FySRj0oMI2H4M4GOqUBDkIUFyVvjltz44AXwC3KMpgLTEchMC6It%2FY71jV00sclywQ7ZciV0Hq60rVAngCapUzdfFc7nBYxcwjUUJaAn10800FyA5ChSD2uJ2yT5W1%2F%2FSBbiUnwba9Srcun3txtdBY8k9g2pq708cKr2PuoYZAUb8WNOjryNuzvjDuYQCw9Yn6%2BB59Q54omffMTmIEWj2TbTZSJxiXiI%2FKZIxWDEejg78mj&X-Amz-Signature=c3bba914fc54aaf0f30ed94bcf02d644dc9dbc9d15e91512b136c8d8d77c282e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UJN2UN3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIG%2FJPgEphJxcR3CnLQ6h69HEJHIwyjussfklMS34DJOYAiEA9lxDv%2BwBVEub5mmyAFjKtQSYOSEwO4BGbp3x1VgiIqMq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDBdLAFTFkOyRd7%2B8MyrcA5rfDk6XbMz1cQd7ce7YG54FETLJWWUBXHwxSCbPAFaVbxtOsCHvbuYEy%2BV2ZfPbamPV4OwENpbicfYHihAFeKBPnFpAJAkRhGt8Anudw5wYACH1cMLYNFl1GEt6FOCmk1cEr4hqH2NNNY0eRcPL6tActHvQBpM1xtmVjngDuoGyIsxI4%2B1Uwr9%2FRHEAKaaYAs2xgS91M5JDWVU5CnMCM018qVfWfAQCc5G7TQDvgKLVQgaQ61VMBSHJQyTTIITleYhZi8LMDUYYtk%2FbWp4MqOGpfaOa0wgIJ6n%2FADDPFSCV%2FNcg2%2FAS2ubMuas65UPzvoYwi77YIgPi1qREl8Mp1bitiFFbUYrn53ghKQD2%2FVnpj%2BpAjAxD0UaNVRXmV8kmq7rg1vcrFOVIyXEsmIh%2FF4I5lsuM75t%2BhfvLCI1kwuFSwzZXv7i5HbGG5NrRJi5AJ9DU6akRtptpa%2BPtHrpFT0DxZ7eVaGPq3iasfs9k9umOB5dOL%2BWcoYjgdBAmO0dMWSrGqsZrL6coiEkSvQ3Ue9KOViC%2FhQhOqwSOkg6gmm6AjEwzWC8xjsKfk2cBTgDeQ6RjvDMSBa%2Fp5RlE89CJfbNQJP0xPtGligxMOOjb5rKP9csRXCbk7%2FySRj0oMI2H4M4GOqUBDkIUFyVvjltz44AXwC3KMpgLTEchMC6It%2FY71jV00sclywQ7ZciV0Hq60rVAngCapUzdfFc7nBYxcwjUUJaAn10800FyA5ChSD2uJ2yT5W1%2F%2FSBbiUnwba9Srcun3txtdBY8k9g2pq708cKr2PuoYZAUb8WNOjryNuzvjDuYQCw9Yn6%2BB59Q54omffMTmIEWj2TbTZSJxiXiI%2FKZIxWDEejg78mj&X-Amz-Signature=48cc172df111bf26e900e62953bb9370dde92287f6ca07c9496877a0d81ea278&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UH2HHFUV%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQCMs8K1qZmJtsFai6gYVLXzuTE40BKXMigwmhhIU7GS6gIhAK2xjtWTgOGrLqXWCEtH%2FYKkyGobCNwPYJ088fx%2FOth7Kv8DCB0QABoMNjM3NDIzMTgzODA1IgyCoOPdYLhWQO5DNA0q3AOqqb1Bbj8IqcXoXfCPIm8pnmTOcZXmuK%2BZ%2FwUgj5oTSGTzh98NQxluhXXAKSm9wieOba5LGYeFJHnyldarhVocrPc9rYWlFVVWbD3NBl1D1b8761JiP66zS8Fw9d8kI7weOTPLJKIS7Pw9u52zvEwfDo5RGH%2BJ%2F7MrHQvd8uBt%2BfrKv%2Bd90wnoafTr7eC%2FL2gY5blZ%2B%2FD%2BzxxYG86jV1AbnoZGooZDU8Hbiain6Wk39aIisRInvy0AJq5Mbxg%2Bd4JXAUsrfm8enzzrzIjOeCH5W3CxDLNVFEWDX1o9%2F45%2BZqp6%2FeZHaD5bH%2FSL9rPWGVNstrxuU%2BeMxXAE4DK%2BekA1JFxCfQjdarwmvES7ibsYnBsXofv4sYm9NLJ9qY%2BZGq%2BN%2B0AARZAyzBTHDVcnEoQf6O0yEj%2FLTKu7iqin7B%2BxxpvtfYtSmsWq1nqYlQ6w2ycMt8x06b4HF%2Br8hmCyH%2BKX4TN%2BHxzzew4%2BVyu9u0fnsvGeyCon3q2LMtbqP2VuamJFAydYUYczGiGU9iuvl6g0LUrqUW0oeBXeIvsAKBXne5RhnTbF%2BUAQRvobRxDD24o94dgpavjOr9JM65aNjnF4gWKNDPiIYo0hovnfyQRCC4woOIN%2FJDs64biPyzCthuDOBjqkARHbDotaXPhHjSoNWU1onXSJ6HT21%2BdEFE1c87m0I48JZ2s0ShAvRy%2FRS9VEWPUO805GHYTr6qJ3NKNN8BsbOztb5nHiWWMGKFrmX26NOFMuEMmLCG8vFfCMvyfvFyHpE8BrpOu5xjukWk8wDmbav5pSQif9ckMojWLttbK%2F9XclW5YCkVyCDXWw27%2FlX8ZxdxGBQA4lEN7Hm9AIlPj8GGkHmA3k&X-Amz-Signature=387a8ab7b72faf43975e8dfc2e4117a92afff6194c5258aff20648ae8d1557d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VL3BJEOH%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDraw8bhsl1cehL6O%2F0W5u9jn1Jd6iqOkh38g6jc3FM1gIhALQ1hoIRTAuYuJU1Lgxr%2BJ2%2FVKMxvJ1HhWzQDOfexe9zKv8DCB0QABoMNjM3NDIzMTgzODA1Igx6fVnyGV38SzLJL1gq3ANZJ4e%2F%2FcdiyUI6SGm%2FAEsFBClI8YzA6cwCXms%2B3e2fPglnTZOWZLfeZg0HK9DjMjCkqTzG7RH%2BLkgR1GemmLiZLYo6zDSKgTxaP7BLa7hk1%2BvJm%2FCGkFX7EzOoaCxaZtZmIhY%2FhtUMWPrS3I7hY8ZFKY8EFUpN%2BI5U2nRIopu4w07oQmga4vN9XXmZAFm69SN1x6kTZB%2BEa7ByS9ahzCSdlDw94lwX%2FVut0sBl6E%2FU%2FtE94GYTduxgZ3xBoBYHgEkQNtGnZLlbK5oAyfw3%2FS%2FCzodFl%2BPkwZ5vg8GxdbK%2FQZoxRsLUTcVgubwA%2F9RabZ%2FiPQfiqU5bi123YXrK4PGArnZ1LKunUs5Daq2Aw5%2Fc8slCRxuMQdD2fVngDblWbuXCZNXl42b9il1eR4r9hkp7v8yGU5X96fNUkCeJMOosuSz97s1X74en6RhK2gp8mkt1Kj16zWLlIbnml4sQOAG7FGFXKqKt2qhZWJnoefrwumeGQ2nbe%2FxMKYaWlz3rFaPtTqy7PoLEC0M12saNQ1C8nXEUbc3a2lG48bgQwqTlEDwo57SIoZbllnQu1wp%2BkJkKbp%2Fhb0XXziK6P%2FdEwKNBqQ9uYu8DjzvNaqbnIjCiiRZxlS%2B3An4qWcNXjDDahuDOBjqkAfJtLn2bLOSBO3Z4dbGQmE07eYgaQ4%2B7WDKOPwLaSjjWV%2F4Q2RVrqdrEIB%2F7YvSSLbNeKFd4R3Lstjd3uRWmVIGJDoI3qIlKJ4gLsQh%2BWSedWBYM34TiQfYgt89IPy%2FPt3ROa%2B4q1csK9io9dnjj7U3p%2BHT0V8nJakOBqBcjtZFPSHi0zoXyPR%2FKPI4S1R1mhKTWHqqq9R%2FDbgwILo9yI2Lo4NZu&X-Amz-Signature=2a90ebff9603e69e271951fcde742aae087a4959a0d15ce14a748026d58bdf08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EF5XJYE%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIFasCbL01uH%2F65emH2y5YGHz7bF5gF874gKZUHPyNNzCAiAUbkabjEdXJHeW9M0PNdIgYuphYI0wurQO%2BMPOfzYlzir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMT6xUd4jpWjY2K1VWKtwDavEhlFoO%2BZ6kHM1gMpC8ZROQqtpdAab2v8my%2BsVyF5bN%2BjYOeoLnlNy4ylOGWpZIf%2F%2FcQ2ITOHv1qNbiPUyk%2B4SY6N2%2F4BowvONwnXvOo6%2F9pChzpgCwozie5PxdgeQafd1E4jTYgjF1yxp7S69T2LobsEIu4AHyFRJ22HzQiPdh4R96RgbSvfqq82HE1VWWoYrFf%2F1wdwvVSMYSaRov%2BGFVnJMOyOTwcj3eRSFx9KQLKHcmF8MSiLUdVGurT2f06%2B8NLwNCh0nNDMKHEWT8m7ljgxMMyFhggDb5zPe2XoTX02Foat3K3x0QM3kmnVqFbDzAPsBY42XmXBgY%2Bmxhk9jvX1RT48Y2%2FaPgtdcLJKK0kRxIU%2BLN9VDCXFcqg6ND79gJNZBsOS5gMwkipvgHKfgkIT3gVI27SHoV5A3wFYGEy08B7hn6qWL1wdaPtDKuTJ6Ujdzn%2Bme%2BBfb4cyAr5skIrICWIPpOae4fOe4WLvwKu23%2FdANuGoXM5xAR0f6LSP3VH%2BwyOLpkTj7vwTQHQykOnofvFpG5O%2Fjn7D2XleA2nC4y0GOUOeMbOKtT4%2F9JhYbY6%2FOIV1GbmZNxgPAJz4z1JQEaKnwSeNIlF5V19fEuRhwJLimTCf0kseUwuYfgzgY6pgF%2FpLof1hIUKDipW45B%2FVjFZJyvZGz7%2BH0DPY7LWJphummJl6PaSfelqY36OxZhht%2FTXLnVZoj5dp2NxnFxJMW0GkTeMzuqnu0549Vo%2F05PqqK1jtTElZDP0P5eoR98slm5Mk4jGmAlw9USpRkFMQ49B9HPJIyWkRY9mgB0kb2%2B8pdRvI6URKD3Q8ZLdJDwx0vliqbB08NqblvfDP1Nrw9dF4LY77Rv&X-Amz-Signature=0bf6163d7de519f32c70b64600f34b44ad42d2a624f5d0ab6e7a19afcdaecfdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGNAVQFP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDAfhF0za6X7ozg5xn1Ij5dIZ3dMwi08qGpyXlUXH8UdAIhAM7rnkm1k8y1phiX761TMaLoBq4wkQ7JowKUF82HbSguKv8DCB0QABoMNjM3NDIzMTgzODA1Igw978A6HpeJbv0%2B4tEq3AP23Tcwd8OvQZMoImCb94%2Faxwj76MEgaGr8yIlratLOxlaaafODCrAIwjnXVIkG7LCerXnwbi7VZk6GYtV233KVfnu7b1Dl2K209j43B8CoURORrxVTujKdtIy6NF2Qq9W1x4sXo6LfDWynNtByiEFBuOCP3XJpRityVLfDxTpxS2H92kHwwFU1UpAxT9wWpZ8Ne%2FFBBAY0bYttdfN21JVDdQO6X54O1y0%2FGiw8K3ZamOn7BGPdg%2F9MqYK%2FipgeWNLb4uXnPQjQgJAiD8Se03mrgrQEzAwVNNWNbFQM5ryL4T8QEOzbx7mp8sWpLL2xrrMRVYkypJw4Kkpqhl6HaITlTqAsQAb5KDUDd5ktKgxAXJ0zvRqmaEVrOxRY7FZZNrFLq5eQJfuXDfQjljwO2vzDVrgLtg2j6E6cxxkwlOCKo0b%2BhQzyt8rP%2FfpJrfTzAJS1c2G6DVnPVc6xiLcHoAeLuWx%2BGAa6sUJn0%2Bd0fZUS1aAZ0yeqLcvy4D9IysBrG1jQsKlORmjLkFek3JaaZh2DRMIZD1kP1gaEmRjrvak1ZlEgBw8bjwh7cfguImW52ySdyjnnB2otnCKfR4jLSJXAmqxH8IGF7nSKW8JPt0D5g99gUdMw%2BGbJHrI0yjCCiODOBjqkAfHeAiwIRtZ0roAbj1NxJHv%2BV4U8GqiVZH2kT1UEt0t5PYQKdmBN2X3ziR1BO73TYpUb9HwiYzOMRFODxSqn%2FjRpHlinwO9UDBYFJoPg6hF0jgjHwA5P077ecOqh4ASpB%2BwkBVkr%2Fv4p60puRJNOnD4nKx6RoSkeuiOtB8hlvIFow9vADH8D50SzoMxQBydPr8Wx8JVNXQ19zQHMLEgFvfprsKbF&X-Amz-Signature=7734621f5917d57b5e6e265dc328f1406c268f2154e5458e99eb8e23b04167db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGNAVQFP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQDAfhF0za6X7ozg5xn1Ij5dIZ3dMwi08qGpyXlUXH8UdAIhAM7rnkm1k8y1phiX761TMaLoBq4wkQ7JowKUF82HbSguKv8DCB0QABoMNjM3NDIzMTgzODA1Igw978A6HpeJbv0%2B4tEq3AP23Tcwd8OvQZMoImCb94%2Faxwj76MEgaGr8yIlratLOxlaaafODCrAIwjnXVIkG7LCerXnwbi7VZk6GYtV233KVfnu7b1Dl2K209j43B8CoURORrxVTujKdtIy6NF2Qq9W1x4sXo6LfDWynNtByiEFBuOCP3XJpRityVLfDxTpxS2H92kHwwFU1UpAxT9wWpZ8Ne%2FFBBAY0bYttdfN21JVDdQO6X54O1y0%2FGiw8K3ZamOn7BGPdg%2F9MqYK%2FipgeWNLb4uXnPQjQgJAiD8Se03mrgrQEzAwVNNWNbFQM5ryL4T8QEOzbx7mp8sWpLL2xrrMRVYkypJw4Kkpqhl6HaITlTqAsQAb5KDUDd5ktKgxAXJ0zvRqmaEVrOxRY7FZZNrFLq5eQJfuXDfQjljwO2vzDVrgLtg2j6E6cxxkwlOCKo0b%2BhQzyt8rP%2FfpJrfTzAJS1c2G6DVnPVc6xiLcHoAeLuWx%2BGAa6sUJn0%2Bd0fZUS1aAZ0yeqLcvy4D9IysBrG1jQsKlORmjLkFek3JaaZh2DRMIZD1kP1gaEmRjrvak1ZlEgBw8bjwh7cfguImW52ySdyjnnB2otnCKfR4jLSJXAmqxH8IGF7nSKW8JPt0D5g99gUdMw%2BGbJHrI0yjCCiODOBjqkAfHeAiwIRtZ0roAbj1NxJHv%2BV4U8GqiVZH2kT1UEt0t5PYQKdmBN2X3ziR1BO73TYpUb9HwiYzOMRFODxSqn%2FjRpHlinwO9UDBYFJoPg6hF0jgjHwA5P077ecOqh4ASpB%2BwkBVkr%2Fv4p60puRJNOnD4nKx6RoSkeuiOtB8hlvIFow9vADH8D50SzoMxQBydPr8Wx8JVNXQ19zQHMLEgFvfprsKbF&X-Amz-Signature=5e8e6347339ceaebd43bbe9cb903f79fdbbbfbff28bcbecd27126f7edf16c173&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW6GQRUW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCIQCSN2w4VhRiPvCzQmO%2FGpylOX9eNve6ybaHBPecSHdcAgIgJTcRNOieAD%2FcVGyP1f%2Bf%2FmtWCOFnB6TFwxKdxmq4vvIq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDHuvOrA%2BNgZr8HXqZSrcA3mvsyZfdbGILVn7Ph8LzMOEFxRzXbXGaoLZUDZaaMywyaOhFmcOTrcKoIoH5eqbaoM8W42ltNzTBpFF%2FDcAaIvdEFjPgxuYXp2MJ6HoErFzN6As%2B7UuqumhBW2XmcYoplqBs7cKF9cog21vY1w9gAmBvPz3%2BrKYeMwol%2BC41GNN6URpT1TU2Sb5%2BgBPclThTAEzB4qSLH4xcP45xU2TCrJEWws6LYVB0KptPbxSpa6hjhwSQFi80X9fhZVcEPqMCa2dLdsvqs%2Fr87jlrGJw23TbbieGu9Q5Wq2aH0xgUSf2wZ2TeM4D0u5m9gMWfNPd1xwOxy4WuMOqyv1EkgxvjT8L%2BSS8xrwz7mxGBWJHjsxvrx7PhDvgbB1S0bA7x6M084yv92rfyVkBmt25JyPhoQycexNmJix7Yg3nuD8mf%2BUO1%2FqB%2FauV3UPk1LqxQZ7B83YhiXjyd8F4SRj18682fiN%2FROQ%2Br5GoKIlUmVR1DPVJr%2BIvalC%2BcjNf%2FP7X8uiYM9KeT2i%2FRJ5cLeQBDkAIMwLP9e%2F5WSXB6BNbJJ6yolOKyyKBgJrNVULsgyoQuWaZb48Dzf3I85nHje%2BZ2JzlJZE6GxUlhYy%2BQGup%2Bu%2BI4odLl5Z1%2BCU14VhYzs5MMIyG4M4GOqUBAR%2FfMuqUGPTTAp5CCsLWrbzcukDUI0F5Yri%2FAuvZkUw1uHkomWj0b0bWmQfpvozKckssCivei0QnaDSBwjsgLeGt%2BHr3NTE6j3Nel3UzYDciIG0k%2B5KPMqGDrvKgTTMtVr3y%2Bw0NOD6U1z5U0cnZVWk4SbOI2ASzaod59UkE5szt0jGs9%2FRRzYN8MX2eog%2FdGlwvnv%2BOF8%2FWlXz%2F0vdxlgYsbXeM&X-Amz-Signature=e5220992cde3187774833ec291f0ce957383ad56fae1aa07152e15094d0f5844&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU4UZWSN%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIGWJRgfELnkDWdXjw%2B4V3aKgQPcxrnwuFCHEQy4L3jjeAiBA7LyfRmKrJNAlN6Gp94AGmMvoCuoTWilrKMSqOjoQWir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMFJhhMCMUIsIZfz%2FbKtwDsXAAGn3zkyzslwyDo%2B31H%2FfewxybIFhHH74sv67RMdOR%2FE%2BKwfjZBOPMa52pjoK2rshof2s%2B7bsxHPmWOM2sS0%2F9KUQ46YJqyxFXOE49Jgr23aylthRTLxNcWfQQARmVLEdHgPSG9nPz6%2FJokKkVdgUuehoUubzgIMsoBzWepIid2siSSlc%2BUhujdO9Rs3nBGTTGDVLfxTlBINe6TxgnZJy%2B9oTtU%2FwyIhUhx55iP6YVcTvIk%2BXXYtDoPm3Kj2HB4arGux1I57%2BStdI3GrJ0otQLmtP9VPJAgd9UAJxXuAnlADmHDfpj3UCEZwPwidgkHRTmnaoRHH2t%2Bqe2aqEhuC2GRTUJWhYcG1FUo5VrrdR2eOyo73lArmpGpbpAOZstj%2BSg0czDBRk0rnupYmAC0Um3f0VypFV5MVJviEZhQ3qwk1RwnyN2pG35BlIFLFH0G%2Fp8zi80qUO9ShUdGvVuhfraU3iLZI7I1MSXaiSFbA7m1s0UoYLVAaCTxkg7YY5gRbJhOD689xkletB9cqE1cU90uy5nXud5%2FDBo5FqQps7cojMSBpJvSGeS8WHa3FdQmWBxDpMENBfuqfcm1%2B%2BPRkHe5ifz2U1yRwY1PeSCwd7kYoZ%2B8xQipC0QptIw0IfgzgY6pgHFND6IWkKH2krwDkJkRh5AO4VuqHlBeyHI2QHpmSfUV2cjZgbFjTAxW9wlXlQMHST5SN217tyaJSvz5ExH7a%2B%2BDmmIVMi%2FFmLxyaFJIqIp2pRUQeYtMcXCmTg2i3n73Biq64jtJ9s4bbtNsVPIKYBg7Tlx4cpJD6k5SUQeMIDliDY2Dgbh4w5IH65RlGekNVphikNQvkwIh12mxwrIy%2BSC2H1BD3kn&X-Amz-Signature=2070c14b5aea806e975343964b4744c2c493e8e29798ca6f366e7c8e52480fc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU4UZWSN%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJGMEQCIGWJRgfELnkDWdXjw%2B4V3aKgQPcxrnwuFCHEQy4L3jjeAiBA7LyfRmKrJNAlN6Gp94AGmMvoCuoTWilrKMSqOjoQWir%2FAwgdEAAaDDYzNzQyMzE4MzgwNSIMFJhhMCMUIsIZfz%2FbKtwDsXAAGn3zkyzslwyDo%2B31H%2FfewxybIFhHH74sv67RMdOR%2FE%2BKwfjZBOPMa52pjoK2rshof2s%2B7bsxHPmWOM2sS0%2F9KUQ46YJqyxFXOE49Jgr23aylthRTLxNcWfQQARmVLEdHgPSG9nPz6%2FJokKkVdgUuehoUubzgIMsoBzWepIid2siSSlc%2BUhujdO9Rs3nBGTTGDVLfxTlBINe6TxgnZJy%2B9oTtU%2FwyIhUhx55iP6YVcTvIk%2BXXYtDoPm3Kj2HB4arGux1I57%2BStdI3GrJ0otQLmtP9VPJAgd9UAJxXuAnlADmHDfpj3UCEZwPwidgkHRTmnaoRHH2t%2Bqe2aqEhuC2GRTUJWhYcG1FUo5VrrdR2eOyo73lArmpGpbpAOZstj%2BSg0czDBRk0rnupYmAC0Um3f0VypFV5MVJviEZhQ3qwk1RwnyN2pG35BlIFLFH0G%2Fp8zi80qUO9ShUdGvVuhfraU3iLZI7I1MSXaiSFbA7m1s0UoYLVAaCTxkg7YY5gRbJhOD689xkletB9cqE1cU90uy5nXud5%2FDBo5FqQps7cojMSBpJvSGeS8WHa3FdQmWBxDpMENBfuqfcm1%2B%2BPRkHe5ifz2U1yRwY1PeSCwd7kYoZ%2B8xQipC0QptIw0IfgzgY6pgHFND6IWkKH2krwDkJkRh5AO4VuqHlBeyHI2QHpmSfUV2cjZgbFjTAxW9wlXlQMHST5SN217tyaJSvz5ExH7a%2B%2BDmmIVMi%2FFmLxyaFJIqIp2pRUQeYtMcXCmTg2i3n73Biq64jtJ9s4bbtNsVPIKYBg7Tlx4cpJD6k5SUQeMIDliDY2Dgbh4w5IH65RlGekNVphikNQvkwIh12mxwrIy%2BSC2H1BD3kn&X-Amz-Signature=2070c14b5aea806e975343964b4744c2c493e8e29798ca6f366e7c8e52480fc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VY7EXV36%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T203707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJHMEUCICmW3z%2Bh%2FPyhmOL4sDvqDjJIIUBiILtOdc4pSmnSutq6AiEAgUVFLzBgw0S4%2BE0gQLrdzineJ8nQ%2FVdO54cfNYO9Ptkq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDEz1I%2FtsIXNF%2FtLrWCrcA1Rd3EgPFYWPQFmuRfNhgyWIkMEQhNyJVv5rNjX0lweJmWh26LttQVo5E2z4EQe5J4ERyU%2FDCz4QRn0kmKGWYtnkEnEAGI6qesqJN%2BeJ8f4%2BAJBdBxGNDd3KhiRda4v%2FoIv1Lbbgkh18IQ35Og6P2aA5IZ%2Bw0vGhxBc4kQm0K918Yq4nRglqV7s1kGrwyOVlyhfor8tvsNYpW%2FLJ%2BiB2lKG1QjhsuZ7Hy2erD3Jdjqiz82TdERH0Qska14PJQIfL1UJkL4Kwo43qfC1oOxOd1Lm%2F53POVGfRSJ3NSEZkN%2FByY9ITUW3rBXhDiV4pvyWfESXu0MxY1EOPlII%2B6DU2XlKZuPNohOg3iIgbiT4q0DnstECyg3E2H84O47%2BS8fuDnJnSyuC894WmZMeE6zAGy2SCVNr3uuZFpvPgaqiHvwqmHVphXcOhbrYnxqIkAaj1n4eoMguy%2ByhnQIIV%2F4YpyMF8kgIv6OqtvWmUojJz1bJAOcZBSBsgSP1W1skYHUs0B%2BPKkJGYKI0%2B3EjvbH95LCIFL%2Fwu7%2FGMwDoQWWoe9HPQeeXKOkvjYLjT3EE28mgp%2BX6vemAKj%2FaPWcxw4W2xcIY%2BNPUU27qBn%2BbCiz7QSjmiEIbiukujbLM7PJaKMOuH4M4GOqUBIBwWiChNax%2FPSPOyDnb%2Bjn5q7Sae9mFcD0Isk5Jx2s9%2BH7T49sJ7osZa2Rrw9qSo%2FttWSPPMEYzNlh1I5q51RnfmAzrpjLkBJKts3zeFHs6PGV%2BVIQGAmWwhNdf4vvSbsCgHotacDR3yHpxwNBHSCmtZusKkReN%2F%2BkzU0%2FeK5JPpFwu7mEa18o1%2FxcYH2luSxaS%2B3zzBQm4MqxJ8Zs0FdDLiG7Xt&X-Amz-Signature=ba0330a4389facce2946ca29d40d833c6c7d21d31e97d7ac74df3f8170dd2038&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

