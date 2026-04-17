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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVYNWCXE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQCcIMXYrDvMKzCt9D0SnrqyIrjhRFq4B2Za8OHf9nHs5gIgE8POj4Mqw6r3h9kumrP42deoxw%2BDlbeiOC3qXNjmEzUqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDErC81IUTOVhmXarRSrcA%2BSBxbgXe%2BIdhkDJsi1J3kCnmiSsYW3YrYEBPvEPW9BFAa4NHCITwaGcAYdI2UW4JLUqXUAa%2BBYtR%2Ba0iOynN0E2yakPYM33Sq8EyfBAdWVf%2FCtRZsV2pqOTGZ63AcSCAr519YYWRAJYYVSjauuaia%2FUHVPQ3D0fubACji845IviJHFDRCaOEWkHOQSt74rDemUmMrTVEWXX6u1VRt9M02R1WQvvL7RKLjRl5HbeD7qubwau8GNoLk19gBecf9jlhtGC1OUGhc1dvC3LX6%2BJzrKJkG8t0V19TKIK%2Bc3oGNYTY%2Br%2B0bjYdRwbBsvz6yY3B5o26MAWd8yIbGmoyaQOy3hLVhRRWWLWXjlM8BjzyzcjdGVf%2FWkGsI6OaLzHiwNKbOWTlikYvL2WZQfCcgeVk43L9wmv3eOlAaRWZgJSck1cTTvmqWQrDy0tBzfCAUHcK7KLWhtIZVVJPS6M4RLw4aLmMeiOau3nYvYXZLW2rMqqq%2Fbjg8jXeERo3HLUB47976KQY8njdcaa%2F833y0U5mTimPHaULw2HAt1lX95GNUjXIwgygZtPwHixNLScpfW7sGY6LYLDmGmxbqgRhrCAxIyCpuzKmbQlJdqZPxShf8FTAKIn9Eta0Gysu4SfMM2hiM8GOqUBV0FITrCMO3Vqhd2MXcBlKRALihFn433leIkCIJR7DeIwEECO1tzw2K8jjWVFHhd1Yy5OcCHMIvdTMSIY17eJNveHEoLLsE0C0wlaUlBsbBSwNTwlDa%2FBuITUUZDeCPwGPntPxokg1%2B4JtQCh0iIDzYcB%2FRC9uzMBnGCy1pKQU%2BZwYgnLyijILmqCiWPSM4GcsXvj4OjLexU8DrsO6LFSEPOsUSAc&X-Amz-Signature=1ac589bde88cefd2015d971dc98e811eed66af3764c84a41432648619b704d7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVYNWCXE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIQCcIMXYrDvMKzCt9D0SnrqyIrjhRFq4B2Za8OHf9nHs5gIgE8POj4Mqw6r3h9kumrP42deoxw%2BDlbeiOC3qXNjmEzUqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDErC81IUTOVhmXarRSrcA%2BSBxbgXe%2BIdhkDJsi1J3kCnmiSsYW3YrYEBPvEPW9BFAa4NHCITwaGcAYdI2UW4JLUqXUAa%2BBYtR%2Ba0iOynN0E2yakPYM33Sq8EyfBAdWVf%2FCtRZsV2pqOTGZ63AcSCAr519YYWRAJYYVSjauuaia%2FUHVPQ3D0fubACji845IviJHFDRCaOEWkHOQSt74rDemUmMrTVEWXX6u1VRt9M02R1WQvvL7RKLjRl5HbeD7qubwau8GNoLk19gBecf9jlhtGC1OUGhc1dvC3LX6%2BJzrKJkG8t0V19TKIK%2Bc3oGNYTY%2Br%2B0bjYdRwbBsvz6yY3B5o26MAWd8yIbGmoyaQOy3hLVhRRWWLWXjlM8BjzyzcjdGVf%2FWkGsI6OaLzHiwNKbOWTlikYvL2WZQfCcgeVk43L9wmv3eOlAaRWZgJSck1cTTvmqWQrDy0tBzfCAUHcK7KLWhtIZVVJPS6M4RLw4aLmMeiOau3nYvYXZLW2rMqqq%2Fbjg8jXeERo3HLUB47976KQY8njdcaa%2F833y0U5mTimPHaULw2HAt1lX95GNUjXIwgygZtPwHixNLScpfW7sGY6LYLDmGmxbqgRhrCAxIyCpuzKmbQlJdqZPxShf8FTAKIn9Eta0Gysu4SfMM2hiM8GOqUBV0FITrCMO3Vqhd2MXcBlKRALihFn433leIkCIJR7DeIwEECO1tzw2K8jjWVFHhd1Yy5OcCHMIvdTMSIY17eJNveHEoLLsE0C0wlaUlBsbBSwNTwlDa%2FBuITUUZDeCPwGPntPxokg1%2B4JtQCh0iIDzYcB%2FRC9uzMBnGCy1pKQU%2BZwYgnLyijILmqCiWPSM4GcsXvj4OjLexU8DrsO6LFSEPOsUSAc&X-Amz-Signature=1ac589bde88cefd2015d971dc98e811eed66af3764c84a41432648619b704d7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CZ7FCH3%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQDmls%2BrrRgPIa5teZnZbO3Uh%2B8yDqi6YwGOedJg01pCVAIhAP2vdH0GUQZo8QG1rVyfX5IVsxF39fMBw%2FdUJQjyD1%2BUKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwagURGDZGYd5RORyIq3AOKwIc4PCcudqForAb8EBMyHY2qvcawIr3cFVTIPnW5qiy8xHbAdwk93e0a344eUL%2BvQwpGM1XerbfoazVkgQtHIOV31ncEJbl%2FKMJk8jIyZ8b2fJXzzZTNBlMYrTcPLWn4Z5WGAWbu%2BIBZdTWWfK3TVxew5zZfdDhH91Kt%2FDAqoE7r2xnTVTdvcrXGm2A14%2FSA3G1cnjYei1ThLPcGnId2A7%2F8%2Fc7bu7IZOD6VAc1xotnJWfvgs3aE3eqrjDcvUNvelpsGK19TIcCVfoc0gDW7dLMy9LXgFJ2HfKUrSnJOGZj6eb6f8NHWslRiTXG%2Bpcwlb%2BY3CZlzekUWrui88Th8iLUF5EaN9P1iAZoM3VKcYu%2BxDFewKRhQ8fZGamHtsIiAhqDlElSvTQuLGHd5BR6TOIwAn%2BSb3g34gvlj9HhaTUirhCWYKPb9kioAttqLiL7uNsn0UvEFxLAV9LAbY46PN7JFLxQRmy5DdNY%2BAZgbADrfD5jVgtCNfqxMtQqfFQ%2FlxWJKi%2FtWwRdWUIx3a8GaXfPvkHk8FjuddUaPBlkFD0YaCHmmbAK40LB5YfDzTSGFwue32RxQBYRs74WbG%2BH6301nVHyniUMDeuRdEmvjSM74CQ6lmsaM1V%2BuFzCooIjPBjqkAahCC4b3e%2B1sma6j8kkJ9Y%2BWySzLhHQhHIzLLdWm4P9RAeU%2F1kQ9Hdy3GAqcbt1Do1SRtuNTbg5C%2BYCIyTQ9LXGK6oMbDapsntmyeCKwvHJ%2B4kFhKgZxY0%2BQHprQzgay4tTKKfqawFAuU4ZDsRTS7sSpwU5HGr86cZAzVVgfdQykc%2FCcHw4s88fLaKAARJN6xr5HVOoSR6pD7bcHj3E4cEtOWBGf&X-Amz-Signature=a2a2c4ff59aaeb58bcd1f5f41d59f0f30547d01ab62cadbf65e3e8ba19b2c1fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTE2UGY6%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQCzlfg5Iq6ASGWptXbgT%2F9UYREVJzErel1P2jtTnfAAJgIhAP7aPWvdHNgW4pfD%2FdfYrKF98Y%2FUTu1qcxAQYIChGtaRKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoAYXYMZMya1FvMgYq3APQBwtq%2F0AbqGArBsKnMBNuo%2BhzLyi5MGepki62p6WTpKuseNn%2F6Gam%2BM8p6QptJ52zmT2cfjbT38Bc3PBTCzfkyb%2B5bTDTd73BmoY2MRaDqx%2FlOw89%2BN9hWGK2sbDZfeJV52HxvIx5M%2FfpS9yIwLjdvZLRf2sI1m6yzKrI4rGVKy%2FxmLG5%2FI%2BmAv9VeBpSd1GCDV1c%2FtyMlntM9JCSg9qCcM%2Bfk0SynfsA5aJdbAKahEXdw%2FA%2Btx643sz4ebP%2BILfxhvxyGHuz8Vr%2BLmUwOSophxJILAwbzgEg4hWApqkHnIRAav0dJH9zNiLnUT1XkUJ0ot2%2BtjrMguEqbQxlJXGhU8PKbnMYSr%2B8MYBppk7LVGydNlsjZ0BL0J4Y6gEeRmhovwv0Uvba55pmPfd%2Fu4y5wdJl6W7M3DrPUdZIMQrQ4Hz%2FrJwSiAHZq4b%2B6XGUSBbdOEJ3uihjZYZjLSESxUQNjcNJPmxnGEukHNXKWRR5YAdfVRGfOYnvvi1ar2LR0zfOxt34M1zukaGgUqO0SqVffdmKRJITrpW5AUYkTCPUGDsY7MoIHkRfKtQvMAoZvhp0ZBtCaMP4v4HsozOryDccgRyHs6kM8bdBTwcFPLnTpaQzgBxiJur0fxVZZDCToojPBjqkAdpXUdbZz96GI1%2F%2B%2BU4tl71zIsUYaWf9jqiqUkmKmMnQjBZjtPclmJC0lw2fUHK8yiZx%2BSEhXeIEzIrVkR1wyoh5z9PHSKIYZDbYkv5AsI9oo6%2F8OX6cDIaQ4g%2FkFQABDDfsrjy88xPkW4bM8ITJXT3EFxx%2BMuY0TJVxeHJHpChLp7czLFQ5M1241eL%2FNgKT%2FXeW9BjmFhhZxi9co8hS4eJEcy%2BP&X-Amz-Signature=46c122dedd5390d37b15e037ea336a3be1de4ec71b24dac5b162f5c927b8a3ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTE2UGY6%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQCzlfg5Iq6ASGWptXbgT%2F9UYREVJzErel1P2jtTnfAAJgIhAP7aPWvdHNgW4pfD%2FdfYrKF98Y%2FUTu1qcxAQYIChGtaRKogECNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoAYXYMZMya1FvMgYq3APQBwtq%2F0AbqGArBsKnMBNuo%2BhzLyi5MGepki62p6WTpKuseNn%2F6Gam%2BM8p6QptJ52zmT2cfjbT38Bc3PBTCzfkyb%2B5bTDTd73BmoY2MRaDqx%2FlOw89%2BN9hWGK2sbDZfeJV52HxvIx5M%2FfpS9yIwLjdvZLRf2sI1m6yzKrI4rGVKy%2FxmLG5%2FI%2BmAv9VeBpSd1GCDV1c%2FtyMlntM9JCSg9qCcM%2Bfk0SynfsA5aJdbAKahEXdw%2FA%2Btx643sz4ebP%2BILfxhvxyGHuz8Vr%2BLmUwOSophxJILAwbzgEg4hWApqkHnIRAav0dJH9zNiLnUT1XkUJ0ot2%2BtjrMguEqbQxlJXGhU8PKbnMYSr%2B8MYBppk7LVGydNlsjZ0BL0J4Y6gEeRmhovwv0Uvba55pmPfd%2Fu4y5wdJl6W7M3DrPUdZIMQrQ4Hz%2FrJwSiAHZq4b%2B6XGUSBbdOEJ3uihjZYZjLSESxUQNjcNJPmxnGEukHNXKWRR5YAdfVRGfOYnvvi1ar2LR0zfOxt34M1zukaGgUqO0SqVffdmKRJITrpW5AUYkTCPUGDsY7MoIHkRfKtQvMAoZvhp0ZBtCaMP4v4HsozOryDccgRyHs6kM8bdBTwcFPLnTpaQzgBxiJur0fxVZZDCToojPBjqkAdpXUdbZz96GI1%2F%2B%2BU4tl71zIsUYaWf9jqiqUkmKmMnQjBZjtPclmJC0lw2fUHK8yiZx%2BSEhXeIEzIrVkR1wyoh5z9PHSKIYZDbYkv5AsI9oo6%2F8OX6cDIaQ4g%2FkFQABDDfsrjy88xPkW4bM8ITJXT3EFxx%2BMuY0TJVxeHJHpChLp7czLFQ5M1241eL%2FNgKT%2FXeW9BjmFhhZxi9co8hS4eJEcy%2BP&X-Amz-Signature=e88c3843bfdc1e2298ac288d1ed600e914c87608291e19fb4b4bb525fedae1de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPDBTAVF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIEM4V%2BpWCnArUNRYyvTPQBkGo5aB834zHy1AXX6MufrgAiBsxWcginFXDnzesea8wZJHO2qAsrDa6CWJ21RtYzUAyiqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BhzEjK0%2F%2FWXdFcp3KtwDITT%2Ffa%2FltzKeKcBNeYu%2FmELvTjt2YyIL80PywiKaMd1Nn8oWg%2FcRDyVuZ05SLZ3oG8aHYyM3F9lrTOKuDRS1sUhkncpPUuo2n0IYrjHEFlXnLCERNp1u%2FbAZS%2Btr93m9Pm%2Fwl2zoLF22VhT394mo9v7wgDfbQEBRu5c5ziEh5MG6jyOnblRiNmwKvGXX%2BLb562DhQegPAbeU%2ByRxXJiAFgQ6rGASXz8S5y91Phm4clTihDLFdJ3dMtMrO30y8eCWsxUI740hKGvbqa4jo0Y5BC6UYupBuc7%2BBiyF%2B%2B3928nFPfd6w1MGTYZFNsCWsD2oVunhj3%2BoShujfxkGll6VNdWWRSQ9LYRy9U2xICIC191MKOXb7qwKUV6x2aghhjYGhM744IX0ty3ws3wp0fIHDT%2FGwf7PHDb7zi27L%2BQ6IaPwthXj2bQ2Sc8LJXy0WTfS6xWo%2B3P%2B83hFYziEhvZKbES1b82gDdEuQ6mVBEmJD%2FfuQxtqyJ1oRTQwbpE0zm8n5sybd8YcrT10OHNvUyYgmVzLCUb%2BGedz6ZjrgsTqxLoRShnJCQHl0eHfoFntLSyQZpBvYyROFjKv87LRuHitQp1Y1nkuhOzr7wwx8CEpPrv2eA2E9NKB2uMQq6AwlaCIzwY6pgFVcmPGZIwSrgrbHLFLVCWc42gzzys%2BJBd12vD0MDzd37iMSCcw5iJ%2FOTuvjErlNADp7cDUfrcwss6oDgk2ac0oKLOPEvcG3WJZiaHH0x8FwaFUp7Q3hBc3EJGQ6i19zWtO5TD1XYJHNuBkhF58K58Pj7p3E5llJWNLMjDbInhIRLXSpsdWVQ1TbrB3b5H1Kgazpb%2BTiUazOzMqQpmO41gR92GgciPY&X-Amz-Signature=4e7f5dc6895a331169524928fbcb7a928be393c486d31ea6663ce0cad0bbf518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662UHCFXX%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIGukzKaUs6bz30wPXSkodrM5OWZIO7vTP86ETFt7BssYAiBiBfW1iibA0lsLJ3KYwaF3sT0NqQIXmnEwXn37olwiMCqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXXgtGEvMlieYkfUdKtwD7MaGWovQ9KJxM0PG9tBiBiJeiLWS%2BzYFfqZEBHvKE4MUfHqh384dEsbB8%2BUW8VEbfkmpspEVQxq5qTS8ADwNCzpWvzSVaKkpNDKE74sJuqTWEHeadum1rxH63tsREERg%2BBlUP%2BGjrbm33PA8U7H3Zu5iTtczZzDT3TdWXwsammLUitfTczJ0cuRba89G8Sufpjzu85MeC8qnwvFILvS7CFA%2BmxwRc0PHVdnpoq0%2BzAdrCRC9L92KsiAguCr4n%2Fk5Z9lnUx3wV0NTg3nFtj5xbkfkjejXqeJKf8pq4UFCNgh2D1nAlW1j0GqbOXYLfw2izExEyBGZ9eCXXRE40fsuK%2FddSoxD%2B2wJ1lXe%2BQRgCcumoj5gZZB3%2FPrudSGrp1LhgrZOQY9cm4pyUINGtdCys3JqfcnPIxWBRgzXPXhbzOLAP%2B2X0LRN4r5NZiSox%2BWcdAME%2F7%2B5tQbSnCqesKywtMKH6e71QUOy4hNQ9jMZU%2BfCGTRZAitSL%2FovJKhWiwrHbtgjKZXM6AfKoPHeUoI7mcKTY2yTB3trCB46nDIyItUm%2FfqGzj2xeKk%2FzsXi0iToX18bXnBhObTeijoY1PdwXj%2FTnNcfuYp26qQbZWW0Qxa8pRL3jCMJDMooDNAwrKKIzwY6pgEXubRccmEQz843OZWTEXIRp3GzYpe91nvrNP8%2FrVt8eDS4aOzVx7IXmd5QHi0iSC8CL6%2Fj8GBK6JjyEoUcgLF%2F79vtjRoZwPzGK7NIEBRYGQss04W9LjbbmznoXKlQ7NGSrExDGYBofhJEVCURggXsW%2FFJmPhe4kfDq37QU1Oh1uSHO26P6JI3j4qX7nWtZYAfPyHdbfaQ4TwyszytpFnITDVNscpf&X-Amz-Signature=b2a44969404393a8f8645507b1197dcf8aebc7c2e5589367a1eb78e7301136a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIMT46I4%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIELuMm9yzF1Y5HhY3E6aMCe%2BBJKVhXTyv9IzM376%2Fyh%2BAiBAw7mcjcs92hfwLksDtSIAV20IZKv1ULDAHzRR4m9ltCqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4%2BZpJlzEaIUgr7X3KtwDLxSDS32dQPqT28gSJ%2BJox7vLYSW5JmACKyTEo%2FxGvOa1h0cw3NhxeTqlAQ8Xz1KfqoUQGQUS7B%2BjyeWcrXqIcTTZTWxD56hjHaZDgAUsz63%2FEOqwmhDrHgD8O9Bx4Z30YDWZ%2Ft57CVQ%2FOE53SSTkXZvePRKXXwu%2B5hMzlgxlGg0JXjoT1%2FDhLzu1TaYaUqkx5q8p4PPakmcJZcrSPPk2fU0TuwUC4TTyEqcm5X9wPxuc2fFC8O65XxXi46zWg6NNNdkkj9kbNa9tE5vclKKjl4dxQm1N3lMyt9Rho4oeq5XxCreZ5VAr4qv6Ei1E2E0x3wgHhWF4%2BTp2HzOY0SEXN%2ByzBb1C%2FRmLW0uKIHwkIhUPhMtsxrypGWYNHvbZvGDQIR4184Dx%2Ft5nqLa%2FtUuJFvjn6Zp%2B5OuwYIBlTFVIG6b4eQ8n6Uw1XkKx8oEP%2BMNLxGvmsvtamzwI2KEs6q45pilaBLRg5BIR93NxQrQT%2FaSbtDxFJfycUEW8ExtSi3U0%2B2SxKZVQvdyQjpSggFX5arwfqso2Ph%2Bksa3nryROw1XVfCQ97mTmQilbkw6HQWy1vnW%2FGqiNdpGA8FxIB3xqjhY2lVgyGEHcNa%2BtJ7p9%2B7CDz8tSRlzXJqEl7FAwjKGIzwY6pgHHF1%2BSs3AKsJz0YgilcQTT89EHIxomp7mUg3N%2FZgMdSlJTqrvEzQS6kzLnQtMPxoGTnUW%2BNQJ20twzd1smPjJv5S%2BKTRyvjAr0l3Hw8iFhtAqaU7PF7UHqzCQfEs%2F7WTrfgW%2B3HbsYKqJqNvPupHwkBQKSA7vOXcwvfRxp%2Bc3B84ICl4rvGkWIfHLxf3kN7pcAtsi9iTpsPjZljezQGh4d82qF%2B3iS&X-Amz-Signature=5ad78ca7d736e7188c2d4edd947ceced2fb5513774b192a32c163d4da82e0bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637FESIPF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIDIkuGRJ9HKy6Uurtod6fz4VtwaTf54pPAYnrOoDo%2BqAAiEAy%2BXDGHrXjPOejb%2FYLnSFRdJUxpN9QK3RnpC4w3zCA0oqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBikqM1i3mZUjquWaCrcAxk4s2p4JZVdOFsHuGeWRlYbdC2z6%2BHwkX7G4wtqorpZN7UyIMY6FKWhDQo9sdvws8No6iFQMIOxahCIQJpecojDipd18YdKf1tdDUeDOQaqnJSe6VbhpAxvQr%2FpaS5uv%2FoA%2BIOw%2BEal7ELeFFEXS7b6nX%2BYAWRqdVqhLpc%2Bt03SMGttj3ycVwJ%2BgUsozb3tSa8BzALkfomGqxyRNfJppdEur1wKrDVreksrvzUITVDg62i55wFNZ8lRjCdIOLXc6mtnR0CT3dXV0DwU6om6%2BvyYk7qnwIhoCm3MEfym5SSDYE5NNoSx4qat0UKnSORKUVUyh%2Bmmn4JlQVG7R5ieajcEemZSa%2FZjEMZxkbk5a7lEm%2FHBqcUTeGQbNTZzf2iLuFSzPLJ%2FfWvWTqQcEnItRd%2FB3F%2BSEv%2B0ZN9rSUh8Bvo7XDlUAmWSv4moOKo98SohUM9sjoEWJ8lKQuA%2BxnGT3T7E3NcrA58yBue8PLlV7ijnh4hTo%2B8D8EeixL9FZFnS2g8gRTBgWEA%2FxzpzTjYrERFpRD4GE9i3vv%2B23kUdT4uoxYNjnNiQBJR2ymbJaoLee9O%2FJP6bVvW9quStM5wJ79o59o5DL7Bsn5DTGnt1hQDSRCAjDcrqvHqprmsyMK6giM8GOqUBgmPCX2smjiaoWP8eA2ddQ60EEI5MDKqWxoVSCJWSXycg6NUzZdoGhXSJyByPj2L5KIH5HyDC%2FOxxOjSooONdR85%2Fu1%2FLs0ofhuHUm7iILOayGMZwvdxehNwM5i3YEl1pc%2F1GMa%2FGbAjCoHJwmAGm83xqczTQAWLQW4bvwZj7LWE0b5HQ7hXJCFZ4b0Lz5nC5CrLbhCHpTicG2feeD3jM0LzpHlGx&X-Amz-Signature=ef40d55556fb9095c5c6780b21d268822e112d1e73ab3c7a6a2b9d37f205624d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637FESIPF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIDIkuGRJ9HKy6Uurtod6fz4VtwaTf54pPAYnrOoDo%2BqAAiEAy%2BXDGHrXjPOejb%2FYLnSFRdJUxpN9QK3RnpC4w3zCA0oqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBikqM1i3mZUjquWaCrcAxk4s2p4JZVdOFsHuGeWRlYbdC2z6%2BHwkX7G4wtqorpZN7UyIMY6FKWhDQo9sdvws8No6iFQMIOxahCIQJpecojDipd18YdKf1tdDUeDOQaqnJSe6VbhpAxvQr%2FpaS5uv%2FoA%2BIOw%2BEal7ELeFFEXS7b6nX%2BYAWRqdVqhLpc%2Bt03SMGttj3ycVwJ%2BgUsozb3tSa8BzALkfomGqxyRNfJppdEur1wKrDVreksrvzUITVDg62i55wFNZ8lRjCdIOLXc6mtnR0CT3dXV0DwU6om6%2BvyYk7qnwIhoCm3MEfym5SSDYE5NNoSx4qat0UKnSORKUVUyh%2Bmmn4JlQVG7R5ieajcEemZSa%2FZjEMZxkbk5a7lEm%2FHBqcUTeGQbNTZzf2iLuFSzPLJ%2FfWvWTqQcEnItRd%2FB3F%2BSEv%2B0ZN9rSUh8Bvo7XDlUAmWSv4moOKo98SohUM9sjoEWJ8lKQuA%2BxnGT3T7E3NcrA58yBue8PLlV7ijnh4hTo%2B8D8EeixL9FZFnS2g8gRTBgWEA%2FxzpzTjYrERFpRD4GE9i3vv%2B23kUdT4uoxYNjnNiQBJR2ymbJaoLee9O%2FJP6bVvW9quStM5wJ79o59o5DL7Bsn5DTGnt1hQDSRCAjDcrqvHqprmsyMK6giM8GOqUBgmPCX2smjiaoWP8eA2ddQ60EEI5MDKqWxoVSCJWSXycg6NUzZdoGhXSJyByPj2L5KIH5HyDC%2FOxxOjSooONdR85%2Fu1%2FLs0ofhuHUm7iILOayGMZwvdxehNwM5i3YEl1pc%2F1GMa%2FGbAjCoHJwmAGm83xqczTQAWLQW4bvwZj7LWE0b5HQ7hXJCFZ4b0Lz5nC5CrLbhCHpTicG2feeD3jM0LzpHlGx&X-Amz-Signature=c15ebbc6480d013b08be6060d1de8da9bd4040c8a2937e2fa25aa003b58d109a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZBRKJKA%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJGMEQCIEfNfNIbR3chCNSyyVOQthJb989aPC67Be7gZTED8Tg8AiAU%2BPFB%2FfqVUhUpsHLei6S1qVbSiGyoL4zSmcOwjuD%2FACqIBAjU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMToJxKX6GBjo4ih7%2FKtwDwaMOz%2FmRN%2Bjyc7x71RYttjJkZswEN8BHzu2LykDqDdprN4KSNi36VRc0xmyubH8Bdk8JXfOppO8KDhamMOzRmLGs920WZ%2BNczrVELhjuJlQ9X2Y%2FEqcxQ2S6CJE0AaGjbm4TubGuiVRLrFm0TkL78BLQktD0NmVZLKNxHJQ%2F3eBpgQYJnFMHb2DIn1DHx%2FDxKOkg0Bfz4Md82okl2maKq2JtCtMbOY7FD8EqsNUimBb%2BMQmCAhWWICcjof8bOnCDEoHv7lSgupxy9gDAEY8RJ3LRt8xCBJISrM4OvmV42PAL327DFdavfhTnC7ljPuPDsIpTTfr0btVHsveLADTHeWAfPjRvgPvWsyOnflmLB2pd0w5WJLzaibKzJvpep%2FOz1csJLAeB9hLsY2TcYd%2Fd%2ByhNoDuLznZFWTFpCRivukoZIw%2FxDRgTyxHm5MpCOQu9GO4NUvaKJSusIcDXOVYsUr%2BkIL2B%2FF0iMvqmgxCbgarGgy0aCFtT0F8pG2fiOXXPlhfEQ5SXCvVo6rRGV1jrLTtFMYYKQBy8opG6uU1YICPlvL%2BEB%2BJHHM5kfojF3%2FmckYwZNGI1nwwsaK869cbsPrPhuoVPjVXU%2Ff%2BHfYYR1hDg1DE4gkVy0HJbpq0wqaKIzwY6pgGgfvMo3iD1Z8WLqwdatLECsQhhnzixgDiIYaJ6Zrz%2BfPS0bxQfzGf2cMFjPCCc8mjoZgc09%2BTVFQjOq5ZSo9dPxoReF2Fbb5sHJ65%2FuX5sh5vtdex1mDWmbBpN8ndafYpmLr4h%2BDsKZtBuEbBirxNhyDrFEqLjLxlj9b7L9xO1U8bg9gFHoFIaCvCxE8qC3qiM6MrddxmCfY9xQ9%2F1L7ycs34bXIcu&X-Amz-Signature=2ef1530f39b89892b3f6d60a6edf0aba39b4972f4b957f89b862e17128587cdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMU2CJSS%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIEXJvZ2ycqHGGs7S4eBk6bFqLq8yrzobN7FPrQy1OphzAiEAiTaZeBgb9xq7MT39KcQDCXCdy%2BB%2BF9a8PJjCkMDwN%2BgqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCmvm1xiQvG8WhemHyrcAzgA5UQr%2B5GG5M%2BixwX6eHS98%2F6LPwj5suNLa6mRTKt8omORve8EGGFKG5CtqRcVPUZyVw%2B4P3zaCm%2BFPk7ZtMHPKik3tmZVSXT0MbdxNQxc9%2FudZwuqeJyh8e4RBIydnKDlIMhgZTbWQ1JcwOMpgXsRalycMga6xK9%2BHfyXHIKwx%2F%2FO3st2RNrFbElEQyw6yLFiVHN62WbXz4TnMINRxt%2B96eNQV5VwSHZNV%2BZvzm%2F8By3EOTfgn0SqtZ%2FQ8IbAGc80E1BsmFj%2BBv9VMADY4TI7eZbdZ1Rqq1q8F1PfnySwYr55%2BoY8hz0POPjRoSagSFo3uvRl8ZbFL41t4%2BTxrlqFsdk1eWxqA1hgEmgv6UFyWc7A05uVP4755nZd1NypwKNp8GZwbtABHfT5Yb%2F%2F99oJDZ2wRPT2n7VYIJM6szpV3ohTWTnywVZBoM6rkSji4jBAubgvBbYFhiDD1ok7291J8I%2FDfPg4IONI1ngXdhcZXcqTu875ZswDDBwmIc9gaE8OjDyFVUewgatOV5Q4s0cbZmONQlAtUEBtaXgcvyhTWANf%2FSKBjZscTUuGIDKUecD1YDxJSsYT8R6F25V0tLUvgfuivM%2FCASm6Gp84KTq53Uhm6Idh6OQ1u%2BYQMPOiiM8GOqUBgx6utVhIENYFEg19kofG8fvJp9T0y3pQYf0Ws2pjL%2BHJZ6gSTDquiEv%2FZURdTI1vSVFakoDq%2BEHc7Cy%2FbHU7I6McbhfiyChenm7aSzwYvseKYRtWc1TDK4%2FS7JOWQnEUAfuDgMwxbgSd593cTDwbs9w7fOJ1eZM71pR7aQNxk7MiMbge9sVif%2F4wEqOMBEEBvryYElXcoxRFTGuadbMw2Q6dFgDN&X-Amz-Signature=55f69179e17729325beb4dd445a2a345b8b65473218c716265b2e0e99c57b745&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMU2CJSS%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIEXJvZ2ycqHGGs7S4eBk6bFqLq8yrzobN7FPrQy1OphzAiEAiTaZeBgb9xq7MT39KcQDCXCdy%2BB%2BF9a8PJjCkMDwN%2BgqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCmvm1xiQvG8WhemHyrcAzgA5UQr%2B5GG5M%2BixwX6eHS98%2F6LPwj5suNLa6mRTKt8omORve8EGGFKG5CtqRcVPUZyVw%2B4P3zaCm%2BFPk7ZtMHPKik3tmZVSXT0MbdxNQxc9%2FudZwuqeJyh8e4RBIydnKDlIMhgZTbWQ1JcwOMpgXsRalycMga6xK9%2BHfyXHIKwx%2F%2FO3st2RNrFbElEQyw6yLFiVHN62WbXz4TnMINRxt%2B96eNQV5VwSHZNV%2BZvzm%2F8By3EOTfgn0SqtZ%2FQ8IbAGc80E1BsmFj%2BBv9VMADY4TI7eZbdZ1Rqq1q8F1PfnySwYr55%2BoY8hz0POPjRoSagSFo3uvRl8ZbFL41t4%2BTxrlqFsdk1eWxqA1hgEmgv6UFyWc7A05uVP4755nZd1NypwKNp8GZwbtABHfT5Yb%2F%2F99oJDZ2wRPT2n7VYIJM6szpV3ohTWTnywVZBoM6rkSji4jBAubgvBbYFhiDD1ok7291J8I%2FDfPg4IONI1ngXdhcZXcqTu875ZswDDBwmIc9gaE8OjDyFVUewgatOV5Q4s0cbZmONQlAtUEBtaXgcvyhTWANf%2FSKBjZscTUuGIDKUecD1YDxJSsYT8R6F25V0tLUvgfuivM%2FCASm6Gp84KTq53Uhm6Idh6OQ1u%2BYQMPOiiM8GOqUBgx6utVhIENYFEg19kofG8fvJp9T0y3pQYf0Ws2pjL%2BHJZ6gSTDquiEv%2FZURdTI1vSVFakoDq%2BEHc7Cy%2FbHU7I6McbhfiyChenm7aSzwYvseKYRtWc1TDK4%2FS7JOWQnEUAfuDgMwxbgSd593cTDwbs9w7fOJ1eZM71pR7aQNxk7MiMbge9sVif%2F4wEqOMBEEBvryYElXcoxRFTGuadbMw2Q6dFgDN&X-Amz-Signature=55f69179e17729325beb4dd445a2a345b8b65473218c716265b2e0e99c57b745&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622YH2V6G%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T113948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIEQ4Z27nCqaWdJIfHtR0fzyOs0h7HaXPHvCegwetfm1VAiEAi9Jto%2FhFxT9zrojVGY1h%2FiVBSCSCKxiL2sAObkb5s1AqiAQI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAUjajL1YRpQzIzu%2ByrcAyuwLBP0PIw4Tp5%2BurnKpP6zaE%2BEiCanjo21aYpOqZmmkoLaAloQcs%2BBmnh7oIpZ9sfrYtteWBUIu1TWBB6Arx50GKupu12a1DTFd1EdKJFcnPNgUyfT7F7e4aVK8UZlR1uwgKZffdtrRcSe%2BHi3n5tc%2Bf%2FFeHN1zxeCWFupq2slGOSPOa0TXjCtP8gXUXPATTR8kNjoEgoF5M%2FG7kmZn77ULgnGVXmgDSKtlu9%2FqcWEiEwueoA2fPBpIJmXF%2BxvZAFGhE5AXjYr08D%2B2M%2BY8KLI6SDJLVL8fe2gcRQt8hurZ9csOYDHpd%2FmdWiTKqKhNDTP5AheyvJoNvqE5DR8YNawMFv7RgqK2KegRWitlKj%2BG24YrvI3Bfl1%2FUVbSvURFoiPwDctaUmUReW0vny8fAf3FqA9fxjcsknJQlFIoUQSpl0fe%2FFz43CofdTxlBuo8tKFQs%2FHlI0ys2NLZtauwY9yOnlGykpXzCW47T8f7vVss%2Bh1wjPi1hucjYMavpZlpyiFdvrxK31HR06S1i0nIuAHs9QmXUcrOXPe8uycFndV2bL3u73XA3oH7Sqg4YxdT3m3zmWJ6dj3X%2B8DO9Ye96GBITWhHlDLL7NIo42AKQqwGKrnImjrNVe8qcDFMLChiM8GOqUBDZ5GYfORol30MOldFJZKJpehzrc7bW1ssYsVCj%2BNTICzsXYDcJVX7%2Bwz6yzp10AJHNERSnXktmRtQC7BDW5vFv6yy2cbFNZYZ2vSe3oiMmgMkK%2BTXSX%2B8dXKe%2FlsDgQqnAz%2B6y595j42GvAo10lGx1HjkpS55rQKoTOAqJ1Sur2%2BRXKfCkE1CFB92ag0dcLK52L6D7umYWIGwlrzWLywabdheOhv&X-Amz-Signature=b079b25518b89264ce66a0ae0168e3a1e65e0f1e3e50fadbbe96887dccb5e9f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

