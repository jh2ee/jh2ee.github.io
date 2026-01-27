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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRE6DLRY%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyLNdWPPtugm5HovXjSkINskerO23FvWX1cWvVb2afwwIgfb5PxGMsGwMY33AFtTxYDGcOxJ3rfODtkTvd0lbWV2gq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDFT%2FM0D9Xg9tRHYZjyrcA8t8%2FLQbGGogjTEjQ3vfuK%2BISMqPqxmjLefXGDXBqmfX95E%2BWvuaTeJm6O%2Bx6BsXwlaRXZuWTqRU5PowOPUVh7cfwiLZv5jksKsYhcU0QE%2FINDY0ywGH7Rh6g0G02U3Xs6ZFn5ubeKK2p82JSMwlKcBxvnmdvwZoFhc2gXySgqIdjriMp7n3oRm9Mx3e34DCz2YweIqaeMTqVoYooyuCFSlSmQY%2FFzypR7qVHcXnxgId0DDYYJns9tt1o3ORy6pxSMAUyuw%2FSPQs8aTgFxVklFpnqBWfPcSkvBY8lYQNcRstRdlT9EBrB3oHEera4w4pJ1LbUlfrLUMutWfbw2wM%2BeCZRZx4fnrByVBcaezHZe%2BTrONMl6HCT34qgnVLIGdeHZEQ5t0GtcDGkaZ479x3NNT%2BwD6Rs%2BOIgAIINi0uqTn7DYNG0KK0PUr9m8jLwiGdebPdYibsGhB8nhZrLYFTWV7PIq8J1KGGjjWprVJ4xkLuNA207rKPhJA5hUpoadzSkvrBcIRPNCTbssmf0AbnPE%2Bp7jYO0m%2FoVdMqn98qJQPOy2%2FVLMrhUxuk22ostbZzZpQZnmu21zV3PRQpSP9eYV2bWkUnd8DPPJwxx1m%2BO4en8mZKW8rfvHacFIbfMP7K4csGOqUBAJVv52nCXmTF7O9s5VEDD2Q9aukyVj3UR4F3hmeatYqIjn2D1Y5nidG9EX0xFsCdriDysMhM5erSuKN0P1fHE1bCc0KZhR0jPzzLBvQHzJotJvTJwUqW4fFt2h%2F454rMpPKUODRv6j8WJqWrGPlhDPtr%2Bqd%2BeWx2kKmOEJZjLZxHFfTXoVcCeh8NxQ6ZdsQim6WkhZPa6No5dXCLkdOHuyjczt2C&X-Amz-Signature=dab4ff8f2d90d2503e60de88931187f65e25bed99259519ca2e63b7f20d31723&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRE6DLRY%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyLNdWPPtugm5HovXjSkINskerO23FvWX1cWvVb2afwwIgfb5PxGMsGwMY33AFtTxYDGcOxJ3rfODtkTvd0lbWV2gq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDFT%2FM0D9Xg9tRHYZjyrcA8t8%2FLQbGGogjTEjQ3vfuK%2BISMqPqxmjLefXGDXBqmfX95E%2BWvuaTeJm6O%2Bx6BsXwlaRXZuWTqRU5PowOPUVh7cfwiLZv5jksKsYhcU0QE%2FINDY0ywGH7Rh6g0G02U3Xs6ZFn5ubeKK2p82JSMwlKcBxvnmdvwZoFhc2gXySgqIdjriMp7n3oRm9Mx3e34DCz2YweIqaeMTqVoYooyuCFSlSmQY%2FFzypR7qVHcXnxgId0DDYYJns9tt1o3ORy6pxSMAUyuw%2FSPQs8aTgFxVklFpnqBWfPcSkvBY8lYQNcRstRdlT9EBrB3oHEera4w4pJ1LbUlfrLUMutWfbw2wM%2BeCZRZx4fnrByVBcaezHZe%2BTrONMl6HCT34qgnVLIGdeHZEQ5t0GtcDGkaZ479x3NNT%2BwD6Rs%2BOIgAIINi0uqTn7DYNG0KK0PUr9m8jLwiGdebPdYibsGhB8nhZrLYFTWV7PIq8J1KGGjjWprVJ4xkLuNA207rKPhJA5hUpoadzSkvrBcIRPNCTbssmf0AbnPE%2Bp7jYO0m%2FoVdMqn98qJQPOy2%2FVLMrhUxuk22ostbZzZpQZnmu21zV3PRQpSP9eYV2bWkUnd8DPPJwxx1m%2BO4en8mZKW8rfvHacFIbfMP7K4csGOqUBAJVv52nCXmTF7O9s5VEDD2Q9aukyVj3UR4F3hmeatYqIjn2D1Y5nidG9EX0xFsCdriDysMhM5erSuKN0P1fHE1bCc0KZhR0jPzzLBvQHzJotJvTJwUqW4fFt2h%2F454rMpPKUODRv6j8WJqWrGPlhDPtr%2Bqd%2BeWx2kKmOEJZjLZxHFfTXoVcCeh8NxQ6ZdsQim6WkhZPa6No5dXCLkdOHuyjczt2C&X-Amz-Signature=dab4ff8f2d90d2503e60de88931187f65e25bed99259519ca2e63b7f20d31723&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3VTQFWW%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFwiEqJ1I5OLpSCNEayu%2FfWTusVIObQT8J5poAmz5g6KAiEApslOHJLhUGOIgFFCdcoeSHkhYO2helvnVY5UcU4gTqEq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDBeQKpU4wIGs4%2F3iHSrcA2y3swLvR%2F73tbhKdx2R1c0hJlWQZU24JzMGYNkytIodJzpQ1aj52oWpwXTbgtXBlOiM0XtbuQ74JzuNJMmvpQu4hcI5%2BgRymjJyaDtUNdzxuoRB0oF%2B9VT5uyX3AJD6MKHk%2FKzUqSW869lBDbM6e1NTsoTXDICfW%2Fpxc30Wfo88xdK62OQkEaS76qshVcEcPPLEYo5V%2FlTAtMkZKdNTeMKwo7uIlyR4QYrDMnQnX2slH9TmdjRne%2B4uEuzj4tOvgmEhdUE255YkEQEp0PPwwYXQlcqKkZeOI2Mhlae8wUhG0wlVM2W%2BoJ1ulOf1FMgkBk%2Fx1UYKKyI0E9vNAj77cIGJFQr0cqmGQKVo6BQFnj20XUQuaGsy%2FyNfJpWTmdti6awfO7dkPZH0Gvu%2FkiYMKvOJwJoBm8Wdwak3bWmWOG8VEXLlLuYBvHOrhAglrFv9RVXTIOpssbTWhjFCHBSWFduv3iyEUY1FkWzLGMwPks6c9VwOwAgGDuITn%2FyImatHSsn2osktcjcv6yNuxDdMXzbwyFuv%2BksvtdY7gI%2FnyO7za4JH80EZiO6cYIvRy7mSX0yMqj4Wdg54gy5Pr6IpYy5Wm9YyIB69Ic2%2BEZQfN07R9%2F3Lp1xOBseKqJlaMOnK4csGOqUBWrpbrfAZopdkWsRfdVxPTTcIOD1dlRdm8APxgrQP5NAB8as4wACi2q9RcztJPOlfRVHQqH%2BJRJeDkKJKkvQcrTurlW4BEIw6Ohu4TXm1Qg%2FMagbQsQi%2BvGsTTYBoL2gazvQvSvtptz5QYtIdTemoupg5vYYlg7LP3lSym5yjWP2DbxGlV73w9AXWqkRWKbPu%2BFKkgWoiqoGMuKowioQIpzqVbUSZ&X-Amz-Signature=5d1d98a70e36b936c62cd4fb67f4560aa7c3d0bc8e68708c81ed5cce8d6c9b39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VYJOEK4%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCCEZj5vt0XBTK5wvuQPn8K39h4z8YLoL6cTXxuVJqrawIhAOqsYe6RulkM6n%2FMBpARxoUN0QFM4Dqth4XwfxAxj0csKv8DCFAQABoMNjM3NDIzMTgzODA1IgyeV%2FY%2FrZcKytAjqb4q3AOrEzFK6fA00CFKzmEcUnADxMFJ68QIK4Jq6CayPn4zWH8xwJcbj%2BCMmZ9KWuBZy%2FzJ5j9k8jO%2BBHjdNI52MZCuk5QVnw4ARruS40475BnXDIsHIDB1ZVcve2kRbg%2FYaRIgRzei4rbgVRkF7vBfsZijM0ggO0wj%2FY3tTs8guHkVB3DX%2BRTMjZ9Uj1e2%2BDHdsp6nYBb4wLnLeKJwRCtllTwSr0eWdteUHcjr%2BfUhPTpKsaA8GhqUwPOO8svENm2sy5qxPNsnIqUXDgdOwQKvx5K2v0QIwDFi2Q6KTD5hVKtDZf7NURYv52UZoMPnfWWv9apZTwV3sy8NupK9DbrGQhDa0OK5G6Rxx4Q7LoqFkdsHSS6xXNAhJJrXGpcFiz9SOmwbqU3rwlEuQ8bViiUJBhNbLxI663E38%2Bl8ODortpPUnASOxeNltnEzxg2A2wdoJWjS2I%2FJuINzbGw13PlJi52JAIAVP3mJJlk7oXvR6HCVHXBeIwgnjZFX0N2Soc6nIbyK3vrz%2FdRhZ5azoWLGE6S0QCxVCD01ArNnLaIpyIyssl1nmM9WQ3Y%2BlOfpSw9zzc01fA7BmXSYAVxzKiDxvEc%2BIyyA6ZRP0Wo3gNWpkbFcGr3H%2BhRN8yKzZcOSkDCHy%2BHLBjqkAWGJQaYNsD0eWj%2FM4GVnLiIuzfaZa2MQwB64iVXhmbkbgsE0jbNaCIN3MCWg3YmPm2l6rcxj9VGkWyl%2BG1Me6CUROGwg8VRcKuEv0QOrDOzoIqUTpdu47obFRmAYuLHZU%2FSQyWArO1mS9vONAv2aB4jetaaUdcddqm2ptJ%2BTiVEkCn1T%2FaB9Vkk1%2BQMvw0HHQ988NgaOEZ%2Fwlxhrn9wxX7pXn5Qw&X-Amz-Signature=928ca2b0d27b0d3e4f4b821b2b6c1a533de08d08b05702b4e7f2494e53e3e1cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VYJOEK4%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCCEZj5vt0XBTK5wvuQPn8K39h4z8YLoL6cTXxuVJqrawIhAOqsYe6RulkM6n%2FMBpARxoUN0QFM4Dqth4XwfxAxj0csKv8DCFAQABoMNjM3NDIzMTgzODA1IgyeV%2FY%2FrZcKytAjqb4q3AOrEzFK6fA00CFKzmEcUnADxMFJ68QIK4Jq6CayPn4zWH8xwJcbj%2BCMmZ9KWuBZy%2FzJ5j9k8jO%2BBHjdNI52MZCuk5QVnw4ARruS40475BnXDIsHIDB1ZVcve2kRbg%2FYaRIgRzei4rbgVRkF7vBfsZijM0ggO0wj%2FY3tTs8guHkVB3DX%2BRTMjZ9Uj1e2%2BDHdsp6nYBb4wLnLeKJwRCtllTwSr0eWdteUHcjr%2BfUhPTpKsaA8GhqUwPOO8svENm2sy5qxPNsnIqUXDgdOwQKvx5K2v0QIwDFi2Q6KTD5hVKtDZf7NURYv52UZoMPnfWWv9apZTwV3sy8NupK9DbrGQhDa0OK5G6Rxx4Q7LoqFkdsHSS6xXNAhJJrXGpcFiz9SOmwbqU3rwlEuQ8bViiUJBhNbLxI663E38%2Bl8ODortpPUnASOxeNltnEzxg2A2wdoJWjS2I%2FJuINzbGw13PlJi52JAIAVP3mJJlk7oXvR6HCVHXBeIwgnjZFX0N2Soc6nIbyK3vrz%2FdRhZ5azoWLGE6S0QCxVCD01ArNnLaIpyIyssl1nmM9WQ3Y%2BlOfpSw9zzc01fA7BmXSYAVxzKiDxvEc%2BIyyA6ZRP0Wo3gNWpkbFcGr3H%2BhRN8yKzZcOSkDCHy%2BHLBjqkAWGJQaYNsD0eWj%2FM4GVnLiIuzfaZa2MQwB64iVXhmbkbgsE0jbNaCIN3MCWg3YmPm2l6rcxj9VGkWyl%2BG1Me6CUROGwg8VRcKuEv0QOrDOzoIqUTpdu47obFRmAYuLHZU%2FSQyWArO1mS9vONAv2aB4jetaaUdcddqm2ptJ%2BTiVEkCn1T%2FaB9Vkk1%2BQMvw0HHQ988NgaOEZ%2Fwlxhrn9wxX7pXn5Qw&X-Amz-Signature=92298075b2c2dc913817ba250816ed455c662f4802b10b3f7a83b719663f9b76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625X6SC4U%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNfUR82eJEmKRqU4vkyl4JxR7E4MPMeEY6L8Iar71iCwIhAP1Fn3PfED%2BRshOZ1ECO%2FlPhoe08Ew6%2B9Iwj3hHqJnWSKv8DCFAQABoMNjM3NDIzMTgzODA1IgxGUIY5ddYV0M0r1MAq3AP6Fxcb4hZO9l0AoaNhFohKEfGITrh1Ga8jydeKc023DpP84RE49j%2BLQd9xj9Wtj69ubLWwmWZiU%2BzbD9FqTlYvPcNJyta4GREqjC%2FeYf1imM1psZS0gYVLsQP2I5iXS0ETDkit3JS88NyIFdSOhx19yEi2MLum2tYxknLiheJE7RMrmoBvQz8z3u9trOOhLUBmwcVN1bnJx7lAz5T2SjTyqHc2b0eQwgzCKN6D%2F8%2FQJBjiyO2g6xWTuaDrbReufz4dSLtqWqSFcTuIrXEuudCoZnhlYB4otlBdCWMYdNhG8BoSJhwxZXeXQFWv2yUBtwuudpyImseunkGXcFWm%2FVjGeNEIzuew2go28RFwK4oWWaPlzjUAHxi6BIlFCZQTVN8daD8LKdDnXpzo3CXvRdcYrzJHNURwqzWpAUEj6J5fKXxW4037i2heXOtStmMzTiBNdrtS%2FIEJxq8zgno1C0neJUUDaSVqzLCFKGeVjXwLQeOck6WKUa9gOifGzBpxivs2F0by0tHTmlEwpZcwny%2BS07Lgr84nAVOmO%2BMPSupKwOgV3LKfTHncm8RFWxYnvO0FJSu4F6w6345n11saGv4m9FWCqruE7u3sHE4fb2seE75rPao%2B9UurWG70IDCly%2BHLBjqkAelA3XWt6nue9WV%2Fn6DXGC%2Fyv3V1HB6Ub%2FmBBR6hbsBrt687v4fQTgwwckB6jXWjnKGs%2BPw2etG%2Fli8ZyR1OJ6r8LN8Wj0qS%2BG9S3w74Qh3SEAJswFvR5xjqxn8qpTuDrMlW0gT2UXuUjMmJbo%2FV8TLwaP0oCbTu7huB0uCSPiEJKi5erTyeP%2BW%2FNh%2FYSIraBKFrzwAbchI4dQrAlDQmI7HfCqvi&X-Amz-Signature=b6dcdd05c60846d903e14028d5c3f0b4b9fa2ecd5acc2ccd9d2ecfbc5d872c09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIDZP2PI%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGYFyOndsj5P%2BgdXecwvkiXcXv259paSc1zVNkCdfA7AIgEJFzBvOZszcNBk0FnQyJk6nMJJ6J5%2B8x4oLXptpoDtcq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDFfAZ0G%2B77OXldBidircA4ft6TmFdKgZKaAUURU4WoCRJus%2FSiCLlu2VPPg%2BFhqpK4LzCCS7GcDKUKiVKoBEgntv2ttOAxjI4LJ243g59lcShTB0h1b3J%2Bb9csEsvXtZjWeLgAouVquDlSq%2FfFS4f4d6BVJNeZ9pD2%2B%2Fb6OoeAWQ0A3dMRe4l7%2BArK1RK1qdoMst36Uo%2FLsh9JhDZF4jVHTYknBedaaxIppsXNkcRkj2Vis94PkJ2nspcwwiin0ncbxq1ygID8fg3GpHa63XbS1fPp%2FdZDXdQfQnppef4Es1NTbtZENfamPy3662Cj6CBO70DL4Ld0kabu1r%2FlAR1hqfVMra6YmaFKiv7oXt3vzXUuNav3xHWiOBOAHBU%2BayeUbaByOw1VHya3Mo%2FgwTnrC9Cxe0G2gZOsF5rmiWlhz6ayqRmI5rJ6HuHzZXL%2BNgk9kCXJpsfep1Q2thuahqgf2Ih2aMlLkoQZO8lR8mBG%2BTiSOt81yW8nbrL7%2BeambWJl%2F4IKKLqQkUdxVE47dy4vPZ6ES8aHyCdzUuDL1WYEKCyHVOgZtj5%2BlmJ6DlCIWB%2FhXfWB0ZsJaDAGVF6d%2F9Ikt4PO3DVVDwNi8H%2BtgEj7O6%2B992ZktavKQZ4ZxLsAa0qp0cDih0kjx%2B3cFuMPHK4csGOqUBGVyLdtGI%2FCES%2FOvBdxhipMzQKu5kXTRy8FWGjdJVVFmtN6ripilARtyHMZFzWAMhale%2BDiaBBi3hbPjNGjSNH5jMOxjwfCcw%2FMRZNuRJLcqoQYonk4rClCg5NLpT16DbB27VJ8lon%2FZzYhhWOiviSdDgjRu6qgvPEToHj9gU1MHRE1ebE5UXgvGuBzBvvJLRHjAWRQQTZLpTIefkaeqWga7M7qy9&X-Amz-Signature=0c6b7f4bdc4e7aac60012ec5068420bc8eb960ccd0d387337cee9979158124f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXZ6HUNG%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDLZwBnjIzYK%2FaeCz5aTfZF%2FfmJNLtlVzg8vEdRnpempAiEAnUUdKCmWHH3zIsLjOKJBGtwbdfVbIh4dRDsElKyJtokq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDAEhtGPbp5VqGVfsqircA44nE3P2VEa29cN0D%2BebhzR%2BPtoo1atGUEzv3RWjvNOn2whipn8Djt1TPo%2FyP%2Begd%2FxvzYqanE7ZKlU7jIHG5K27%2BBXJ4KsQ5of8uyPFrpSzRL8U72IBVOWp%2Bcll8hJt%2FFZTfCB9J6mC2esa1mkjc43XFRz94i0iHqfPYQ1t5GKKIV7sNv82wXoW1%2BXApIAUxC6NZ%2BjHr5cf5amnQ3St%2Fct9KgLk2j6d2Q5qIW%2BT2Lm%2BJ4fNsdzbvp6se4bB7xLoJBUyu61GNm7jUoA9ljsh2FETDl3Po8hYuC780Uybb7lhsdqeGr6yL0YzJjMO0Kgn4rvpFKESuOR2SAu26qiT5hU3zY6gCkKBPTTHMTlHcUQmGAo79FHi4aHTp8QcPSk3jR0HdhgDb6HaMaU5Khe0wKB2uXFoBEssyth3ZpAkLCdW4B8ZMOWJW%2FD95Gvuj8MVCfkNBsMUTOjrqE0xoSqxoKO%2FPn5sWRAr0qs%2FjQwGPYsXpE4tQh%2BhiU9QTpn%2FN9mh8x%2FGZnefYuMxtOo2M5qxPT2zW10dF3RVlO09YbIT1gBpG%2B7PcNto9YfFoVL7OvRgHLUbf9yDeGzkWolZ6MUV7M3xW4sagM6QDSQvgXHChht9l6vd%2BfVuywqY%2BHgBMJTK4csGOqUB2Xo6dx21WFNEe%2FPqY9PrDmS5fbb%2B1ene6irCofqGVpvm%2FyLeTb7lDaChrQSqhhe5sevETD0YPMJSIU0uhSGBdSiG3%2FPE%2Bv7%2FpXw33sCUEkwinfO9HbYEKmMvBUv4P2zRHIxQ8uh8LmKhYiojADNyDTYRwE2zRTadfWgqzVZr%2BU67fX0ambuXPT9rdbUvuxqmoo2P5XVDhGKp1cVA5NOuFVo7pXXp&X-Amz-Signature=a963e1e9de9b50077f597eb00491a370ec7430ec3339772dbbe803927f12ff8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI7XUOYP%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FcrGAPezeIbF5TUvBhxrnPGpH3dA3e7d0i%2BUlLdTJEwIgNsetMZSvy2BjiYru5IJgrJP2kwOZBkAsmG4DdzpiwfEq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDOYATmdDJkUmSQogmSrcA%2FEDW%2Bvg9ipuEKK%2FynSK374315F220JtYLWn%2FCShEpi3OOWSTE077%2FnFmec40UXD3VlteW9pelaHEKRawlVoX13Y%2FFfND8U8bFks6178mocFkT8%2BPc9CrNfF4XpPAAS%2BvO5lOQNU%2FO4Z%2FaOOU9xHkv1uzUU%2BCQUL1R7Q0Ar70pxoxQiX%2FspJd2XOq0lv10lVtoOOWqulQ0mYSTpLTWZVFBhnwE01U%2FVLitWoEDfmplfMDlm293olXdmCSOdwF2wOU1q831MYj7T9MjIH4rkNONs20tIEQSLdZ14%2FAqaKTrWq7dLTJhtwS8nnvYj91sdU%2FvEE2jT2I2jhV3cwsXyhg3Ed3KExR4V26G4cFWJtopG3IRoTzR6DTxMhNKKr6Jy3FHzrM8AAqwfegq%2By6EdsgsqGvfDfBf0yvT3j%2Fwd4zDigzQegZu68%2BN9JtZlLmnNX6gzd3DeEOuhYe0m857mM2FgrreQ1%2BPoHIqyuVnVquaOn3%2FMI%2F%2FWkuFzUFogn01b6F%2FB7VhHMT0mXC4z00BqR11rTToIq44xsOW%2Btm4gt4xqQglgf2wUZCFfXY4ayc2ytod1pANWthhYoyY%2B9J7WeELkeD3nzimVKjtmFU6hSi3m4tiNQa8SpeD9MSnDrMLLK4csGOqUBy5qVOIRT1rSHnOuDVCDHGj1LxXvtoAZrgkRHal6NSDbaPP2R6Yv3frKJ4HbGSF3uHWbIL6f7KZBYNUAui2hadwIf7FaburqiFJ5z%2FDOfGbwb7saheMx6iC7Ks%2FflKgBEKmNAErYgMwICch%2FfPPf0RYwGpazUY7UDusq%2FOcszUBlImoSZVri9zcLW9Da%2FqSqFe7%2F%2B34kck2DlMu5ltEduXMnoBcSt&X-Amz-Signature=d005c9565f79bdef60b238f2a94c80380349f6f174dc1b78e7e82886cc0499c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI7XUOYP%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FcrGAPezeIbF5TUvBhxrnPGpH3dA3e7d0i%2BUlLdTJEwIgNsetMZSvy2BjiYru5IJgrJP2kwOZBkAsmG4DdzpiwfEq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDOYATmdDJkUmSQogmSrcA%2FEDW%2Bvg9ipuEKK%2FynSK374315F220JtYLWn%2FCShEpi3OOWSTE077%2FnFmec40UXD3VlteW9pelaHEKRawlVoX13Y%2FFfND8U8bFks6178mocFkT8%2BPc9CrNfF4XpPAAS%2BvO5lOQNU%2FO4Z%2FaOOU9xHkv1uzUU%2BCQUL1R7Q0Ar70pxoxQiX%2FspJd2XOq0lv10lVtoOOWqulQ0mYSTpLTWZVFBhnwE01U%2FVLitWoEDfmplfMDlm293olXdmCSOdwF2wOU1q831MYj7T9MjIH4rkNONs20tIEQSLdZ14%2FAqaKTrWq7dLTJhtwS8nnvYj91sdU%2FvEE2jT2I2jhV3cwsXyhg3Ed3KExR4V26G4cFWJtopG3IRoTzR6DTxMhNKKr6Jy3FHzrM8AAqwfegq%2By6EdsgsqGvfDfBf0yvT3j%2Fwd4zDigzQegZu68%2BN9JtZlLmnNX6gzd3DeEOuhYe0m857mM2FgrreQ1%2BPoHIqyuVnVquaOn3%2FMI%2F%2FWkuFzUFogn01b6F%2FB7VhHMT0mXC4z00BqR11rTToIq44xsOW%2Btm4gt4xqQglgf2wUZCFfXY4ayc2ytod1pANWthhYoyY%2B9J7WeELkeD3nzimVKjtmFU6hSi3m4tiNQa8SpeD9MSnDrMLLK4csGOqUBy5qVOIRT1rSHnOuDVCDHGj1LxXvtoAZrgkRHal6NSDbaPP2R6Yv3frKJ4HbGSF3uHWbIL6f7KZBYNUAui2hadwIf7FaburqiFJ5z%2FDOfGbwb7saheMx6iC7Ks%2FflKgBEKmNAErYgMwICch%2FfPPf0RYwGpazUY7UDusq%2FOcszUBlImoSZVri9zcLW9Da%2FqSqFe7%2F%2B34kck2DlMu5ltEduXMnoBcSt&X-Amz-Signature=b7525ab164c8bca5bbc70b5524b2f4674307c53bd66780092c14eb51fbf83de0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L2GTO6B%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjcP5Kp9Btj7yuCw7cQUnh4ZF3fYaYuWn%2BS0kfAgAfvgIhAKtVh1LSVii6zgdgVMKwoUV3xl26yPC3TsGaSFSI8ywsKv8DCFAQABoMNjM3NDIzMTgzODA1IgyOKbtiGNrsFy6Zh0Iq3AOdsTr2COa92UVT2gPKSUQbxbBSICWxcspD0ATpbh1rUxNWU79wS%2Bhh%2B%2FHDM7NTCK7kkxOlVKZhPdZSYBdswqgINpuYh6tvwVpyvN0PxCKRaSuOGG2AbWXXt3mtZspC%2FGbieUxfoQZyETy%2F4qETfvp71wH21IXEkK7U3owzW%2B4PS2Hro%2BfAsIm0lnH3SXSesljxtr6pPzlfqSdlw96Dh3oL0GQ%2FlcQpvgQeVjZcQWHvXvdKZIdVQY2bAoCKX8SFA%2BfSMy5WSeng3FKtLC4MZouy7hnsBr%2Bd%2B7ehAa1DTiDvQAalbOQwnffTBiAGlIILqQdFCMBbtel61NCb%2BJJuCXDol4%2Fau9bxP07md5mKJ2zIMzZImOCxSoJkkd9hpytd8je7g2FF54Yu%2FL5%2FIFcowHwd5CcSy5WFfnFcvSn9rYszET34n2tFOoiYmzn3ly%2BIBQkebsnxk2v1OoEmRfK724sC1cZxEF8IhOjJNcpCh49qFxtqxexuFfaitsz1remhendB2qp3YOxgcqRXe0G0mBtymxILp7SXEOd6OXB2msnqFmbfyuZ5BPM7Ee14z375Snl1NHBCjOvneummj7yAAmOpzv7729d8z5jPN%2FwVkhxEKvcz%2FH1mcfa5HzJP4TD3yuHLBjqkAUKIIEuwv0NNe7TNpnZ%2BPLg5KVh7kztvgwzV2RYVvDuQxVlucBMiEgJxj14ntAgYS3VLVKwYF6w1J%2Fe8qw8vGYwghZmIM79SC%2FWqCQVTnw8sHxGWC%2F976eGdwO9IK4K14wSTgBnmGw%2BUIRONj7qDZbkvAjyfZlOn0FiJRtbIgDoKk398fSseetkiUSqw%2FCAtGRvxrSQcuYerMifZdHOwjemnDYJa&X-Amz-Signature=438d10fc2e520282302b39682bf6e6f19f603ddbfd5dd12c6d835534dd6c8b94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2WGYJGA%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAsQxj1rChuFenaeuWVpmAEgf2YeFFAh8%2BlSlNWPO4cgIgEh%2FtAK1LX%2FlKHdfqtvjySMWiCLKq1VWqyB6IYnaTUm4q%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDJDjDaqIjMLKSCdyXCrcA8GC4sERXeO%2BDTfJPAbu9oUJfswrjGqGXzjmgiL%2BVe9DMgbbhuk5uorbquQEcq1qFFQijYzYaw%2FVHgaU2iNuq5sk%2BBrncEmFZz3q7vfoqHLIyQP%2FEdGU2ijW1HVbkby4EiKAMDBcjRd3W1RhyfRb38ipXA09o8VPGQdN9FOEIY5JQsjbTtEbNSys%2Bo6ueVzCdlSU1r5To5g7b5n1i3jZbpwgbeDWiU%2FkDJDNN6qsxaq1PvLgh23YuJagxe5UwxsKj6312GBaAVKXiri519%2BDb9b0ErHK57EBYzXXJ9l8hk8nzMhy2l1L9SacVC6fQr0dasamaX6mgA5xTXBScmr18vrwuED73agqn7JbiXaCbO88qkg53ru18C%2BoKIzRyTL89DmEvUlIjV3H6zqDVimaC%2FnuHlebVyVQCx87q1TfiQ7IN5uVy5en0pm06ZBHbNFkyJ4W9Dw87LcKNyioQTsmi6eZb3TAGH0hOX1G7boKLiSl523Piq5X5Oqi%2F9DunmwX%2BvqXfHFtcc2PKsnJz3pdPb67aGVq6owEb080t%2BGSUfOgZGqwO%2Bsk6%2B4rkRhLo9FBRIwpaKBIFa7RF9PnAH2r%2BSMVjWsWb9Q9cav2tinJLA9f8qB2CMbboMgCuSX7MPHK4csGOqUBWK4Dg8kxIMYa8Wpkh0wcyFKYJhTgdPcRUqok%2BCpGf%2BBsWu6Pcd3AMu6R0LjvzIltj4REY1ge0oPJCW%2BPsU1sJiZR2a9kiRTSWT9HT1EpGiJeM4wtWO2qZSivkuJ4HwyhTfK87EijEKehwoGJ17aR7HAzh2SMPxTk2YN5FbxJvcBMTyP5s5krONj4bTQlMDwNjg%2BagWWP8P4dYI2VLMC%2B1%2B%2F8%2F%2Fo4&X-Amz-Signature=62934a8b38a4eabc92aaa4a83e20c3c7b04335ab208ea12c145988eb4d06e69a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2WGYJGA%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAsQxj1rChuFenaeuWVpmAEgf2YeFFAh8%2BlSlNWPO4cgIgEh%2FtAK1LX%2FlKHdfqtvjySMWiCLKq1VWqyB6IYnaTUm4q%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDJDjDaqIjMLKSCdyXCrcA8GC4sERXeO%2BDTfJPAbu9oUJfswrjGqGXzjmgiL%2BVe9DMgbbhuk5uorbquQEcq1qFFQijYzYaw%2FVHgaU2iNuq5sk%2BBrncEmFZz3q7vfoqHLIyQP%2FEdGU2ijW1HVbkby4EiKAMDBcjRd3W1RhyfRb38ipXA09o8VPGQdN9FOEIY5JQsjbTtEbNSys%2Bo6ueVzCdlSU1r5To5g7b5n1i3jZbpwgbeDWiU%2FkDJDNN6qsxaq1PvLgh23YuJagxe5UwxsKj6312GBaAVKXiri519%2BDb9b0ErHK57EBYzXXJ9l8hk8nzMhy2l1L9SacVC6fQr0dasamaX6mgA5xTXBScmr18vrwuED73agqn7JbiXaCbO88qkg53ru18C%2BoKIzRyTL89DmEvUlIjV3H6zqDVimaC%2FnuHlebVyVQCx87q1TfiQ7IN5uVy5en0pm06ZBHbNFkyJ4W9Dw87LcKNyioQTsmi6eZb3TAGH0hOX1G7boKLiSl523Piq5X5Oqi%2F9DunmwX%2BvqXfHFtcc2PKsnJz3pdPb67aGVq6owEb080t%2BGSUfOgZGqwO%2Bsk6%2B4rkRhLo9FBRIwpaKBIFa7RF9PnAH2r%2BSMVjWsWb9Q9cav2tinJLA9f8qB2CMbboMgCuSX7MPHK4csGOqUBWK4Dg8kxIMYa8Wpkh0wcyFKYJhTgdPcRUqok%2BCpGf%2BBsWu6Pcd3AMu6R0LjvzIltj4REY1ge0oPJCW%2BPsU1sJiZR2a9kiRTSWT9HT1EpGiJeM4wtWO2qZSivkuJ4HwyhTfK87EijEKehwoGJ17aR7HAzh2SMPxTk2YN5FbxJvcBMTyP5s5krONj4bTQlMDwNjg%2BagWWP8P4dYI2VLMC%2B1%2B%2F8%2F%2Fo4&X-Amz-Signature=62934a8b38a4eabc92aaa4a83e20c3c7b04335ab208ea12c145988eb4d06e69a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W72L23F5%2F20260127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260127T080147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC9gs1nNAeCmR%2FAk9GyG3uCZfuiZPTZgJgGUhihKSmFPAiEA8N1VSregqqS7SUmZZZMDI7YSfWItJ68qLEMD2s8Nok8q%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDGqTBLJdCtgL%2B5xg6ircA9v%2Foz%2F0x8olvzG1p70Iyec03kk0FfxViFax%2FNST2zWeGb5%2Bf9qxugsUTvucNISv20BFl%2Bs0TD0BY73JNU1roPTDggiFbUNA3ozQ1eQ5ZrvoaBQIZ%2F14OH894WDx5PHSaOJdikTw2uP5mtlnxlFa6EuvhNXXf4wXhcJ304AOlD92j9ZIh%2FrjwuOs%2BcIHSefqchK57so3NanXXD6%2B5i7djA8UXadBMeo%2BVpx%2BLxVo%2F37E6CR6zfzAecoiqNGMOUe68c1UnSBRCAy6vIiivD0w1OtiGu4fzeSVvGPZoUKiAY%2FH6Li6qoFsoIJhYVf35gHUYF%2B%2B6wtuMTtTs425xHTKc68Mk20BO%2F266NZcwI2X8ogNWxlf4B2asxsYnow9EKryfeI3aPakKtbyy2fnBjkrJNRG8GoZ4E6LQs2Xi1u4y52PjkFD6v0l3s0%2Bl1%2F4VQHY5e5EqXZKqZH8k2V8oU9amho1HwY45oM46bzQs4dV0B7Hxl3eO2iM5kK4ottMtpFXNIU7NAQsumgyN%2FSSbPeMVohUVy6cIgnN0qdNAuHIBqfPXXjCxFNb4mo7Z%2BbDljFnsoNVih3qswrMY79CHDWTMnUq89xuoCge3GrEbmKNnmtrR2CmHkjeW%2BymwtF%2BMLDK4csGOqUBD%2B16GgUiN5hsbL3f%2FX3v7FOq3hkbgd%2BZgFcoWpnVC9njIxA87omxQTntczf2ykfeI5fwm0bjm5oYKz5Fu9zWLdKhovKzuyXYkir4sl8NWYim%2F%2FMdRryzZHN8du%2B6fJ6%2BX4fLn%2Bsj3WDBdYKuyaFBlUfb0%2FWN06jbEhRx3bmA0%2BKc%2FvuS9Cc4f1Xm%2FECTPGCk5OfFtRnd2POCDRsULSurpTJTmrc4&X-Amz-Signature=5bbf6872ef2d8a666384c30e7e8751646af21ddf1d24e5eb70ab573fe2a8822d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

