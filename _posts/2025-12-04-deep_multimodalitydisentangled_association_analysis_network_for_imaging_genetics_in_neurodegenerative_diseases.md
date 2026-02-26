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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W2SHHF4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDh2IedVHBr0GC5ef5hf%2BxqkvUu71cTrf%2FWQFu1TKuszgIgEGnhL%2FtuWE7zM6CyVHbOZaOL8Vex7shDbIqW5vYKAnsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDGN4Ys7IocsaWMTemCrcAx0E5ZUyTX74XpCy2xMnty6aGHk7GckCsTEvt6uoyPCXDGoYd5Ckr0k%2BO8%2BoeUAdx1xDD9E%2BAK85QHbHwRwm%2B%2B1xKb9ZUAfvaualBkj9gQ3MYQrK8GoIgaOyjD%2BPVErEWCjx4e1EB0iHhU5gfaj5IS%2F%2BcwGmeIHo1jCjl7UXWIyOeRasKOIQmwKjAnwbMx3V9Fmlfu5HseGUQM14WTXNEfJhbbONTmXDLdEgt3q%2F0iwDDySuIRpbg0cNUI6z4bv8lJ%2BiuKCVEvDpklHKzeHjH8N4cxPASvImfTnIfsKYfR1o%2Feg42%2BFiK66kgTff2yjIZZ1xdEExG%2FTsJjDiNNw1sJetZQXZuOAJkHeTAGKmZSNnK7KJrqjFTyoSij7d7kJd3rNmoBwD0nJnL2UW%2FrA8k9RXLolIauL67EGDaQZ6QQXFljwEquwYmMUUFud8h9d8JOX3LqoyImLYEjnFLxq94zgekz5VC7NcDmigIRjLIhOLrniRDr1%2FdI7PbZz%2Fo9M%2FMBnuGLHucuYVDOzLj89BJMcy%2FkX4zKObx4qnH0f8KobGyzPegWCkEAbi3sTPhVTOayLV6HzSDYnsdDkcbOFUgmWcc32kpKf3mLU04Hih%2BAt4yqdum8pe3%2BMehVPhMLu3gs0GOqUBCKhvJHXLublsYWg2zw3M%2FqX6Wm9SntZM32SUma6NuU4BJCtj%2FFHP0mORhROV16MZz2JA2e5I4c0w2UI78AtHtDLFzlzTQYFz2QoN4%2FKhCDaTPnVlLfrfMR1gspZfc69226LREkjwl06le3T1INBGpRid2IbWb8csqA72vRPR3u%2FGcBv2MdxljY4bdoz506aHTtzgIjvZEL2tedRHq%2FVIV10KMfCW&X-Amz-Signature=f3fde1acd65570fd43d942bdebdf996886b6b22042098a845309b4f9caae1752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W2SHHF4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDh2IedVHBr0GC5ef5hf%2BxqkvUu71cTrf%2FWQFu1TKuszgIgEGnhL%2FtuWE7zM6CyVHbOZaOL8Vex7shDbIqW5vYKAnsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDGN4Ys7IocsaWMTemCrcAx0E5ZUyTX74XpCy2xMnty6aGHk7GckCsTEvt6uoyPCXDGoYd5Ckr0k%2BO8%2BoeUAdx1xDD9E%2BAK85QHbHwRwm%2B%2B1xKb9ZUAfvaualBkj9gQ3MYQrK8GoIgaOyjD%2BPVErEWCjx4e1EB0iHhU5gfaj5IS%2F%2BcwGmeIHo1jCjl7UXWIyOeRasKOIQmwKjAnwbMx3V9Fmlfu5HseGUQM14WTXNEfJhbbONTmXDLdEgt3q%2F0iwDDySuIRpbg0cNUI6z4bv8lJ%2BiuKCVEvDpklHKzeHjH8N4cxPASvImfTnIfsKYfR1o%2Feg42%2BFiK66kgTff2yjIZZ1xdEExG%2FTsJjDiNNw1sJetZQXZuOAJkHeTAGKmZSNnK7KJrqjFTyoSij7d7kJd3rNmoBwD0nJnL2UW%2FrA8k9RXLolIauL67EGDaQZ6QQXFljwEquwYmMUUFud8h9d8JOX3LqoyImLYEjnFLxq94zgekz5VC7NcDmigIRjLIhOLrniRDr1%2FdI7PbZz%2Fo9M%2FMBnuGLHucuYVDOzLj89BJMcy%2FkX4zKObx4qnH0f8KobGyzPegWCkEAbi3sTPhVTOayLV6HzSDYnsdDkcbOFUgmWcc32kpKf3mLU04Hih%2BAt4yqdum8pe3%2BMehVPhMLu3gs0GOqUBCKhvJHXLublsYWg2zw3M%2FqX6Wm9SntZM32SUma6NuU4BJCtj%2FFHP0mORhROV16MZz2JA2e5I4c0w2UI78AtHtDLFzlzTQYFz2QoN4%2FKhCDaTPnVlLfrfMR1gspZfc69226LREkjwl06le3T1INBGpRid2IbWb8csqA72vRPR3u%2FGcBv2MdxljY4bdoz506aHTtzgIjvZEL2tedRHq%2FVIV10KMfCW&X-Amz-Signature=f3fde1acd65570fd43d942bdebdf996886b6b22042098a845309b4f9caae1752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRRNNHWZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIEoi4TrMeBlKY0z%2BcpfODGlwCLjj03XqfRORa5lCM9ohAiEAkL%2FE5JDQJJfvHKI0%2Fuqn09f%2BWX0Ay5nMFv%2BYS7JsZlcq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDIIHgxO0ldDg03Hx8ircA0wbKvjv5%2B7QQDbAg%2F2167reeB15rPLav2Lc9Y0NaXO9LC5qGIkrBV8zRAOWR%2BaqOcoZxaNGphE3ygyFk8y%2BOuDVrU%2BFk8iSN3o%2F7yZG5SH0Vw1BAocJKoTMEarvimDezjbyDRQCSaEeDEQAbwRN0qvxMCj9fFG2kNfiRC7JUozXz1L6o3DO%2B7tR2YfkSctHwUynA0yH0cigUTJGInR4AawwdVrRCuu1cbo86R2zukPKcCobjK0h%2Bt3hPpqo1I7f3TaDCcVRxih41QtJs%2BOd5UKrM7%2BSqRmwZc2IiyVpeXj3uDFW5WA9zM8pZj1yQahWvKfKC4hJUAlwhELSdvFBu2eg5q0rg28wjcSI2hH0b%2FYlL6snm6OdsCEdXjZeIniz2ed%2BW0ljIK5waDlWGTm99spYhb%2FIrxlQzUf9bvInc1W%2BiVHJHUmzYqirHEZoc85VDjkey2aLYA0p9VZH2WZDOLQY4H6Y3z6g7SYMOPu4ENNUJeMCffwEcjl4ODUpQnp34udpqm2Qs2Vwqk%2BjHsjs8uH13XjmvWQ1qrJPkm7CykmRRejGtOWH8PHlOb%2FgqBgMJHBcB7pk9Y2r8%2FmFJOwwKPeY79FuQLZTgFH3cJu08uddHXlpR1Gi0IqwVMPXMOe2gs0GOqUBfeaxkFum6MLPrI7g9j5dn38v4NVqUyqDbsg%2BC1U6vRBfxejD%2FswHkKSOc%2FrxKfX%2B7rp2WSQkJW8w4igrzIDgs19zAPdqCfP8hbqPKu17EM4xEHoHZjyex23iRjYVUGKpoLQy708vpATEoJjJMI3OkjqSA4%2BotTb0rKH6EFl6Is7OlLkuY4ksiZrrNIOSUet%2BeEQ%2FkDTnj%2BCDFlRnd09UBEQIu1ej&X-Amz-Signature=dd19d2d3a9dfea5b69644f957a60b9ce97a114ffccf2049a0724758c6894dcd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHDAQCRL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDcW7AGpZB9B%2FLONr5FEZbeVRCx96q7m5pRjdsm5KkpiwIhAMFojKxducgjkqtY50EFSkrvLOcwZ6lWri%2BhbJHSYpzqKv8DCCwQABoMNjM3NDIzMTgzODA1IgxfwA6DCp2V6a1m7Lcq3AM99gM3DoxKhO2pKp8J3pHflDAFthe6AKYXLatgNdhNItjxZtKRVwXFxyai%2BRwqOYrimgFenrMy5zMAPBOYNbK0YdvH3NlVsxq7zhJkzOfzyCB5F4HqXMTUDVHqArbQl%2BX6YsvUSGduJqrrQaikFtHeyL97j7GXyzwwjDM%2FKNqnMJHgJ7WrpCe8RRj42Ar2JJbZPLGTvuhofVqm%2B3lJIuzwNbFd2Mkhk6ag5drS53VDqKcaDz9z%2FFUptvLsFnB7hHKswlcmDZaOz19uswV7443DGzSNQQEp2fA8ecv6l%2FkvgwF94ybs25FZlya6fbx8E74IQie1xoQRJIU0ryOJOH8llXdtSifGAURIky%2Fp27b1ukOSEkv5boC8NVmdYZMpWj31jizQMm8hnw6IiYPVT70Gxa1TaAIImXSJW%2BOVpkxvSmmDAcpkYcNCehMLuR303n0hl83Q5jQ0JnU10NTB1KIiqSU642lTqX%2FbCZ1vR1cvp9h8FF0BfYIyWptofGlALgdTbynp9O6VmDojfzCGQ%2B7QL1M1jlEUYsjHqlCSREcx6%2FNoLPw0IfIWnIS7PsQlPraXuNWlWXzljPUsoOh3ur3WGQaSTfW2bd%2FOpCu4wMtw19PhAVoNzIe0jq8R1zCGt4LNBjqkAfkdc39gzuS0SWPwKtsA206hUyzQVHLpUO1jT7c9R8SyOaQTvHQ9zJaUXvj8JkPrhBi56F8i3XC11v3Qap%2B%2Fk7ywSRhspqNeGY1Ww%2BRQpk%2Fq0BQ700AvouBU4XYiQqS5x5SCUHU1C9fpLk1TUKHGwSISCIi97PNPSDR2LhQoK1QM4NPpr4%2Bd74gsplrStnBgYsJM80jSnNIyMFZvRjPxh%2FL0t548&X-Amz-Signature=53115efef03b01d5a8a25491f1bbdbe5f31b27508a8a92c382809f7d7fafcd19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHDAQCRL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDcW7AGpZB9B%2FLONr5FEZbeVRCx96q7m5pRjdsm5KkpiwIhAMFojKxducgjkqtY50EFSkrvLOcwZ6lWri%2BhbJHSYpzqKv8DCCwQABoMNjM3NDIzMTgzODA1IgxfwA6DCp2V6a1m7Lcq3AM99gM3DoxKhO2pKp8J3pHflDAFthe6AKYXLatgNdhNItjxZtKRVwXFxyai%2BRwqOYrimgFenrMy5zMAPBOYNbK0YdvH3NlVsxq7zhJkzOfzyCB5F4HqXMTUDVHqArbQl%2BX6YsvUSGduJqrrQaikFtHeyL97j7GXyzwwjDM%2FKNqnMJHgJ7WrpCe8RRj42Ar2JJbZPLGTvuhofVqm%2B3lJIuzwNbFd2Mkhk6ag5drS53VDqKcaDz9z%2FFUptvLsFnB7hHKswlcmDZaOz19uswV7443DGzSNQQEp2fA8ecv6l%2FkvgwF94ybs25FZlya6fbx8E74IQie1xoQRJIU0ryOJOH8llXdtSifGAURIky%2Fp27b1ukOSEkv5boC8NVmdYZMpWj31jizQMm8hnw6IiYPVT70Gxa1TaAIImXSJW%2BOVpkxvSmmDAcpkYcNCehMLuR303n0hl83Q5jQ0JnU10NTB1KIiqSU642lTqX%2FbCZ1vR1cvp9h8FF0BfYIyWptofGlALgdTbynp9O6VmDojfzCGQ%2B7QL1M1jlEUYsjHqlCSREcx6%2FNoLPw0IfIWnIS7PsQlPraXuNWlWXzljPUsoOh3ur3WGQaSTfW2bd%2FOpCu4wMtw19PhAVoNzIe0jq8R1zCGt4LNBjqkAfkdc39gzuS0SWPwKtsA206hUyzQVHLpUO1jT7c9R8SyOaQTvHQ9zJaUXvj8JkPrhBi56F8i3XC11v3Qap%2B%2Fk7ywSRhspqNeGY1Ww%2BRQpk%2Fq0BQ700AvouBU4XYiQqS5x5SCUHU1C9fpLk1TUKHGwSISCIi97PNPSDR2LhQoK1QM4NPpr4%2Bd74gsplrStnBgYsJM80jSnNIyMFZvRjPxh%2FL0t548&X-Amz-Signature=e53c1bde0f69848dc24c0408bce041e076096e1d81ecf1f343b670f60dbb9c22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2I35IIR%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAOnuASe3168p3kAZLb7puhDPyoPfTGu3wBtPBc9U7QAAiB7vOimjNEJe0Q5a%2BZNvMSXCRO7kn%2BB97VOFmd4wSpicir%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMRJKWg6QeygtaBBUVKtwDFFM20WsUfukELOnq7UpJEHLy8U48nfcWuAk%2FN2rnv%2FGKfhQDSOw3DQgycIpHPrIeVM8qGdIaAN6rrdI0UAxCBy6CRs4i776M6WG7L0wNl1hHPmBvG78WY9%2BsFAQHACHfRSvGQOfsFEZyMqq3FM6GeALOaau2wC8vpmt1kIcx2gJ9OjSoXHmvt4hlXf%2FPTtJLGYS6G4uDG6BJjIIhN8%2F1KGXafDGSUA1KvDuLylztXRD4Z8XrAYLSwDLl3Kp7bK9BmA6pB%2Busj48JSiL%2F4vzWAOePF8Hk57CXnBF%2FBDb3JL82dicBmmVQNDwX%2BOqT7reuDUkP1PQofocKq%2BEdc8qgT15GCTPh%2Bm%2BGAPkn8PEhzwIh%2B3Hzwbtf4p2eMLiu%2FAnwNfeN2OtJkmg8pwllwVJTVh1AULNvjlDQdQoQUaWx5wCekpN%2Fzy1aMtDl7eCd3Dt5vRD1gI8aunXyU8a4OUok3S%2FYmC0Iht9TodqGAQcnTFHFIQRuFaNC8CkGp2uYQF6psAtgKjgqw0kkSNfNEqPCXahFoVHAbb9bLETsbjzA6A87kMt7SFXf33%2BTX23WT4tGS781gYHbnpUFffqCiLHhB%2BX6wIrmJYqZTQ1%2BZNPkJSIFGU2AnHi7FqHz3Xow%2BLaCzQY6pgEZ9osQqm0eBFXp%2BxqQFJ7o77aPnI7xjf%2BQ72tKHCXCwTwEfPDnOSSXUbYsBrBi2KzuT6ZhEoGg%2BFQmHsrF77LhBWwmEthkVgIU44tU5tGvIG7nlO2y%2Brr7aM6V3LwUG%2BRXiUrqVfgouDa52oKMEZXo2MaiTjv87urAgurAmtnffv0m3IvNLkpRj%2BxchFw4WFMFOAfPHORqDOWcCBVBEkl6pyK3RK0r&X-Amz-Signature=7ed862c36087c253b976ba6d32f1e993ae19a499b363fecd1b87307d41142859&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EG6XAZG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQD%2BP90p1KUXAatQHb9d%2F6cg%2BWnvSTgAVd%2Bd0h%2FJ6uEaIAIhALFKHTjHdeBoa0TTLdniU5EoaRNMksh8PxshhMm1vLgSKv8DCCwQABoMNjM3NDIzMTgzODA1IgxXjkEPJOkmCM%2BPWRUq3AOHdACHGRtWGELeCNJePtz9MkBqNzjfXawzEZRHuvCEhEygegPGdxz4U%2BCDK43k2bhHyjwbVR%2FVeLzeuc5n5Qs8EJe%2B7xX%2Bxy5OY1%2FD7C9%2FfPJX2jB9XiAglSU7eVW2vhLqqHY6o94vf3Oc8zbmol%2FNvKDUMSIn%2BBjeS0A8JMNO%2B96%2FBPeeQveUgNxGnMc6DCupQIWtkWffE5cEaN2dBdXywiBADsZIdsU%2BsoqAG59IDyIIsbpo8sCnqiB29j4i%2BhROXJ5ANGiG2jVYH8QtLPSf%2BU%2FlxzyOb6nynEdfIYCdP6Nwahb3KnO6hqmIOf8Q3QBG6USpdUCLUYqUxqphr73VACTmYf1mHDgbnXeSKMErEivuMDcORpTAhdSuO2Oxq4i5oyKyzh719445BTTfcxG08a9Xcg7mf2aPi8oWsXP5Wg6yaLUZf6FSv2TZQ7c1rvycUWEBSCbSh1ku99xKX8jOCgnU1Jk5tvic%2BvgjWFcPP0aQSLHGTIDyQB0BJSCsWvlSSluve3K9Sl2rS61R%2Bb%2BsXAxDD%2FFNSXvE1ce4ewnoGZ2xly3TIUqjZjLPme5vydG2JGxvVtbpyb4sB2QUC%2FZIPsYTIg82Hg9sGUYcvYvMcUAufH8N%2BDEsFpW4qTC4t4LNBjqkARfULLf0NKfT03vO%2FSaA4bMDjOvTW9xh%2BbE9qifGMYv0kgu%2FSnDi32lMqF5HjfMfaNsg6KKrBOUpNHayHv%2BXc2X3SapaK6hS79TyTMRn5BQp4kK%2BdBTPHS2yEJ7KfNYtRxx1IP3EUHGSL2Ex%2BjqDL8jORqvWGGF02oNmAmjlg1%2FVsTMQ56Wd3%2FhtIJ6ckuOz8zGjCnAkH5XAE4heyD%2F1c%2F4MEH2I&X-Amz-Signature=9ed6238a047070e09023cb10e8ad6fd4110150f3c1aa581d2ba34c40f0a383d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S56QQ2MB%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCICCwghXk%2BEaubLQZNvGwOn%2BehMoZcoB8K8cisnil2K9XAiAV0LECp%2F%2BsyPtgoIpEnl3lDEY21dfaKH3BeUqLrl9u8yr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMQBgJKLl1uX%2FR57gBKtwDkrjpOkVJ8ENASGUqMOC1%2BM6U1FHTwLOguFCSdUozCTls%2B381nTwgsk1RIbuu2dbbVoMIgiGEVoFBDclI8C5K%2B5F4BVt0IdxXXl6aDcZKIKU6sDiADToCZsTRol6nC4Kd5VVoznCAG5A7JBUiz%2Fk%2B1ljPn3r6L5uHTE4UeyAxFmYdCFR%2F96w1VdYAd2eMlhNbeAFDocbzmjnlrUam3fSbHaKfC34qav%2ByxlzfrA%2BCSpRkEsSYFsv7Nmk6Ztrk%2BS%2BU8RcABFdr0sK43OjeYCMeTpAt6jJuCfSRFs8eOYtlLtMoPas%2BjgcDu5F78oo%2FxKyeE5g%2BDn0gXp9Ygo8XebuTGPySaXZTvstfxFQBm1a3KIJ%2FEhI8Sth4Qa4KFrVMsGfBbmhDHlIURgz6nk8yAbvxy4gNbSITDQILqDImqZe3G2DDi%2F7UN3Q5UF2ZSkatU9zNBqbFEmAMhtKhtEecDlvoZ4OUngbUBTzO5sZJnZ%2FNTOzpK0HY0D8TWIENjtD1yKWumn1iqfPkltViUtGzXj6fn3AXuQlyCdv%2FYZTICa05RUPw%2F%2FWacwWeq8mPBTsbiEBgLeXzFNNOw8QM3ANUOskHolzCidJEqDci2T7XhyjBqifJo9ylZuAsPaVXorwwx7iCzQY6pgGjhPWePwXk7LpPYEOVXC%2FbsuBlv1TfxuoC6qhSOOqvr3QtthXsAVFJakgHZGkacaeiJz8EIYJru%2FzLzgjSL6X5zkMp4bp1uiliezASYhsWn8zb%2Fke2zPrQb8ns4%2BZ3R%2Bd5elIbvlJRVtsQDR4zvPgfRzvBpkFsV8n4E4Sa7NF4ckXP5B3x6J8vVq2dUEwOPbIncQky0SjM5ooLcJIByM%2FBoGxtdr8y&X-Amz-Signature=4d5b679e438a7221b8cadded0a34fe15fa4a9374b98d29b0ddf60eb37120832b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZJ4M3ZX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCICybMlUFk3Iqhx1%2FHvpIPlPIz3uwxV6wJhrrY17z4YJjAiEAmEua6mp%2FubaGiUECMlaYn3HUZzZSXTvQ90jJ%2B7dIke0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDIuFwJ%2FjYq0sIcmLAyrcA6mJd80Nn6ylfTWzi6tgxpvOlgg9jMpy%2BYCtiAFi0d0cVf9xoDQMYn9CQmA9tXpPyNm3G0TBvDLYkdT1rRDWpZuDLHWR0M7xjWHHzib8B2FWB3vQoU9Mg%2FL%2BmCLm4zCeRFy1K%2FnqldlmxCQ4XCMbBsDhAAIXYsLa7HqfCO2%2F%2Bnhp1qrEhlRy1afgPmGuEfHUYjoW3fL4BGXUIa86o85Hj5tOffPkm5izf9rsmYTHEfa15BiMal%2BMTpXAgIAM%2B%2BOAuv4L4bI4TEM9yO%2B%2FcYJJVg2R8gdDdmOfZcreMCW1PzGn8Dv%2Bv5In69ZeHElOFXb2kDQjrCkM%2BqaRsfsJab%2FCeZMD6lBeAYCVbcGZnEyDUIwuvRwjxdHkRcctVUUz3%2BKZr0gg76A7bacJiOsK5PCyhhMeU7gTWCQRvFPYoUqAuhdIgf4cdmbFLpOlPknYMtLLXglkPHzWOO2xsWBckhAJYuOMeNvIhrG5achyyjAgUYsSVEOIShmnIzXBOIuCVck%2BwMLQOFoEA5k%2B9g36TYcSFGhJyk3pahqpXc9q06RIsdcluXjuZbc4Ny0t1OboUXUL2JWdvJ3syCajbmeGFrBBnWNs89SEngv%2BIWdEX0hXlZaUQiDCqlnfWUgFCJyGMLW3gs0GOqUBtohVYOvczcHEIUY6Z5d8ED91YBPquGFwL7NgGqn4LGA8ZfaKeD7WY%2F7OrliWSIXztJpcB7QVzeL7j7u5sV20ZWiuSnbanjVMloYczDsQGWUKMKgQSmrDD%2FMUKV%2BDiMOIcIb%2BgxR9QbKiZnSaAdMic3sIv4gd0TvjLhwxbv2v4mlf0Z48aQTZvvqAs644Pb9tocoLbf2RRxP5Mbo2IWvoqwMmdAnV&X-Amz-Signature=a3385474adb8142de6502652b4a5a7c30efc01b7177394b08188fd5a1d99b634&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZJ4M3ZX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCICybMlUFk3Iqhx1%2FHvpIPlPIz3uwxV6wJhrrY17z4YJjAiEAmEua6mp%2FubaGiUECMlaYn3HUZzZSXTvQ90jJ%2B7dIke0q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDIuFwJ%2FjYq0sIcmLAyrcA6mJd80Nn6ylfTWzi6tgxpvOlgg9jMpy%2BYCtiAFi0d0cVf9xoDQMYn9CQmA9tXpPyNm3G0TBvDLYkdT1rRDWpZuDLHWR0M7xjWHHzib8B2FWB3vQoU9Mg%2FL%2BmCLm4zCeRFy1K%2FnqldlmxCQ4XCMbBsDhAAIXYsLa7HqfCO2%2F%2Bnhp1qrEhlRy1afgPmGuEfHUYjoW3fL4BGXUIa86o85Hj5tOffPkm5izf9rsmYTHEfa15BiMal%2BMTpXAgIAM%2B%2BOAuv4L4bI4TEM9yO%2B%2FcYJJVg2R8gdDdmOfZcreMCW1PzGn8Dv%2Bv5In69ZeHElOFXb2kDQjrCkM%2BqaRsfsJab%2FCeZMD6lBeAYCVbcGZnEyDUIwuvRwjxdHkRcctVUUz3%2BKZr0gg76A7bacJiOsK5PCyhhMeU7gTWCQRvFPYoUqAuhdIgf4cdmbFLpOlPknYMtLLXglkPHzWOO2xsWBckhAJYuOMeNvIhrG5achyyjAgUYsSVEOIShmnIzXBOIuCVck%2BwMLQOFoEA5k%2B9g36TYcSFGhJyk3pahqpXc9q06RIsdcluXjuZbc4Ny0t1OboUXUL2JWdvJ3syCajbmeGFrBBnWNs89SEngv%2BIWdEX0hXlZaUQiDCqlnfWUgFCJyGMLW3gs0GOqUBtohVYOvczcHEIUY6Z5d8ED91YBPquGFwL7NgGqn4LGA8ZfaKeD7WY%2F7OrliWSIXztJpcB7QVzeL7j7u5sV20ZWiuSnbanjVMloYczDsQGWUKMKgQSmrDD%2FMUKV%2BDiMOIcIb%2BgxR9QbKiZnSaAdMic3sIv4gd0TvjLhwxbv2v4mlf0Z48aQTZvvqAs644Pb9tocoLbf2RRxP5Mbo2IWvoqwMmdAnV&X-Amz-Signature=f9478c4a491c0eee062c3aefa265769b0cd6f70f420fb47e351df5e7ed1bd307&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TL4JRS76%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDaz0PzSSXBiAJ%2FS4AyJGg4UVQ5RcXIUpnfwrVaFvD3ZAIhALbo%2FxFQYkNxRk71BF%2Ffoid6vFmRyxOOlXPZ%2BhRi5eCjKv8DCCwQABoMNjM3NDIzMTgzODA1IgwgVbXo%2BdEzNOq%2F8W8q3ANvn%2FdUdgMhKYN8bgWTfXgxY9uQ5eT8B7W9z8Gols5VUTxkreXr30zN3UJIYjTsB8%2B4NxH0vbs7i8KZFgVbQDCkQhkrFcJAGz2z1ITWieCmNE3OhrHYNplFBCRcxHYdM%2FwkKkfD94Sns3%2Fh68753dhGEEIatH0W2GfLOb%2Fdx1jyxdcIJ2UskJLAT7z8yU6dCrFGwKcTsppLvykI9uDk%2FSMRSBFXwaLGBuuOvyJNDCRfjUmdjefFtoJxHJwTPqibvf1G2hYAjDI0J35SUFPYlgMdTysdHnYyYSB5xOYxxPu%2BIwtw74huxMmQkSGReNmxh7%2F4Iu%2BFq30w%2FeNgtByvjrzN2gtXOzXEnNBkjmNcisI2CiwwF0ymaQyPIQDu1kg7YI1uoBRaTH%2BNta%2FrH%2BaHRwG86Qd1CcFUGvPJmWwcPSKoYoxogxI0UNTyqsIqaFCQI3YcylTB7PVj15RRDFyNMh0BmRn%2F7dzDhylbvTEnHBn5vYGBbI4BZE4oNUL3p5wtvxgI74phH6MRtFoRCIypCES2XD18fkqXwErS3X9uJg0EDIYuHB2D1AdLTBjbUsHLigFQA%2BFW4R%2BsPyxjOyCxOgweF%2Fw71BtINv%2FvdFFz52k2NpmRkS%2FXIKKYCpED7DCQuILNBjqkAfj9qs3uwfURI69c7jy%2Bjob%2BAi%2BlMj5JOEIiV0yqyEiWMPQ12bHuZTt2wkOc%2FuPuKyJ9kp85EL%2B9gHU%2FyDY0LV3S1znq1SoXyWd%2BqyeJnGy3ZBTGOVhaOU%2ByNpWP44SoRJtylzFZG8rTMjkUWMUXwyUPL5buNpHspOOsfhhYpoSAam%2FMac6gRIcSYv22KdLh645FW1otRSYXRUmRswQUMBIWqTia&X-Amz-Signature=c0677b1b152fdde41b7e48d8aca491ad851040175d36440b41c673927e766c77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663D7OHFUR%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFpCJFMPvadBVLSjZqrosQmMjK1yqdxtrh%2Bq7HZ63%2FCGAiAuKciy7ebySsCoZMdktWa0FY9IfgicdzljDhNN5YniCSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMjpK8qQ1E1Ojgys0YKtwDDHjfIzVm8okK8%2FefynkQhYCs72ZO7EOnWm7o9RKrCpg84MGva0H0U268KQMMjUCxMI%2FCV0BZUWfvd8dPlbIB%2FRNYIfwBsOpQV35bKJTUjAzhxN%2FJAXXUGN9SB3fP4LTE2E6HBDHENmG2Gu3P%2FKVsDIksn6OnIwokesVgOt0ylPIo7iEOTBAjHp6LUbZZ3pi8fvSCWyViJV2if1c%2FC1R8pDvyIv0Orbjd6JcSfKNvit3pe7Vr%2BvhkqZM%2FaAvCKA4g2xb%2Fj7F4VFgYjBKa3GJGyGfRjE8wjVJbeUAGH7DSCpMeqSsiZzl5lrhX2zEP%2B1GzfCsTfqCH5tkslb%2BgWOII5y%2B33h%2F4XnqyqSt3gLUDrV3XQC96q5byl69rYTYE7hwM8YnsK%2FQERZ9ClwSSZP83L9bwOHZ5PD9aOIoQVr3AbBYExzcHWKdlL4UjgWl0X7QjUQg1ptvHDNnuNv1BlcVRVHU7dP24q3uO34HVUzrSByRq24KxDwdwgp0Y0uoyhgcJlYlR8u6jnHzeFvFhrpVbYe0UAvyz4PITXae0svnaYPlwixE2IsBGrNrv2Kcvey9z8gWgOMoH6K0%2FAnYwfa8NEMQLqWnHNJ%2FpiEdxkJWIizvSOs7oGyfG8JZgRRgwkbiCzQY6pgGT4YIZu4OSR8NkIhWAZlIlYYy2qmpNbRiiZLDO4EyjSaVplxkEkfPAJUXO8kxphmMjnUniRremM0oOVH4LEAfWSyA3fBqWzhGSPOVMrAzAzQEVBEyjLSYocWFy%2BuKD0vg9r%2BpwV1pZbjhrmZi6q%2Ffyf6fTizQv%2FMoYHchA6aw6HlfvKA643D9yosvtqtwwmpHPo1PLagm5Rl0cVdA8D4XTs2ZIcyVi&X-Amz-Signature=06021265a06c382b186af34b7c73de58e5a7f3f8d90236ea32b91551b992a792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663D7OHFUR%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIFpCJFMPvadBVLSjZqrosQmMjK1yqdxtrh%2Bq7HZ63%2FCGAiAuKciy7ebySsCoZMdktWa0FY9IfgicdzljDhNN5YniCSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMjpK8qQ1E1Ojgys0YKtwDDHjfIzVm8okK8%2FefynkQhYCs72ZO7EOnWm7o9RKrCpg84MGva0H0U268KQMMjUCxMI%2FCV0BZUWfvd8dPlbIB%2FRNYIfwBsOpQV35bKJTUjAzhxN%2FJAXXUGN9SB3fP4LTE2E6HBDHENmG2Gu3P%2FKVsDIksn6OnIwokesVgOt0ylPIo7iEOTBAjHp6LUbZZ3pi8fvSCWyViJV2if1c%2FC1R8pDvyIv0Orbjd6JcSfKNvit3pe7Vr%2BvhkqZM%2FaAvCKA4g2xb%2Fj7F4VFgYjBKa3GJGyGfRjE8wjVJbeUAGH7DSCpMeqSsiZzl5lrhX2zEP%2B1GzfCsTfqCH5tkslb%2BgWOII5y%2B33h%2F4XnqyqSt3gLUDrV3XQC96q5byl69rYTYE7hwM8YnsK%2FQERZ9ClwSSZP83L9bwOHZ5PD9aOIoQVr3AbBYExzcHWKdlL4UjgWl0X7QjUQg1ptvHDNnuNv1BlcVRVHU7dP24q3uO34HVUzrSByRq24KxDwdwgp0Y0uoyhgcJlYlR8u6jnHzeFvFhrpVbYe0UAvyz4PITXae0svnaYPlwixE2IsBGrNrv2Kcvey9z8gWgOMoH6K0%2FAnYwfa8NEMQLqWnHNJ%2FpiEdxkJWIizvSOs7oGyfG8JZgRRgwkbiCzQY6pgGT4YIZu4OSR8NkIhWAZlIlYYy2qmpNbRiiZLDO4EyjSaVplxkEkfPAJUXO8kxphmMjnUniRremM0oOVH4LEAfWSyA3fBqWzhGSPOVMrAzAzQEVBEyjLSYocWFy%2BuKD0vg9r%2BpwV1pZbjhrmZi6q%2Ffyf6fTizQv%2FMoYHchA6aw6HlfvKA643D9yosvtqtwwmpHPo1PLagm5Rl0cVdA8D4XTs2ZIcyVi&X-Amz-Signature=06021265a06c382b186af34b7c73de58e5a7f3f8d90236ea32b91551b992a792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZERZ6NTV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T193346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCSqxKhOd4IQKs3LyVSSldQX26yAqFs%2F%2BCIlUQKOJiYiQIhAIGUJFwxawc4Uvnozr%2FfTloxNLU1EDVdyyRbg3fZzdFdKv8DCCwQABoMNjM3NDIzMTgzODA1IgzMm7LlsJUjRp5bU2Iq3AOCWZFm8rXeglUE5zdRWKJBoyUA2GTJNPWRe8blWVv%2BLFVPTZu7pQ5y%2ByolBnsPXyUGdsvxrJp0ZlS05906d9dTWehNmUWLzKgUhGEqyh%2BPC2fbmGzjWBMnQyQfn7sLGwgep34n6raiuwe76gAGmmZIXPkgNMBK1Ju89W%2F6vLF847AsneNXtKZMum%2BhGkDPJRjBcwLMJKHHNn8GBmOWbPQjoDc9YTKC0xHmfNQsy9J%2BBomfnL2%2Bm4Fjm4%2BxFGK1h%2FkDSJ7XKuI6SuLhy4R2n%2BxVMkmv8xvuxad3vMAYWpHDePGAACKQMNQXNWZf60Rn5EWI1T1WZhdh7xyMadXTd0zWdpMChYWrgY%2Fg%2Bv%2FR1TYdYf00l7A9dwMgGIPFEuL1rPmiLPhKznaOmfvbRSvfqp2%2Be4DZeynPESDZ%2F%2FhP%2BJDWs%2FLqX1pdPZq3NIlrh5GcDijhd2J9QT5HpyGXc7KqN36muW79az86XgU%2FXe9GLUrzGvSGvOeL6el7DTBNy0q6bAbgCKugEULXd8pS53SYsAUOe%2FOSbkhx7reECujKnWCVJ2P%2BKRiVJ7cCutUouduavl0Sug0zeBfDa9YiaftJuw56L1N0od7Ad7CC3k0Exak6MB9HsdgVTsENf0hNnzD3t4LNBjqkAXlHtLveBa%2FRcnuwAFMJXCbpLX%2FI1fRAUIlZwOiiGSeLBYAAgLVrxqFhzcZSFxXZIZHB5UztI1Y9DZebvssh4tmSQ4CnCwdZlj%2FA0t7A5vCVxpXUq7i7SWvsJotlM9Fr0oToQSQe5oAr4yYTCetjvjxFWpg%2FVwKNSH8C4tQEo6S12SV4Pr9kXrHhhHOeB18E4%2FOZIb3HFDBi8bYjgU6D%2FZppVkGJ&X-Amz-Signature=9d229f894bbcd1df4e487057dfbd2676acef6c4690de707857b75c7c8694ab5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

