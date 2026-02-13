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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QATYVYT%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQDhOws6VarC4cc%2BaL8eq8xe%2Fe0GVPsOFOLV3mtU7IlaeQIhAMKWBoTYRegymFxZ5NitWVzImOFzB2vxKIJoep%2FFUcyXKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FsguA2L5GIG8zmFcq3AP3M4iw%2FVx0cBW1VEPq8tcVMoW3k8PZ9p467z1mx8PdFtZcq0Mm7cOfAs8WD7dRts%2FpFJ4q6MMGaLKRRWlGgXb2eKmRReTAFtdm30B9CLILOnwADxJ06U3AiCQ7fWFDDC0rUbm0ram6RodLwncn6pwkQAOcwZ3%2Bs4F05lxJjPE6P%2B6JHZipgYLjjcCALS2Zt5zndARpewjq5e4cR%2B7BRMjun%2BZ3OcBwNG4x2X4Fjai275BxW2j5w1jRCZpV50ScQOuULSu09fnYqgLYPu%2F9OIqEYy1soJOhpzMIBGG2HND6HA8avnlScNuyLwcDytTVXAV8ca1%2F%2BIOgLIIK654jT2wKJEFa%2FBYr5cp82GK%2BaQUT9hZq92RapJlLOA9Oi3j0TUUhZvr7UfK2imlLVjD5apJqPxE2NNjY9c9L0lvZTuxb8gpv%2F8xANvbyQsJXRX2ZHiLgeYNGkQVFdnwQ5zf5nJsQZl2WrTcfzBpghwXQzvVlMPHUpGQMLDLRfuP%2BCG7%2FolVS1nSNOpKtVHFUsu41tV30PgSDwwGmBIh6I7tePxcXj1i7RAoFwU%2BxFF3QzuE%2BMBK%2FQXNdwidFIEN4CqquhAA0SIlcVnI9Cd3cw2bF2hsDBbbdrA5rUpA5XiQWPzCd%2B7zMBjqkAbexVMfWZC%2Ft4VHM6KEMLGg77pHIqD4Xs3lJQ11zTPOqLOGAbdi63S%2BTegsTpcTkWXyG1nc1tzAaETy1Ie6VcswPMhKPaAZ2HtZd6BF3tEzrm6F3D5ZI%2BnapRZ6CpzhPMVINqHwmeyXwYp0dCpMKPQcLbDRKqMhGn%2BTihUjqsLFF2vnEUZu3eg6neqLldiSWq39C0Ds0r%2BtTDh4rikg66QP3sRFF&X-Amz-Signature=56d7be0f89bfa0076ff675b897ae9b97b99be31380c452490fed029faa29a63e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QATYVYT%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQDhOws6VarC4cc%2BaL8eq8xe%2Fe0GVPsOFOLV3mtU7IlaeQIhAMKWBoTYRegymFxZ5NitWVzImOFzB2vxKIJoep%2FFUcyXKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FsguA2L5GIG8zmFcq3AP3M4iw%2FVx0cBW1VEPq8tcVMoW3k8PZ9p467z1mx8PdFtZcq0Mm7cOfAs8WD7dRts%2FpFJ4q6MMGaLKRRWlGgXb2eKmRReTAFtdm30B9CLILOnwADxJ06U3AiCQ7fWFDDC0rUbm0ram6RodLwncn6pwkQAOcwZ3%2Bs4F05lxJjPE6P%2B6JHZipgYLjjcCALS2Zt5zndARpewjq5e4cR%2B7BRMjun%2BZ3OcBwNG4x2X4Fjai275BxW2j5w1jRCZpV50ScQOuULSu09fnYqgLYPu%2F9OIqEYy1soJOhpzMIBGG2HND6HA8avnlScNuyLwcDytTVXAV8ca1%2F%2BIOgLIIK654jT2wKJEFa%2FBYr5cp82GK%2BaQUT9hZq92RapJlLOA9Oi3j0TUUhZvr7UfK2imlLVjD5apJqPxE2NNjY9c9L0lvZTuxb8gpv%2F8xANvbyQsJXRX2ZHiLgeYNGkQVFdnwQ5zf5nJsQZl2WrTcfzBpghwXQzvVlMPHUpGQMLDLRfuP%2BCG7%2FolVS1nSNOpKtVHFUsu41tV30PgSDwwGmBIh6I7tePxcXj1i7RAoFwU%2BxFF3QzuE%2BMBK%2FQXNdwidFIEN4CqquhAA0SIlcVnI9Cd3cw2bF2hsDBbbdrA5rUpA5XiQWPzCd%2B7zMBjqkAbexVMfWZC%2Ft4VHM6KEMLGg77pHIqD4Xs3lJQ11zTPOqLOGAbdi63S%2BTegsTpcTkWXyG1nc1tzAaETy1Ie6VcswPMhKPaAZ2HtZd6BF3tEzrm6F3D5ZI%2BnapRZ6CpzhPMVINqHwmeyXwYp0dCpMKPQcLbDRKqMhGn%2BTihUjqsLFF2vnEUZu3eg6neqLldiSWq39C0Ds0r%2BtTDh4rikg66QP3sRFF&X-Amz-Signature=56d7be0f89bfa0076ff675b897ae9b97b99be31380c452490fed029faa29a63e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRROWGEB%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQCJ8jv2uLCCidnLezJfwUukSdK2AQ7niSz6XP963AS0%2BgIgOR%2BRATeuA9wTi1dUlieX0a26munY0JwUm4I3Aug87fMqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDlKHAMfn2ir5JhvpSrcAxCXyWsTwxq80wqQ3WwUsGnbcBVoNfQcJXqt9pbufE60X2zceCxGLAYRhr3c4QetRxI8T0znPEQb%2BnxcAr13cSWOFE%2Fo%2F2TTC0EowqvA5huz%2BGLbk7Bm6jQR9lAKQfG%2Br42xACQvhtsMQb6ERHYo1TWNCO6PE05RGrQzCbhuS2cbW6RyfMJOUQxSGmktHmxLSCi9hJ1z0msgZiD9fm%2F9glvh9Hy5o%2FTrD8wQUaJH7NHH8sQlzH2F%2FoqCCAkZ4dEhCYTjL08UtxgFPTG6LrQZc0C0tj1vMfFky2bH83EHNqLVZWhFep0Pes3kAZ5clX6DEa0bdsS%2Be3vhDNXjsToULTzYEnClzMYQjIPOkyuzujUjE3L%2FXeldG1eh1B9nmQt0rYlAKiU8%2FwJ%2B3glXGDBEogaIto2YVxvH%2FokIEchxeuDYt671NJKSuOUtJrRecrnOSa0QG2P1sYe1Upfl5VoFSpPM226A07LT1zhIT9BUrCaPloH04SpjA6HxN9ExQWc8ZSsAhgoqBbb9xb4NyWOxC3o0x8UMPjeQi8RqunR2JGQRTmhvEAAGKmtr7XLb21pMNOuiAQmQWDkpW1p6EsVYy07GyXof7FII3lLuPxz2zjBjqB3u9oRn8kKXl5ZgMM%2F7vMwGOqUBD3gKI70UHXhuf0mDxGKOwn4xNXJklriBvy%2FIxX8K0Wys0yOYHFwNVU%2BN75fckR7iVqehNUG%2BgNyP%2Fx3QTZQhlc4yeViU%2FUjOQa5GrVVmHdigMYcTWJo6el4%2B1J3Zvoawu2G%2FhgzXu1CpeBoHqqTewqA3DfWCifsZH6TssIYFcB7yahkjKUIUSgYRZXkQb5Qu9tTQtja%2F6hWMGjvuQFoFL8mqN%2BMw&X-Amz-Signature=0989bbd5e8aa741f0064c5aad466848ffc204e60ac82b178d5114a44a097d3da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623LNO5XU%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDcl%2FHTirBww3i7bR1dA8tpT4h43tPStxWp1WSjO35O7wIgCXSzgQQFW67%2B7gAqbdOXSggnNQrIIPJcaqAsplR9vF8qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKCST%2BCp2ksWhIE16ircA0ZN0D8O5KcFHRRRQ3t419ahrP4XOtw57ntNHdqEuUFsa%2Be2yHAbJJ5TXAzq%2FhCsOiHwLWnqL1mJQeVz83ZbVVwELQAC3%2FWvKOEiLC1pfgE443xZfOlu6V8%2B1kMbcS03AUqd87NxYU569Wo0UgEHdthGkUI8VSNpefRngcSL97nHGiLuVlX0btOmqzLJU9kLIWZhUqWCBgaZIgyNJ6dBkK1WjJntREM7DKzRFDS68ALpGyDLXAV6U%2FmjwdzSZmnvaaC6M1aNHua6Nx4kXMaD6mdGdAEH89Th%2Fyf5M59qbJT4sd9KAzUHpGciNNuzaydIf69WOMrodRmaQi%2F1cdRHAMlwIcm4Ldkyn%2B2Rinzb3x9tn0A4RrgHxtK3XHB0DP3PB%2F8hvZZGHgknWIQyuvHnZKOdDYtJdtbCqKen3TIxhYEfOtt%2B67RjIkwKDZ4lf%2BZpvy1s0kjlHKJ%2BUrscWhOMy1tgt2CODjxN8wSh28wet0X9HkQXBlxhwB%2FKm5u8tWzwWzDdffQfTtbS8YqWCOFlJcd%2BBPPNC4Jrt8Av0UErGhMRHJrtrzSyLDFOBip0OTifXihu6q6LCe1DPAilig%2BrHK8rslS3orebnyaCnsVq%2Bky5S0PJ8PWqxJEEv%2FD3MPr6vMwGOqUBxCK7kGkwTpgx065nQnr6Y597iI%2B75xsCQWTa2pqLMPfLiM8lwHDK%2BdJa%2BoSJi2%2FiisdM3mvwNJ8xfh%2BnXtgpTPgBQ4i5kox8qraKLZnEqgxYOj8%2FAX5TlCZnRyxEsBHMmVXNBgZtxvsTHZvfJzTXxYL5%2FiMudhjda%2FYqeofgUxB7yjarf4Pi6grTLGXJ867AKxsyw9tNB1XWa%2BXprqewP3Hbm7S7&X-Amz-Signature=330a97cbe7dca72d2f0a1f2a400f359ce48fbd80e84e6ac87c30ac59949d53df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623LNO5XU%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDcl%2FHTirBww3i7bR1dA8tpT4h43tPStxWp1WSjO35O7wIgCXSzgQQFW67%2B7gAqbdOXSggnNQrIIPJcaqAsplR9vF8qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKCST%2BCp2ksWhIE16ircA0ZN0D8O5KcFHRRRQ3t419ahrP4XOtw57ntNHdqEuUFsa%2Be2yHAbJJ5TXAzq%2FhCsOiHwLWnqL1mJQeVz83ZbVVwELQAC3%2FWvKOEiLC1pfgE443xZfOlu6V8%2B1kMbcS03AUqd87NxYU569Wo0UgEHdthGkUI8VSNpefRngcSL97nHGiLuVlX0btOmqzLJU9kLIWZhUqWCBgaZIgyNJ6dBkK1WjJntREM7DKzRFDS68ALpGyDLXAV6U%2FmjwdzSZmnvaaC6M1aNHua6Nx4kXMaD6mdGdAEH89Th%2Fyf5M59qbJT4sd9KAzUHpGciNNuzaydIf69WOMrodRmaQi%2F1cdRHAMlwIcm4Ldkyn%2B2Rinzb3x9tn0A4RrgHxtK3XHB0DP3PB%2F8hvZZGHgknWIQyuvHnZKOdDYtJdtbCqKen3TIxhYEfOtt%2B67RjIkwKDZ4lf%2BZpvy1s0kjlHKJ%2BUrscWhOMy1tgt2CODjxN8wSh28wet0X9HkQXBlxhwB%2FKm5u8tWzwWzDdffQfTtbS8YqWCOFlJcd%2BBPPNC4Jrt8Av0UErGhMRHJrtrzSyLDFOBip0OTifXihu6q6LCe1DPAilig%2BrHK8rslS3orebnyaCnsVq%2Bky5S0PJ8PWqxJEEv%2FD3MPr6vMwGOqUBxCK7kGkwTpgx065nQnr6Y597iI%2B75xsCQWTa2pqLMPfLiM8lwHDK%2BdJa%2BoSJi2%2FiisdM3mvwNJ8xfh%2BnXtgpTPgBQ4i5kox8qraKLZnEqgxYOj8%2FAX5TlCZnRyxEsBHMmVXNBgZtxvsTHZvfJzTXxYL5%2FiMudhjda%2FYqeofgUxB7yjarf4Pi6grTLGXJ867AKxsyw9tNB1XWa%2BXprqewP3Hbm7S7&X-Amz-Signature=3f5d36ddea26d657c94a7f83b51aa3e4e18b05ba8a016b1970deca17e657d904&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7RGTSIV%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCIUwYmiBCp%2BLqFaiUg1rYWWVDL1DeDjFLEd1gNEm%2BwmgIhAN90i5EwsxJ%2BSHeXCXo1xRybSLqM3HUstqRbj0bdrBNqKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3tmibU3rz2rVkuRoq3AOqlwhSuqDDsK5IiDayG8nEQoZulO87Vo4TPKvaoJ%2FZlBn86AFBu0aFQ1rnYv9at30RImw9CD0ETNq097Mt80D1h%2F1kb5v%2FzfQGiXZOkWB2Y3qbET%2BAYSby%2Fp%2BstMpJ%2FG%2FGFg38Inf2F3lmLhaHzZqD1lHUtva474ZCgEqllVfPZDDZg4udg0EXacldClsbdRxWHNSYyPIVNa64DhsFmcPCv6Mw31yktmHBj%2FCLhcU3mmOrbxOIZex5ACbkiRp9gHnPs6JPS176S7Cu5mPejUOTAIcw1PznAaLjaMLOKtCe%2FsMniV%2BVGZbAfukZIv%2BeOzlTjPtcEAruE%2F3%2BgsD9Vcm%2BrioRgKqVi8KdyNNLtA0U01PAwVAhAsW5YoLwRNois2LMmFBIhJwt0pMF4J%2BqLa0lE1T%2BrNeYMGoHzbVvVgXXG6pdfOrbyN0D9CMKJLofsvCgT56g1MJRQ1TZ1tLGlVGTauxJor6tt8QPe91Xgp6SiuhbmIZyZRxlymvP%2BGtTX1ufikzXgjPwbxSduxeoBk%2FF0K1tiah6dh6sphkEOvq5fG50%2FaOtgLGvcNsxzubzYdkoXmP%2FxMgmHQdg0gtcfXIaY2kmOJG29o2q6rrZF9K5F6depUvTwa6UZ5xEuTDf%2B7zMBjqkAQlLY6hdxLVsFNFB%2Blqo3EKLp%2B87sidCYS3flh3MTaEN4TRR%2F4MsFEvAqgWtMxG%2FXZmdK16s7ePDjqSvxhQFxw8YMJJleVNOrlcjd3Y%2Fm0obyXs8sQETI0eGLGAFx%2F%2BcJV72KpyORIVYGFXxAxE2ZeWTBlWa%2FaFyEuz8MeJbPl1URSHGvCjGvdm35Qm9ssBxy9eM8ZgkdbQEpVnY3Hdhrl7Jg%2FN2&X-Amz-Signature=dbc55399e7957c0374dfa7bac62d1ec8a612ec135515c684ca9576cc663c0177&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZZURB2I%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQD7HFNldhuGbILD%2Fxy%2BcYIsnOA1T%2FqxTNCoiy%2BrKVAyYwIgcEJ%2FHvheY7CJUtDM8NupUFewcAu5HqOM3bTxp9ZLU4UqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6hwbFFhS%2B0PEmsdyrcAweFoniBv9tCQxvNSQRhAGK63sIa7np7a8Vn8zJf7tmcdV2JS7l0%2FslZtxCIppoU9BXpMQcOi%2B3wG%2FFQhkwRq6jwGXmKmohxD0JKXPpEkTQlDmqWKWhbIRCBe8oRKGcQam4ZENCdNsg70J85yHC5hBROnhKdebU85j87jSkSoCg1SNHBSz0anzaGeT6BQCeNU8beGM8Dvfc6D3ix1Cj0tgnM8N01v9fUpLBok5aNi%2FnCZlVkhZ5cRmcT1HQxOECGdWk5UhDDY9juWpRMjCr248oqPLNtOweTlan4R%2Fu%2BnzfThV1xLeYfQvN7Jzv667GiENruyHfPsKFkyXniLfrPDzhiE3ZeKzaTKMKYTeLUyethzhgYeKZZWD%2BFxpC4FdeTszEfUs6WLuvI993oqlS5MMP1K%2Brhs88NkOLkDJ2YFRyi13MpKOlWVSZ3GD0d9x2MmXxZf2OclM4Yb3cGN8Pv%2BZpOxGQuv8TkFFz15insuYfTaN2YgNh8064ExJ0PZFwL4XKTtd6QZcFx0iM9s%2BSuZAIU0NxdufMjq1j9QbotiLMjHKQpTv7SHBFkJDL6UAU0iNDAgt%2FJdJWJVdOFUKbZA6lavF7ckNgZi%2Fofir2eBNX6oTiaCj7FEIIykkDEMNj6vMwGOqUBs6u6v1lKshhXmQ1ob6W0SZ6urjOgDs2fkp6pZN6gX8kvdJQt6RmtvrqgLk7eBTDeNZhAS6fOKwqDhzZeugTW4Ic9b0S4E2hIq%2B5l2ogAZZOBKD2Omf2EDeR8rZkhGEv1hIRWW4YOozv9u7Rz1qBNDZ5SDFmuuGwMUqaVluhz81XQOoL7ddqHqrf3i%2B3bDBQ9Ej6PVimEQCJd8RlL7yXV%2FElRcfAv&X-Amz-Signature=d3b28e91f4fd398cdf20a0deb7794590cfe7d9a2295fe93fc8e02de6865a40cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4S7R3ED%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCEVReTPbu%2FvDB3u%2FQi5EirJJ0%2FdofxfBUwiNbfVF1HDQIhALnlUUpNG0WxfmdfCSUqnnnmz88zSfTE0L5pyLsCPHKWKogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2BsYzIo1o3We0OjJ8q3AMdObm%2FzRp5dXo%2FYLCBjy1%2BW7s%2BCa8e4iGcoMPoO7YVo6VaQfRv9wu3adQuYhgXwC%2FhB46PGxFXEjNcEI6Uo3SfEfT%2Bg4Wdcj98xWemSfbzPf8IW5t9zyCexDusZOQh4Zgxbt3xYyez%2BjY%2BpEQVk6k2PJVoknHy7UQAK8jpQli%2FpK85LChS56uu1nvlHtZJN%2F1L26t31FXpcUOwmXC%2FYchOzz3aD6fBIjKj7VBYnuZZJltTFXD8VMpSsSDnN%2Ffk6ZL3i%2B6MBLPnn0eYXM%2B4xjPzEVWfWcGf%2FfVaT%2BGGr7E7cNbdYYbnBd0iKRW7werXnNtMOungBvxeL3CInw4mRO2xw%2BsTa6LvgvJAFZH1AZiFzstRNU4yoQwIpvCmfOe1MaItTf%2FXIWJybY%2BK2B4BP1ulNFBv8NGs%2F3UxW7oe4klCCztSZzIB9KQmk9aaPUbil88Vl%2FZIAmjX26onEg%2F9TGgzOvinWSyM8HwgFHOJ%2Fg8Zk8ZQPq1H4OQDwfV74rwEFK9svuq5KlYJzCH2vySJaVdyDred3EeD43%2FskrVyDculsD94%2BMIuRyayW7Lovkgpad6EFregqQyVxyN2SIeXnoHZ4PYXpzXfkSihZtrue0SuDTZxpbfsu1nqPcrb6TDc%2BrzMBjqkAf63iuuPH55SlpUz1%2F7JYcJHbngvHMBafSNmq%2FCtJTIdXDOrvsCu3JityYp2il3vuAv%2FjLRTlDCy5mNEW1eBc6%2FjBHoVbuCFdLemeFQxOv6US8sPi8eUBhl2dAWTxe9d%2Bbao0efyNtjLt47A2FqsOAJJgHO%2FLOgEcuXGzCtbWbo3Xhkvd0YNCRcJ4SFbidlLZ2KvExeautOQz12UR%2BkojQUfD0%2Fg&X-Amz-Signature=c20f0d33e5a3066cc5e2c62f4be02bbb25cd4369d8aed64733c4100d3d97c271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6FL5JVZ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCeiODmeMQpwHhPt9%2FDCdziubRBOWLHfHYIq4YfHv9EDAIhAJxhdJhgZV71OsF13mfy9yh6Yg0LfLJRjJpgA7VQF2B2KogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BdpHjKHRb0e1GGPwq3AMI1hlYjnnLVP3LC7kQe3TAg5Rm9rbPD9rJyETagcXV9wDUk92YtbyNp6JopFTst1h6oXk8n9V%2FycoP4cfNkfcbrgXptKfa0J%2FoFyCnMRuoSojfHMeS6VQCklKwpEBrtQM7wd3FUcDa0hyl%2F3DlUT3dtxkOGuXdzkV34jqryVXBXuTPcl1TTI8pVxFv1IJSbtRsFThVGyfieUJITit6SHm5AFo%2FRmtxqemZwo1vXDVL4I2sNnozJRPkwKNzO79qoQMUbnmiro88VIku%2FW21T5N2s%2BHJ%2BHE2xQ4u4Y5%2BS2XI2C84v10xswJ1xq243uxNeyn%2FgS17iyzLDcppDYUEPNvm7IiSG9vWLprsezSW16kGrujrsNJbvGlKxWOhjDzfNEjOZmVRxye%2BFqqucAZvNbUdF1p%2BCQfAHHAMpYbUd8CzVC9AkQrAYwOmB0p54is94Hsj57OFAHL6SbovurEKNBzuU5sy1U4MEBGYVHpeS7s61z6Dl63Y8EZvdBzmgGTxPqeuljNRTUvZd887JcH6kKz0xB9qHWsxiORK5P%2BiLgrYWW4VZ5Tcj40fCoO69s6ODfBuJAzJFPkas0pqhaA8f2U69gd9DdP06OGaO8KdZk38Qg1Zo6WJAc5jcaX1rjDL%2BrzMBjqkAUSB%2BGom0D0RhixfvbeLFOwTuex2dQpzKobGq9Tybmem5uc%2FwG63UBwVl3%2BsN%2Fw%2BQC1lh9evNhELcn6NVyYj%2Fy7kUJ%2BqAS2V%2FVl4%2FYXSaNR6t0n8jdfir7GgKttR44bVUTg7jLhsGCfjy4R7fXaBLjbCYns0tF8pB%2Bn9BTYxnsI1u%2BepG%2B0ynRZ%2FmOHdB4HjuZZqP9q%2FdkZ5%2BrzrKvShuhZ11PPw&X-Amz-Signature=50a24f3930d442e8120078bd19e2cf8a5609e8051587a41db8de4a79e77e0c69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6FL5JVZ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJIMEYCIQCeiODmeMQpwHhPt9%2FDCdziubRBOWLHfHYIq4YfHv9EDAIhAJxhdJhgZV71OsF13mfy9yh6Yg0LfLJRjJpgA7VQF2B2KogECPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BdpHjKHRb0e1GGPwq3AMI1hlYjnnLVP3LC7kQe3TAg5Rm9rbPD9rJyETagcXV9wDUk92YtbyNp6JopFTst1h6oXk8n9V%2FycoP4cfNkfcbrgXptKfa0J%2FoFyCnMRuoSojfHMeS6VQCklKwpEBrtQM7wd3FUcDa0hyl%2F3DlUT3dtxkOGuXdzkV34jqryVXBXuTPcl1TTI8pVxFv1IJSbtRsFThVGyfieUJITit6SHm5AFo%2FRmtxqemZwo1vXDVL4I2sNnozJRPkwKNzO79qoQMUbnmiro88VIku%2FW21T5N2s%2BHJ%2BHE2xQ4u4Y5%2BS2XI2C84v10xswJ1xq243uxNeyn%2FgS17iyzLDcppDYUEPNvm7IiSG9vWLprsezSW16kGrujrsNJbvGlKxWOhjDzfNEjOZmVRxye%2BFqqucAZvNbUdF1p%2BCQfAHHAMpYbUd8CzVC9AkQrAYwOmB0p54is94Hsj57OFAHL6SbovurEKNBzuU5sy1U4MEBGYVHpeS7s61z6Dl63Y8EZvdBzmgGTxPqeuljNRTUvZd887JcH6kKz0xB9qHWsxiORK5P%2BiLgrYWW4VZ5Tcj40fCoO69s6ODfBuJAzJFPkas0pqhaA8f2U69gd9DdP06OGaO8KdZk38Qg1Zo6WJAc5jcaX1rjDL%2BrzMBjqkAUSB%2BGom0D0RhixfvbeLFOwTuex2dQpzKobGq9Tybmem5uc%2FwG63UBwVl3%2BsN%2Fw%2BQC1lh9evNhELcn6NVyYj%2Fy7kUJ%2BqAS2V%2FVl4%2FYXSaNR6t0n8jdfir7GgKttR44bVUTg7jLhsGCfjy4R7fXaBLjbCYns0tF8pB%2Bn9BTYxnsI1u%2BepG%2B0ynRZ%2FmOHdB4HjuZZqP9q%2FdkZ5%2BrzrKvShuhZ11PPw&X-Amz-Signature=43c8e50c48761b810010da65af755aa9cb20e04f6056348e655f4d878aeaa02b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYB6GXRR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJGMEQCIHETjI%2B64laARNEgMQT4%2BynJCmGYF2TB0CyG%2FgzHNSfGAiAsC1mS7ERYHlJXDx9tA96ImK470TuuMjea7iL4r4Q%2FpyqIBAjw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgeQcZh0M3%2B9wU81%2BKtwDi9QW2YVixAQ1ew63%2BAjm90TKcQMACRHNllq6w186BKXPML%2Fy6kMRLRwPdYP0jCTX9RHAqu%2FmUhhqCV1%2FwPAvy1ay8XSm%2F61kfpIklyd05fDOXkIVtRxpCcUoWR%2BpDB9MXeTPuYnG%2BBv9StuGCtk446i2XXiKbSeB0uR1n0%2FSKJaFLX2UxNauEViQqdgtEBvfnVsgJyALiP11kK7%2F6%2FE8LmcG4PRlfXNXzmupj24PblF4xb8JJ74mSesaNVQQwl64NIfTIjqA27zcWhXisyO0SN94seEd5zagW3Ji8S5BkjewSwhR0D8vfegQs3i2%2BSPRozGvpOxfqYzG7LMJ66H3fcFi8E%2Bad89A8cVsUaE4fZvjz%2Bghjb9xgNg%2BjepX8Ya%2FVBCIa8pKmp0%2BHNh99sHe18sy57DYLrU4k6bOqT93uxXsIVMlO6axnEZgAeydsWg2CZtf4m5QoCMeV7RREq9RAWSAaZZgTDoUxjL5zg%2B88z6Ou5SZhAZILgNjiKNL%2BtG0HixxiHFACIq543WYawO90hXPHaIuD640Wa0%2BWUiMbYHlrD9UABgPMZ%2B%2F5zSeJ2eEBbVVq5aOpXWxQ00S0IHUzj9n7%2Fd0lGjRtIwcjD%2Fi3%2Fa7KjBL1qrsZ0Xa2%2Bkwh%2Fy8zAY6pgHtvqFNX3aFgZ7y2E1zAJ9TKdArMGhR9iguoMZ57%2BA50iPB2wpjxbeTem9OG9gyYWwWac9ELAb3dM6VSn%2FPPtRQ8c1zYbryAkoHg3YHe4ZjrvsiGLBLXlDMdKqp5EbEDFh6S4qExe9RqI7OYDhVzwPx0KljhXYizr3GzGy%2FN1fQ8Aoko%2FIKfFMriKciGq4hl99IOwdUyVt9m7s7OyXXwFmV3QHbpZ8A&X-Amz-Signature=2a39d7711a43a4c434b633e91becb7672a04d0de2aff4b64843fda85cf2b3192&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRZMSLUQ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDp1o3%2F1aZ4edsxMq%2FLarChbnW91LekAOEbi%2F%2FpaBWPRAIgGaaPJx9fdVh%2FNOB8hzkZw85P%2BY2eoVr%2F582Nyn3qzY0qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOFJFt3MDV7PAJeSMSrcA74JYP%2FHUwZ%2BRSWEm1JGAJkCoORkOLppxOQh6YdWfH50kQo1wfLL2nhj%2FxGn0XNDaxU3TjLgw1DNZLU2J%2FjZW2i%2F9ZBaNgIRQx5e%2FBz9nHnNjrYy9UnFJr2IBFGQPrx6fd42ZBPT7HC%2FDRB8t3IbSA0Fa4P7fE6alqAC774VEyAbdklbsza6jITo4NrsmZ29Unfyrg9gsXKwvv4sTlQOtuxrRhLLGBGjR7tCytQdwPLEhUSNaQJ8Jy%2Bz6B7K%2Fayy4OQivk2KhVyt7mBnrdCGnQ4rVwY1%2FNL%2FH2H1ow0%2Bay2%2FFpsA2RzqrBG%2B8bozHR8QKgBgCcC7DNqmRX8YhHTE1AIAEamZuCA0foGsWtoSkfonMK2Vam4P5TRyEEm2HPlfNvFAsjQCkyAl6HWD%2BF9gp2VIlivJh%2FDTqNMdGWo4tsc%2FEMT96rshp8C99vTzfGHLOJeCZ4dEYL6d6cH4Z%2FVhrs6zdWlsgeshHFSTWa%2BRixP%2BCgMUueIAbe%2Fhgn7BG2duNpPjhX2jSmsNHJdSEPD%2BoYOMwaRBuPxKw8e0oJ3oi1zQVdnVpP52b64616KdsmVJZqeKyryo5%2BmfHRBptAmeQXgF731fBoWyLsEz0Zf89%2FrhbvznPJOmfNgmMd3pMPj7vMwGOqUBcEbjKPER8GL9zp69VtiG7rP2IFykybivEpO2EjAps6RBG893eHSUj%2B2r%2B7kM8jUbSlw%2BfINKGR0wEISWn8ol2MUXd37yp6IUL3vj3zv%2FTksj8I%2F%2FglCEM92%2BDMs9eB2ouA0ES7K8Pn6o%2BrmaTPrwTVX53qXWlhidyFZ5FTQx6gR3hHUPfQLOz7YYROkKBJzmlA38aBP1FUP6L4vCZKA%2BKQ9AQPlA&X-Amz-Signature=2be3694138cb27f28c41d8bba63895001e569af9d0ccebd1debb0c0936dbad2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRZMSLUQ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQDp1o3%2F1aZ4edsxMq%2FLarChbnW91LekAOEbi%2F%2FpaBWPRAIgGaaPJx9fdVh%2FNOB8hzkZw85P%2BY2eoVr%2F582Nyn3qzY0qiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOFJFt3MDV7PAJeSMSrcA74JYP%2FHUwZ%2BRSWEm1JGAJkCoORkOLppxOQh6YdWfH50kQo1wfLL2nhj%2FxGn0XNDaxU3TjLgw1DNZLU2J%2FjZW2i%2F9ZBaNgIRQx5e%2FBz9nHnNjrYy9UnFJr2IBFGQPrx6fd42ZBPT7HC%2FDRB8t3IbSA0Fa4P7fE6alqAC774VEyAbdklbsza6jITo4NrsmZ29Unfyrg9gsXKwvv4sTlQOtuxrRhLLGBGjR7tCytQdwPLEhUSNaQJ8Jy%2Bz6B7K%2Fayy4OQivk2KhVyt7mBnrdCGnQ4rVwY1%2FNL%2FH2H1ow0%2Bay2%2FFpsA2RzqrBG%2B8bozHR8QKgBgCcC7DNqmRX8YhHTE1AIAEamZuCA0foGsWtoSkfonMK2Vam4P5TRyEEm2HPlfNvFAsjQCkyAl6HWD%2BF9gp2VIlivJh%2FDTqNMdGWo4tsc%2FEMT96rshp8C99vTzfGHLOJeCZ4dEYL6d6cH4Z%2FVhrs6zdWlsgeshHFSTWa%2BRixP%2BCgMUueIAbe%2Fhgn7BG2duNpPjhX2jSmsNHJdSEPD%2BoYOMwaRBuPxKw8e0oJ3oi1zQVdnVpP52b64616KdsmVJZqeKyryo5%2BmfHRBptAmeQXgF731fBoWyLsEz0Zf89%2FrhbvznPJOmfNgmMd3pMPj7vMwGOqUBcEbjKPER8GL9zp69VtiG7rP2IFykybivEpO2EjAps6RBG893eHSUj%2B2r%2B7kM8jUbSlw%2BfINKGR0wEISWn8ol2MUXd37yp6IUL3vj3zv%2FTksj8I%2F%2FglCEM92%2BDMs9eB2ouA0ES7K8Pn6o%2BrmaTPrwTVX53qXWlhidyFZ5FTQx6gR3hHUPfQLOz7YYROkKBJzmlA38aBP1FUP6L4vCZKA%2BKQ9AQPlA&X-Amz-Signature=2be3694138cb27f28c41d8bba63895001e569af9d0ccebd1debb0c0936dbad2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WC2ZZOMT%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T162937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQCJm%2B34AHkfS5iAm9f1zF49F9uoWBpFKPd5UEKbXCvuagIgcReaOkJYUWCXDcB5iRo72CUyEuJulmMXEWMzfJ08fjYqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHWEqXKOf0S1spVPsyrcA25tj8D0BRP2Bs%2BDmIk%2FjDknPf02DJdA%2BRkRr%2FBwlV0qhwW7KGfNrc%2Bwr13gza2KQ0Ad6ly9qdvQTfCiYhJe%2FQdBSfNAEmDmODe%2FWBJ7TITWgdcRryEOsLkhasxMwdWZOa5nQAe%2B%2BfMWNrMrmFpcVpPqX0iVogeIKaVDRAMKFvWYcBzZL7t2uZlABTqxHzxyhn08rBmNg1AuViLrewpuDTTqgyyczw2J80tCYwmWY8om2rpOBnxOmLmI3Y8GkA03KDSjiWd61Kq7ZSQ3iMnskBQwfVWjYhJ1EEmDZRPsLGiRnH4AN5rpKtIxjPp%2BcmPJGnNVrw2ns3h0JzwC3J2VWOWusNbwDdOPKllwr0NxotZtN9j7RnU8zJoMKrJOoAYRoJYwmh%2FGsKsfbNM2RmNd9VMKzJqg%2B3fewJTFpgcCZEH0ObjaUbP5Al%2FEYOKpxs7%2BnBt8uH6OmxLcI0vqo7iz0%2F2yMx8T5VHavOd5qylNa%2FwUwfGcgta6RvAb9LVmDEdMHe0%2Fp6Q34VVa6BgdREr83N4x6JfkIQV5hxt4MYt4hY02a%2Fvv%2FUj%2FK8qlb21wE%2B%2Bz%2BmzMbrLJ5Gt8yzNwPYs%2BWBCQPpn6WwPjUJZGnqTtBfnBR8%2Bo0vAUDXjlZyhCMOf6vMwGOqUBo3yxaVAc3dRTJHFz93R11AdVqtAk9e%2Fwjus8uUv0r1tce9hoX%2BX5nGcNCe5B%2BQMwlSwBTkmedLv87lcmQr2%2F%2BgOQ4xNch9AcRIcwPBg87yAryWC8%2FzuMQWKUY%2Fnh9PGEOY0FAfl9ysOFvzj%2FIqEBfeilGK7hDrksfS2SUFq%2BBbxUryj8d%2ByjpgjZZ5r1O0UVyD%2FCHsVrDCaCDz6erDuy89VyB8hN&X-Amz-Signature=93f96eb94c0ad598d8ccabaa35e3f581994263e9afad85b6fb7fb7afc7088d9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

