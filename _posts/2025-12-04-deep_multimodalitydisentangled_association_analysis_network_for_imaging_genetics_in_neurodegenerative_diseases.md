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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQOTW734%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsYUrcrYp1tK1p%2Fn2f2pl8wQsh38zZu7ws%2FViRDgVbhgIgUazHXTXDRmaN%2BDZmpYbymCoNDSer9BvhtuG5GIGiRfcqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMQrEuoPXxfMWu7V5SrcAwdZn42CEuhPblP6foKtZIiBIrIGnZJzFMhTM8QYW%2BHWJrjCEmtEmzjTQJXpspZFhBTdXO4m8cC3OZJhKhy%2BiNBCQG%2Bg3XWDDro%2BE6%2FCJskzjG2ITANnJuZDrJ0a24zEzNd6qTXicCzIMFngpLq%2BlkfJhKsrVP8KCkD8lBxk6u9OaSpofQS8XOlxhaNjkpLSlsPGYC1axnYgoTFBOYOKxfnxHg%2BXtO91n2W%2FYHC7hzMSF2dFqahNLEOeKYu6DyiYhDOsyrPAOZ6wZ73svZGI7rxb0o1%2F1nb2gRNYNPz%2BHOIuph7111BEbyA%2Fz%2Bps9Rio9ftoEjtvhC3fG8fsPhyK%2FciO8vbo3YwwEF%2FaEMdwdE8Yty7ilnNoepSa4NKDfZ7KnNcGRPC6DCV0yNdCFwQoHE8icN9qAT8Aw7GtRO47%2Bbmu%2FZq5MwQpHUHW4P4W9d7OqziAWTFoZAt7FN2CMe2u%2FGplk3E7%2F%2F%2FTVv52LrOmXnlijtBtiNoFB60NxjyApvYuejaZlQHJUmEgfBeiyQ5nvRWi7IVoKZVnmt7PoGSKSl6TnlJ%2BqXNqhKTowFnW7VJVSDhEiPMmlyEuq%2BVdfG05PL%2FMESBGVainJgmNvL0mVK8wI2W4xZI2BmvUJCNhMMCr%2F84GOqUBnFy65MOnQHq1M9MDwLSa0PCX1aCu1vpjWzKkIYHvUMHTlYRSl3i3rMt6V%2BIVvvryBLAM%2Fvch14xY9zFdttzJz%2FTKZOrG1m0khzuKZAG1k6IwYZqeYY4hsujPw4j2NASOrbXVPmTVA94M6vSYQbVhpVnHakYDKL1d4e9djuZMg3ERFNpQydsR9lflgVaq22pFIbQ6ddn25lec%2BArUtx0Vap3msUBP&X-Amz-Signature=0f7adf2d90a04e58ebea1a6aa611d63cad09fa9ee4e9cb9b8f4e43f669414dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQOTW734%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsYUrcrYp1tK1p%2Fn2f2pl8wQsh38zZu7ws%2FViRDgVbhgIgUazHXTXDRmaN%2BDZmpYbymCoNDSer9BvhtuG5GIGiRfcqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMQrEuoPXxfMWu7V5SrcAwdZn42CEuhPblP6foKtZIiBIrIGnZJzFMhTM8QYW%2BHWJrjCEmtEmzjTQJXpspZFhBTdXO4m8cC3OZJhKhy%2BiNBCQG%2Bg3XWDDro%2BE6%2FCJskzjG2ITANnJuZDrJ0a24zEzNd6qTXicCzIMFngpLq%2BlkfJhKsrVP8KCkD8lBxk6u9OaSpofQS8XOlxhaNjkpLSlsPGYC1axnYgoTFBOYOKxfnxHg%2BXtO91n2W%2FYHC7hzMSF2dFqahNLEOeKYu6DyiYhDOsyrPAOZ6wZ73svZGI7rxb0o1%2F1nb2gRNYNPz%2BHOIuph7111BEbyA%2Fz%2Bps9Rio9ftoEjtvhC3fG8fsPhyK%2FciO8vbo3YwwEF%2FaEMdwdE8Yty7ilnNoepSa4NKDfZ7KnNcGRPC6DCV0yNdCFwQoHE8icN9qAT8Aw7GtRO47%2Bbmu%2FZq5MwQpHUHW4P4W9d7OqziAWTFoZAt7FN2CMe2u%2FGplk3E7%2F%2F%2FTVv52LrOmXnlijtBtiNoFB60NxjyApvYuejaZlQHJUmEgfBeiyQ5nvRWi7IVoKZVnmt7PoGSKSl6TnlJ%2BqXNqhKTowFnW7VJVSDhEiPMmlyEuq%2BVdfG05PL%2FMESBGVainJgmNvL0mVK8wI2W4xZI2BmvUJCNhMMCr%2F84GOqUBnFy65MOnQHq1M9MDwLSa0PCX1aCu1vpjWzKkIYHvUMHTlYRSl3i3rMt6V%2BIVvvryBLAM%2Fvch14xY9zFdttzJz%2FTKZOrG1m0khzuKZAG1k6IwYZqeYY4hsujPw4j2NASOrbXVPmTVA94M6vSYQbVhpVnHakYDKL1d4e9djuZMg3ERFNpQydsR9lflgVaq22pFIbQ6ddn25lec%2BArUtx0Vap3msUBP&X-Amz-Signature=0f7adf2d90a04e58ebea1a6aa611d63cad09fa9ee4e9cb9b8f4e43f669414dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U65UTMGS%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICkBGfKkjuGCbY1JQNuQ%2FBgeD7fDEqHdopFckjNwXuNrAiEAvkeLV79PmZVa4SmauFkJO2Vj4TXIryBAp6rjKRAGl8EqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNcC2wrb%2Biz7W6A%2BfircAz0tPLQmu8mbAg3LJOb87UjJGU4QjF03ALmF9Gi3%2BhJnEzGa6xcVQt4COiJz8EMd2MzuGpw37jzjIAjXb31DhjCwk7rDMbycV3gVUe%2BtinntWK%2FNADX0iTDdA4hgJ4fGj7kfMz6MPZnRiwE9%2BG%2BWv6%2F08HKpy64g5aXw62Iru2o%2BqoWflB3CEoXfW8zxTNXySKb5m3F78b7Ag5SJuD%2FHT11zVWGoLNoK9SB0pqlWxGwEct1xWNWYJhaMuVeHeWHKRvxAEn6W1SMO0lYA6azh3a5iXzZ2zWfzYzZp31zafTeaDd3Z9mpfDmVMQW2sUxPVXMh6nGWnhxXHpCvS3s0bCI2ofKmhUxSjyrU9UjZhxylrHIeDFO3L7ETqnstInZY09dT%2BXmn8AVgtlXGo6UH7qhJOFtW9JwSqRQEV0gxSLPiI3u4NKc%2F6PG2n%2FEeqfbHCle4k3GG41szy4mgc06Hf7QoSBcgbJBleGNyBY6jeEWv%2BvzkNSzVfPXbCXWKQcRykQVu%2FnK1Jw5RJbGAjYc8Z4jOQ6TlqNr%2BulbUugyVy9OdIFpW%2FyGWfKa1%2F4DygFK1oLeWTYMlMkMjEZWmbNmnF2zwxDLAk%2FI%2ByRQU64IOq3ecPc56pNVP8DUGWBV9%2FMISp%2F84GOqUBo8O%2Bt2DMVN%2Fmob8%2FpdHUDDKWoiHoZcWVgpHhyp0eKb7qBsj770yQLFQg2YaOnbBfMotLy4YbfwcDuvbqZBE9r7Z5lUSIiZ9bU1wMcVp4848jzVr1YmAS8Ya9Gx6aqShxeVEw%2FibIiQrsJqmzbDTfUrVXTO3JQ1UmwSOePgM2XMY1a0N3827VCHXg3YFweNGtYZj%2FlBja9Ix45L7S14PwFnN9fex0&X-Amz-Signature=6e2967b840966d7e7f77af160b5b822bf82df90761f610e5f75262e1c11c45c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VU5PDABZ%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIChZZ6EHiFmG4jGM6ilXt7kBrBIyQpRVy6ILh%2B80wu20AiEA4ZGW2gsqFRBUO9u80l6snuROGJr%2BqcXw0cUiJox8LkQqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDARE%2FsT8F%2F6yL%2B0NNSrcA9nmKaEFXunnVnTM17iUQCtKw76tk1fzwYhp%2F4GG78aROFNbLHdZZNo%2BHZuqkYB%2BKsX3VgQ7qWPgl29XP8j%2BiixD%2Fz38t21RpTf0xM%2FxVdaUVyksR52%2Bwf8IcRtfwPGv9xwRl02XvOT9d7ATisLhxBoWGpl7EACpgw9d2aP1lg3xAVukjBFLXrqGVUvEbwggGqDszuyCYnVzdsVG%2FKRMNVhuNQNZkbuUOpEFOcsP52Pvs0K1aA7FrEoo69lr4S7oV4O1jgW2T8d%2BKApyLdat4DD%2F0TG4pLSuT3QWo8PkLIqomZmIIJnOjlRCBwf2TdZMdkMlbHzm%2FCDgIanhcKU2rMH7HzAEkYuv0F18ljwOFHgrjfg5jF4RAIc1WPYD%2BTThHsJrPnGIR90W48WBAZNRgxjsGL1eqsIwZlcz3vNt2lTSZC%2B5Ci23E6PGLLzvlJJXnLTT%2BSoHVlZIq5W5YY96wpiXzGWoNznCkeYCq1%2BHc86qwT6m4N5ejjWL4ZquCHYpWCcAZ2ytc%2FibS%2BlBoTPQPe5F731SwDaI6JUiAah0VVO5rtSBRVl3L7XWVE1uNFijwIdIyEqsMUtf%2Brb8URUfJniJlZSCAUp5SRxb8aCBdhgAOWTBtFK9UoaVeFLBMIOs%2F84GOqUBatexWa%2FKmPPEkMC7A3SQPbZWpxhoktLREkeei85%2B%2B6tKhcEjGGF3nglDdkqGC9vMMmuAgRaGyulOx6qwmtMV0l0iEkRa4%2B7aHY3Zs%2F6PNEpBftNMsSPY%2BuvAttDLe4OwvnEQG0vWR6GUvnmQnRlX3oRGg7nPF7hD8ZkgjMd4OET47U3SLk6mf5Y%2Fs1Rysq71dMkerlDgEkEIAFV8iwmCcIVETjD3&X-Amz-Signature=5e1174bd73199d977213992261682eac67554c9b83a80c3ad70d6e362c00fa5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VU5PDABZ%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIChZZ6EHiFmG4jGM6ilXt7kBrBIyQpRVy6ILh%2B80wu20AiEA4ZGW2gsqFRBUO9u80l6snuROGJr%2BqcXw0cUiJox8LkQqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDARE%2FsT8F%2F6yL%2B0NNSrcA9nmKaEFXunnVnTM17iUQCtKw76tk1fzwYhp%2F4GG78aROFNbLHdZZNo%2BHZuqkYB%2BKsX3VgQ7qWPgl29XP8j%2BiixD%2Fz38t21RpTf0xM%2FxVdaUVyksR52%2Bwf8IcRtfwPGv9xwRl02XvOT9d7ATisLhxBoWGpl7EACpgw9d2aP1lg3xAVukjBFLXrqGVUvEbwggGqDszuyCYnVzdsVG%2FKRMNVhuNQNZkbuUOpEFOcsP52Pvs0K1aA7FrEoo69lr4S7oV4O1jgW2T8d%2BKApyLdat4DD%2F0TG4pLSuT3QWo8PkLIqomZmIIJnOjlRCBwf2TdZMdkMlbHzm%2FCDgIanhcKU2rMH7HzAEkYuv0F18ljwOFHgrjfg5jF4RAIc1WPYD%2BTThHsJrPnGIR90W48WBAZNRgxjsGL1eqsIwZlcz3vNt2lTSZC%2B5Ci23E6PGLLzvlJJXnLTT%2BSoHVlZIq5W5YY96wpiXzGWoNznCkeYCq1%2BHc86qwT6m4N5ejjWL4ZquCHYpWCcAZ2ytc%2FibS%2BlBoTPQPe5F731SwDaI6JUiAah0VVO5rtSBRVl3L7XWVE1uNFijwIdIyEqsMUtf%2Brb8URUfJniJlZSCAUp5SRxb8aCBdhgAOWTBtFK9UoaVeFLBMIOs%2F84GOqUBatexWa%2FKmPPEkMC7A3SQPbZWpxhoktLREkeei85%2B%2B6tKhcEjGGF3nglDdkqGC9vMMmuAgRaGyulOx6qwmtMV0l0iEkRa4%2B7aHY3Zs%2F6PNEpBftNMsSPY%2BuvAttDLe4OwvnEQG0vWR6GUvnmQnRlX3oRGg7nPF7hD8ZkgjMd4OET47U3SLk6mf5Y%2Fs1Rysq71dMkerlDgEkEIAFV8iwmCcIVETjD3&X-Amz-Signature=08072c115081cdb8c9b9b524390b948140ab323066a47bea78457112ec93912e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IBSCB2U%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH8uosVagoUn%2BIzesPHtP%2FQHGQgKNxGsIEZlaaFn05n3AiBjMeLAjnUg7T73X0%2FmY%2Bdp5QDLLDXW3dO%2FhPIMT6mPaCqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMo4j7uJOhK0Dxk9lBKtwDAGqXzdki402bY%2FeV8dP4kcQoSqi9cAxcZSQMUbxLUwktmbzYGsqIt0c2t8l9drPHsZtPNltO6t3LMTglwHdDR7r60ACFjbix6BAyP2ux9C7RQepEPqD%2FyBaZ%2FT0Vhhq8jviSjIkxr8SQGOesUdCEhsIVzX4UZOvGHbQ%2B73c3UENkgbhd%2FmkWp4VCbzetQzmIXL91N339I7RLYcI5SoIfKbGYXajAh6NKOrujyWbA9eLSTrLrasqg%2FyZZgjSNVqgnzd9Ae5dj8fuPDvLYukREe3IbNK%2Bv6UBn4g3Di8m4jJxvOI3xxm2902fJ2Dqfgeev65OefhkiI3rj4qQpNr7wI7Ey9LyhWNw3XjaEmk2pdznGOB8YQ6zgt%2BBIZr7gYiIwD%2BqJyDO72RhDhtnMemTxH3pNf7yvv5MealysZZ%2BA6Lg%2F4qjJ9gELAJIZvDIGPyFUlk4JtJSA6o%2Bi4ToBCSBbtONOBnf00W0u%2B9btpWwbr0CVJ84jnnhLHgpj9i%2F6exY7zmTea%2FnKl%2F%2Bne5HQRcbUwNB7ivUgcdQ%2BBILHmlE2xxF6LVGX9B%2BuBpGOnYA4YfGrQ9IE6JekmWSXFLcl9%2FABkfV45BGVP6RB5kDpR9EHSDszzQdeZ3teIo1mzz0wxKn%2FzgY6pgEDJkvVhKhpdDh59g6ZjSpluRPLFTmbUN2ywPOa7JoabuL9hV9V2egtGy7Eb8Q5vqRG5PwpHREEWfyQ%2FaO5ZBNDr%2BBWzY1oQr%2Fc1LFmwejW3ylLfGAkTZvP8tQMEb63Ows90le1OMRUfHtMwkL0Nchf3SnL84YSyK9OdunhdhxU6Xbq3M6T9OthZaTPCHdQx%2BsuwPr5qHUrrqnTVpq3f01I%2FxyKPRtj&X-Amz-Signature=20d0b492c7f4685c957ce7dbe170f651da3fab950bf8df13dc3f99353e157bfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFVQR66T%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEub%2BkieizR77wtDi%2B7JrYX4V%2BFTUIvomtPA9gtHyAkJAiEAugQBYJqVhvq8d7X47R3N9FKmm15r60ry3N69NsKg3rEqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD4Kps74srJdXS5clyrcA7GIbrY%2BLrj5oHy55emyFhpmt2YQgo57LQ1Av05Q4JwQ%2FIupprzsDTk%2BVbg%2F%2BuNJTXdN3FFVBx3btK6QpW0rfaDMVZJp3lL1Y7BhDEBHvL98k5C7C0BKDXdHc8lrTD5u8GTwwQQod2uYy4pzfBA46EWQoq9Z%2FIEvxPjKrAjApmm%2BnlNFgBnuKkDovRKJQsa52hSO1CIVQJ14JNv6tDBfeWb7iQzgA%2FumuWLBLrfovm5E%2BtmB2DGmRH3d9cgGwW55FBtXYeD%2BtY22KZbwa%2FiJS42dMBr%2BPOFO1a4vB2523s3C%2BfJoKHThzJDZGCGdKS0habb0Aj6YkAnyPfA5Z2gUYaUNo6oXGEw03RWJUsr9%2B3x1es8SQSD5noI8xyM4VlJ8GDUdzu6OywmYuH6HJEaj77ffhpaU2rhyeUOjJNYDbzHJSQX892MX%2F71Qq5RvwAcRQ4ONI5aJXZJDiUiNdPzFhqwlakGF9JiUUpXZhqxbi1tat%2FeWFfxf1v9Yt%2FW6gimVHec89FOyJcZFWTmpFIcSkxgKEvQQyH%2B7wIYGswCZr%2BvV7cOIfejBGCqF8LkDPX9smRKuAKYA6IZBU%2FOEOGEumZcPTPXejvHKkVee7K8IUzRhZvCgEZeSCL%2FKg2WtMPOp%2F84GOqUBdikKkbDl78Ek8RRsN0yCcx9sjkaOU1JDQ44RwN0kltEy93YjQvlcpxNOZUHp9VjoKKiJyl4VFzVoqFGPO0tl3smh8BWBHF14AhINQH8w0bCxY3y5J9j3%2F%2FkeJjBFYxVUcIldVtAyzrVsmJKflflUc1M6lSJn6GQKRgTM%2BTCu%2FEvOpY0dRuySkaKvw9otdwAta1Hj19ZCgxrYT%2FvNRL7AGxtHAKmH&X-Amz-Signature=36293cccbaf99a96d454fdcdc3c3d277f0da1155547ca00e183d89a01ce2c821&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623QPBMXW%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFc0bbaealkgd1YVYvFv3Or4zguNI3g9iEgkc8pQxYwlAiB1UVkylrzL1GMSfKkeuXerdHAydG%2Fi14lhY71oZmBrmyqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLhutIO57jq%2FMmNXGKtwD8dc8Sjj9ZBj0v183RyVPyvrypeRqa6MDZLzLCoZ6VkEQpv65N9uFfURTuU4Ku%2BWQe3%2BQrsSP%2F35ju0%2Fdhh8u%2BvEBkpr7fZ1if93W2UU6HewciP2DWwrJHu3D2N%2F8aokB6xH1MiiGmb3Z5QMnye%2BNphjjD8h0D3%2F9obCYLJ7PHegNc8UQxELBQq7GRpun65DY5WvoIcM%2Fep2%2BhjWYp6veGJIYaYm0MaD7QRTRFuR9YN7u8%2BwDgynp82P66zttk2A4wKaC73v4SZvZvYv34%2BxzmAqmf5cT6WVxoK7UBaQaOy0%2FQcjdJF0v8FRujaJxfzKgCHisGg0rqh9QrM%2F57lgA6HhvIwxvwj%2Fe4eFMsBvR8zwW9G7LDejLPkLySoREDtpq8artn0Gg%2FzcWpuWnPBefyygBpC23NiYVJ71V3jnZLq3%2BEpfoC5y4wrcLOvORBVL8dL23J5NsQjcH6a%2FlXMCmxfD05nj7yeOT%2F6sQ7Wo2900EklojsaHCcti6o7lhifxBec87YIlloj5wYN9yMD4UPm%2BxEDD4oW4mptyLOo0BCNcECmWAbzaq3EJ%2FqNaNZfejARAur7sSuiu6ZdZ3Z5HK3kBUEUQoZ%2BYzynOIQdnl%2FfKIv5EW0Onj9o1EiM8w9Kn%2FzgY6pgHkciMad5Lqa8oXL9llpPLwHJ4MqReP2%2BRFIeWmQhIIIWFo4JdYzUafB2oF17O14QjTjQbYP7Xk9%2F2BIUB6opAGag0nFzl3ibKX%2FVvR%2FgsBqXMarMcA4oMExGiX1SI7L42buHVYv8wjLctWSy0gNJAohBXHh0a0RPecZNZIliEfvMtnMfLyxHnIKvNjbI6q9YN80CLEiCfkKnEIKavl38DTmO20lHXD&X-Amz-Signature=e2e166b6a8d4ae9238c136e451bc77176e32fc77945659ace603ea32f95e6b77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNHN4WMM%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWi%2FOBIjfbLMkaIF5fJD0L9B2qKDxd%2FAIBpPgdynPWNQIgeBUyFCWWgnyzGBQo7V3qgsQBG3g%2FPgtdYmDdhz1GCXgqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDObCyUC3WDr%2B8ZgLOSrcA1%2FfuAVn3WcNpx05uk9ebDBXH89xYujO6MvVixUEguvi52HnoX0KxSWeYCaTauOY5QZuNn0sr5pl1XE%2FgyZwTtgxeEl5stATJF2lbN1TnhJvkH2htMadbTYkfHIF2Y%2Bds5no1wBj4zG4GoS%2B7r4Mo9JKlTbxX1V6XXrJzypge58WV1TRO%2FcYjpIku7MzpLajbDUzygW5mwNl337FNGaFG4tFuRxyOPW7HAaG6TkNyCABpMqHaUxnMZUhfm8GTFOTSLefcfT9FgVhdOw%2FSyxhbI3wUdnwdl28cLqv%2BET4MZV%2BZB1s6xHLKZVUcHQuARMUmXHErVKx4WeAfg8qfjlL0tGjXKfDv6BkY1IZ2XiA8MZK1p2NJ0RRLL5hItMkG%2B8PMKcuDs9dWM6P7H2F2oe96ZPXjEBa1ZhrjzGgEDtyU%2BO324FyXB3Rs7heBUqNWKK%2BFUseLmh83dHOOQYSXuF%2FYfaOCsZiqkq0qGWFwCMJQlhM06sX8c%2BU7O983qYlifNd%2BcSiba5ZDua%2FIydQbqP%2FWpu96WQBLBS4eDYzKjHc%2BnCJW0JuHUxzjh4T%2FztS9olVP4LauR8k2gdIrLID31ase24ySTdaF5mFcQSFLE3O03h0kWzjbIJq0mWWHoBlMJ%2Br%2F84GOqUBLD%2FdO44ltXVJe%2FkFjwDZvU8aud5ZTR4u5dfJyEi0KJGE41iQS6CLVill7Mt%2F0lYK1QCYZi82dgKXlbXHGLeQNhb15JW6OGzAxVd%2BzH3VjjfQ4wx4uU%2BGHVUbCIwhjh3AfFcSOr9dlNY2uMY6RsmIOLF3FwRsw43JGTFn3%2FLtKerF5CRwgcIBuOv%2Frv26G77%2BVdol5rDIfYm26xN2d2rbfsgRUssu&X-Amz-Signature=8e859162fa29e3fce4e916eaff61aacb886ee0defa38128d6acee7ef6b98463f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNHN4WMM%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWi%2FOBIjfbLMkaIF5fJD0L9B2qKDxd%2FAIBpPgdynPWNQIgeBUyFCWWgnyzGBQo7V3qgsQBG3g%2FPgtdYmDdhz1GCXgqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDObCyUC3WDr%2B8ZgLOSrcA1%2FfuAVn3WcNpx05uk9ebDBXH89xYujO6MvVixUEguvi52HnoX0KxSWeYCaTauOY5QZuNn0sr5pl1XE%2FgyZwTtgxeEl5stATJF2lbN1TnhJvkH2htMadbTYkfHIF2Y%2Bds5no1wBj4zG4GoS%2B7r4Mo9JKlTbxX1V6XXrJzypge58WV1TRO%2FcYjpIku7MzpLajbDUzygW5mwNl337FNGaFG4tFuRxyOPW7HAaG6TkNyCABpMqHaUxnMZUhfm8GTFOTSLefcfT9FgVhdOw%2FSyxhbI3wUdnwdl28cLqv%2BET4MZV%2BZB1s6xHLKZVUcHQuARMUmXHErVKx4WeAfg8qfjlL0tGjXKfDv6BkY1IZ2XiA8MZK1p2NJ0RRLL5hItMkG%2B8PMKcuDs9dWM6P7H2F2oe96ZPXjEBa1ZhrjzGgEDtyU%2BO324FyXB3Rs7heBUqNWKK%2BFUseLmh83dHOOQYSXuF%2FYfaOCsZiqkq0qGWFwCMJQlhM06sX8c%2BU7O983qYlifNd%2BcSiba5ZDua%2FIydQbqP%2FWpu96WQBLBS4eDYzKjHc%2BnCJW0JuHUxzjh4T%2FztS9olVP4LauR8k2gdIrLID31ase24ySTdaF5mFcQSFLE3O03h0kWzjbIJq0mWWHoBlMJ%2Br%2F84GOqUBLD%2FdO44ltXVJe%2FkFjwDZvU8aud5ZTR4u5dfJyEi0KJGE41iQS6CLVill7Mt%2F0lYK1QCYZi82dgKXlbXHGLeQNhb15JW6OGzAxVd%2BzH3VjjfQ4wx4uU%2BGHVUbCIwhjh3AfFcSOr9dlNY2uMY6RsmIOLF3FwRsw43JGTFn3%2FLtKerF5CRwgcIBuOv%2Frv26G77%2BVdol5rDIfYm26xN2d2rbfsgRUssu&X-Amz-Signature=ee7aa7c2b6deb606b255fdace80926af6a79845e41b99b5aebd47dba8cd595f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZD7KEKE%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2Fm0kb3Mp7JH%2BJIlQLMkuI4Nv9aReo%2BSibrPnZkb744wIhAIu6V4%2FtwsTOZI02snBWtUqaCaC75I6KzGMOuqnFpcAMKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygyzhqWTO1mMv7528q3AOjRJH4dx5ZWgcheGY2WO6iDN8RYFIY4tPCQSbGvFKzFTs%2FbsRNVqWCt7ehQ3bKvrVLnNpySsuDxF6sJaiUkL1SAuh79Cwgn%2BaUfb2%2FM0Awq1qksMgYToFf34f81jEkxiewQHLhpasNDnXnggUDM3RkYYBJwkdbSbBubk1Uais2dL0aKOAQ0KgQcj0P4gq4nztI8Ds8r3lsfFq1ELlGYLeFagf%2FLdvbI5w%2Ftmrgm6G85XHwGSsQ01HQ%2BRxcFQVvcsDAhSk8eDzcsnUiHAB5S9CfqHjGBGb81UQEx9RmErYwnSlimT64ZJoJcGhPK4iroNnVL9%2FaLpyEL7gG6jFm5k7fkZa9%2FL6aXc0K7B5pdmc%2B1uXemNeg3%2F7ng5l%2BxGHD2wlUIxg%2FzY6IV9%2Fp5UyDJ8QOKuxnNnD2zpyxRka9kUatLy38Cn9dfGkzDhhUl4zi6m2QR4eAlD9F5mBnw%2FRiqIBB7purmnwz5hNENfhO3UofCJaJnnQAp%2BuM76olaP8xgzcm%2B47zMUusuwyjem6lKn5HEXXszmkK%2BL0vvb5QbAmFXYy5D0YrOgPvwsGg%2FxHliGPFzO%2BG1xbNF8Apl2AqDVP97EkuwVeXkNqIKK2sboYUt73L8P%2FX8aHL6hftyjCsqf%2FOBjqkAUoiXpewgY2%2FiSeIo9%2BjBw7R1k9NyUjsidMBE%2F%2FOPUVS3aKNLfWDWqf4ciH0sY%2Blki0nOydQEdYVp1p7sc%2BJYlhTV2mFBNHAM%2Bpip0POmT20n%2F1pUlTCg82TzYM9%2BlV9E5ujmDIoLZtB60P%2BtrHqDGyFqKVzN%2BlY2z6VZfaK6eHHM17jBQa6lvx%2BrxQgqDaESdN0VWL5PAQf%2BYsOe8LsG%2FKm%2FdDC&X-Amz-Signature=e49e024640f65a3bc412719810a0361bda450b78f8dc8e1cb9743ad575f9d639&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NM7T3G7%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBhZl1269y4xyjgCLgzY%2BYosztsQgJ2UfQWGyxTEVVAKAiEAmwV%2FeGS2i%2B1BoFWetVzEGDmkXiFbBFtzFxugqT6M8QoqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxWNwR1nb93SNozsCrcA4VnaYPWXAXC0%2FWCuLXkz%2FsjLOd%2BBdGH61zlbn4B4HX%2B%2FxNCrTmxZKGvJ%2FUCJD29AHfHe2oDgMFG%2BzrmCqVkk6%2B%2FQwSpcqeCCCt%2FSLzdiT1JF8K0WJ5iHarY7WvRumrcVX1eUq4oJ1Lvt9isouUDluWYbb3PFlXwreoYsb7B%2BxNHbtc7XGXMi47%2B5XNYoWFZLEQ7eb64b31112PZTag74LKobcbyAdSAjrFsc46ZoMuHnTFhbcw63LaOFFPXUOR72%2FEm2RM9Ei7UtRes5xdz4cx6fiEVWQNF4XTDnfWTwFJlaSjQJAovmnNTsjlUInTLGQt02sAzRL%2FCruFqV0WZuj%2B6wv4mNjlFas%2FqliHi30S%2FDILBe%2BGp6qrhcCuUejSujJDjURisxgAjUiajUBVVSo4%2Ff7K5gj2F4ZO0ouPZFX8ws1Uk%2BMdr82JbaIdtRaKA9bm%2BsMYKu7w8YVXC74j%2B%2Fy3DYe3su9k1oRf0paTWSCKnduq5QAtT8EUjEhl3eYfikXaq2BH0oteSnBYvnaUtaXraE9q%2Fxzp02i3yqoPxqY7CHi%2BiR%2FMowyr%2BGfrD2QmousLPMeEHbafcF24w8e%2BMrDVcR92RkV0C4hPgFY%2BhkDT4YF%2Fwxi6O2eQbykePMJap%2F84GOqUBID0zoGuJlPn%2FTYHmdIHZvjiBqG08bnfppITzr5i0fsBnNZxTKttQ5ovJl8Vi%2BbZKZcrPRUhX%2BicbYTakxJcM2RhZLs62cQ%2FPzjTUYnBc8G%2FV%2BurFLBeDaiKlXwxZnACuz9PHntG6D%2FXwyCSlNcQTRUNMSbTq7NWZKqLd%2FTjeAYoU4l6R9UD9mskSGGIVWcgIJau0O4dxIGrba9mfRRJJiW4N3933&X-Amz-Signature=5ba306bb6c23aedf29939f65b5dce9bb29a578cc63b16a313b65025b29936325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NM7T3G7%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBhZl1269y4xyjgCLgzY%2BYosztsQgJ2UfQWGyxTEVVAKAiEAmwV%2FeGS2i%2B1BoFWetVzEGDmkXiFbBFtzFxugqT6M8QoqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxWNwR1nb93SNozsCrcA4VnaYPWXAXC0%2FWCuLXkz%2FsjLOd%2BBdGH61zlbn4B4HX%2B%2FxNCrTmxZKGvJ%2FUCJD29AHfHe2oDgMFG%2BzrmCqVkk6%2B%2FQwSpcqeCCCt%2FSLzdiT1JF8K0WJ5iHarY7WvRumrcVX1eUq4oJ1Lvt9isouUDluWYbb3PFlXwreoYsb7B%2BxNHbtc7XGXMi47%2B5XNYoWFZLEQ7eb64b31112PZTag74LKobcbyAdSAjrFsc46ZoMuHnTFhbcw63LaOFFPXUOR72%2FEm2RM9Ei7UtRes5xdz4cx6fiEVWQNF4XTDnfWTwFJlaSjQJAovmnNTsjlUInTLGQt02sAzRL%2FCruFqV0WZuj%2B6wv4mNjlFas%2FqliHi30S%2FDILBe%2BGp6qrhcCuUejSujJDjURisxgAjUiajUBVVSo4%2Ff7K5gj2F4ZO0ouPZFX8ws1Uk%2BMdr82JbaIdtRaKA9bm%2BsMYKu7w8YVXC74j%2B%2Fy3DYe3su9k1oRf0paTWSCKnduq5QAtT8EUjEhl3eYfikXaq2BH0oteSnBYvnaUtaXraE9q%2Fxzp02i3yqoPxqY7CHi%2BiR%2FMowyr%2BGfrD2QmousLPMeEHbafcF24w8e%2BMrDVcR92RkV0C4hPgFY%2BhkDT4YF%2Fwxi6O2eQbykePMJap%2F84GOqUBID0zoGuJlPn%2FTYHmdIHZvjiBqG08bnfppITzr5i0fsBnNZxTKttQ5ovJl8Vi%2BbZKZcrPRUhX%2BicbYTakxJcM2RhZLs62cQ%2FPzjTUYnBc8G%2FV%2BurFLBeDaiKlXwxZnACuz9PHntG6D%2FXwyCSlNcQTRUNMSbTq7NWZKqLd%2FTjeAYoU4l6R9UD9mskSGGIVWcgIJau0O4dxIGrba9mfRRJJiW4N3933&X-Amz-Signature=5ba306bb6c23aedf29939f65b5dce9bb29a578cc63b16a313b65025b29936325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P7XZW6H%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T185547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBpJax2u%2BHEC0EZKjgeKBYy2rc%2BAjT4%2BmvfZzMBVOODGAiEAsAw165tdrK%2Byejzt2HqLgrx8Opbz%2FZop6zQmueWLgg4qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDITg68hRX0KCrRLRaircAxgGBTg5%2Fe%2FmbXoHxsjQJSwoJXHoUVuM5cK%2FYmuPHEL76hb%2FFZ%2BUdo4h8KDY4at9PAy7XGjArvKM%2FZwNGXsoWICp%2BLAtaRFZJArY8VPyTekZrS8vqvm4tDDRhBaioEIu0tefcVjNOtMJ2SjDygYCWBQmYY%2FnOlWj1xLeHDfb0ON10ScYRad0r47Npvb7CVLDBTkiOEyNdJeid113%2BY62jOpkCUo0lYqWdXIbJZmaMuwNYm532HHi4Ux6nfTU8qQbW5uc9P96SZZqTvPi%2BOrbghZrZ4QreqIlVpMI0uJQ95USjRPBBgcdKpRISUJYbQLnSWvKrSCHvx9pkL6n8SVSIH%2FE%2FFoXLPFjNz0glmf1dqbyaAhn5kagMB1%2FCeAhBJmsDz5mnQS3kP8fTIZqaGh9IaIDKhcIOmt26qCypDA8kV446mIHr2fV%2FXV9Q1BZmnBDuO%2BX6r4LmXXUtZZeSak1530418g%2B8fahAUn8qmgR0NvkRq7SQo4Y818htFggHlzHDe2KyGir4ZeEdyAbUkNXzRJoxu009lL2ZSAzlpRuy%2FyCz%2BDfbBtrxQYcAVitgRYE39I5%2F0tUkWN%2F0h%2B3MFJzNXacnfbdRZQpA9HBAquokSfrGRr3yhs9BT5WmGkzMMWp%2F84GOqUBDoT1t0%2FvZGSeQyy%2BXnkGLZp%2FMA15IMR3kclYZOD3v4BtwxdI70pMNc%2BiRNYFne5barcDL9bHaRl1Hu5CIUGf8DE3Yr8uOfAwLLvycErHENQvMIw%2FwCRmP5sGS0CdTcRGUCxLYZ4KA3vzotuOUYsey%2BdeJ41BAyQ9D8ZXnQKDrJK5Sv%2BuFKoigmS8Fs6RE8TGKmoI7Ws%2BDG1nl3aR17ZLmWmXLE0i&X-Amz-Signature=2844b715f856cbb1f54d6120bfe9a3a9f8a2bb3d42e33d7cd192e1044dbacc4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

