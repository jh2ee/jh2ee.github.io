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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BGQDNAO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDVgh%2Br6M9KNN6pup4PzwXYEL08L2E5%2FcjJxEOVpc6vDQIhAOgcbrBZbeUZD2bIBlwcIxytJQZIcr76R5hMqG6O%2Fd4%2BKv8DCAwQABoMNjM3NDIzMTgzODA1Igw2FRSVZtBZxohLtqUq3AN%2B6WKMSvDkV8xju1iTMU4h6rxmh4jkB4%2F2oOds2bTu%2FSqPQCLboJxxYenpZ2Bs2sVGJZXVnUmNZC43pg51XrSUDSraM%2B1EaTvkvvAxj%2FbsVQ0uwAAPM44LbO6dql5VJEEPtOPBa6tB%2FoS1QhR5wXcb4lYAl%2B7sxUBupDSmGNxqjvj47ItCyp9%2BAQnOyt4c3VTkCfuLJHvUJt8idgG2chuHXXGFHPe2oLsZq8W2o5u764yWr%2ForkjNwypjbioJ8kU6a5If2ch4lovtoYEHM2FrK2FSLYFcksPzOH55Nrf3bzH5nyuQoLJ9eGcbkgcFluqNIILRgUa053qGS5Nx%2BTGFu%2Fsn8KW6bqlBSQRh7vIHvuKGAQJamIOB85SNtfXEtsXRxjbCq0bgaX1NL8Wl9JLHGvJLsguF9L0GnX%2BkQA%2Fa5Ii3BL3yKuOs8050ZTE8akteIGFGgOB83Af6MI1%2BtIeTGNVzonIg1giu7PcHp9%2BwlLQFLuIdGczMr9Tt5AfMTG2ftXe%2FceqhESD6NROvvHicOg6uV64EMIQS0S7tcCBVWMxn4KfLBP0C9GIcKiG4jOr95jdzvDlVFoR9m1v7YEtTXiLNgWe8v9VGOtdx%2FcpdK9WB7sP19AUWIXOijoDC1zLPNBjqkAS0t7nKYr30%2FzCU%2BhbkkCSr6boNxwO70GA92suI7iihnf%2B5z3HYH9SPqZ79xkMhYKyQ6LPFhz%2BMLx5Gut7VKbvxtpFKK13%2BJOfT8ArF4hTX6hKCM6jWQFcI%2F7xYG49fhHtJjHOjK2gxH4Ga7KCuSkOJYnl92cIkVHoAUpoIwTAXVSglpFYTo8G2Eo5aY8yOcN7ZvOAbhI3LpBzpa4%2By083gtRQZD&X-Amz-Signature=2f048cd7649276ca34393b5ba93b952b7505b7268ff5d044d026ebdf8486d499&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BGQDNAO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDVgh%2Br6M9KNN6pup4PzwXYEL08L2E5%2FcjJxEOVpc6vDQIhAOgcbrBZbeUZD2bIBlwcIxytJQZIcr76R5hMqG6O%2Fd4%2BKv8DCAwQABoMNjM3NDIzMTgzODA1Igw2FRSVZtBZxohLtqUq3AN%2B6WKMSvDkV8xju1iTMU4h6rxmh4jkB4%2F2oOds2bTu%2FSqPQCLboJxxYenpZ2Bs2sVGJZXVnUmNZC43pg51XrSUDSraM%2B1EaTvkvvAxj%2FbsVQ0uwAAPM44LbO6dql5VJEEPtOPBa6tB%2FoS1QhR5wXcb4lYAl%2B7sxUBupDSmGNxqjvj47ItCyp9%2BAQnOyt4c3VTkCfuLJHvUJt8idgG2chuHXXGFHPe2oLsZq8W2o5u764yWr%2ForkjNwypjbioJ8kU6a5If2ch4lovtoYEHM2FrK2FSLYFcksPzOH55Nrf3bzH5nyuQoLJ9eGcbkgcFluqNIILRgUa053qGS5Nx%2BTGFu%2Fsn8KW6bqlBSQRh7vIHvuKGAQJamIOB85SNtfXEtsXRxjbCq0bgaX1NL8Wl9JLHGvJLsguF9L0GnX%2BkQA%2Fa5Ii3BL3yKuOs8050ZTE8akteIGFGgOB83Af6MI1%2BtIeTGNVzonIg1giu7PcHp9%2BwlLQFLuIdGczMr9Tt5AfMTG2ftXe%2FceqhESD6NROvvHicOg6uV64EMIQS0S7tcCBVWMxn4KfLBP0C9GIcKiG4jOr95jdzvDlVFoR9m1v7YEtTXiLNgWe8v9VGOtdx%2FcpdK9WB7sP19AUWIXOijoDC1zLPNBjqkAS0t7nKYr30%2FzCU%2BhbkkCSr6boNxwO70GA92suI7iihnf%2B5z3HYH9SPqZ79xkMhYKyQ6LPFhz%2BMLx5Gut7VKbvxtpFKK13%2BJOfT8ArF4hTX6hKCM6jWQFcI%2F7xYG49fhHtJjHOjK2gxH4Ga7KCuSkOJYnl92cIkVHoAUpoIwTAXVSglpFYTo8G2Eo5aY8yOcN7ZvOAbhI3LpBzpa4%2By083gtRQZD&X-Amz-Signature=2f048cd7649276ca34393b5ba93b952b7505b7268ff5d044d026ebdf8486d499&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMKULS35%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCDmb%2B63dv%2B%2F5N1GXA5nDM%2F9ZlfPv4xa8LGRdlYwIXwIwIga3%2BU8YiDHczCnA70XN7iGWVGw%2FDNRMAI9ZbG2qsGyjUq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDAawKgHvwWHh5rWnXircA0t068x3yhiNMUFvtenHS2P2mCYa8xPqc9IYQwtx%2BtMIVeeiorr21JU1fCjZVV0HRoVj27xYgPDkNhW4VV3%2BLZ1AgZcUuPyT1Rd7SJwDMBOioVnI4tpxW%2F1vMpdemj1xw6nn3j0zlR35KDjQgyFnea8FqldCJeVG61L2gEMAblmF%2BVG%2BNkkTQ7ueFM4%2BND3QZJD%2FL53T1InsZA1dqgOLr%2F5Kz6gq0b7Puh1C2%2BTaiDF%2Br885LnQklakLEfZWw12PB%2BllICCXAURnAKg21MCB4LhxpQqtfte%2B3O23iY0vyNtBqwC51ezsS2ppYll8TGdYm%2B92ShBjvdeFR%2FSwH%2BWZMgCk0ZS7MtaO2PTKasqP0j2Hh6reNVXP4EC9mASzEcBRbbiWyv5JLr0MrfsfuZlPhfefqIr%2FRIGGwziaYRshzl6R92lX9BgM%2F9kYVcAb6tTm2lJDoMsnJCP%2F%2FdNMXy0zBvtj6tudaeXJEbsVPLD0oH9JDxuSmhXtXnI97k7K7EFL3qt2gSbvde%2B49NLyfm5%2BxRYs%2BFEJfymZP9VeBztHkkvoqwq5ZrkEtiQj6WznwyP2abzDhxPBR8rpDpvytysiKylp1Mz5rHnu53nL%2F6nXW2L%2B%2Bp0P7NBj29C%2BreoZMNPMs80GOqUBKwwK0qEItcLFEVjR1hAfFEmw844FnliZpP5n6PeGGGl3x0n2SqTJXmmzXEZbkMS2%2Ff%2BWLBuwqtrBd398WRFlTjBNJ6cBmDxFhy%2BYJmdSweQAC9SLR3zcLmvqgoCvzmVXMEt61FDRiM6m2I%2F%2B4wnFBTgPqn1jSclFG6dlEEDMFKianHpTPj7LAZLUdctxxstQLbsbgKL825%2B%2FzdJGRBS0%2BnY9F%2BHy&X-Amz-Signature=836eda37dbcc4aa6a8a1cda4b5defde0ff12bd1ca29049e60832322ccb4bf805&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MNEKNE4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCZTZ0KQ2BRn1lp1c%2BIgr2sNbI5o7fnYv3Bl0Kx6ASBiQIhAJRpx%2FoET715Rxhk%2FUfAioG%2F1mmUkrLb%2FNzrSjBUVD30Kv8DCAwQABoMNjM3NDIzMTgzODA1IgyS%2FkedbbvuoG5NoLwq3ANZLBBGk1sejXr8alwouXt3jPAabLASBqAeAg8JCnGUf7rBtPCs70i8pqbIlbbT0aqwaAkhtw0b05Er2SM3hIms%2BJwLCb0pOH6DaW4wfl0B6M5fSMtwAxmRJ964%2FSKzniv3vhKVOv0o4N2fs1Wt0IBbcliH8objYi9TttFzCQJxHqTv5iyWRVzcfHax38%2BCTBUIhCMkScWPYNAnGJGb2bExBrq7K0XQphQTYk%2BGaO66IolqCANA7GXu3yFnSDftAPhDmciQ4CkZBOF0DVzQsFFod5RUk5Xtp8DIbjYXKXJ03wEPiIWwhyHRYdYNa2nvSLSgkluErdMyNEx2DVlshbqgLW%2FS3qvRBUWv8Kf0UKxrZCWK4wSZBdhI2XOYU1RbFr04QfgG6%2BfW%2B%2BTXwU4sqr0yv1yF%2BUn1THYyK3WTJ5Kea8Cutf1hcucB7AZx1SpbnMPmpBILcmwGJNvMQt7AmBU55d8n1rUUsfCpUQk8p0Hxqqi8c5ND31u73Wv7%2FzUi8rsH4fdpE1ZDSVF5IHxfKyyzHzKXAAsULkWDM%2F5oaAReZvEbPy1Q57H6XAXQcpiK4WWS%2BvMxgvDI7w1l1JP%2FFcrOlGH8HTKAj6VBpeVvoID0K%2BBbm9jBKLhMbkNgLjC0y7PNBjqkAaw7OKLGlIrJ%2BfsTvrrQ9UxvDEl%2BJHPyJf25VduH7ieHK5oITMTBXzqCXrQWwqu0JBUMFHxlPIqzGgSz8zyA4Tr6wTpkHzyHp4RKCRUpBkb%2F6b%2FpbXQIEnc4j8%2FrdpAbE298fiVJOUltLrwlMvQhVHY7Ap%2FYnxQgUukRZMBzXFvGQ3uN2JEE3tK2Eb5Zkr1CG%2B1ytDoCNGpQq6p5ldzR1K9LvT5q&X-Amz-Signature=76a504a4fe14861a005c0d87c6012d6936b102580b2529fe961feff9214e2cff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MNEKNE4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQCZTZ0KQ2BRn1lp1c%2BIgr2sNbI5o7fnYv3Bl0Kx6ASBiQIhAJRpx%2FoET715Rxhk%2FUfAioG%2F1mmUkrLb%2FNzrSjBUVD30Kv8DCAwQABoMNjM3NDIzMTgzODA1IgyS%2FkedbbvuoG5NoLwq3ANZLBBGk1sejXr8alwouXt3jPAabLASBqAeAg8JCnGUf7rBtPCs70i8pqbIlbbT0aqwaAkhtw0b05Er2SM3hIms%2BJwLCb0pOH6DaW4wfl0B6M5fSMtwAxmRJ964%2FSKzniv3vhKVOv0o4N2fs1Wt0IBbcliH8objYi9TttFzCQJxHqTv5iyWRVzcfHax38%2BCTBUIhCMkScWPYNAnGJGb2bExBrq7K0XQphQTYk%2BGaO66IolqCANA7GXu3yFnSDftAPhDmciQ4CkZBOF0DVzQsFFod5RUk5Xtp8DIbjYXKXJ03wEPiIWwhyHRYdYNa2nvSLSgkluErdMyNEx2DVlshbqgLW%2FS3qvRBUWv8Kf0UKxrZCWK4wSZBdhI2XOYU1RbFr04QfgG6%2BfW%2B%2BTXwU4sqr0yv1yF%2BUn1THYyK3WTJ5Kea8Cutf1hcucB7AZx1SpbnMPmpBILcmwGJNvMQt7AmBU55d8n1rUUsfCpUQk8p0Hxqqi8c5ND31u73Wv7%2FzUi8rsH4fdpE1ZDSVF5IHxfKyyzHzKXAAsULkWDM%2F5oaAReZvEbPy1Q57H6XAXQcpiK4WWS%2BvMxgvDI7w1l1JP%2FFcrOlGH8HTKAj6VBpeVvoID0K%2BBbm9jBKLhMbkNgLjC0y7PNBjqkAaw7OKLGlIrJ%2BfsTvrrQ9UxvDEl%2BJHPyJf25VduH7ieHK5oITMTBXzqCXrQWwqu0JBUMFHxlPIqzGgSz8zyA4Tr6wTpkHzyHp4RKCRUpBkb%2F6b%2FpbXQIEnc4j8%2FrdpAbE298fiVJOUltLrwlMvQhVHY7Ap%2FYnxQgUukRZMBzXFvGQ3uN2JEE3tK2Eb5Zkr1CG%2B1ytDoCNGpQq6p5ldzR1K9LvT5q&X-Amz-Signature=eead8f9ec8a4446cff1da236285d9d64366d0439479dcc6e3566619c6d9f94db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IWS3EPO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDTNhKYH3fY2zbPDMEDtE43sRLbfefxNYvE0%2BUnGivxWAIgMn8OM8Jp6XJMF8CIUyE9V6dj8BQWyHSYqdsIXpqm9Nwq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDB%2FaPi1sh2KtjP817SrcA6hONwNSE8ZgtcV3%2FUlBOD44QLTdVKDn98PqR4Yrs8uorDVGf1XR9RKsnZaQw9FXkG9bgN6pjG30fjDVBRUjnXVZDfXqwdRspdtfirzyCOmIxx5ur0IxyVWCoZt%2FvjlpFmgY0vNg8ZIIAeHXeeNDqE12O6UjJvZOmxqjST9rTgr2Gm22SjJCsNQin%2FRDwCbEfBuSx2dPGndiiEIvssFdtQkU8ESUKIZPIMCn%2FcdEYx27ZRst0%2F830tueARNOdwhCT4Zu2Ywru1RFo4LZwMhCJXMO%2FWtvIn53Jpe%2BIwXg9lIoYTztwl4nJntFM%2BwSKP62%2FFEgVlF%2FkIywNGW%2FkXk26QlSmdPUoChqcB%2FqnzVBTPflIRPvN%2BTVb%2BMrBOgqw8E0Me60%2BGyn%2F%2FD8RYCfcqnLZzzBTH6HmP%2BT7llt9jQVddDkdjLUOL%2F%2FNXejRgsFv1%2BnPufR00eubMy1IfUP6es%2BDkp8F2U2xX4UMUJEEdyzvxDuUdzN3zSZBRk5FipvcIWo5J1RrukfSVBFyEMtzvfKsu1BtmnDM0C1oBedZzxMmYigzbSys7NrU2up%2FGaEcKbIe%2FerMCBkXoresZc6U4N0BoYXkZaJA6%2BV573lLiwFvLDLbsmKspTxbYGkbxhuMNLMs80GOqUBlIXpUvT%2BT5W%2F5fYAnuVp5NYb9DektR0AMvSQnMcPBKic8I86mXMKc%2F0447k399928rEjyjsC8aoH6oN5%2BveEdOmdm5WP4FsrtTkaxuKUFY%2F9OnPZbhdprNO8Cqwe%2BCykvmQM97%2BToPbUcOlrvVl6j1oW%2FXh296esvkTlPFTpBHGru7zxcDppoAY2rTO4hMgJHa4XuFNqi03FoYdAR5URg6wjElL4&X-Amz-Signature=59381f9def1450291611b268c40c29a71aa9a6775b0d7518b7e84d2391ae1e04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2U3LFB6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIBCAZu167UVuukJqPF8xwtNpR8aE8xx3cB2349LF1jfYAiEAjxTFAlCzGzuTRK51iHC1E8QM8nhyl275LrRTzuQJXBIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDAl49ihrY3WisT%2FZXircA%2FdsBAMiiVRfM3At7jTjv6KjKFGi1tHa%2FPcvpLO0XPqSoDKSNx1L8nwzwrPbQEdDnXLHkxj0f4%2BUwgkQZ2JfMRvc4XH3L3qBOq2Sqvr4EVRS5erG6rjg5hGVrTznnvdYJBds6uL5JcGLfIHOuP3OAvL5kfplT0TKlCIL8xIbOnJSvWV6VyYZiLK0hTKKJzpPUrYneWUAKzHvlsON9lfwtW60lei8MEQttqCHEWYeLt4vpxE0yH43GHWScnc76Sjaug%2Fl2EVMYpjz3BTtgh9EHMF%2B5HR1V%2BhTNRIsvkdWDpNla5nnD4mMOYOMUiy5LNZGuyITXgGJ3bSBxV0lBVAmn9wWZvaA3Vq7A9xkN3wuLhb1xtKzM%2Bh1W1ROpaoY7ZkVE%2Bz%2BbIjXehIzAdCnvmEoBvJ%2Fw6%2B%2F5dfo2dyb%2Bgs9zgl3VPqslUKTs7S%2BD427f%2Brbm%2B%2BPKFd8NE%2B0LE7laJn6cyaHHDswTHggMFEvgbQV4IcHblwxqiOspghECUsVJXRUoiSxK6fZzdiiEIGHqaeCiA%2F9JX8lZ1T7SGqNuYJsEDo%2FdMivB%2B4zYJ5IOux9YFOihpsi23VZQ%2FVO7xHkJMtZGQzpo8nWkGZPZK7DxptrVuJ5laqMFvVr4eAtdMA5MKnLs80GOqUBbVMlaXLgreGOec%2FHEYYrAtl0NNwVUM6XcXdDTBenQz5Z6H04muroZfY50y7LANGn5zirvl1J36jVwMM%2BmqNOOfiIRUzJPe61yYawdjMqAgr1rHIg%2FFOWtX%2FBK3mT33e%2BN477cRhZq61XdaDhjhZYoXzenEj%2Fr8habS%2FGiJ9l%2B%2BqUMRss4hLmAmRIuOzFEFZz%2FdrhGZATCG0yH4ZLJBQM6G6x1oGp&X-Amz-Signature=33c0c4a5c6832e14af52bc7870c86aa237a05e86e83f240545481599b2486ef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664MWXING%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDIA9x%2F6uOSY%2FQNkBfuLRWnFBEo7AawjLgI9zvVF5ng4AIhAIF1BIYSAFAA%2Fa4oE%2BpIOeNCiI91KA%2FmHGBhanpGIXVGKv8DCAwQABoMNjM3NDIzMTgzODA1Igz5glE1JAwh56UPNMUq3APmlFlkU0dxYayvB%2BrZmSzKHAj8IwDAS0lblKLJc8HlJOit8XdH%2B9aGiailG6rYinxT0Bram8ZCjgqOeoTxuR5nnhz5882OZtRWWGJGpNDbh5b8sBKRcg9eQMHGWB%2FN0mUj9yFsDcoILapfqfDJyA2zsSyBjSR6gReqe4nSJDMQzlDnsea5B8nxSCM1KUVaKmT%2ByR0ku67rt%2BbduCBntSZigmO76zktnau4KtL%2FpLX8WwSnlndCl8sOrFY9AkbYBczDJF3zvEMCgHw0FvJluLnKGOIZb%2F0tIUJ5Ozg0JCbc6u8gJdqrZuYmDn%2BKH4pS%2BYyXsRTevwi28K%2FxKhVpec7bGuko%2F3U4XZcUV77cVYZWHK5j5I5jwK4HdpoylkPPMO%2Ftc3aifZeYhtI9zDeqgTkr6gi8zfZbUjS5QHIDHBF%2BMcIb5biXEO3tgZzFGvrnGI9Mjoj6GaB4i3lx8qRdh6pwlzTkHG1J8OcbFLwk77e7bj%2FKOkUcDerSpxNo3EXowiEuXqTSRQLlDOLfiMB9IbEe4MRoVuTUXjVEZpjEeJWaLTZJ2AfCA4z8rrwNGmrJzrx4oSX4O0kSWG7r3zQWknpRyzXnuyobSzr3v1VsDpaUH31glH9iK%2Fv75Q%2F9nDDwy7PNBjqkAS49tpT53krGh06RwLfUsftDlXzNbr3IilpIiEsGzVzGfp2erg01c0Jt1NVOyIdv6siyV8sL4om%2FmOI12zFoJu9CkyWWIUWtbWvcTrDzmtJNFum%2B1ZDVQl%2F1%2F3TIF91Xzk75ojCGhtnuzK2mCu7toiylzgSh%2BSV1m%2FLuO%2BpzRV7lg%2FcI3oqeiS2fkb%2FOPW2rBfWJmz02XVundzhYusQIqiQUIOIV&X-Amz-Signature=fbb39fd32805850262a1eb69fa05da9a4084eb206e0a3270cd87eb9912835ce5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHLYEEBL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIGhwS1LAkHlmqXyjRg6mexpp%2FecWgSa48Y420HUk57n1AiBsymQmBKBjpzRAuL8B6nrZMCXl%2BMUbjtxtfxNtVoKLqyr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMepMYBVCMgIiKiTCRKtwDV%2FzzhOZKCPDX9txcdFk%2B23kTXL%2FK0dvt91Jdv%2BvS2As7dZsH4W8IEUjQ%2BwgsxS5fif8ZAxBDPeL4fOhYcSxG5%2Fy9CKZpInbrT9yf%2Ff9T%2FX2%2BWvxBNh5g0BAkDBUaRZMxMnaXXZxCeOHzoFaRqrCVXlDP6%2B%2BjobQQupJs3wZ6MA4V%2B0y3VJrpyNap0dfxRq1YmqJY17CmCqmmrvwrDxDC0oGiebLdPNiIqAmzAsSHgbEKIjDTTH5uOOQ%2BmyI0%2FSXdlGuimn5CeMbWGw%2BQ9citYYMatfeneSpVEW7iDZc5w4Tq3D7eYGu1prav47nTuHjqB0FvXcVcSvIu0XBp5H4APUCVMDeCV8kRTUM0sW5sbQ6%2Fk0hnOiOpjTMe%2FH2SkpyyLTqjBN75fmdXCZWxEzlfozbNOADOBawwWZyppey%2Fe5sFVEJiAwWWzInzMD1eMvAU7az9mvhBoGh3mZf3Pt5e4EI9mFHsRkk294wGu29XPVHxbNpp6hpOsWhy1tVLc0oCbBt0ujA9iHkTtVfBLvryNIL5XLbbBZ5bUC0UQtiQH5OFMOg7wRm%2BEj0a1XAmafqogUIIDM30OeVYh7QlNBs0mxyKh%2BSwPMzM%2F7S%2F4aPAE7bhRPjZRUd6%2FjgWn6gw08uzzQY6pgEBB0dT7Gvs1pGXbjAeyLngbw63hD4FPQNqEkJvBe5PuUB0jeufooJJP%2Fgx6q98%2FkuMD27siev5EvbKirOtH3XKUsHlkrIcOzyVtRHrF9MX%2FOkHjMNL0NMii5LBJEWk8c2Ws41kGqIf0xe%2FocsCqzsaw2oBdPlCxij3NawNpV15qOgUL1VuxoJtRPuTak6bX9vK8t51309Bx4apMxnqPjQPvq2SZlX6&X-Amz-Signature=11784cee315ec80292c00f3e6e5d4e01150dc9e8fd9d5282f9a882e20e2de254&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHLYEEBL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIGhwS1LAkHlmqXyjRg6mexpp%2FecWgSa48Y420HUk57n1AiBsymQmBKBjpzRAuL8B6nrZMCXl%2BMUbjtxtfxNtVoKLqyr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMepMYBVCMgIiKiTCRKtwDV%2FzzhOZKCPDX9txcdFk%2B23kTXL%2FK0dvt91Jdv%2BvS2As7dZsH4W8IEUjQ%2BwgsxS5fif8ZAxBDPeL4fOhYcSxG5%2Fy9CKZpInbrT9yf%2Ff9T%2FX2%2BWvxBNh5g0BAkDBUaRZMxMnaXXZxCeOHzoFaRqrCVXlDP6%2B%2BjobQQupJs3wZ6MA4V%2B0y3VJrpyNap0dfxRq1YmqJY17CmCqmmrvwrDxDC0oGiebLdPNiIqAmzAsSHgbEKIjDTTH5uOOQ%2BmyI0%2FSXdlGuimn5CeMbWGw%2BQ9citYYMatfeneSpVEW7iDZc5w4Tq3D7eYGu1prav47nTuHjqB0FvXcVcSvIu0XBp5H4APUCVMDeCV8kRTUM0sW5sbQ6%2Fk0hnOiOpjTMe%2FH2SkpyyLTqjBN75fmdXCZWxEzlfozbNOADOBawwWZyppey%2Fe5sFVEJiAwWWzInzMD1eMvAU7az9mvhBoGh3mZf3Pt5e4EI9mFHsRkk294wGu29XPVHxbNpp6hpOsWhy1tVLc0oCbBt0ujA9iHkTtVfBLvryNIL5XLbbBZ5bUC0UQtiQH5OFMOg7wRm%2BEj0a1XAmafqogUIIDM30OeVYh7QlNBs0mxyKh%2BSwPMzM%2F7S%2F4aPAE7bhRPjZRUd6%2FjgWn6gw08uzzQY6pgEBB0dT7Gvs1pGXbjAeyLngbw63hD4FPQNqEkJvBe5PuUB0jeufooJJP%2Fgx6q98%2FkuMD27siev5EvbKirOtH3XKUsHlkrIcOzyVtRHrF9MX%2FOkHjMNL0NMii5LBJEWk8c2Ws41kGqIf0xe%2FocsCqzsaw2oBdPlCxij3NawNpV15qOgUL1VuxoJtRPuTak6bX9vK8t51309Bx4apMxnqPjQPvq2SZlX6&X-Amz-Signature=06822893e425194505637ae24a72a79570e59f8612824ee90e88c17d859fed2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MWDKS6O%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBFBejWNzH%2FzV62GPl7UwxqanJndhrvHrR%2Bd5Ky8bC5EAiB3Q7aozxY5qiRZJNh8kF3jSBOXd8kceyhnL2WJlnGpkyr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMjIflSmrvYxlQ6s7VKtwD80FHKFlM4dDIwrBeoEVwfMj9zSbvKrsDGEomQ5uwSWJ7G0sy9IQ6Rt5lUj2P0reSNIEx3Cma3WFpN%2FdNZ%2Bmgkh2kMHOytxMnIA1uiVxt5yk8KIsDn1tKZOhM1DX1z2CcEiWQw23ResqRYFfebA0XLMcUqq%2BNTTYHG94DCspATO7boI%2FcfT3FUOA32C51j%2Fj7Q0DZEApobji8GqzPX6FYre2WD%2BR7Tp%2FDfIpmI1tRjp7rFAVsUOHENwypIwHK4vxUpVCl8%2Fo4bLbk%2F9XcT5THm6HVJgQGgqpoX0ry%2BtgG6bZkucMjfyzhdG%2Fxe2UGCCxxxzvH6WJbt1vFf2veFvTMz5NnIsVKlx7BB7yz8UPFdo%2BofQE4uTLwTuBilZlDuS8QxsGyaZjTg%2BTOG%2FYMSlLbauJT4rIEWHuTRCj0nOM6IaABSkphLYsEREUkSkjizmniUz%2BHYa8s2qdw4ye9HO5ZEI%2FF%2BIbKHYi8L0Yo9dlaAooN99uPtiod4T747o4GPZNo2Ph6R29XC%2FQJ%2BiehlBPpVcUa6pcgosGwbKjMiF1CAuLYYfQXNnwyzeWkyrPR0EsrFTriTOgPa6ahQxzaJ%2FRxKEQVA0mnr%2Fwwyqbdf1%2Bt472gS3aOKd5Wczyebb8w08yzzQY6pgGHLak15zU4dOiDMEBA0qSBo%2FYm5L0F7xETOPc20Fx%2Flnr6%2FNWcQH%2Fymh6PoKHmai1li994wnTHh9gDjTJdMbOPqFfEtfZoiUoVrMTLn7ym%2FBNkH6s4iZP2ZKgHe41AuinXZb6XgRFZNxYq8NI%2BGhpa9kG1IAWwoIdEWDnK5Na649PtHiIbnCMGZsuqJeVRlrDOAY%2FvUNoCJTwMcMX7kYQWaKSX%2Bs36&X-Amz-Signature=d6f40880d0bc28026207ee702e49991b4f7d103f21ccb1d892625f8be8ec187e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUKYOPSL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFJkN3bHH97izTuK7UF6W1VBRdVB6%2Bxgj%2FkhTQbiomrPAiEAyLH%2BKmUNz8XSzSxH9R%2BxkrK0KbW9j4gLQsHkX2xf7ssq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDIeB2Xm%2Fy2t6tbSqGSrcAxgciH2hhQNJK24AvWT8fG9Ojbqss0fJyC7ZLMFYMAlCjFAlECMgwz4e2FGB5W9HSm487bbPqQR0VMamsDwYjY%2FdN6N5nXApIANWNavz7V2mvlHAmH92RpRsS%2BjEwsNBfE4gDWqmmjx9ptKQD0XB2%2FNyTGJ8cBWYLLKzlTiZCJ0UvfIxFj2UniOO0SknR3uMxv3CBnUuvPvmiFkGbonPNJy8MWanAmC5UWtB9JuKzVxaMgrJM174n7jas8%2BKFwDS%2B7QXFO%2FdVjQK%2BX3YLBl%2F21luADyP823n9pFaWkm62o1iaAoHG077mGqQwU%2FcG3vynwvVrmOuNBtaUASq%2FyPVw%2FC9PmWjrtvrgZqkLiV5kqyrZObVBJ959yilSnW4DTqDofYOf8KBoOrJkYELaN1XEFfijBV8gFkVVzxWx1YRfIM0RyDNg%2BvTCtOxowrkYXhDLELMojCL0XpY%2Fyf%2F2eDmXeEno5w07YwHHKDWwn7FkL42epqk%2FzCnHVM9NlwAVZkrmFcpN8Ia8uuU5IePFfq%2BHtgdDBi9mpWZ3m08uGdYFV6TVTUWIbUMxWvBebLYpgUGBmdLoOxfnzPzMgyD7iDerbi2RZmoCZqlHqKEkaRC1%2BwLTF5A%2BtI0vtUVRbguMNPMs80GOqUB9%2BbiBUtNANZDEDAuoXD0xkNYFlHZcuRHA6CV92JpWwML2JJr4DoJi847uaLU3QD0eFv76mXpgKX3YyOzWMTlBBcs5ca3FHQBNYhmbiK1MNvrRaBWgAHnHczSBw%2F8mtIlM97AUL3CUIrrdovRp9sHKl1IPECfa5ntvifJkwanDaZk9xSgl6%2FVdLMSy5AWRQTDPx1nL3w0Z2sUDHrq9Ri7Q1RlwraR&X-Amz-Signature=b8a34f583fb7fa0bae78146d2cb735e33e225df3b3d5a9c655ce19ff5cde6365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUKYOPSL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIFJkN3bHH97izTuK7UF6W1VBRdVB6%2Bxgj%2FkhTQbiomrPAiEAyLH%2BKmUNz8XSzSxH9R%2BxkrK0KbW9j4gLQsHkX2xf7ssq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDIeB2Xm%2Fy2t6tbSqGSrcAxgciH2hhQNJK24AvWT8fG9Ojbqss0fJyC7ZLMFYMAlCjFAlECMgwz4e2FGB5W9HSm487bbPqQR0VMamsDwYjY%2FdN6N5nXApIANWNavz7V2mvlHAmH92RpRsS%2BjEwsNBfE4gDWqmmjx9ptKQD0XB2%2FNyTGJ8cBWYLLKzlTiZCJ0UvfIxFj2UniOO0SknR3uMxv3CBnUuvPvmiFkGbonPNJy8MWanAmC5UWtB9JuKzVxaMgrJM174n7jas8%2BKFwDS%2B7QXFO%2FdVjQK%2BX3YLBl%2F21luADyP823n9pFaWkm62o1iaAoHG077mGqQwU%2FcG3vynwvVrmOuNBtaUASq%2FyPVw%2FC9PmWjrtvrgZqkLiV5kqyrZObVBJ959yilSnW4DTqDofYOf8KBoOrJkYELaN1XEFfijBV8gFkVVzxWx1YRfIM0RyDNg%2BvTCtOxowrkYXhDLELMojCL0XpY%2Fyf%2F2eDmXeEno5w07YwHHKDWwn7FkL42epqk%2FzCnHVM9NlwAVZkrmFcpN8Ia8uuU5IePFfq%2BHtgdDBi9mpWZ3m08uGdYFV6TVTUWIbUMxWvBebLYpgUGBmdLoOxfnzPzMgyD7iDerbi2RZmoCZqlHqKEkaRC1%2BwLTF5A%2BtI0vtUVRbguMNPMs80GOqUB9%2BbiBUtNANZDEDAuoXD0xkNYFlHZcuRHA6CV92JpWwML2JJr4DoJi847uaLU3QD0eFv76mXpgKX3YyOzWMTlBBcs5ca3FHQBNYhmbiK1MNvrRaBWgAHnHczSBw%2F8mtIlM97AUL3CUIrrdovRp9sHKl1IPECfa5ntvifJkwanDaZk9xSgl6%2FVdLMSy5AWRQTDPx1nL3w0Z2sUDHrq9Ri7Q1RlwraR&X-Amz-Signature=b8a34f583fb7fa0bae78146d2cb735e33e225df3b3d5a9c655ce19ff5cde6365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNA3HRKJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDxrqI12mfLLVcawUYB%2BQt%2B4A9thAG3Gw4ALPPEoxv60gIgL3W5v5i7S8Vk9mbgc0JNm8CtT5ceLc0hTC7FrKoY5dgq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCZ98ssfDqTB6aq1WCrcAzvv2e7Q100osqcZ1glTyUa%2FbV4gTBTrooZqxY9m9iXVCqLoeQOcIw2tWi5d3MLgsBZqKHdarzKbH%2BWI%2BgCZaiz746q4C9dOfm%2ByfEUfTfgMwadovEyZMs9oVY4aKkyKWjTmx%2FTkiDtG9V76i7yFHWAZkXPnp4vzeOeQwlge%2BYUZhO1wD%2BAzDuXZT6yNxQaCnnBa%2FavAcULo5s7BCuf%2FtZhiSo8kBA%2BAQzfyuwM47Mg5ErpdGLigPjB%2FxdTyfOKF94OyjDJhVAtgicv6m8T35ahSbcE%2Fn7llHN2Wd%2F2UoMVcBfUfNRt%2BMN5%2FqI7%2Fhkne2HVQDmChMZnxyYZjaP9iqYYxCw%2BivkUvsjeJhMAwFtbS2tkv%2FSHfxdHlVXqFMm1aXf1ISx0M1%2FIgV94U29BlTH4Z6WunicqIl%2FF62oS6TDtgF5Gbe4dnCr%2B%2Bdu96ZcqsTe2tXfVVULSroh67KCyjpMDB6ziqduOTgO03lo6ERpTCcL7OZDKTkETyFjHVOwaQvj8HweN1BU7uhw8BtNI1xwwAm6zbZrJZhjguvmbfP%2Bx2ZR0s0E6hNaP0npuWy%2FnwtIDdwF2HCys2zTmgSS8I55WRYDxftMj1EnPRUFykb3PF7flEEnnsxzfDMZiWMKjLs80GOqUB6PFaNa%2B1P3D5dnxqxXbGS9kPj1hMwd8MlxujKsBEc2a7WRazbdqN4%2Fqh3lX8wy68OPtmHp09QhRK1mXmsrFQSag7hgvb4jSfp33jCWArJJldRrGTbttOMIp7MHI4py6ICYtArZL8BQ7r%2BYt5s9jlswj5pz6R%2Ff4lI9WLlduNnHN4BByY%2FdXAu%2B6mnzqErU4YzoB%2BGAyLVFmJKRoBCzJJp%2Bf6KbnK&X-Amz-Signature=1caaa1d364582d43bbc3f3c242b9ccb9743aeb5e7f3050f276f238431d1d7bb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

