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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WCQ5BNW%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFoKv0SyLspCvZ%2FJ%2BzyE9oTPn9YxPBEAVqVF7c6fbpYMAiEAxNw9YuygQSmrR2c3HLgdAwn2Ev4HZ1GNFo8ZIZj2pMgq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDFAkeJ5BCm0w4CjgnyrcA5V62RVpyQBNzZLqa%2F1ZdAOGsjKdJifm%2F8HsXKHSiuO08VCqryv3KxoyQnlHbf4V4a3vOl3PC%2FE%2BmQZfKqbGcUXPesq%2FYZdOZWsAVHgRD3hy1DPdgMutLJC1%2BmJD65XvGVz%2BjSOKJvBdPfbjwhu9RMa6BiqUWPj%2BqFsSOOtnYsdZYcqBM23eamtbhRTsGJtJvxnQQuyBDARgmT160RAv%2BP0VXDXlHq%2FXcUg%2FDUPUT3tpp0F1QhiFW2UcbKJhO4RWITsrj5DvmNEV6xwyt3KBtCmdtW4wD9amQoNIIAJ%2Fv0A2M7Ify%2FDy%2BP0UKhH4b1vIAeAk0W9G9BaUTqUp9JP%2FBuD6hDvrBAUAJcIGB4nzkwDeH0NGND7GdjOY9fpksxAEQZbSXk8GUAfJku00Uos3n%2BCHCjVNMYlv9au9Zsh%2FRGfAXwegykqMLD3vGgcxOzQcKQfhLwd%2BqoBEs0FNtYmu4%2FGThLc6hCRTs5s0EXu1mk9H8VVe%2FKh7jYoGCD853GzALQcPo2JlxYQVSPo2t0DfZl5ktywG09CxWjRfwd319Vf9%2Fdeq%2FtxhjjKhN7oGPINZi6JyT8cNnPeo9mF50nlHmQIwdWjrYqP3NUJlAqWZYgOgIwIuE59HALxOlAvPMPL67c4GOqUBo0WqkQc4zONRaLy%2FH%2FbjdEy%2BVNg9fAKaj6pQW4SqpemzJfgFsHAKAXsh%2F%2B3XOwBMEENDx1cl6CcqtatdKYZKMJELxZATZfDGxL6hsYr0i8RcsTT%2FtNrQl39jYWlmoSawsLuAqsFZCJQEEfQi5N6jaPR9jlZgvwkdsJIWkPCnK9a8naI%2FaQcCd7iGUeS4L8m1H8kN5FerqUYvPhDzR0VB9g2iP0X7&X-Amz-Signature=dea0dcb2375c4823c429f8f46cbe36853fcfaa683418a71f3df0e1218db3a96c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WCQ5BNW%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFoKv0SyLspCvZ%2FJ%2BzyE9oTPn9YxPBEAVqVF7c6fbpYMAiEAxNw9YuygQSmrR2c3HLgdAwn2Ev4HZ1GNFo8ZIZj2pMgq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDFAkeJ5BCm0w4CjgnyrcA5V62RVpyQBNzZLqa%2F1ZdAOGsjKdJifm%2F8HsXKHSiuO08VCqryv3KxoyQnlHbf4V4a3vOl3PC%2FE%2BmQZfKqbGcUXPesq%2FYZdOZWsAVHgRD3hy1DPdgMutLJC1%2BmJD65XvGVz%2BjSOKJvBdPfbjwhu9RMa6BiqUWPj%2BqFsSOOtnYsdZYcqBM23eamtbhRTsGJtJvxnQQuyBDARgmT160RAv%2BP0VXDXlHq%2FXcUg%2FDUPUT3tpp0F1QhiFW2UcbKJhO4RWITsrj5DvmNEV6xwyt3KBtCmdtW4wD9amQoNIIAJ%2Fv0A2M7Ify%2FDy%2BP0UKhH4b1vIAeAk0W9G9BaUTqUp9JP%2FBuD6hDvrBAUAJcIGB4nzkwDeH0NGND7GdjOY9fpksxAEQZbSXk8GUAfJku00Uos3n%2BCHCjVNMYlv9au9Zsh%2FRGfAXwegykqMLD3vGgcxOzQcKQfhLwd%2BqoBEs0FNtYmu4%2FGThLc6hCRTs5s0EXu1mk9H8VVe%2FKh7jYoGCD853GzALQcPo2JlxYQVSPo2t0DfZl5ktywG09CxWjRfwd319Vf9%2Fdeq%2FtxhjjKhN7oGPINZi6JyT8cNnPeo9mF50nlHmQIwdWjrYqP3NUJlAqWZYgOgIwIuE59HALxOlAvPMPL67c4GOqUBo0WqkQc4zONRaLy%2FH%2FbjdEy%2BVNg9fAKaj6pQW4SqpemzJfgFsHAKAXsh%2F%2B3XOwBMEENDx1cl6CcqtatdKYZKMJELxZATZfDGxL6hsYr0i8RcsTT%2FtNrQl39jYWlmoSawsLuAqsFZCJQEEfQi5N6jaPR9jlZgvwkdsJIWkPCnK9a8naI%2FaQcCd7iGUeS4L8m1H8kN5FerqUYvPhDzR0VB9g2iP0X7&X-Amz-Signature=dea0dcb2375c4823c429f8f46cbe36853fcfaa683418a71f3df0e1218db3a96c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UVKIFBF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCP7784rs%2BFchaZ5rLrgGB1FyBZQpj0UHzcVSg68G5ZYAIgUvc%2FL%2BQn4OQL0c%2FC2PxzYW8SDVw7%2FHwHGwsgaTkn22Iq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDBGqRLQBQgVa7%2FUF2SrcA3vp2oJNXDnAToR0wlqI0SlW1gMCPIdmBzueaAE32Kva1OcwES%2BZwHDYqT%2BcKOTeVTDRAsPUu4gMU2V65176Ha1xeMr6Ui5A2vAq9MRDGgnAs%2BH9g2Qrnzqs1Ry435FGSYoNIRZXETNYCeWVCTHddW7RecDWW5vQJRyfEzbB6oM23ORMSVsnZAv79FKSoFaXW1jByWwGHbkOvjKmlOBiUZ01%2BjciULcnvBTPhXPcYw1Kg5JHyUZ09RDU8VuzDxhwCFkZnuvuZSe4fbzrh1QVtzan2om%2B19CDwsjUew4KZroBolPzKA03Gi47cF94YxCqLPkhT7nyzpbt%2BV%2BpVc7ptmvdbefOz0UjGFXcFAZRh4Ssv4gHKkXR3fh%2BQbU9m6zTpm8QaJ5VaR8GbvFhUdUMYUaqX9DAqJeJGVOuun62nEMfJPXSbi0xrDaetmM9czoKC06jHaasJ8o8OmaTG%2FuZwl7gMimd46GrPO37UsOoFRtZvEo8Tikg%2F2LD8Nqh5A9yzmFsaELFWDOaXu5fbJQuhFxRpMuLr%2BjgWqzUaNNB2BqwHgUIvH%2FeUisfplxOavG1dTR2oxGMfhPGWEstU31pqfIBhYawHxnLUtAWERSYDq5sp6FZ32rFoVRx9mccMNn67c4GOqUB%2Ff%2FbXP5%2FkonKBHmXxCwjSlIgR26I1PNEl5sTB7msWtlIqdyS%2FX5gu2TsPUrWZelByBLFq2mZV9JMyyaYUkgW%2FoYKnXP6C8%2FIFSYpCK7zOEUVRZD1%2FT8G1PEQLXaUthSpKGQBrDYdFu%2FPKyCnKzJ9YFGxaUCk9VKt%2FmnKEETe6DJ6OSBApU34CeD%2B7vhshZNjMAazMjgcgUZOMQB28sdwrg8D%2BPg3&X-Amz-Signature=c417f446652ea6df7cf5132e72473b1f4fc9a67e47c493db9e6f0320fc16c0d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3YGO4HU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBekcZRmhGd6MgOFsjtpFsTEdnZ6UIRRtWSbYZJCAcp2AiA%2Bg3MVpht7AQF7SmRFZvmQhf3R%2FSkQWKdxPyN6V%2F4oPCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMOWMBVFhGdSZqaMaoKtwDPuwh6jrPui%2FAR937F0oZjcLWoeDThOJ35R3F3Skyz2JdUgIrBR40aSihFbcqAjnrOWgiz3sJ8Y2ySMeLb4Azs4WYHyO5NQeWxkBGBxw8OF6dol44sk9GZkN%2BFzhs%2BJRz42hFLxznELxSKFJEVE50geRExUzJ7qumzuem1SZcnYil4rmCQzqFZ0%2Bdj8xmtYhTVOj3Si27hhGxIg8HtoIhcthqU1DHB9Sy5gOTiov%2F%2BanxSpEXJd%2FCANrBPha8rjsNWyB2oA5lOv0ANSKHaPlmxw0IfQSRaEgVtLyz0qdEpEM9V4HBIQZ1fkzYm0Slw2OThiXi5lmyyKpmwYdqJ5WVygwIo2McJvTeoKy6rtBfXAkb5wdUD17jnV02UgVCk6PsCGv2L5HMRVLu3zDA75%2F8cjY0NPh7%2BxgPihp1vMoFsYHxhNfS4giIDNwrZn3oFLl1YCKymib5I%2BmWvW8Oc2S%2FOH52ah0Wsl0toZ58oDCLRj9%2FK3iUdqACi3PiAEBiyYe%2Fb4l%2FsgXtGGQfDzBosaKCn2q7uiHxuqUaLZQ0F0%2BEWfGScPuin8wdVF6Mv%2FN1lEczMwtVsNx2WPrqGYrWxKwz2vnFGloxOFlXa18b0KJcQ%2BXSeAbiWX%2FXX3UFjDwwgv3tzgY6pgHHp3%2FyZzN0uR40JQ%2FNgY7oK2o33vDioqti0jB4HmPDsRbUjuhUlIV8ADB1qVSTPvUvf3JuEG3j9u589z%2FqSbS8NQsWHbUVOXAI157yefIvmICJdxI%2FG4pZELfAmve%2BgcM3Qobuz9YE9Vx6lUlqBxjzeZr4J4sWO824TPB6jl0oBD8jvYfcEezGgpQQwjDUvJwN365wYxGBqs35IzTQ7wZgC4%2B1wfft&X-Amz-Signature=99192ca0166afc55c2334d5757239fbb1c9e9551c5db5e6959574f151bdb08e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3YGO4HU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBekcZRmhGd6MgOFsjtpFsTEdnZ6UIRRtWSbYZJCAcp2AiA%2Bg3MVpht7AQF7SmRFZvmQhf3R%2FSkQWKdxPyN6V%2F4oPCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMOWMBVFhGdSZqaMaoKtwDPuwh6jrPui%2FAR937F0oZjcLWoeDThOJ35R3F3Skyz2JdUgIrBR40aSihFbcqAjnrOWgiz3sJ8Y2ySMeLb4Azs4WYHyO5NQeWxkBGBxw8OF6dol44sk9GZkN%2BFzhs%2BJRz42hFLxznELxSKFJEVE50geRExUzJ7qumzuem1SZcnYil4rmCQzqFZ0%2Bdj8xmtYhTVOj3Si27hhGxIg8HtoIhcthqU1DHB9Sy5gOTiov%2F%2BanxSpEXJd%2FCANrBPha8rjsNWyB2oA5lOv0ANSKHaPlmxw0IfQSRaEgVtLyz0qdEpEM9V4HBIQZ1fkzYm0Slw2OThiXi5lmyyKpmwYdqJ5WVygwIo2McJvTeoKy6rtBfXAkb5wdUD17jnV02UgVCk6PsCGv2L5HMRVLu3zDA75%2F8cjY0NPh7%2BxgPihp1vMoFsYHxhNfS4giIDNwrZn3oFLl1YCKymib5I%2BmWvW8Oc2S%2FOH52ah0Wsl0toZ58oDCLRj9%2FK3iUdqACi3PiAEBiyYe%2Fb4l%2FsgXtGGQfDzBosaKCn2q7uiHxuqUaLZQ0F0%2BEWfGScPuin8wdVF6Mv%2FN1lEczMwtVsNx2WPrqGYrWxKwz2vnFGloxOFlXa18b0KJcQ%2BXSeAbiWX%2FXX3UFjDwwgv3tzgY6pgHHp3%2FyZzN0uR40JQ%2FNgY7oK2o33vDioqti0jB4HmPDsRbUjuhUlIV8ADB1qVSTPvUvf3JuEG3j9u589z%2FqSbS8NQsWHbUVOXAI157yefIvmICJdxI%2FG4pZELfAmve%2BgcM3Qobuz9YE9Vx6lUlqBxjzeZr4J4sWO824TPB6jl0oBD8jvYfcEezGgpQQwjDUvJwN365wYxGBqs35IzTQ7wZgC4%2B1wfft&X-Amz-Signature=c949396451140f867f5dd2579a19853fc6ecc2c9ebb0cfdc929940dd69d97780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGDUM5UX%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBv3d8fAgsXO3ZegnWDef8C87Syt2t6%2FNW0n7QBJrxuxAiBA1%2BbPNLV4Zay%2BupSwgiXsMmio645d44%2B0aSNwkeHx6ir%2FAwhaEAAaDDYzNzQyMzE4MzgwNSIMZjFXn0jSjUxmZ7LwKtwD2hD6BXQVzP8RNAl8LqS%2BNeEfgZoum6NmxSn18N6cvc%2FJwPqflLRQZHYnMtZPxv%2BjtYa7kz1y5ok4YiM8C1ELDEArd0vBN8FnLnxEZeNCbssAOZO9k6vXMdJU3F%2FXhZK6Nx7P2teAhUJa8PNHphLM5GdyAFbEeXZEGCaQu3x9yU5I1nsK6nbNg1OhP0g5ZJFzniGtWDMUs1BZFc%2Bu1ZkY7LM94AWi5PnKAj8Wuy1%2BabbMOksueeiG4znA8mXdAb6z%2B%2FoL9QMeQ%2BdMRXXhbj1ycpASj0nXAygVY1rMcHoMKMHGVD8tX5Z8PUPgamzTSx2qtBRx5pi1cmT1faAaN61IIbiSyEZZ3J1KoznBiYjaLVXWqdXAmYWm8G%2F1xKEOAQOaMD8DlRzpLQW7O8psqVOQlrC8mULhlcZyNSiUqJcsKDSoWaOy4APS4Z8XcRIUdIlNRb2EZc2D1MlYfBoo4%2BOYR0NdMccuJHCaxhVF%2F4w%2BlAYi7gVEBXzK%2BXB6V2V%2FpazyDdMLiOiNAiF8HyfkUmD9ua4dNXhj7HNuwXKm%2BviFHvvfRlpZlJGURQAwmBR9IuJUE4WWcb%2FD9klcLdx2lpFfMj%2FlLnW6ez7c2Xcn9DDkniksV8sJpu0ibTZSEV8wt7rtzgY6pgFJYCN0bHzfRoiQhyj9vY%2BUOIJh14bWbzrovwV6LzkOLMoDXZ4PFLHYWTudfkezNLFpOD4BrIcZf5zdgX9oY8fX55xaTSarCoHgTlIy8MB4s5TGkX1bJmhPq8vz5FFjcAc6LLAqnOd%2BmHU0%2F2uyQvrx8PKg0lSzUg6dYLZBafQ3DZHYmHWqp18EfSHcGtR8uBVxvx2K%2FzGfKamY6ZX89cEJ8FzZPCsG&X-Amz-Signature=020c4f760b6d853e10ee4a9655993eeb93823df76f72b00103bc0467d346479a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V5RK3UL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCW6ekIoy1lTy6UdnQ9gMBlLAseFOA1vMXHmbZVcXWz0QIgfNzVjrtVfAE3wWbxBmMhwKYSDcGq87xmAViDFKWAAugq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDLRXaxhVAeuLYTfa8SrcA8ASr5Hsf%2FTDx5VCRFiX1GjfurdYhZrRs%2B8P2vdwym8uVEbuRq9LAgTTKSMcRH5YVvHP%2FsMIG%2FMrIT83klxsHTg35JHd6SNlbQ4ElR%2BDzJDrfpiTKZsrnP8BICREreBEiFVcMK2mNyxVJed6tenOLDg8Vd1q3dcTbK0A2gPU%2FGaoxR6QVZKahkNYCNBjLVewRbhlkjtGknyZ2JuQRUlNEJk0GqN%2Bil%2Fpex8gqq%2Fqb0yMTFBtC%2B3ywMxjd5BPbxwtIJo0kVjWWSAlokgwbBedcsT1h15OqIc5Kaet6FAM%2BGFsopMOwhG4UeOCKoFjvV3B35FTs%2BYdoIr54EmdYCFISfh1d2xglgNZfaqWOPQGjrefVDLnAl12kwXvrQlsb0N1QtCkQ022hJykAcRUqyV%2BPAqIiIkI9v4hvKWzvKJI5ZpIIyvtxYkO6B30rI3kQqCZalvsLDHBBf6trofH%2F9WIePWtcenkhfa%2B1iRFKDkLIJW9c8HSxheVG01cvH8EQqlubfynFde5Tu18NHKeObFjc4dF8vLp8t2VcyyujLZdWNbz4lu4uE2bfJiKBAleUZouZ9WGpmZMoAdjwAg4133%2B7fiKFY376DK0DC0TX4kdfvx3eNkKwxl6ZzN0qeXOMNr57c4GOqUBoUpQgRCBh%2BvZVPg%2B1LerupdQpwpVIDv%2BHmrO%2B%2B3hG4qbi1t7RNw%2FGBweZ5nhMtWfPdon8jBM93tm8YTGpj1KDtU0I4VyxdPkH8hO1YuqKYb7aoHRy2nQnVHXyhRfcpU%2FOZ%2FjGwlH3lqvYpbwpJ7ig4y6J%2F%2B75q7OsDG3sVcGvB%2FEeVouSi96uZJa92KG6ywv6p1LiDy6s8xsbZrzpfG9vYTq1Ar8&X-Amz-Signature=34b401b17d086b49a317baacf24a8f45df5fe2b13637c7cae41bee2777ab8f90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U27KNZXJ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAIojV6ZhosmWGHEOZvKC844Ek0l9daeueLZFnGIK1eZAiBJMbvmPJSyLfEokR9Xr3c8yTupy12R7xBpMKrJZMAJ1Sr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIM4jDfypipkjYIvGPiKtwDbbBui2mWgDuNkM5YEoRfjHHnGs068ZwB4Jk9oyhWGgAjR%2FDXvETA9IUYlqCDqbggxxF0%2FxB9KOW9Rm7cKoayaSl%2BL0Oj0Qdk2H64XJMYrDZkOSMEN7%2BjRblga9j2UI3xCziZyXwak7QqAZFDuvjAkePu%2FCURuAQ7wyJTob1LC2vM4Yw18e2kLuktZvbhDbrQmqIJido9%2BNAfh1ZXbbLx48JjFKwEBZQ1IaUuRbLLkza1I0dGuEHihyqYYDo2SDzXVtLSut3y256%2BJywZCwgvFALFM%2BJ3pATCMOBZAiQ%2FA2yXnOyH8%2FscusYjeWgJ41rOsv58UhG%2BcJ%2ByypmAJnTiNaYHzbI%2FusvLJNKV5dHbS1z4w0zDnfNR4Mti9%2FyPZX2pDqLCTR6q461jPzK9t93%2FzDphJFRNe65%2FoBRQmylG6xHcumzJy1HuhtBnXdtbn0XFOQgoP5GaB8hzpq1BcHBzESA79RioMFV%2FUxm1Y39a2Dd5%2BmgVdBQaDftiP8UIwOwXTIvQbNRzsRU6%2Bqte6OQLd%2B7%2FwMrZWKbTG143Jxb8bVpS4WJ0Yerk5AT4I12YgY1NQ7uAPmjw%2Bvbf8J1UXcZ256sqEBGh1d9RtsmJ6l4wwEHFPFpAdFnLfvXsGF0wkfntzgY6pgFJchjZ9%2FPnz2LJIcKUAG6uFaT8ehgKZvfiZTAVOOP5kkl53COttXxua1wV5kcQ7VaCjtkTI05TzViusO5rA8rLBOXaJrZPQtUdd29Z2YjA8B8vxVmSs98xMoxBAA8MFdIqHUeRydwrY8l1cEMkhibdLPxT5gbTr0z4VnQmXjEdTCJC8oc8yITNrC5UTTl4NqCM6KGJn3MTdKK3XR%2BA1loBpIP4KdRT&X-Amz-Signature=114a556b1f915edf9b74ecd020722b4938977d84e35978e60b1ff5bbd67ceeff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3QVKH6K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoshPrI4wTcS6UaQrMwR0Tskwp7VVtyejNIKvtxtxqXwIgd3lhMkmmaStT%2BcYas9UyK6Fj2IoeIh%2FmXaQs1pSkZXUq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDKxtCh8KHWxtt96c1SrcAwVX9WbO8vKgW5IUdigWzMpX5wwPUxKTG3qIW7EhyrFgvNrCM2HM465W4kT2euhbXFFR4t%2BKJHlguxTyzvgkbWcpN4X3d70zaU4tPwpKVRRbfkkQVAgRRnB8ijpDjfvzD9mYGn%2FywFjTJuu%2BOapnll7kQcCy1XEYFdZUoFn9uF9wTqlkhG6onWaFvI4ZgzbKx6m2eMDmHfO285FPrqDKUNXf%2Bs%2B%2Fb7GnHtHMTb34dwuzLdSfO9bbiVeK7clj8kyi9X8geq%2BldKGIf7DH91CLp9ZVpvx96tHk7umL1K9WsTHN1Hu5co%2FuX2BnZ%2FHY6x7doRPv8XImgs3mqNK9R3LgxS9VbFfUSt7zB5Bc%2FPpbZ3oIFa0ofFc53esqI5Hodrfm59YFaMQG5o%2FIe8SuwotcSOQ6ffz9igKAxocCIG%2FJoDZOxrA9yN%2FQLOsX%2BjjYbX2r7Vq9Fr6rY6d5swvtovUh%2FX9am4it2G2wZm7SfCr%2BSQCFF1S4h3i8VRmfAOt2imVPPGhUM92n1XrZojDpol2qcIGoqUdwrSCStIqMensI7Y7rR8KiuI8pwRnhdVX2QartZ9sWTtnP3PaqIv7iqErnsk9AJKy1zcxP0IiTQIxJ%2F4Fp7Bgvzovy4BVpQe%2B7MJf67c4GOqUBTTiMs35A%2B%2BEEVJyZHHdfOeG5yEEHCoPjyA%2BqqaJS9p8DlKzXOBb6ruJ2U7jSxNKcfPSpIt57amTwogOv2zCMK4cZN6GdacFHnWdOBs8IaZNPRBweJwLw75tgmvbQlNeuFKph75ITsOdmdKlIUYGxXZ%2BMwNoyIYpeTFZDPiDe1uzR0a2ctXIlc1CLNLhHbiiORxBox%2FVI%2BBT%2BTooG84y44TFrBTeR&X-Amz-Signature=2c06833bfe2fdcceefc459dc3d7f00b6066c8238021d29d7e5c4cf150c060159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3QVKH6K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoshPrI4wTcS6UaQrMwR0Tskwp7VVtyejNIKvtxtxqXwIgd3lhMkmmaStT%2BcYas9UyK6Fj2IoeIh%2FmXaQs1pSkZXUq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDKxtCh8KHWxtt96c1SrcAwVX9WbO8vKgW5IUdigWzMpX5wwPUxKTG3qIW7EhyrFgvNrCM2HM465W4kT2euhbXFFR4t%2BKJHlguxTyzvgkbWcpN4X3d70zaU4tPwpKVRRbfkkQVAgRRnB8ijpDjfvzD9mYGn%2FywFjTJuu%2BOapnll7kQcCy1XEYFdZUoFn9uF9wTqlkhG6onWaFvI4ZgzbKx6m2eMDmHfO285FPrqDKUNXf%2Bs%2B%2Fb7GnHtHMTb34dwuzLdSfO9bbiVeK7clj8kyi9X8geq%2BldKGIf7DH91CLp9ZVpvx96tHk7umL1K9WsTHN1Hu5co%2FuX2BnZ%2FHY6x7doRPv8XImgs3mqNK9R3LgxS9VbFfUSt7zB5Bc%2FPpbZ3oIFa0ofFc53esqI5Hodrfm59YFaMQG5o%2FIe8SuwotcSOQ6ffz9igKAxocCIG%2FJoDZOxrA9yN%2FQLOsX%2BjjYbX2r7Vq9Fr6rY6d5swvtovUh%2FX9am4it2G2wZm7SfCr%2BSQCFF1S4h3i8VRmfAOt2imVPPGhUM92n1XrZojDpol2qcIGoqUdwrSCStIqMensI7Y7rR8KiuI8pwRnhdVX2QartZ9sWTtnP3PaqIv7iqErnsk9AJKy1zcxP0IiTQIxJ%2F4Fp7Bgvzovy4BVpQe%2B7MJf67c4GOqUBTTiMs35A%2B%2BEEVJyZHHdfOeG5yEEHCoPjyA%2BqqaJS9p8DlKzXOBb6ruJ2U7jSxNKcfPSpIt57amTwogOv2zCMK4cZN6GdacFHnWdOBs8IaZNPRBweJwLw75tgmvbQlNeuFKph75ITsOdmdKlIUYGxXZ%2BMwNoyIYpeTFZDPiDe1uzR0a2ctXIlc1CLNLhHbiiORxBox%2FVI%2BBT%2BTooG84y44TFrBTeR&X-Amz-Signature=1c28405e52d33e80d8780e4119bc4d4fc4646a0d1f9dd0d36d523d38e206ff13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KPIMWGQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BigQeORyRZPtJfr9prNIhk%2BiEmQkn4%2Fwx2rMa85SzxgIhAPqDRqdTctveLKqqIwQp6eW%2BSjF2VYUnBt2BfRk1y9ijKv8DCFwQABoMNjM3NDIzMTgzODA1IgzS5f38xOtmIOJuPDYq3AOqoj8%2FpAQCKdgajjTCbfgWD3L6zb3QBvks2ZXkLlivXgIQ%2BB6xRKog6KqbuMsMsqmWoM0D8hNNXLJRJ%2FxX7yP2lf4UV22d4K4XNAr45oS1Z1ZAoKcpwSuVEhJfGqB0gWa%2BwyL%2BR9tSzkAF0EniQNg8mRbgn85Or%2F%2FzkI%2F2pbRjzprFW6SmFr1b6IN7EsBY1CS85RLTJnQerbfm4Xwni80Ov42sMp6u%2BGWiEfVUf%2FsY%2BIop61bJoHnSQyl25V4spDdtllgdMuq3IiS8Yx%2BV7OGUc%2FMtY%2B3x64AWc64YBa4ZyKx6fQD2TBYrpydEUwSXQbJfICMQx0KiTYQwKtuPPMDaxOM0xJ%2BfPB95MJGr7W4uM4fHx%2FoCCNCgfMUdD%2B2ljH61LKgjZ1x7ChhWhLRE35c17WviGWgTTob6waA%2BU1zu2sXQSaq3NEXWWatplNwMg47rabpvaXIa3UVXUV6BXB6BVfty7NR7yYqCOwUotGU%2B6SXmiRj753CERer3%2Bi2vX8%2FyLUCrWxxOlvaiOaaDNCpZd3oOWAzBhAL2pwndsWBkmiJFOHHxJyHeIQ%2FhTNt4rDI%2FtoDX4EIIrKUfAVCMWqOMB3NLA8ebVfJp2ZXUe5mj2SAvibXN7lDtPY7rIzCv9%2B3OBjqkAQN4YVOrnfmDrB2GMLfS9WyUHKsOIlZ9DAuirmuxQutYZ%2BBZGPD%2FlQJuA3rU3rvPdNddiUCCGCxPKGfATjy6%2B89fZ8cN6W1xEsfrd9HiY1qFteLdsHwxqeZIxzJ3KCANwLFrkR%2FQlWjy9fpew6A5mUPPQZfx%2FH7t8wrDkj172sPnqIurEXlm3pMicEOhGbWSOWQawCumrRYTvLy6EkpnsVLDygCL&X-Amz-Signature=54cb3e2b4db64865cfd461206485b0b8cf8715489b8a6eb08ed420236923011f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUDH4SPY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBCn64EJJkIGwc5kFXgFeiIY%2FNVF50dDFYj%2FXPA%2F3WW9AiEA8PeI8QLtnXenOAJICC1EeNpdBkkSKveSZigFp%2BRIcpwq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDHsLDufbv%2FElE0JdmSrcAzUd9w8mydQ4R9W2PdAkmEH6ww97DOKSNPbK4VqWzjQ%2F0FNxZQWZ0%2BIClM1EsPrgEgXK5U1kxpax1uPaPm5WAb7tA47QvJJIltmCmz3UOxAJgeZMjS5vA85hOv9chJt9s4tLL%2F2SM4TzHBEh0OaJcPOA0Un0VeltD1ohQGGgaMjjDh4GdLY9IgR2iDgJlKjuV5ssXMkMDY72WAc67gOWH4qbOuXmibiAks7tnJydh1g%2BzfyDfJ4q8hzJy4XUy6cuQLHkVNfcgD9Wc9SN0j9Ksf%2Byfjg4H1lZccLayaXH%2FpzpdQrWlTEvtGweyJZy7yc2SFo8m8mRmu6w30gdA%2FKXe%2FfOp%2FzQewbIvvwSDFYfD5xg2n9dJL3oIFRtJz6jt%2Bm9zPa1BF8REH5RUVMzgHwS2RjXtxnmdnuY%2Bg6N5r%2B9DGz6yRwm2hV9V3gJgmWwtQLaVvbEMv%2B9inC9iCFS07eON0SFAHvWCEOBJHEqpFnOMV1ZgBG1DGb81y1jaj9nxoi2Bz4F7ecM3ZBr7uMTfeufcOQEUfep8d6XH1WLPlJFum64pmK4jgGe1IhxNE23JegIm2r1aricA4WivGB66NAF3v58uYNDR%2B%2FMt7sm%2FulEf4eeLzRiHD3Ki4o%2Fzu%2BiMIH97c4GOqUBoCwIuRExiAaNaZbL%2FCBfJs04s7GY4HJ8sON%2FuEmhhHbqjfnvVZ4QRfDgTqVKmiF97WZ4FBzo5Nr7LQQ6lnr%2FlPzR5xK1mBYoaTQeJ73KpJVuyDTHBOG9vrfK6d%2FvFxhQrwZyPcFa%2FvxeAJxHL%2FIjzHEZT%2Bcv%2BTvFfCdDJVZqWlMNCwKEwA37bZrquxUN27uguTt8H4CDPbB5bHXTlJ6gLHBFz6%2BQ&X-Amz-Signature=7578eac401a41e1f39836659e374150b7cb26dea4b7cdc4e2047d7c35a081b3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUDH4SPY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBCn64EJJkIGwc5kFXgFeiIY%2FNVF50dDFYj%2FXPA%2F3WW9AiEA8PeI8QLtnXenOAJICC1EeNpdBkkSKveSZigFp%2BRIcpwq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDHsLDufbv%2FElE0JdmSrcAzUd9w8mydQ4R9W2PdAkmEH6ww97DOKSNPbK4VqWzjQ%2F0FNxZQWZ0%2BIClM1EsPrgEgXK5U1kxpax1uPaPm5WAb7tA47QvJJIltmCmz3UOxAJgeZMjS5vA85hOv9chJt9s4tLL%2F2SM4TzHBEh0OaJcPOA0Un0VeltD1ohQGGgaMjjDh4GdLY9IgR2iDgJlKjuV5ssXMkMDY72WAc67gOWH4qbOuXmibiAks7tnJydh1g%2BzfyDfJ4q8hzJy4XUy6cuQLHkVNfcgD9Wc9SN0j9Ksf%2Byfjg4H1lZccLayaXH%2FpzpdQrWlTEvtGweyJZy7yc2SFo8m8mRmu6w30gdA%2FKXe%2FfOp%2FzQewbIvvwSDFYfD5xg2n9dJL3oIFRtJz6jt%2Bm9zPa1BF8REH5RUVMzgHwS2RjXtxnmdnuY%2Bg6N5r%2B9DGz6yRwm2hV9V3gJgmWwtQLaVvbEMv%2B9inC9iCFS07eON0SFAHvWCEOBJHEqpFnOMV1ZgBG1DGb81y1jaj9nxoi2Bz4F7ecM3ZBr7uMTfeufcOQEUfep8d6XH1WLPlJFum64pmK4jgGe1IhxNE23JegIm2r1aricA4WivGB66NAF3v58uYNDR%2B%2FMt7sm%2FulEf4eeLzRiHD3Ki4o%2Fzu%2BiMIH97c4GOqUBoCwIuRExiAaNaZbL%2FCBfJs04s7GY4HJ8sON%2FuEmhhHbqjfnvVZ4QRfDgTqVKmiF97WZ4FBzo5Nr7LQQ6lnr%2FlPzR5xK1mBYoaTQeJ73KpJVuyDTHBOG9vrfK6d%2FvFxhQrwZyPcFa%2FvxeAJxHL%2FIjzHEZT%2Bcv%2BTvFfCdDJVZqWlMNCwKEwA37bZrquxUN27uguTt8H4CDPbB5bHXTlJ6gLHBFz6%2BQ&X-Amz-Signature=7578eac401a41e1f39836659e374150b7cb26dea4b7cdc4e2047d7c35a081b3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GOPGRAR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T123017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB2utERtJ%2FJvISDgjjFCwMCBFn1PCQuS%2B7gM5GPtYDFRAiBiuDAY0VQdXVvMRRW0Mr8K3WIrjPIcgPzZt3WmsWEG3Sr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMplB94e8GXvrRDEUaKtwDN0OrhFiLaDli95nQPaLUd%2F0LBihO08yENYgy6lA20BNGfh%2FxEUrv0vti30K2TcJrpHZwGkLZPqz5ezVozK1y3QKtaV8rk2%2BRWcc8XqR4mFapfsFrFkOXAv7gOJN2jsBSp47NZCRjxzoxuDNwftne4t4laQE5ESsELBWYyXGQa%2FqVsRS5y36p7vv4BTcPnze07AcON6AhIuVZBP86DA3StQjRktRVgDV1zyoDdacsXij8ZYRpko2h3EUPQRWN7oNiUnyij1SKbPIDbUFDDwCg19CMNpOQ92psXjojQx%2FPiNX2u5Q7BESRUJtUAsdNYxoJ8ROR%2Bl2FO%2Fg9JiFQlHgiQcjHfq%2BPjRfp819KuaEGKv3I5YzPGFxqFvnHmgLDZbS1M2PhQ%2B99S43UB0175LvezwUUR9eRB4Uu%2FP4DwXThqZDHNQLdmIfcWzymRxl8g54oJKHDHHdsBJm4e8gR8ydz2a1D%2BQsfuLBq0kR54TtQ59roJptjS4%2FSDPEH8LcUdrkSeDIBP5J%2FxDotwf8rShQs7J0wCBbXllwIiTKkoCP31OWsycIPqie0GyGuMwa5IIFbWS1kboJTGx2lb8YZOxxplPl7tBufJUcRCk%2BNH9wrhNLFF5pbwVDinPZJczYw5%2FjtzgY6pgE%2FlTuGTvwujPpO5yxPNr4rqowQdAZ1Ntot2BzYSsXEmJl%2FloMQksTmRp35FVeWOOaBys3q7P%2B%2BYeGPu8kJH6eiFsvrHWMlB61N5sDGtAcUdZxdpWe4ztj5AQdDuVovMFMprqxZUBXgt%2F4yoANcHUNySQLHQOd%2B%2FxbZQ6Kr9QmYUlTt%2FtjcFgMNG6ZOwMqDdeVbw%2Fyo442BpL8LD3Fn7t5zLGfqzI0c&X-Amz-Signature=a36a3c73ba8ff590a0b2d8e70e1ed9bef6d83c58183a21dc021b6830ce040183&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

