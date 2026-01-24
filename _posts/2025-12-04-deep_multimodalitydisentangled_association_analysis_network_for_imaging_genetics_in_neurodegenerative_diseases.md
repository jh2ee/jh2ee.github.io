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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW7LUNVQ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCICoL9ak5bhC%2FannV6koyvI0U4KNH4u2pq35wnjInqAS2AiEAwRy3HEpg8UY3gzp5QkMtwIrkY2v3EKT7DI68smcfObQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDIcZuL%2FP2GnzwCL4oCrcA7D1WJN%2BEHIJBl65teEIS3w1GHzZRNYb5htXsPYWwm5oZV7mFS9vEsJl68k%2BPne7WLfIlrgSWjVVuY0Xpqhnw4Y0o6xS435I6aD%2FqIuZm8Nr%2F87xhtkFdbKfM5O%2BHkcvzdR8SRQVpUVFHeaOBishA5rS8zZ7mgI3bz72sdWPhX0f4d8srWdZwWEKDEkSTLKxVn51M2qAj%2FVjY2FQFb43H9tEwLS8s7MEhsu6msbi1AWT%2FTaouDGR5KBF3qwMFxtREI4SeGZCuTzmcWxlHwBgO6WchRVVwsBnGxc%2BARrZGaca8bd9q1k6pXwTfDZ7Iij1LxG6IF0vOQ4M9VdKh5zcoMDgDYPnPEoR0TOE6tR88TEQJA3rxHl%2FKWZhiGUxQF9IUzPWXXRWpsceE1m9FMPOGE%2F3sGCvCBpRaL%2B0XSh%2Bl%2BzERBBGNVd3Y%2FtN1cqWD62nKapKO8iB3hognCvFcmIZ5y1iE1mx87meGQ5dcy56BOpNFl%2BC6w5B4fUGrYn9FeZiOAi8dCVpuHTjkVWxcr4HQBI1srUBho7a8%2Bgy6rxQ01r84oFFo7vvLBXaOdYdDpCN1hRgWMNjYFmliIrzwWbAFjUz8%2F2OdUEdV10rnY9oDyI8BmCUcgknGmi4IvNkMI%2F70MsGOqUB4E9o1oXMNRmufTtd3PMyY3%2F5e3NPNDHHKKIRANoXbaC2UfiyRmArYjO6Q1G7CXWVPf6T8yECO60jpcA1syT5GycedxeejaqyIKnE%2FIC1Ar9COet4bH6pibj36FBCs%2F2WYJ3L%2FLvwTqKdomBFG4OvKfpID4xtNWjsrcYnpuvqQ6u0l2EsjrtY6T3kaUJxP2YQ8NimeagOQID8tE4IJPqNOXXrszJW&X-Amz-Signature=fce572c8ce01bc9741dca98d692d248eb18a60b2e5af1eecca592cc12519864c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW7LUNVQ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCICoL9ak5bhC%2FannV6koyvI0U4KNH4u2pq35wnjInqAS2AiEAwRy3HEpg8UY3gzp5QkMtwIrkY2v3EKT7DI68smcfObQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDIcZuL%2FP2GnzwCL4oCrcA7D1WJN%2BEHIJBl65teEIS3w1GHzZRNYb5htXsPYWwm5oZV7mFS9vEsJl68k%2BPne7WLfIlrgSWjVVuY0Xpqhnw4Y0o6xS435I6aD%2FqIuZm8Nr%2F87xhtkFdbKfM5O%2BHkcvzdR8SRQVpUVFHeaOBishA5rS8zZ7mgI3bz72sdWPhX0f4d8srWdZwWEKDEkSTLKxVn51M2qAj%2FVjY2FQFb43H9tEwLS8s7MEhsu6msbi1AWT%2FTaouDGR5KBF3qwMFxtREI4SeGZCuTzmcWxlHwBgO6WchRVVwsBnGxc%2BARrZGaca8bd9q1k6pXwTfDZ7Iij1LxG6IF0vOQ4M9VdKh5zcoMDgDYPnPEoR0TOE6tR88TEQJA3rxHl%2FKWZhiGUxQF9IUzPWXXRWpsceE1m9FMPOGE%2F3sGCvCBpRaL%2B0XSh%2Bl%2BzERBBGNVd3Y%2FtN1cqWD62nKapKO8iB3hognCvFcmIZ5y1iE1mx87meGQ5dcy56BOpNFl%2BC6w5B4fUGrYn9FeZiOAi8dCVpuHTjkVWxcr4HQBI1srUBho7a8%2Bgy6rxQ01r84oFFo7vvLBXaOdYdDpCN1hRgWMNjYFmliIrzwWbAFjUz8%2F2OdUEdV10rnY9oDyI8BmCUcgknGmi4IvNkMI%2F70MsGOqUB4E9o1oXMNRmufTtd3PMyY3%2F5e3NPNDHHKKIRANoXbaC2UfiyRmArYjO6Q1G7CXWVPf6T8yECO60jpcA1syT5GycedxeejaqyIKnE%2FIC1Ar9COet4bH6pibj36FBCs%2F2WYJ3L%2FLvwTqKdomBFG4OvKfpID4xtNWjsrcYnpuvqQ6u0l2EsjrtY6T3kaUJxP2YQ8NimeagOQID8tE4IJPqNOXXrszJW&X-Amz-Signature=fce572c8ce01bc9741dca98d692d248eb18a60b2e5af1eecca592cc12519864c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHLWX25J%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHp14tHQho67zJEjq839D9CEbptvIO47s1Mv8XuR9iKwAiBXDfLCiYG%2B5AuPE%2BlNGey6igIkRkyfwjC0XS6%2FT0YQ5Cr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMSaF%2FBkBwP%2Bv55OJzKtwD%2FUTSHXzI0aT6l3L8vWjxcaiU%2Fo8qpiHcDuMxEnQ%2FbrKbx04IChoP9Mqqq%2BnZLwipZRRvroxvZX5bbFGatzrGKMFfXUVc6nxrynTvN2uyXyXh9t%2FgHDqnx8oobP7Mcn%2ByqWa7t8S%2BoplHifvNbzSPrkxy%2BVg7pHmy8Z6NOWDWrpUSXUfMzN0u5pqErWEIjLaKiydMBx%2FxN%2FiV21n0OaybRFztA%2BmFRe41aQDE%2BuQ95cAW0VnWUBCPeeT34OQ0SEk%2FJtao6mJRwCaJ2jIijxTe164Y%2FIizzfOaoJatEhdX3YO9oIjtoW9REgCWh8X5uIJ0EGK%2FCyJxKvn%2BHfyDx0yqxUgJs4K%2BVq%2FGVgG6V26Awy6Dw%2BNm82dIXJPUXtZdISygIlBuQHXBZ1CzQY6uj8%2F%2B%2FoxZ3926JqUVlPcIGobLECK2%2BzUYlYmrJMWZnyXg3RanvMYXxyIxsltJtE1h7XB1L%2BiLRSWeOKgZXxZcJ39WnfSIz5W1DVT7%2FBuxXLx34FL9zMn7XjXvYvFWT8UFrboRh08%2FohkY6EvnAcT3EkQhBp29csvapt3QJVCtOLR1gBM40QXc%2FVRsyZ582%2BueN8K7t25WorhNsnFnOxxTcV3t1xqguU5tyxspe%2Fd9qH8w1fzQywY6pgEIpOFRWjrQh8V9cffVz1HzKARWtzvwviZpdN3IzRFntQtVUoeoxrF2wNcpHU18%2FGqPq%2BQAWcVKXwPr2Kidj3vPJWqAjtAZdgQpsY640RDfs%2F977DhYodmiA%2F7GM7DACbzdlandz4jOUExzUvCfixjH%2Bd0iwnPzKse1EWcSNZGAkzzK5byufQM5%2F9zuvUYOOMm%2B9S2bVDa%2BiGARL%2BbD4OXBrKM5VESw&X-Amz-Signature=5b6ca7a29a6652e0e937b588bc62bc55ff036d8e0c8308882b3f1fc45f15c96d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RULH4J4Z%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIFzb8HYjgqaaqWHMjDfsV88h9hA9PJ0mNcunlVZ5YrKzAiAuWW%2F1lNSoRRdn5X9s9as3e6hHPXZF4ptsMK%2Fs79uznCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMlj20FUgXZEQcWjXbKtwDBepQ2s8TCwbK0d0G2ZnX67tOgJRI46r9FRm%2Flvab8bjqmMu7WGJg1gXfaNsg8xDwFSkp5krY%2Fz5ogLQHTazV14fHzNWEwoE7aowvl7Hnnj%2FIEJR6sKrnFAozO2jhoqecfgVUnNaSOWGhR%2BQdEO8mZyAloOv0clw5sKvZJYyehF9c6O1Z2tew0ZQ%2BKtxdSscP%2BrXNF%2F3DPnL4D9NMkSyBt2uj7JEXGXh%2BtCX8IqXANgbbMnjTFNSzf2%2BfFzs5iVEQrdbflwLvD5C2ndrsJ%2BCOgmx3WESwCpamQPU2G1tdddDRggTPkuAporquPrQaf00WSg3CFLqfVavaq6D%2FZZ7RUlkI7T10ftVtrmwEN2BhAeAcuq7bRyDbRy7GBlfVWoi8mjCJvzBIUh3n1nU2cWppjSL5Cm42bDatsezeJUHGK%2FMpjbgpilwvhMDycFY7%2FzHdDqy5SyQZ2oe3Sa0kpLVy7bDFnEHjUL6MqAH2VNuMt%2F%2F4YKzXl6VUoXb97HV6q0%2B4UC64vmWDAGJ2BDjxrAhgakQtxrFPyViYW1DZwG1c5W%2BLCCgJUfnhSNxpSDvqG%2FwP53YHf%2Fecd5OHWV3ENOgiQK1y7xfvuq0tfaCrQ122np2kMz4whwaBzOT%2Fsr4w0vzQywY6pgGBCEnxptHVxivNTte9gvoub%2F86vPyhcKsUFmiSZFFPWA3m5dyU6g1gbNIov%2FEk4ddeERqcGSv3mAr1Oi%2BXd%2FZVDTqqVlEHnVS9PjAzP37d5jy77DXU93Zo7Pd2dUheRJp38b4l0TucIgUk8kWJxbT3DswSSOQeZzHW%2FNHzgAIzVH7dnkWrLsLqP6v3GTjP6w0M0pU%2Fo6kUabOzJAHTTc%2BROvTcx%2Bnn&X-Amz-Signature=355498cf79f272f3a1abf32b1b009ad7f96ebeddc5b375035010351de00dcf97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RULH4J4Z%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIFzb8HYjgqaaqWHMjDfsV88h9hA9PJ0mNcunlVZ5YrKzAiAuWW%2F1lNSoRRdn5X9s9as3e6hHPXZF4ptsMK%2Fs79uznCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMlj20FUgXZEQcWjXbKtwDBepQ2s8TCwbK0d0G2ZnX67tOgJRI46r9FRm%2Flvab8bjqmMu7WGJg1gXfaNsg8xDwFSkp5krY%2Fz5ogLQHTazV14fHzNWEwoE7aowvl7Hnnj%2FIEJR6sKrnFAozO2jhoqecfgVUnNaSOWGhR%2BQdEO8mZyAloOv0clw5sKvZJYyehF9c6O1Z2tew0ZQ%2BKtxdSscP%2BrXNF%2F3DPnL4D9NMkSyBt2uj7JEXGXh%2BtCX8IqXANgbbMnjTFNSzf2%2BfFzs5iVEQrdbflwLvD5C2ndrsJ%2BCOgmx3WESwCpamQPU2G1tdddDRggTPkuAporquPrQaf00WSg3CFLqfVavaq6D%2FZZ7RUlkI7T10ftVtrmwEN2BhAeAcuq7bRyDbRy7GBlfVWoi8mjCJvzBIUh3n1nU2cWppjSL5Cm42bDatsezeJUHGK%2FMpjbgpilwvhMDycFY7%2FzHdDqy5SyQZ2oe3Sa0kpLVy7bDFnEHjUL6MqAH2VNuMt%2F%2F4YKzXl6VUoXb97HV6q0%2B4UC64vmWDAGJ2BDjxrAhgakQtxrFPyViYW1DZwG1c5W%2BLCCgJUfnhSNxpSDvqG%2FwP53YHf%2Fecd5OHWV3ENOgiQK1y7xfvuq0tfaCrQ122np2kMz4whwaBzOT%2Fsr4w0vzQywY6pgGBCEnxptHVxivNTte9gvoub%2F86vPyhcKsUFmiSZFFPWA3m5dyU6g1gbNIov%2FEk4ddeERqcGSv3mAr1Oi%2BXd%2FZVDTqqVlEHnVS9PjAzP37d5jy77DXU93Zo7Pd2dUheRJp38b4l0TucIgUk8kWJxbT3DswSSOQeZzHW%2FNHzgAIzVH7dnkWrLsLqP6v3GTjP6w0M0pU%2Fo6kUabOzJAHTTc%2BROvTcx%2Bnn&X-Amz-Signature=93de6bc1c1eeb84116897defc7760880598abb3b11a6f327384dbc3dd63b7130&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K4PSDV4%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIDXd0%2FVXvWdCcVZOjJHh%2FpjS2scNSffnaOKiYf3bvxB7AiEAy13DPN%2F9ujzSZAN0BlB9Pe1WH0jvJlduclAyBv6ejZcq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDOa%2BiTdA2dNYbImZHyrcAzVgP2IoMJq%2Bdy1PbQzj79yS7YZMtEk1AMlKP8E1wQiZt%2FxR85o5tZLZ4AdRLvToSuxJPLrAP6gu5CI28ioOxFwOfbdou8ZV8jl5GOIu9Q026uAAbsaUcELxY3Ec8TV3KZcbjlJW9V1jx8JcnjKELMxP7SdYdsnVOd%2Fz2RjddZH2B7bUGRhweYumceQ8rSAyS7jiJ%2B3gagoL7%2Byap%2FAqbeCVx%2FpEQdUqtXPYiiF1XsFBeTk%2FFNJ71SHGJ%2FVYa626zJZzeYu5pqQlRKSHtqIJxY3lFj5LYTWYFd%2FWQcTwHK%2FPXZYHCFO%2Fs%2BxKDDOdj4ppGoaRbdmOBbpA0kSpVrP5DaxXyS135zugYRYFv6wKSp4RSr%2FKsDTjnHGuRJ%2BxRk1qSowBbxUtrW7NCYKYMe22TjxSgX68x6MWMZkQ1eBEbIm3eQcD1nwAUrf7SKUyLpl3tNZ2qOc%2BxQo%2BpK8CCmjNeY41hvaKVAgbu2EdB1qUTZTuo%2Bm58imGLs1YJ%2B3cGoFyoNzwmsaPDXumfuE32XqhAPmNJNoMgV8dftSEqP%2BTRBCG%2FOI14p4DO8IrLusM9yoWcU5z4FlsIBEsg4h4NJexHshcQbGEvuXTfIKhMOfqUQTje3SdSrYjBECCh9f0MMX70MsGOqUBgnFWsx75NWbg%2BKNIzePE4STQ0RJnc5GWyLCP5It2q0ux4khpfangozrBny0f%2BT0FIASscXarapYClu%2BP0XYABUWqeKhaukS6Ma3m5wYZJtIiYifuN3hWppLrznhEFooFInZM6dxQQVk%2F0Ga90TnI%2BuPuWMIPkQfN49quEwsMSf9%2FsejcNKn0rc9KklSDxwbnEs8JYwU7HfzFEs50Lf13dwzo0gRz&X-Amz-Signature=b898071a2167f198e4969c82ad27d3cce180d74fc531689ffa3e0101982d296d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG4NWJUZ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBWfzwe7C%2F0bL7zfrgDJLNXtPalhm2j1Gt8xzY1rxy34AiBaplkFNr3V4EJre5tdPGJjHHDdbRRthnsSlmZxaniqrir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIM8MfDZr70A2tqTha%2BKtwDRVluzhROJyRiShWvPnJ8cEM6VPH4XANnaU05eGYA1TUhewvh4hRGcXu0ueodDkrJp8%2F8V9WMQDJAmjxz9wfUZqSpt%2FDruZrTtBjG%2BxguM6NQEw67qIXRrJwjDQ%2BpSpTuElV8k5eq6ksyNB3im7mc0KWvqGBN%2BtdyYdPEGg81LYv3srskkxKPryswo4vqorQsIBoTkN5ATKUvB8j0ZYeOtZjKdJu1GP%2BipwAluPXMmwgDtRgZ4QejZXb4rSf%2F52hSm4XGcB3dVOYLayHdeJ0ZVHvsQbI8tsQYkXzdIqGFl9g0H8gkDDz0StFV%2BKeK4VAADBicC8EGXirdReapE%2BRgUn7WyQ5lslnefKcFNMpnUbndMg8UOKQEzpi84553apTi5jbngDJe6x5MatN0So%2BnoF4LOFNLtt3de4ARz4ttDfaguS7g84BzN4%2BKD%2FHAV6jNMbNi0%2Fw%2FCb3DnloE4kv1cqwDH7NqNRNnkPuLs34Gq8%2FfuXj8ZyDCFftGGBp3pmU3FrcyxPRahElxDKxHFfe7mqVQ7QycIzUznH%2FKk5XNAwAPHMUIhubi1kmQMjmLBuQp0N02zuLkkur38bYKCGj85fIHZYVTXO%2FbauQX1kmhHuNOaRaM1I1b8zjFzzww8fzQywY6pgHQ7001yQJFZ7GH0Xe97TtlG2Jd0menv3bwOwyW8%2BmFcpHS4Aw%2FkE%2Bhm1RomELLkyjMMHXGUcsoBEkiGBuX8%2FMgH8%2BgxC5d6hDwZ%2FzurZQWKAUSF9eGvHHqEC8jm2ikklvIwMc7HRlorMSJo0OPxEcxLIeQiAaIVWgCb288BN2yfRIyJnxqnZkFPycUenaEA63bEGoZ7J3SVl9IH3jRIaAJVk7%2BSesG&X-Amz-Signature=565a1aa4e2d055bd0c671b40086b2f6725ac51087c0e748d0afbabff37e809b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665JKAIS7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQD4Wniumae7tCf6740KUHWg05HoUGeQ1lYljbb%2Fx5vV%2FQIgGDWHWuscU4gqcg8yechMEhUX2tAk%2B%2FQu1Sj0Q6cKsv8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDOxekZQLCAfwWwqt%2FyrcA19K30AyL56YTgs%2FkVSoGSAph8bl21U7XLzlr1Oi2B3qgL15RGAquTBlHDeScpr%2Bz1rv5wtKrE7xemgYTBFqCwmEKz%2BWuAVr6iiJYQirUhLrGiOTVNXGepYJ5FirX%2Bs%2BZ9TlZQL0%2BNlJ4qqqYyosEF%2FNK7O43cJnbjdPDRQOu3s6v2oPp9GZWDr2ZOBNWlhaVu38tLtKYBWAExr1yN%2FXrwAjnMc30ogRPTSZXOaiqrqY117mvsoQalPKP1zw5USp2ZIAJWp97%2B6c0EiJgk9cgU%2BtZ25QdEZajts9eTA1VMLcF1DhBvocO7D2iP6EcOjq4mDgv%2FpCSIWn6ndJBUu4phnDnPCgHSCNyrj2Ea8K55ZSklKGocezvm6%2FoITaPmVaBhVnmnQR2YHYg2F6zvtfywYbX5CSLE6225KfdvDtiCrsML7OrPcpjE%2FL1NIRURR3%2FkYu5lSV9wIVd0OqX0god3wIibM2owRyRigJ815DX0bqgRAZhcl8QYorbv8k2KZi%2FbpVK5eRtLWKkGAB%2F7n7PGu%2BuiSKwi1eM0%2BFT5yR5t4%2FAD00D7DXPJkhyXQr9uVw7dbgpoAixDAWttG%2B51%2BSSZsbhWGfIYufGI4VDCacGs6khVeNu2d9CSMVDLOWMOf80MsGOqUBvyBtDmOq5RACLv50Xh64REIKUQz5xXE8tCF0ExshsziRYUEjVSuNjOb3rF0okYfbQPn9x3ZvgCXiVhgaS%2FabUSvskQwn6LV1MeTg9T%2FxktVK19kBeOF1e%2B1YvhzW9kZdDIHDlwHJsO4yAcPxKNdQgHBHOwaQ2XLjVlyUWgKGfrApUVSZYDf4Xy70ExWZwNguOcO0pPSehqqmiRdqcT5J0U4XTaz7&X-Amz-Signature=65505673758b8536904b5f865c49da2a6ac8ecf5eb4d431debb5dce6fd35415a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP3PXLPA%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICAXOXgecxNe2zZJELoObzSBB%2FI59rtzixxNJKcL%2BmSMAiBKqFRrJPpTf7TzOAxFMTaqxZ9UxhezH4sDZ21pLGD0Jyr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMJO9OsMklx1rHa4PmKtwDIMcUk%2FEv9r%2F2u6%2FY0g4KrEFbFruuVmNtA8E91DZq4lwtLIOSBBRraDhXnKJw4Zm%2B%2B%2FuHt11oyHKBZmqoYQKsZhyrFeBBnwjTtrTbsaEPXLNu79IWn9wf7dXZ9T9lEr9d6W6D%2BbdbbxjWIrSs%2BrCah6MztCgFqXz4XRGK5IrELnOVJRKjdAArYiHKoyTteHWhUfC0t2bysKtfYf5NF1W0%2BRx4%2FqMsnRIN6FjUSmqRMnC6%2FsEyDGRYmBlw15oiuusuvM4t2sE%2BcXv93wNhZMo18nxjzfAC%2FywPv0mpMA0JWkHyr9lYXHhaK4Y6CZJnx0FxIgtszYatlWQOKDPFeVfsSuN06yHXNzycPMDAP98U3Uhe5zTDlZkR25e7cZa056yC3M3vHYG41W0W6OdfxA53eNo4U056GWe2LIX6%2BDJLlS25hnnOBMp1y6%2FvNcZKcJiRBeHpvHh9sococKzG1fQumS9atBXIzUxCqYyhFXETlRyvFS1FcAZNL1%2Bhj7hkPbX359sHXE%2FogYY7FU14DEkTtLqqvVIjysdrE3sXbnuxzOk%2FUa7GuZ6Xv17N9icVnvUKBNZ6JLvrYOezLd%2BuO3UuJdfUjNsxlcPdkStJywNliIOIsvMd4FTvTgfN76kw1vzQywY6pgEfQK0SKzHuDk%2FjlZjtmgMazxsw%2FzxXFv%2FR5sHNRCDDIiGJLz7m9Ml27OfMQHnTuB5%2Fljlgd6SqZrb%2Bib8UXCOidoJ2LJuEKFQUU2IeVzEetkX3qZgk3LHN5%2F7vrCgUqf%2B7gwoQ1Jd27VKx2%2FKnq2Au1Sc3Of8Xvsdjao7XT986Tome6ZNJFVG%2FxmKkwaRf0fwNfJ0u62T3iq0dvcObIDjBB5RrQeM9&X-Amz-Signature=e59ffe1e447522fa0f326a2cdd25fc9b52bbc16d0144d8195873c50f61796ccb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP3PXLPA%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICAXOXgecxNe2zZJELoObzSBB%2FI59rtzixxNJKcL%2BmSMAiBKqFRrJPpTf7TzOAxFMTaqxZ9UxhezH4sDZ21pLGD0Jyr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMJO9OsMklx1rHa4PmKtwDIMcUk%2FEv9r%2F2u6%2FY0g4KrEFbFruuVmNtA8E91DZq4lwtLIOSBBRraDhXnKJw4Zm%2B%2B%2FuHt11oyHKBZmqoYQKsZhyrFeBBnwjTtrTbsaEPXLNu79IWn9wf7dXZ9T9lEr9d6W6D%2BbdbbxjWIrSs%2BrCah6MztCgFqXz4XRGK5IrELnOVJRKjdAArYiHKoyTteHWhUfC0t2bysKtfYf5NF1W0%2BRx4%2FqMsnRIN6FjUSmqRMnC6%2FsEyDGRYmBlw15oiuusuvM4t2sE%2BcXv93wNhZMo18nxjzfAC%2FywPv0mpMA0JWkHyr9lYXHhaK4Y6CZJnx0FxIgtszYatlWQOKDPFeVfsSuN06yHXNzycPMDAP98U3Uhe5zTDlZkR25e7cZa056yC3M3vHYG41W0W6OdfxA53eNo4U056GWe2LIX6%2BDJLlS25hnnOBMp1y6%2FvNcZKcJiRBeHpvHh9sococKzG1fQumS9atBXIzUxCqYyhFXETlRyvFS1FcAZNL1%2Bhj7hkPbX359sHXE%2FogYY7FU14DEkTtLqqvVIjysdrE3sXbnuxzOk%2FUa7GuZ6Xv17N9icVnvUKBNZ6JLvrYOezLd%2BuO3UuJdfUjNsxlcPdkStJywNliIOIsvMd4FTvTgfN76kw1vzQywY6pgEfQK0SKzHuDk%2FjlZjtmgMazxsw%2FzxXFv%2FR5sHNRCDDIiGJLz7m9Ml27OfMQHnTuB5%2Fljlgd6SqZrb%2Bib8UXCOidoJ2LJuEKFQUU2IeVzEetkX3qZgk3LHN5%2F7vrCgUqf%2B7gwoQ1Jd27VKx2%2FKnq2Au1Sc3Of8Xvsdjao7XT986Tome6ZNJFVG%2FxmKkwaRf0fwNfJ0u62T3iq0dvcObIDjBB5RrQeM9&X-Amz-Signature=6e01b3e036c2794f1c705f74fa0125d10ed739f3e6a6010c8aee9a1da66bf2a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHBRLPS7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIBytR7AvQrSq7MhjdTo7oshahjjXUgIB8sJe7x4rkwPpAiBLiEKrmpiBVblxX%2BF0dajmyMI2OrlMJ39VrTN5C5eILyr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIM7Z00TgrdwwSoKmLtKtwDlXha86x05frEJKuuBXrkUaiKRXSfnAXm3kICL3tkuNID7jkCsOoWqQshcxgG59Vu%2FakbdGXZQqWg3PGzGLnJG4gQ14CXd5CRqIlWqzvuOWAvUwNnCBdnyT%2FgaKFnYLH9eWpT0S0C%2Bjx638AAyHIFPoxXVdF0vHktG2kerw53PlT4RlanVWrgPVE1KTLzilwNZm0J8MVzbD46xEtNStQ1Vg4ekHA6ZN6EoUAAScdNF%2B4DaoX3i6QmV0FoHZk4GfwhsWd0x%2BQz3TB6CzKzjfIcz3b0ra8J0CJ6sw4qjju8k7Sk0IUxyaKE9kcGTatC9%2FZLeqagwpCxAtTduizFPRPIgR75AjWh%2BscHXxCMBg67ZoXmbYBIiNxzvQ%2B0PcYCEs2Em8UfA88WbtgQI7mx03i%2FRP%2BJXkwqO3aA%2FZZCFQYQra6Cd9QBjcKxmyq83DQ7aKeY%2BPeP5hS6AJaSl3eMjSkpjeBmtve2AA9bW9%2BnfWazSS3GGavGai43nuQT6ZMJUvK%2Fzb9KMtMJFafX%2BjpMLIISXGC5gWaMiURWXXuV88NKtjKJyZQePLN%2BtWqs63dyGUo4e5OPvr15AvGuB4gJkC%2BoeE0O0w0Ox2ZJVJRCM48DasMKfIWhcEE2%2BUdGyZcwl%2FzQywY6pgEw9SdF3dijbgtJwmxDheeutrSXf28j9mSn8yk3JrzDoPEGXoVxs9oJXF3BZq0BESCZC0VL40Fmkwsrqs9J6c8mHftUUxMVWci3vugBpiiygmpDYzY3g90RYAoFHiGhGkLpLEm39SDEJHBc7Tk%2FcmRZC4jEUF%2BAsdjLij56HYzgj13rkxCG15GfV7pNYtOIr3Zc6BUUFPXlg4aHdrmoIqmnrv31v56F&X-Amz-Signature=d55ddb7ee54553f8737e47130f32d62500f76d46ee6e200f929cae81e522774c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQRNDWWT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCJ6rn9waSdnvR2dR%2FR1UmKsWdItZyQt9HNYs1hDhXgTAIhAN2%2FqcuvixrmMfGUfuo9GgA3nqqIVKARCoeSZwpxrb28Kv8DCAUQABoMNjM3NDIzMTgzODA1IgwCJ%2BtwxKpOMAZbLlwq3APreAumVO%2FkMidbTH9ZdpzN6NzbkL0UMtW7aInKUN15WjBbSYmrjgjTMoUb5E9DlWCl62TqRp8J%2FQZo6EdAE%2B5%2FleA3h8BXvCBKyiH6%2Br%2F%2BrijW4it0IB8DtcVuVEH2z5PoOc0NnpLJ8o5eBKPb273fHojuke4rNbWGREn9Wi1R%2F%2FS0hYb9a5nPYZOI9qfo4JmK6LCHyGwmgRRyBqfvPFWaiFPY13%2BylNWlKmaT41Dt8KZO3lfiyFFov9YuB%2FA9U%2FnRbsbwi1afv65eZUX413KlP1tH9J6j7lW81VLkbBObtGPGpBy9RNxcWKXiZe9j1bsobyCIwLMJkz683WzBtr8feUDoBxz7ml%2FxN66gdicKrjNifQIGtaswKoI7wXZXs6ac2%2Bllw7ISzA8qCd5W8IK63L2TxICIProia4MZE9CAhYCaWxujAsmvrVPstmAMh5gjAF9p9uUoR3gbdEPJBbxHo5Xr92kxhIdaOaxS%2FYpYWW65W3XNmvnTyyog%2BBAQDN5GiTTc0rc1vqWL6iZEfw5AcCpvpLlXBxbMvyPZ29N7rDRM3NPhurouQWZZPL29P%2BclV5QJEsCKMs9%2BeyM88EcjvcEnX7a2WqPvRF%2B6RceEvBo2Z5xu7lWP%2BgS%2FwDCH%2B9DLBjqkAdqAZrpPzokSX6lkccCUZps9zosFmF9ExvrDYbdPP0s%2BH61bGmer0gljG%2F48o2BHS8A%2BPhrSElHI6%2BBQPa4NwnBRYo4NqQHzZJ3xIy%2FoTULTBMAXpQZs8yM7CJlmSvIU%2FCF8Tu4QRsfW9hzjSSyj1MYqArrP5d3Ci1J6kKAcKknPf9vQpYo14NET7xKom8jGQ6BvlEJdjGD1jNsrH1p1gRsZBZ7C&X-Amz-Signature=14bbe88876cb22faa94520d0515c27de627c747aa375bcf992a266878643e834&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQRNDWWT%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCJ6rn9waSdnvR2dR%2FR1UmKsWdItZyQt9HNYs1hDhXgTAIhAN2%2FqcuvixrmMfGUfuo9GgA3nqqIVKARCoeSZwpxrb28Kv8DCAUQABoMNjM3NDIzMTgzODA1IgwCJ%2BtwxKpOMAZbLlwq3APreAumVO%2FkMidbTH9ZdpzN6NzbkL0UMtW7aInKUN15WjBbSYmrjgjTMoUb5E9DlWCl62TqRp8J%2FQZo6EdAE%2B5%2FleA3h8BXvCBKyiH6%2Br%2F%2BrijW4it0IB8DtcVuVEH2z5PoOc0NnpLJ8o5eBKPb273fHojuke4rNbWGREn9Wi1R%2F%2FS0hYb9a5nPYZOI9qfo4JmK6LCHyGwmgRRyBqfvPFWaiFPY13%2BylNWlKmaT41Dt8KZO3lfiyFFov9YuB%2FA9U%2FnRbsbwi1afv65eZUX413KlP1tH9J6j7lW81VLkbBObtGPGpBy9RNxcWKXiZe9j1bsobyCIwLMJkz683WzBtr8feUDoBxz7ml%2FxN66gdicKrjNifQIGtaswKoI7wXZXs6ac2%2Bllw7ISzA8qCd5W8IK63L2TxICIProia4MZE9CAhYCaWxujAsmvrVPstmAMh5gjAF9p9uUoR3gbdEPJBbxHo5Xr92kxhIdaOaxS%2FYpYWW65W3XNmvnTyyog%2BBAQDN5GiTTc0rc1vqWL6iZEfw5AcCpvpLlXBxbMvyPZ29N7rDRM3NPhurouQWZZPL29P%2BclV5QJEsCKMs9%2BeyM88EcjvcEnX7a2WqPvRF%2B6RceEvBo2Z5xu7lWP%2BgS%2FwDCH%2B9DLBjqkAdqAZrpPzokSX6lkccCUZps9zosFmF9ExvrDYbdPP0s%2BH61bGmer0gljG%2F48o2BHS8A%2BPhrSElHI6%2BBQPa4NwnBRYo4NqQHzZJ3xIy%2FoTULTBMAXpQZs8yM7CJlmSvIU%2FCF8Tu4QRsfW9hzjSSyj1MYqArrP5d3Ci1J6kKAcKknPf9vQpYo14NET7xKom8jGQ6BvlEJdjGD1jNsrH1p1gRsZBZ7C&X-Amz-Signature=14bbe88876cb22faa94520d0515c27de627c747aa375bcf992a266878643e834&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZTZBGL7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T051141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDMFyNOKgz8RI2t1FXhWVsrBGOy2aLIsUU3hBHb7UmDeAiBmYmGNVFCvZEPRQM7oAICOzJRgs4w6KK0B7uXDWwbCmir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMnOW16CB9dXSwlnEPKtwD2tAnAeLV1OGAd705ZxceMMRSJWMUy2ottivniLeyt2rCBwFE%2B9Ok2XO%2F6hGnKrFoyy2%2Ba9dUkmx0%2Fizujar%2B5mYjXESfDZGDEQlfxF0BaOtSxr41NUMviG6MuQ3He8kT4KYmkLYQpp%2FGRgBV5GvFxI8AZOi31wtroAfTYvE9SWquBaQTHxR0v%2F8e0p%2Bv37nHYEmZhu6NqkqPRJWXrcYOH1TBEc3tamIhDKgH1VZWmDnfd4KGWp2n5a5lrrHlluykqw%2FjGhk2NUbfaCzeKck0%2BoeB0t9R85XB42CR%2F5zKnqCcwbyCGvpiZ4%2Bdah0IjnjjJIP%2B9TBKOYiAnOOvra2mQFC9TqzmjsQnspfSBQtogv5N%2BNHkCqt2Ohpw1z3%2BEW2regs%2FmGYWT9SIABHBpF3OBJuPmbm2mguEVKF0wDpecKAZDD030cjaTir1bHyX0MvIstpC0HZozBn6UaCur1YDLFWJAVv%2FK5BB6TA%2F2cRJONdTIiH%2BHcamxIQa%2B96JpVegeXX4xZ906QGDHRcjb7AIvGGNMb7%2FXi0%2B%2B2b8W3uj8wetpZzKVCTu34G7BV4N1LFMbuF1dIJBSArCOHL4HhHz7Udes6rF1VcysbB%2FmGuLHYpVCADwLpcyndfTAQowxfvQywY6pgH5SslYv4JIk7G0Y5Mc%2FjY7X6Zbti6ZnAZJ4kdmhyMqhAy1L%2BffAkXi62YItQWGIY9lpTjwV5HeNpmfBjQ4R0eEjSUA1dDt8czFcK9MOVlkZTbSZSfGHj21ax6dV75HLovwEBHP%2BnGovQL8pfL%2BmQ7EngueVLKM5Gv%2Bm1b9W7FvXGRwyQjrGXmLDP6CeXhvH1l7yJY%2B1slZ%2Bl8%2B1GKYuAoCunw1JojX&X-Amz-Signature=ad1ab2f6eedd1392ebaf3575c58323afb7fc62ca6cb7e6d2901e003edb17b5c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

