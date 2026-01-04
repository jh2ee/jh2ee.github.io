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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRCR5NK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIEnnF%2BYawtnSUEBXz%2BKHsLDVEMH0JpLQxLT4PdD66HXuAiEA5SvE48dVC4PDsDrCUybXpsR2T6Q3bHiJfbgprze%2FbJwq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIU6SzvvlEuoVlwn%2FSrcA7VwE72XzXC6WFheKLS%2B5GiSRDeiozbP0xeW%2B0w1rkx%2Fa%2F5jRzY4%2BQ%2FO7dWl5ggb9g8uZH%2BpdZKx8u22Ke3FVBzMMQ4AyfsF595nxD%2Ffdm5FwQwQpdl%2BiTIQ3zMX2PPLymh1Y2w%2B9JhaWCJESPFMpQ1rJ6e3e%2BNpiLWcU2GeWwilC0sAHFAJZju90usVurGX4THRm9f3TpimKZXTr9Z2OwN68Q7iBHt3%2FWoTtXvc0CpjWKB1qmIL1adXJkqt17XzOAKupQKLBsAK8jCvWM%2Bx%2Bl%2BjO3WEym3yKC0RFR5oDQQqMeDo5ftYeeFw81lGU%2BvRNCWE3muXvbOPve7G4CBfMdbJzN13vtKPGG25zphqg8%2BoMHUUBaHXCf8Gtot6lY9Gpd3KeHSA38Ggi0kmcLOyAccIdxY9gnDAxUT8WEvwxDS%2Fb0AXfHiy%2BJvARmaveMPT4rim45rrjoKYocerKMMUxnydAKCl0dtQQUfb97BhaDrg1QiOs%2ByDbnWaomOu2iyF13F45lEyZY6viKe2QKO58nlAHb7Fkc1pGzeQ%2Bv%2BUtwXj5uFz1nkWg%2FAzQIn4VsAeFFFRxYYcG0I6mCws8%2F6nqCOsVbSNWCZ%2BRFzsKCa63uVtjedV13duC171rcQZMI3x6coGOqUBGAVTVF63%2BJ4vHI1kb6f4ps043H95gsn19hm%2FcGrnSGfwjJK0SIqwNgRuJOXyj9eb97Xx%2Fc5Z9vA0fG5E7NGq4fMyR74Rz0ELJ8MY227rnAWaasDkKfbBUe%2BngcGQbuJQHZt8ocUIPUSyws%2F9xox8yEMYBVWmcmhi4tJFcuNnPMljm0OTS5xgBDuGKrqRncZ9IHVsQIH4j78dUmZU5ZlY7jsp2MBa&X-Amz-Signature=5ecfd92e25f7cb603831d41d3c0aab866cada7842b0347076e609bcb7a9b54d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRCR5NK%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIEnnF%2BYawtnSUEBXz%2BKHsLDVEMH0JpLQxLT4PdD66HXuAiEA5SvE48dVC4PDsDrCUybXpsR2T6Q3bHiJfbgprze%2FbJwq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDIU6SzvvlEuoVlwn%2FSrcA7VwE72XzXC6WFheKLS%2B5GiSRDeiozbP0xeW%2B0w1rkx%2Fa%2F5jRzY4%2BQ%2FO7dWl5ggb9g8uZH%2BpdZKx8u22Ke3FVBzMMQ4AyfsF595nxD%2Ffdm5FwQwQpdl%2BiTIQ3zMX2PPLymh1Y2w%2B9JhaWCJESPFMpQ1rJ6e3e%2BNpiLWcU2GeWwilC0sAHFAJZju90usVurGX4THRm9f3TpimKZXTr9Z2OwN68Q7iBHt3%2FWoTtXvc0CpjWKB1qmIL1adXJkqt17XzOAKupQKLBsAK8jCvWM%2Bx%2Bl%2BjO3WEym3yKC0RFR5oDQQqMeDo5ftYeeFw81lGU%2BvRNCWE3muXvbOPve7G4CBfMdbJzN13vtKPGG25zphqg8%2BoMHUUBaHXCf8Gtot6lY9Gpd3KeHSA38Ggi0kmcLOyAccIdxY9gnDAxUT8WEvwxDS%2Fb0AXfHiy%2BJvARmaveMPT4rim45rrjoKYocerKMMUxnydAKCl0dtQQUfb97BhaDrg1QiOs%2ByDbnWaomOu2iyF13F45lEyZY6viKe2QKO58nlAHb7Fkc1pGzeQ%2Bv%2BUtwXj5uFz1nkWg%2FAzQIn4VsAeFFFRxYYcG0I6mCws8%2F6nqCOsVbSNWCZ%2BRFzsKCa63uVtjedV13duC171rcQZMI3x6coGOqUBGAVTVF63%2BJ4vHI1kb6f4ps043H95gsn19hm%2FcGrnSGfwjJK0SIqwNgRuJOXyj9eb97Xx%2Fc5Z9vA0fG5E7NGq4fMyR74Rz0ELJ8MY227rnAWaasDkKfbBUe%2BngcGQbuJQHZt8ocUIPUSyws%2F9xox8yEMYBVWmcmhi4tJFcuNnPMljm0OTS5xgBDuGKrqRncZ9IHVsQIH4j78dUmZU5ZlY7jsp2MBa&X-Amz-Signature=5ecfd92e25f7cb603831d41d3c0aab866cada7842b0347076e609bcb7a9b54d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DJLEIO3%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDEb3eUV89uRxkoBHgSd08fp3oENOJaWTGO7cuwSq2w8QIhAMbPeNEunBuKxEaxfYiB%2F3ByYTjwTlDidQfUbHHxjAdQKv8DCC8QABoMNjM3NDIzMTgzODA1IgyKP4R1D07rtO29QN0q3AM976D%2B6xv65tSIYVIq4%2BKzU7i8HtR61cVmXs89yifufuA0D%2BJhMo4JJSWeaiMcfmyd54RAHkUaxQk8qatPQpzcDUVnBtSIiurfk5hYc3J65MmtmKXhmHrMK1atM3v2v3UkkHrVhCpbPG5dXdVItOrpPxgHg5U1ZomtHQtjdNPeHnB9VjVb1HEgiCBxr6j2RCqa0PMjW%2BU3TgbZpzdTF8ANZPOyEaSozMo9tOSNk7bmUO2e3ZCkFoFMCak1oxXhUU%2FBfgmMaiqKO6RAjpjaq7YsJmw22K7Dsq%2BZCwg9WZ0zqRG5t%2BeyBLpAZcTgZFHqOu8P5fWx4AsEW7rvG2hWiwVdU%2B9U22coyQy4sLhI3vLizZcaVcATKdDQsF4qveByVvCS5yIfW71H5mPOM0OBz98CMDY%2Bw%2Bpk4ETF4damMvlcvKn63U%2FevdlZRaRK6u7KuBblLfSa6RHGQMQjwLPVLM3TJ2AnFn%2FGR3ZL%2BVa%2Fv7cf9RtlcHPb9IRiK8kSxuEtDyTKm0fjwhU%2FDaJLbU0MAurEkh%2BQ9rMDNGK9sRT5MuWHe8cY5YPPea0xKVKQYDXK%2BfnC07zyNP6mzN284ztxAzTqbsNsJzDocCPfYja2MjM7X0FEj%2BiSQRZBwn7UuDCV5%2BnKBjqkAZR35MD%2FKJvanUWJLVcCUYTZR1A3BUvyelopohd6AunWAAgVtQ97l4ErvfC9uTa9eeJLESQNK%2F7e4ApMyZ0lGzSCxkEH%2BYCn9OeGj97kUgk%2BWgJdj3V9Fo5d%2BXwveAE8FxO1MhRwpu99Lc4FnDWIWUmoL6NHaLvgYi7rAxuQeaqromXMSfzD3qD0iyliRTQ3iJcaojhRqiVjBVR80%2BG0EZoCE%2BBz&X-Amz-Signature=22facaa7c37553e1745929c0ac0589471631f2ece00779d0dc2c601482c89d3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TWQHTY6%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIGOL%2FhzTm478BSgeIcCR58uBHTkeUPn7qxxwPXbWZmb3AiEA5hIAUygHx2gfN%2Bvdp9oVxeOLrXd%2FnPdeN7cdfGDjpCMq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDInGwkDHxYYFnIbcMSrcA%2B0LR4yMlI%2BgNRcPB27XwQ61X%2F8ZPm9vZf2YvnqhpYnLE8IYE9CarhKt9Ub84gIMBpzhHWeq4%2BLVLI6%2Be7ilLpCF9uT1lJqELTtm%2B7cghVhH9LXX0yGzkOJLt%2F1YdDzbCOC97Tvhf%2Fi6K5fhqRODLzl%2FtCSkWtI72isf06NLNZAy021zW%2B0ZxGbdyi%2BhIzW0iNx4HSvyFYQeyxsnvRj%2F%2BD%2B4ojlAF53eRh%2BSOY8eBLPdVCcQnxvxGItoIlmUhdyt%2BZE9wcwTAa3%2BnY8ZbPRDvMVXcYWg%2Bg6JeS%2Bu7pW%2Bet%2B54H9N8kRavZf9JSjHekeyaEeGBu7Tt27SDFLaoBVmP4M%2BRDp4A1K6ABdDUiCv%2F2i%2Fmp%2BXoguJT8h%2B29Ml1gGAjdXD%2F5XLdujmrB5PeeLbmc8me2F99XivAvFhedUZj8HMlSx7mCyEh9DN54vmNXwFvMCsy1Y3b%2FclljJU44zJLNJt6FrG9U3KZCa1BGzkVkg%2B8mhPFet7Ss5QovOgVp%2BabsqUyl1PB0XyCP6Qs%2FyGyJevhn5Gz9nfyol9rFArccqTSLEWfOjgH%2Fp%2F%2BqUThEBmLy7MNmUZuQM5rWfMtBYj%2BcnuNdiy8XdfDz0DuYOA9vSZzjXoK1gVkBwHTmaKMLnv6coGOqUBnEZpXgno%2Bn0K6V3FMhv4lCHRQ85fvils5eYbpncgplk%2B4c9irYZ5I10lXgoh03%2Foz0F%2BTOggvOq%2FPC%2BRRm%2F%2BIYf91y2RZFfRszGKQdlyyDGIRkSaaEFClwU%2FHh4mbB%2FGGKgd7rWaIPfa5jwdzgMskHSq25KXV3G4a63%2FUkELM9nM1P42gkX11Qb6VZZ1ce0Gnwrn9GiaQ4TC%2F4vY7sXSYWXxkZf0&X-Amz-Signature=d75fbdf26c08142b47238fa94e0378ba6de3f9abf096a7c31ca32dcffb94c141&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TWQHTY6%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIGOL%2FhzTm478BSgeIcCR58uBHTkeUPn7qxxwPXbWZmb3AiEA5hIAUygHx2gfN%2Bvdp9oVxeOLrXd%2FnPdeN7cdfGDjpCMq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDInGwkDHxYYFnIbcMSrcA%2B0LR4yMlI%2BgNRcPB27XwQ61X%2F8ZPm9vZf2YvnqhpYnLE8IYE9CarhKt9Ub84gIMBpzhHWeq4%2BLVLI6%2Be7ilLpCF9uT1lJqELTtm%2B7cghVhH9LXX0yGzkOJLt%2F1YdDzbCOC97Tvhf%2Fi6K5fhqRODLzl%2FtCSkWtI72isf06NLNZAy021zW%2B0ZxGbdyi%2BhIzW0iNx4HSvyFYQeyxsnvRj%2F%2BD%2B4ojlAF53eRh%2BSOY8eBLPdVCcQnxvxGItoIlmUhdyt%2BZE9wcwTAa3%2BnY8ZbPRDvMVXcYWg%2Bg6JeS%2Bu7pW%2Bet%2B54H9N8kRavZf9JSjHekeyaEeGBu7Tt27SDFLaoBVmP4M%2BRDp4A1K6ABdDUiCv%2F2i%2Fmp%2BXoguJT8h%2B29Ml1gGAjdXD%2F5XLdujmrB5PeeLbmc8me2F99XivAvFhedUZj8HMlSx7mCyEh9DN54vmNXwFvMCsy1Y3b%2FclljJU44zJLNJt6FrG9U3KZCa1BGzkVkg%2B8mhPFet7Ss5QovOgVp%2BabsqUyl1PB0XyCP6Qs%2FyGyJevhn5Gz9nfyol9rFArccqTSLEWfOjgH%2Fp%2F%2BqUThEBmLy7MNmUZuQM5rWfMtBYj%2BcnuNdiy8XdfDz0DuYOA9vSZzjXoK1gVkBwHTmaKMLnv6coGOqUBnEZpXgno%2Bn0K6V3FMhv4lCHRQ85fvils5eYbpncgplk%2B4c9irYZ5I10lXgoh03%2Foz0F%2BTOggvOq%2FPC%2BRRm%2F%2BIYf91y2RZFfRszGKQdlyyDGIRkSaaEFClwU%2FHh4mbB%2FGGKgd7rWaIPfa5jwdzgMskHSq25KXV3G4a63%2FUkELM9nM1P42gkX11Qb6VZZ1ce0Gnwrn9GiaQ4TC%2F4vY7sXSYWXxkZf0&X-Amz-Signature=f825edfaf12c8ccbe391fdd316ba38be7f78a1ebc7eebd74567f15d4872a4bc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3OKT6PY%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCS0XQPkEFQXIGwc0b9nkrQFJLg%2FOokYOj1hJ7fFmCaLwIgb4Pg%2BNnoDNIqnbl0m8Z9r3hA4vbkgzFqLN8HQTzEjyoq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDLSzvIgKDm7blRarwircAx969etTBlGHlrT0ZE1Y7ULc3YdtxCq1xkLphx4jgfw35F4UYpZpSHCxm1Qxktzer77KY%2BLK6dNP2c2Wp3IHEGqwyPJJbBZErwgvG200ArRWgqDKs4mgLRZbGbQZpvnANVBZsVxScmYn6Z2zVE%2B984pJzb%2BMbgCAaVPPal8NdmhhsB9vGk4J1NaTvS5mYrLXhXH3J7wFbZUgZA40HJbtxyMGO0F1moTlkZd9dMvN8eRS%2B9dc0EXa2CmOSQx7h3xsB3THfUP8dk%2FmRb2URoBF4Hz679JvV1ZI3sDqGldESCzsrG0g%2B3udpSUzSkP0n0hQfIBv%2FGa7TLo6Mvz54tftZ%2FTiUyuFNisszOPXmqvipYZuwMK%2BZONJyce5JVCpBSeGapsgL%2B2dSMBorFzKt2sUz%2Fi4rpSnuiryPRlPwRq5Njxi0q61O%2FGxYonRqerT7anlSZXTRzVMumarYUnKsJNc0MBHK2h8rSXP6GtBI%2Bto8kH2FzHjHF08%2Fvr2wzyhR3XbctJzWaXKo%2F1e2K5ZBGJqMQ5C6RsZ6We40ka5kqf5dVuYUnVc2fMddC3YAdshWYTei0iDSKI26DXTBYI%2BB1REusuRt7bx5OgP87EctC7aSZOFpvw4Z960s8RQYje%2FMMfs6coGOqUBUAbLV0%2F5RJ44Cog2qIA9PEMvRRgC2R%2B9kBuY2ZI5I2Z5lOt5%2BvjQyopAky%2BrxM%2FpI3H4XQQD7DiEQrvGiAm2HdhNbeA3qymxXtP5TEkhQwJH1Yr5H3f9AaCtbZe3MUXCiBg5lH7a2gGB952K2y1B%2B3O8a4rAabAe%2FpzzodWqCIPLRpCLnEZt4PNEwnrMdBkROHX0V4z3qM7EMecHi8K0LHAG40Oj&X-Amz-Signature=e0b356a6e8683e2e8d70cffc9c13d3bddcc2b732948ed1dc15892ca8ab00f27f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YKMZ745%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIHUfbHt3vTlUm0yrAnriY1lo5KyRC%2FK%2FSduj1wtgiZ%2F5AiEApt6JhwkcMHV1M6Jj7feGFqq8a1F9NfzgDH%2FSE2gmsYUq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDBzjNsSgJpaHQSH9syrcAw3hLX0eMvHiqNsh0YMNRFjCaegQAGrrvSFd5t3n6mhV4Bp2ItsNXMiHuGHz5SmLrvc3lNFk8l0dTGB4zmarYqNjb1MisnEg2blb4rFqxOoAJs9hZRHYB0M1T0oXX7c7LD5%2FeMNMlFQcvkJuTLyGtPKLAyY6Q1H2JhpK1WdEMGcrCie50Lb%2FcSQhvBiu0ZDiMPaq0diPDvFYqWvYiju4un9omIGC1wIAWM19tD%2B4Wf0QDpfKe0FIQQhgdSvZgCnCLEylJICBRkIGfaZjzgpZ4l01v5pHh32gcrT4iol5IWugz3oKwQyZylYX2IH%2Bkx5cWSvHseL6FYXEyQWJmyOB8Wp1%2FUiNvDaFEPPWMubDlOahEfw5dAdt73Ie6gWFpkC0WYW6od1Vb6IBbQXg2qxUbcsZomh78W%2BCOGcn869MzhnDepcUy7AofvCCrDs4Og5BKweZSZlQ4pjFpmoDXc2G0CwicftTDBYVbA3dLr8uvbAf%2Bc6L%2B91%2FSTFsKcysXfLnxGEvAEHdBm4trZacs1TuUIhrW1KLw3lelhShLC36byFfmNICAcr3GO55tdH7Da%2FldXCoeE2lgtcDzrNbP%2FmFCKH8kGU58f5ojFbuBfg7BI9ScBYpuhPGQ65g2solMPLm6coGOqUBL%2B5BsnFNUxM5O8bfSOkvRquqD6ajBFdhHoxcNRrT%2FUYdZLAmyfRRxJgZuTLNYSeWxv7Lld%2Bs8OhZ67%2BcZ6fb9eDKgfQu9E6G%2Fy2P5h1kX1ocNRs3l2LneL6ieRh5nPvanRzlUwEGrIjXY40IIN8K%2FzhoaS6y0j1NvU5%2BKKzBRxrz6DF5NqIzzyN0YhL0pobZhUKfytKb48LQfOABoC9sGx9iRblw&X-Amz-Signature=493693ae6c0d09e836a5d086271b5a1a39deb49e7ea3fcde312129832b3676bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZTKTOLP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDoekMsEcPFFeTWdxedmlr2E5ZxtuXVJPs27b2YmQ6OZgIhAIiU0YIQh8OwxtcTVy4fmlN%2BEJHp4ldTwgb4nFrNmxB5Kv8DCDAQABoMNjM3NDIzMTgzODA1Igy6CIHLWvZCwEwNJVMq3AN5la933C2IuCFtpNTyGUJ6EUKw6V7oYkkRjHQJ2WuaNFuWpKnuOTjypcKPnkXXwMEwbUEiA9V%2B5IvBEOSgIRTSb%2FUHJi3IWAQsE4cdDWVsQWU2aaAJ7nSf3elLJacr0qJHTfcuHMEFP8s5cqjR9rnXValgJJPpQZwSr2Mh4aunJS126R%2BSs%2BDFQy%2B1TvIvoknVTqeM93rlU8AG4iKO0DndRt2nANkzrzQKflUPurNPF7cmq%2FwT5tdY0sx1%2ByGFBSyzxTKHmQTjl5cv6F%2B0d2WtcFYgBrQtZCqpZ%2Fo506KIjzygi%2BRnOgUY4ToUulL5a8NbAlEm0mJOSLY7O7u65PMZ4E3qmIFDdp5erkL4i9aNPrb9iDTH%2F58bsG9zlpfR1Ht5YaQuDe9NOMTQ47FZYmwDmCc%2FwrH2URugimsOOJzVSN9AyHoQY115Fmdc%2FTv9jAUPtNG8bAmsg11dZdIoDMhBS%2FDuity1sWUImKfG%2B5DAKEVL3NR2Kr7Z08%2BB440a5HE1g5jv2kchf894rPjR2Lf4PgiwCsye01aPbYbDQLtDNNpeX02asevzD%2FHezkY5x5brx2NQDvUZNXgVG4zcpTQTtyxuwyC%2F%2B31jzASrXW6hy%2FBZi5PuWvb36lxiPjCE8enKBjqkAb%2Bmxt0tdpC6%2BGU5tvPa3VfVoUytQnJkp3cYMgNIcRqesiI1oikeOIfw0Om3vd%2Bm7IAQw8pXjaTtePU5BVPGQGHrQR8Jtr5nnXscVy98lwW6wgna%2FExlFWouCu%2BFt6HNpMjgNwSPUWcAiPjUzdb3HX%2BDeVbbuiFW66uFTZeKeQoEkplHuy5NErvuwY61JV8oPNodarDeQe4ULLgUYy4XNp4p6tzE&X-Amz-Signature=0956c61a9d7f5b2a01abff647f5fd69d3b0d2940cad07785515364799358915e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZVEV4UX%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIAmvpkaBMTFVaWtRSEAuf5eqztux8VZsZ5ZpRFyLlvQ8AiEA5dSS0iNrwFfcleqjXPojGqrjZchI57qwv5imUvDCpBQq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDAnSpZum0%2B%2FH1FKVrircAz8CqEJ3TaRM8Sw8hYgvMqNNCs6qqqyVA9OGQ6Zz51DCK5Ajh0n%2BL07p65s%2B0DomUqY53Tifzp1pb%2Fh98Q1iDttiol1AL%2FvlF6kIb%2BFoSUuFmjprssSJkcNff9FQfyeCLDKCms%2B4317oUusiQXafUlPxhJ0bNkC%2Fm0L5gGRn00fm0SJ22ArWZNGeL65xw1DiFOH30%2FDUNm701OlW7sZcC0mQM4gwCaBTfhZ99Ns%2FwXtMt9vu9zGXdNz5uZgVkdG%2BDXWOWQizS7iir6I9%2FmIXR2Q4NuV2g6TOjh4laWkAbH%2FSraDNuo%2FqS5SY%2BjxMfoRHJA9%2BzRDZd4ArPDgEqo5wcxwaCtPTA71h4NT4Sjz8I%2Bv53zJYGMsRo11ZE11B5MSnzyoygAxw5lVH%2FzqvLSPNQ%2FyhGoGvvpL8%2F6D7jUosNpOcRsdbzmksc3fCqVj0UfcMWEeUcbMK7Q0sKyl%2FhE7%2FLkng%2FSWhm9mWPdSSaAuZfcRKN%2Bq%2BxWH0Zdt%2FzvYWh2b5%2FTgkxEiW%2Fb5Xp0VyJYCdx1GrCYJHdFnTIyK8PGakRoulufvYmSXHByHSJ9ihYuHpBAaBTsZRSipPvEr9DQlT15yk%2BtMbbvm%2BdD%2FwN7HRg0vY8dedy42Yfy7bMXjMMLn06coGOqUBHb69%2BRTlqD7yav2QbBAnjqPRdkH0dYO00mx4%2BPtwE8IdVUutAbVzq2whewpIN%2F%2FY0ZFDFRYiXDRVCiURY84g5LgArvTQ0Kf8n1s32%2Fh0d0udANzTqnSU0s4t9cGJv0F%2FSfd3Y7qEovk5PQce%2B8D0AWR4c9I1hmiUdYRAhu7L145OFUzwuN5ZYIpQq34pN01wvoM836EGTDexvHGhrpThNZokmzkz&X-Amz-Signature=d30574991f07577a691b5222c29cba42d69f12a7ed1d94fb872d234649c499a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZVEV4UX%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIAmvpkaBMTFVaWtRSEAuf5eqztux8VZsZ5ZpRFyLlvQ8AiEA5dSS0iNrwFfcleqjXPojGqrjZchI57qwv5imUvDCpBQq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDAnSpZum0%2B%2FH1FKVrircAz8CqEJ3TaRM8Sw8hYgvMqNNCs6qqqyVA9OGQ6Zz51DCK5Ajh0n%2BL07p65s%2B0DomUqY53Tifzp1pb%2Fh98Q1iDttiol1AL%2FvlF6kIb%2BFoSUuFmjprssSJkcNff9FQfyeCLDKCms%2B4317oUusiQXafUlPxhJ0bNkC%2Fm0L5gGRn00fm0SJ22ArWZNGeL65xw1DiFOH30%2FDUNm701OlW7sZcC0mQM4gwCaBTfhZ99Ns%2FwXtMt9vu9zGXdNz5uZgVkdG%2BDXWOWQizS7iir6I9%2FmIXR2Q4NuV2g6TOjh4laWkAbH%2FSraDNuo%2FqS5SY%2BjxMfoRHJA9%2BzRDZd4ArPDgEqo5wcxwaCtPTA71h4NT4Sjz8I%2Bv53zJYGMsRo11ZE11B5MSnzyoygAxw5lVH%2FzqvLSPNQ%2FyhGoGvvpL8%2F6D7jUosNpOcRsdbzmksc3fCqVj0UfcMWEeUcbMK7Q0sKyl%2FhE7%2FLkng%2FSWhm9mWPdSSaAuZfcRKN%2Bq%2BxWH0Zdt%2FzvYWh2b5%2FTgkxEiW%2Fb5Xp0VyJYCdx1GrCYJHdFnTIyK8PGakRoulufvYmSXHByHSJ9ihYuHpBAaBTsZRSipPvEr9DQlT15yk%2BtMbbvm%2BdD%2FwN7HRg0vY8dedy42Yfy7bMXjMMLn06coGOqUBHb69%2BRTlqD7yav2QbBAnjqPRdkH0dYO00mx4%2BPtwE8IdVUutAbVzq2whewpIN%2F%2FY0ZFDFRYiXDRVCiURY84g5LgArvTQ0Kf8n1s32%2Fh0d0udANzTqnSU0s4t9cGJv0F%2FSfd3Y7qEovk5PQce%2B8D0AWR4c9I1hmiUdYRAhu7L145OFUzwuN5ZYIpQq34pN01wvoM836EGTDexvHGhrpThNZokmzkz&X-Amz-Signature=6f4de69e2eca059cf034176cebdd4b92933b6ccbf37e1d7a1d1438caa349ca0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2P4UBHN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCW6CWACL5s2ChPf%2FpEgdMCQzUM5FfZ7LEczIaBHeo%2BOQIhALQMqJXDYOcsVsihdvTD7wIK8U7b%2B9OO%2BvdtOBpvmGVlKv8DCC8QABoMNjM3NDIzMTgzODA1IgxRA6XRE7%2FWEvJFj7Iq3AM2OIN3sAFXXGla9jSYVLtLNaxkktRFRExrUFmZo2vi7kMO%2FQiQeCdw1XHsqapjpVnv5NQz7u9bQ65CoIsKdw4iWXH7Y3Fqk3ts5UpIaZG28dM207or3TSvTs1pITrN7YEX6DdC%2Fo82LvRiPo82ngGVYpKMZKo179FA9jA%2B3FvssK4udE0q1SEzhfIq4INrTPxpzYRJpf5M7jo86scCiW3Btzt4puGDlJjzbuyBJbNr7oKp8Cg2iBtIHMurxHO4rwAb21tZuwTX2tfrEAYOtOe%2FJLMLLzN%2BcHG3Rg28DbfLxA4eSOl%2FxswyBlp0iklvx3BeI5hZvCd52yuvkOuYupdPoMqcoPz7BR2ryhxvxG1URlzTcqYwp%2B5aZHfgOd%2B9KynB7kdWc%2B2zPzEVHBklFZBEjrxJtQ90xfRmyVaf3a%2FYlYNKhgSn4cj9R8x4cHXFBr0Q7JZJsj5nTkVXTIVHZBVfC%2FoNjqitc%2BfZWm2PQ8D9ZK1ZwlcKYKAI4ub%2FqKGu5P2S%2Bv1W5E%2BiWbfw8XA9wYVqy92vvYX7vceMoILTf1vvPaKdMPSBwdtld1ugZGC7K3wKF6UWFMLxeywEszxy7ypn%2FYhBb2II9bgBgmz5ySUepZsbhgnSYTcIGMb%2BXTDs6%2BnKBjqkAf03mmm9k85F%2Ffd9PxcKUABfQAGmkbJm%2BQdQGyki5nrv9G0%2FLGiOuDlGLdwm%2B6DBu937b2mZl%2FsmcK%2B%2BvQczY7oS5fzMXKssb7kdBJeUC5WatRfCpxcrWaDk4ZVJPjoZRjBIv79X7F1ORDW9UWInc8SlVLApMLG%2Bv%2FzvRd7pJO7CXdmtxJ5XD2M%2BRqXbbHFG9dn5iYlAGQB5fFB%2FnCC6GucaH9oH&X-Amz-Signature=ffbabd4f63a1b9bac4a168468ee1e713567a634a00d9764604605721303ab64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUQYHBFX%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHjnU9umH1scTj4uJgfid9Q%2FnGNLDKNmoBkgFVZHtb2dAiAR7eh3ITDOm%2FHBc7xd4DA%2FOtUdLLxHTeL4YeISHJ3lbSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMwPoYMrmpG9XU60YMKtwD9QC5%2BqfWm1sWxcrcwVjkK8hkbTSnP5nUMcWGwrXWoinSyS99DfhXYCh1l%2Bl5f8ra4%2BhR2LR2ddmbcpBoVJbr4j6rkJv8FyqNl8ooNq23WBu6RoYdGYymIX4Knc14R93o5Dmz1C9zmaVDKHYMMPuUBHox5Wl9QHXHMcy2bHLJNlZgIemJnpPUJt5JWTdoDJim2JnEkEbsv28Qb48lW%2FahBXniTooZpucDx5Eb1mdVCrihJY6U2Qv8BRr6KmrJVdFQ62cYQuMcYXK9Tr6ZwmhWtNahEx7c%2F3BXsbUgliN3eNVYLnX%2FIfx6VWuw8NQbYhAhqEUzMCpS7IcXCLqWEiCNg%2Bl1F4pNvLaNs0Bp%2FWcU34J2pN5ZMKeImcW%2BpoNcUQ0KFmdr%2FDixVVYT3f1%2BctCd5%2FFCaocDEd1jdCoKZXARiJqE1%2BFCbaoO5xrrzrAqWEktyxR6Xwj3FKbkKT6pulP%2BwYbLyAk%2BTUJvSTva70Ed7pOzGpNFlxcw%2BLBOhgFHzWwSU6LNVioTCWRAP%2Bt3KNKl4pvrXPd4GELUXHkd33bvejttd9PTjPQX%2FJbxPoigT9DsTQ9pQX%2BweCbFCaGXzNjR%2BcQ4w3MitJf6%2BTkeUyI4aC1ehuCtlB9qpPMvurIw2%2FjpygY6pgF179M64BQA2rLqs%2FVOeIoCAYMwfnGEwLqp%2Fj1K70qcvk9vcV0jc8PKg6EEsY1JtZODe8jgXeSZJXFaczEVgNpNAOi5XWMi9mrSVmMxM0eXj5J4P%2F9ABeM5%2BoRAOad40XQO6dhim4NSA0mrX21kFeDBbEANnCACza6IhIsL2UV2uJVJaWrAsunElLVVI0i%2BUkQde77ekyYZfyQ%2BdZgC%2BrJhGaMj2Pfq&X-Amz-Signature=ad9f8d060880bb48a4d82e8bd5c1067f8187e197deac3a2f17e2291eb0952448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUQYHBFX%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHjnU9umH1scTj4uJgfid9Q%2FnGNLDKNmoBkgFVZHtb2dAiAR7eh3ITDOm%2FHBc7xd4DA%2FOtUdLLxHTeL4YeISHJ3lbSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMwPoYMrmpG9XU60YMKtwD9QC5%2BqfWm1sWxcrcwVjkK8hkbTSnP5nUMcWGwrXWoinSyS99DfhXYCh1l%2Bl5f8ra4%2BhR2LR2ddmbcpBoVJbr4j6rkJv8FyqNl8ooNq23WBu6RoYdGYymIX4Knc14R93o5Dmz1C9zmaVDKHYMMPuUBHox5Wl9QHXHMcy2bHLJNlZgIemJnpPUJt5JWTdoDJim2JnEkEbsv28Qb48lW%2FahBXniTooZpucDx5Eb1mdVCrihJY6U2Qv8BRr6KmrJVdFQ62cYQuMcYXK9Tr6ZwmhWtNahEx7c%2F3BXsbUgliN3eNVYLnX%2FIfx6VWuw8NQbYhAhqEUzMCpS7IcXCLqWEiCNg%2Bl1F4pNvLaNs0Bp%2FWcU34J2pN5ZMKeImcW%2BpoNcUQ0KFmdr%2FDixVVYT3f1%2BctCd5%2FFCaocDEd1jdCoKZXARiJqE1%2BFCbaoO5xrrzrAqWEktyxR6Xwj3FKbkKT6pulP%2BwYbLyAk%2BTUJvSTva70Ed7pOzGpNFlxcw%2BLBOhgFHzWwSU6LNVioTCWRAP%2Bt3KNKl4pvrXPd4GELUXHkd33bvejttd9PTjPQX%2FJbxPoigT9DsTQ9pQX%2BweCbFCaGXzNjR%2BcQ4w3MitJf6%2BTkeUyI4aC1ehuCtlB9qpPMvurIw2%2FjpygY6pgF179M64BQA2rLqs%2FVOeIoCAYMwfnGEwLqp%2Fj1K70qcvk9vcV0jc8PKg6EEsY1JtZODe8jgXeSZJXFaczEVgNpNAOi5XWMi9mrSVmMxM0eXj5J4P%2F9ABeM5%2BoRAOad40XQO6dhim4NSA0mrX21kFeDBbEANnCACza6IhIsL2UV2uJVJaWrAsunElLVVI0i%2BUkQde77ekyYZfyQ%2BdZgC%2BrJhGaMj2Pfq&X-Amz-Signature=ad9f8d060880bb48a4d82e8bd5c1067f8187e197deac3a2f17e2291eb0952448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJSQ65HP%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T170127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDV8uMqBCjKC7BnU30PRRM%2BBWQa28l1BiluCMcc6fh%2FwAIgZKbsL5EzT9czx6RMEJLT2re4uP8V3D5PpaN9U0wxr40q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMXEHkC6KgqiDkan1yrcA09KQGBX%2BYbX7YAy2hYbtmSrMcyx0woOkYXuEzG7hh7u5%2Fyqd7cHwG4ifCDC7n9nUke%2FMybnWsoQAiFKpBrQVrVua8t%2FcGpnGodEFaCrZk0TMP4uIpy64mvOepHrZVnbFW9K3h1mZ6LFt3uHLgZU3g9Ys0Pri%2ByFc4QTtktFTg3zdIG%2BCk%2BRifVhQvR1%2F6Q3mkEJHhSGM7NPDp9%2BvNAWUjUtX5wFiJA6SznY5Aogu3CYai6uZjHRHmo6JqeqFDtXh6Y8%2BKbiezSy7uOd9w79%2FcOfy9QRENedogdaH3wenQHqEwAOaSZvy%2FQjc41%2FmdPbkAQf4YnINGa8vw2wFW3fce%2BPTB3tzPJRrfZEmUVKi1hdPdhB5pjKKE43BytDFLz0OsfBwBypmEMgUBuSRPQgZJDsCfw0v1BRlx1IGM5F0JV6i5uh%2FWhdmjtEQPcof18Gj3R9%2FTYYAR%2Fp3wA1kTyNmxGSWg5UpMCMa484wHsqhs3LkV8EFp%2BEs0qS%2F9d1jUXA52kmS7396o3BC0LSsz3VnrgzK%2F1AD9ereGH9cNKYMkBkSE3JPdWgO1vBa7vJe79nPmOzUbgowu7POYIE3fS0e7%2BqDHA8OpHr19SNbQx8GJ1VPvuVkseFU8xipC3WMPPn6coGOqUBRyYQ608JR6nYa7zsDMwozoqt9MQf5yAtnQsZMiNrFd5Uq9QVdL3EwgpnifFA0%2Bd7Oxa3evEvn5ipyBZJGpUQFIEUWU%2BhYS1Sd6UwJ8f3HeqnbthS3nGdqco9WqK6609aNX6H7rRnRqkKxXzd3gaK4sepUzfo7c%2FvFjRsFgVaJ3tQ0HeVIjAeTmryhDLuSuQtRmUXljaSJGZ81Zl4dUvHy6tD8T6W&X-Amz-Signature=621fb7b3abcddee4c9f9b8b561bf76c7659e5202327473c7d5b963c98d773c91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

