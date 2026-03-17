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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUXHG2JE%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIE6dSimn44Rz4rC32T%2F%2BWBxuz6f2g1fTFE6sZ%2BBtgToYAiEAk3NsdJS9MpqYPnhVpu6nq1eIDOkN%2F5%2F78tM6%2BwaB%2BpAqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM87jiRA71Z1Ui8%2F7yrcA%2BRCqcyWhx%2F%2BwkAsseaI25VUMqARGFm%2FzbRTkNAAoZmJxHb%2BcNCX0LkBBE1%2BjP2vdGp2kQJiBmxfmxyQoYvLAEuFoRO7CKNjwT33PW5CbLhT1lA5oRFocJN4PsfJqI%2BRDInW3WWfdIkQzr8CUAnACOjIxX9BkEUkqhuueTLPIFMMHEYKT8OUYYu%2BuYqZoJxOdHlnl%2FD59%2BJ2DkpIO7RVpn6sqx7MsFm5HYRL7T%2BvpgBxnGJFVqFXOIFch6B%2FgMxTn32N5ErH0b1kYcs5FUq%2FVoQnkkHpEIdPVu9oqeqSK1Sl%2FjTLzXiKQYIkcBxNGUyvgWTuphtMrj63DuPrQZO1kXuEd5zUFu92%2BnZXCHQPYSu7Jo8ERR0PR0XZoL8DoYNXbNRIvG8rw5BKLjBYIk8SbB5%2FvSjR0kFcAbYPJESLc5%2BYqpxEmsIu5afc3XqSZnwIF19RUMiCXA0fESUl2ZbKJRErYSAC6exlKQalQgz5M3rrUr41iIHelO%2BYTSVyTZu1w%2FmYOIFGkh4zc%2FqfOCj6pfLdh%2FvVQ1sxL8cpoPB4Qm1nefQYVblU7Mgx7Y8w6F%2BnMyW0dZ2YlQC5S4K3QMP%2B07olmM8ytr1j8F%2FicnDYLabh8iOxHXGoqWfpGSsbMKWp5M0GOqUBgOpmvVJPGhZrlS0ESUr%2BsEO3RV0oi8jkVRGu5oLTeWZwY9OKgmXS35oU04jIsUJX0TF76WAQrn3yuoBJXzykcGIOm58ijqbUL2eVy8tK%2B5KZfvpAQwYAFfn0O3kmzNRjXIzem2QSkegudBafbpxzzW9pfppH2AXxbtWa36MJQnQS5womaU7UaurP%2B4fPGl%2BjjLkETNtMXe25SNrzTiFzSbRnJhLq&X-Amz-Signature=f157365122c4f8551be8df65788413d24df049130070ee79d446629ecfe90750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUXHG2JE%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIE6dSimn44Rz4rC32T%2F%2BWBxuz6f2g1fTFE6sZ%2BBtgToYAiEAk3NsdJS9MpqYPnhVpu6nq1eIDOkN%2F5%2F78tM6%2BwaB%2BpAqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM87jiRA71Z1Ui8%2F7yrcA%2BRCqcyWhx%2F%2BwkAsseaI25VUMqARGFm%2FzbRTkNAAoZmJxHb%2BcNCX0LkBBE1%2BjP2vdGp2kQJiBmxfmxyQoYvLAEuFoRO7CKNjwT33PW5CbLhT1lA5oRFocJN4PsfJqI%2BRDInW3WWfdIkQzr8CUAnACOjIxX9BkEUkqhuueTLPIFMMHEYKT8OUYYu%2BuYqZoJxOdHlnl%2FD59%2BJ2DkpIO7RVpn6sqx7MsFm5HYRL7T%2BvpgBxnGJFVqFXOIFch6B%2FgMxTn32N5ErH0b1kYcs5FUq%2FVoQnkkHpEIdPVu9oqeqSK1Sl%2FjTLzXiKQYIkcBxNGUyvgWTuphtMrj63DuPrQZO1kXuEd5zUFu92%2BnZXCHQPYSu7Jo8ERR0PR0XZoL8DoYNXbNRIvG8rw5BKLjBYIk8SbB5%2FvSjR0kFcAbYPJESLc5%2BYqpxEmsIu5afc3XqSZnwIF19RUMiCXA0fESUl2ZbKJRErYSAC6exlKQalQgz5M3rrUr41iIHelO%2BYTSVyTZu1w%2FmYOIFGkh4zc%2FqfOCj6pfLdh%2FvVQ1sxL8cpoPB4Qm1nefQYVblU7Mgx7Y8w6F%2BnMyW0dZ2YlQC5S4K3QMP%2B07olmM8ytr1j8F%2FicnDYLabh8iOxHXGoqWfpGSsbMKWp5M0GOqUBgOpmvVJPGhZrlS0ESUr%2BsEO3RV0oi8jkVRGu5oLTeWZwY9OKgmXS35oU04jIsUJX0TF76WAQrn3yuoBJXzykcGIOm58ijqbUL2eVy8tK%2B5KZfvpAQwYAFfn0O3kmzNRjXIzem2QSkegudBafbpxzzW9pfppH2AXxbtWa36MJQnQS5womaU7UaurP%2B4fPGl%2BjjLkETNtMXe25SNrzTiFzSbRnJhLq&X-Amz-Signature=f157365122c4f8551be8df65788413d24df049130070ee79d446629ecfe90750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIC4TGPW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQCGTUeqlyVqmTlFzf7Fa%2FeJ3JtxKgYcz%2BMcgca5F69A0AIgHngojcH1e7Ex5BMemHMCCkLOxHCVJNtX%2F4Dd%2FUzog7MqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN6OTGbgma%2FO0NZAtyrcAzSi3iv4kd5SFjchEUBSjV2wD%2F2EtBkVtuD%2FJ7RDRzMQQ7XhaSkC1JAWdtRffKhKNdJI%2Bc7JKmnZi5ZT9%2BF%2BvO%2F%2BdYK88ptRspoINiT6E5REu4nxvxmb%2BqrXwhkU1EnlBfj3BWGGlNi0Y94rMajWDJip%2Bgkam1luSUo0wHHIFDUfLS8lYEoRPc70UjsgzcGsm3A%2FR0aT3AgJViez4OuGblUCmhQglPcRk3uYWpI2OF1jJyM6hP4TxtqaDS%2BtIi4BeO9keNFm3d8EDug0iKRRuO9KR9ode8sqBgkStXZmrH4OyZliaD0tcXJbBAzXe0Jm4Atg5Z5AEbFiWmIPvnAwcH7uUvDz4WjyKN9J0qjoBkT1Qpilb0E%2BSdesvtMgCAY3zJ4qmgeKx9hoYKyGTucDJrmXrcqYz2pqTMOXevLZO7MCUlPR4SjaJjB4YV6HY68OlzkOaSpE7ni0wHAs5V2ZxxmwN2Vp0oCH9sHnHw8JyFqDmnwpLMGWXP80V6W9mNnfWzPEsetqz347LjqLzgcrvpsbtXUymooQpPLYhvwwfmNTwETIg8hVpziMjo8TUqHNk4ppstsBwpdfQ2KKD7sXDIa9KXI8jFzzUZccNjKpU%2BVi2LRhMSmNKdVEZmloMOmn5M0GOqUBG7ca6AsZYCJEW0UgeRYw5EkDYeOhBdyQuX5wkSgA1xzAlht76x28lGr%2FbVC4vdR77%2Be%2BtuMB8ZnlIcpAU%2BYD4k0ppMgDPJ30ugx8L6eGEL8z8yafERhDg%2Bl9l2Lj6gKvvzEbE7OmSWjKe2K6o51MvqKt6Z7WkQYyQ56CR5eJFsiQ6YXvEDo5%2FUX3TqziTYoOgPOJ7W1GOWvhyLgtoJW6cd06QuQd&X-Amz-Signature=8cc523762f9e289bb83142b43b320a1bd06dd9a4876e77c2c722844bbc62d541&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TVS6EGG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCICE6hR8AhY6%2B6tVYZrNkBiMOPZKvxxRsWSs5kDycJq8mAiEAuEfLZN66EquIRDF%2F7DFsCKODU0PaqBVxW6ziMxPexBQqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJHiCqCSZHhPzLOMHCrcAwUn6fyEP41EZWwhhf77%2FzLI%2Bl8soP%2FLqcG3bMfRM28FH0yVNYh4AZIwiqwzHcxsALkZ0PxOJB6bGE3zWY03v821Czy2m39X1NaIOKWwpweAbw%2BdzQdLoKgSIuOpmRmUbZwdcSwRpbZWZirtOSMLkIBjNULmas7OHPDMdG37A59xXlodZ4AmyVLE9J1D7GkPcM0vyugSEK28p9UrCJ65KvOYuGQv4kmM%2Bc8y%2Fab71jsTfVF53V5ikZi2w2xtQfD%2FXBYwBIIYwJU8SfY9RfxTf3gDFAV5PnymsNBX2DgY7I4Kl%2Bb6vVt%2BYN%2Fyljmzrf4Eq0w5gnZ4sudDsnIr83SB5gmMgouMt9OXZYCe3wOuRrbDfsRAwVhDQoAgutWsY8Mbs1Z9mOhIQm1gsHjglzVvRqtG1sxlY1jVmxUzwuEzNSGVTXOCmvS8T3AcTV0J%2Bil4cOGeWQ4s%2BOO2%2B8zZRMSMntUKb1I6Y36nGjxlWB%2FK7SdNNo7idx1hGfQHwd%2B9oRFwEIb%2B2M%2FdkbEDjVjUbd%2Fip%2ByK5igT6VJiTMc13yOyst1fmROqSYTH4QojZ3LuReTerCqCdRy%2B3aVB01u4OYK7EO6uVrBoNpOHyK8AasVBQWN8zkouagQXY%2BVzQOaVMNSp5M0GOqUBB1vJxGjJaoAPOvj9iouS2%2Fb8LMUpffOaY7eTraTCt4fzNnOPLHn9RUYYRzha5OKvfP13IhXvTC6LPaj0b2M%2B3ybpuoiwOGgoFnbfrnjKT6pNdwLeXRGtEqfKNAtNJqS9KUd5KBMf8TP%2BtitbbhjjLZZEShEXEJC4NSSi9D2reyhbmjWGT5sxmrkHAFUmVwghS6gqIF5P4jJVnbMT6mO1egmaE%2BXc&X-Amz-Signature=3b6edad380781b1fe1610ce165ec1a6b51435097712e14396723da55af2685fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TVS6EGG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCICE6hR8AhY6%2B6tVYZrNkBiMOPZKvxxRsWSs5kDycJq8mAiEAuEfLZN66EquIRDF%2F7DFsCKODU0PaqBVxW6ziMxPexBQqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJHiCqCSZHhPzLOMHCrcAwUn6fyEP41EZWwhhf77%2FzLI%2Bl8soP%2FLqcG3bMfRM28FH0yVNYh4AZIwiqwzHcxsALkZ0PxOJB6bGE3zWY03v821Czy2m39X1NaIOKWwpweAbw%2BdzQdLoKgSIuOpmRmUbZwdcSwRpbZWZirtOSMLkIBjNULmas7OHPDMdG37A59xXlodZ4AmyVLE9J1D7GkPcM0vyugSEK28p9UrCJ65KvOYuGQv4kmM%2Bc8y%2Fab71jsTfVF53V5ikZi2w2xtQfD%2FXBYwBIIYwJU8SfY9RfxTf3gDFAV5PnymsNBX2DgY7I4Kl%2Bb6vVt%2BYN%2Fyljmzrf4Eq0w5gnZ4sudDsnIr83SB5gmMgouMt9OXZYCe3wOuRrbDfsRAwVhDQoAgutWsY8Mbs1Z9mOhIQm1gsHjglzVvRqtG1sxlY1jVmxUzwuEzNSGVTXOCmvS8T3AcTV0J%2Bil4cOGeWQ4s%2BOO2%2B8zZRMSMntUKb1I6Y36nGjxlWB%2FK7SdNNo7idx1hGfQHwd%2B9oRFwEIb%2B2M%2FdkbEDjVjUbd%2Fip%2ByK5igT6VJiTMc13yOyst1fmROqSYTH4QojZ3LuReTerCqCdRy%2B3aVB01u4OYK7EO6uVrBoNpOHyK8AasVBQWN8zkouagQXY%2BVzQOaVMNSp5M0GOqUBB1vJxGjJaoAPOvj9iouS2%2Fb8LMUpffOaY7eTraTCt4fzNnOPLHn9RUYYRzha5OKvfP13IhXvTC6LPaj0b2M%2B3ybpuoiwOGgoFnbfrnjKT6pNdwLeXRGtEqfKNAtNJqS9KUd5KBMf8TP%2BtitbbhjjLZZEShEXEJC4NSSi9D2reyhbmjWGT5sxmrkHAFUmVwghS6gqIF5P4jJVnbMT6mO1egmaE%2BXc&X-Amz-Signature=d0b07355603ed10be89b049477180262aab6e51321e033bbc0746b7228e42cf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E2LQML6%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQDrSGbDTNVIfZpfcCDaaf1zTLM1170tj9zZXsHBXZC8BwIhAMFG2kdM5EXHdp8Jf4kp63BEiRe%2BHK6gSicWLLbmNz%2FQKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwBkFcrAzjL%2FRfh3nYq3APvjruYZq63dE1lm%2FEuaC6nWJqpEN3ZIymCULyNVFzX8aPPAee4z6AcMZzdJB9KNnC6hTp4I%2FN10cgjtYxhjx5WfEIoPdgyWRlb%2FzMOS%2BLO0rVfIkDVEZecbomLKlrjfzO%2BmMbv%2Bzdv56au9U7I4CbwEaao%2BMvhZWOmV9a5rnpHk5wEBfbU7Wt2fH0Hql6i%2F1DRDCimbNGBeRebI6UgqAp0fj89oJq%2Br4RfwcAkeSYFwZccelm87aDPdkRzDhg2PpFVAoFgda5I1%2F8FGUYen9OOAFu04Oxs1aXxH49X2zQuY3evhPt1R2Wr2BRVDcByhJ9OwB0dUgJCgGD59BRJ50dgJ7wWrIvvBrS5hlrafq9nrDH7OXyfsotVtFNJPE%2BoSbCC%2BQaW9hBRDhdrqz9Qoke1yF73fllX%2BWL%2BRPWrBIfJZ8J4XqGS7nlbkp%2FerQ%2FNvqnIsfHWdZEEaWW%2FIguFiihOAVASwAcKKF%2F%2BR25%2FnOvH5GJzyfcfnbigFA7pLMbHVuSYt6RKhkqO4BQezS7CtavblLsX%2BQS55L56FNRyuAFxe0QUia24rIcIvpeHWy%2FunJ3gN0ktTvAHYyLwkwVGmtf0Z3QrEhi2YGKCVX1nDwc5eUcE4NgM25cvFo0p0zCaqeTNBjqkAWjy%2BASf%2FbW7xCi92TBs1ljtiKU4fIPzpeITWo%2BWvLg67WuO9O6LAKuJzQBWpedgeE7Inau8Lka1xGMXpA66BM%2FPK3J08%2BPj4ckREFnQAtQMTp1tKijFnH4V%2BhosEqxJ6r9a8cnC7vRNs658I148wC%2BTnPYlfqRHZeisvdDrz7KNIMji7xMY1mvu3zTUHMu8veVeAV70LnlVsMEtIjFIZ1LCwU6F&X-Amz-Signature=bda2b8b17fec70a8bc3ca2d9546341249f1ae38332a980ec6ebfa1b6fc4af92b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVSSKNBY%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQCagOk9gO2gk02WX6dxB2kUm5UzdAuaJ4aPasxcJ45lEwIgfNJZPbHbXTISXNZ2l8pmzshJZih7zl7WkfsWQS7bA6cqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEp6TRCQrcznhMlniSrcAyEZAAPUSaytVYCDVLMwxgVs92GL2PiKU0iM4C2g1Si4iVdk7j6Hq6uQOT0hgHtCp0Xz%2B5z76%2Bq8i20IwHAewlqGsA8I71hoLvUB5agzVPvZ%2FZYg8IUoM%2FT%2FcI6vHirNO0n%2FOq0%2BdCi3PgDAadHcmZhhAXNuIRxJGcux5ccQ9skpx3SROGD56XuXGqojX4Da8RMuWbuvbiJK%2Bk1G4pUD52BU2qM7b8TlWqQQ9fj0elCmpMG2bGEyaVaVkMSFxs%2BLT7%2Flc8AP7SKIcgT5SKcZpFNv2qqSz%2By7qaiZidn4xbsgFhyMzUmV4Q6xp14dS%2F8kCr8u8Fs6PWI0C7UaMlmi4%2Bay8bgNtlA25llBcSGZM3LZJub73vGweBYYeiObxuuNBH8venodhZsJ2m97gNzw3DN7zQJxVVILLgSJ25NTkF922PanC16K3hjc6%2BwjrHUDNIRNQel5mLS12HziXCh2oZOXPDH0nNZ%2F2cb1vqTCEz4Wn0ZTCEre9kL9sb5hVKfI9Bv1hLCjQtmd%2BuxRedDal5cw23EjcTT6hB1aiaX8zpJCWtonWo79ulxFcF42AJNruHoPQbqUFzcaj13B9jeq5S71N1fWy9IFRV0KdxCizdw9Smqnc3sG%2B1kickMcMOCo5M0GOqUBSlxrfI8c2jvs4fha5%2FgMtHzJ%2BuRP7KenGB6ZnAqHqfD240u6zPIajf48LxomAuAR%2BsYzjSQa5Q91Q3mGrHq4k3%2BFOexa1x3db4RhS9yHYuyCS0FGQHSoixJ1Qxb%2FgYchCAv%2BnF1GitX5e8M78EPFLwjuEpsm1vFjdDjLxgmOt8bNiR60ObIIItyanrFfzoExaZMx1zCw12sMpZNyiyFHOzbeQasf&X-Amz-Signature=2d1b63951c9157f5f58eafa1d215965cd58a27be282bfa6b5a1ba1c7741e38e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIDUERAX%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQD2OyStuZX%2FBkEjOO1IQc2f1TrYOdfv3GGyiidhuuJ4JgIgLUg8cUpogfm92LqO%2BpB%2Bh5rfo8GUQkoDvFd3UVQVLQ8qiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBnRm59nu460xGSaPircA7gK84JXBVN%2Filvpns7AwYv%2FWWYXDxobgzVfzSpQHMa%2BqJNilYHIbmctapOgrDFrJti61NHaiOaUHUny2Rxl3EeMFa9CQYCKbH9oSvyzBoFCT4I%2FKDgDJ2aAMPWB98vyJneICuaYzSPKHM4OZ40NEA8GssETbrJn6QLJmhsWFVCfN1vOIHzXxtltjt7vUFcfTAuFtGkkz%2FQZ%2BtciFw2fXbLcJ3ao6e9c8SaoRqGdR9xu%2FjP2YkX20HqOOeP2%2F0tsjkBJH4FgA6u%2Bzr7JhJYhbXV68cBmJN2Z%2FljfAbCFmf%2BTnaQkJcEJEQ4IauuMPD2Mzd7h734IbLvUHW%2BPoHcDnQV4Y4gkeyjAlYOob8Czjoyvg5Hon8nmiakvSjnczLCWgcIhWrZrkgk4iFikTWe2jkePcY4YkRLOqyi8jE601xIFN%2B%2FAa%2BuUwCoKvLwZ8ZpYiRdkwOVMfNWbgAKmH6FBzWocsmzAL0Iq4JLum507ByomAU0kPOZq6VQQR9w5JBBV2c%2BZBBH10eyRPbETeuhFEKBHE5ORS2KHibwXyaUK0qblpMRrqAiqdxANTIH4s%2FwgWjwfiD9TFJ0vJtfSqTz0NhtfxSqv3VHCMBRGLoX5j9AbctWOf1ASyUoLxoVTMKao5M0GOqUBOIUL2s0ML6%2BjcKBKOaaraRV6D4mMB%2BJMKEJ6gXABT4X%2BjZkIA5BfucUjX9Xz%2B3dgeOci%2BMjtsyWrmi9QLWqGNsJZLqWGdsBJeYRu1KexLSkc%2FL7fOJjz9TUVmbwEHy9Bp4MUqPQWO5MkxMeSoW9KjkhgqA9QzpsT1SCkJTFPzB6Jl0%2FUKa%2BwKXmPmJftFQNvR8HMenc%2FjYhgp8p74lrTURAFNQnO&X-Amz-Signature=b18847ae846eb8df3213b03c4afdf5baed633987b45b2f20a5ff1de1b6f3614a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QEJ5BFT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQDPNsXxik2CDM8XeWFzaJKobr2%2F3N9lIRvtS9y16KdD4AIhAJREkdkNwCHVkTt0wZXJeJTqtMKce9tcCUSJsMbk8OFkKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxAQG%2Be1lQALZ427Qcq3ANSNj4ivQ3hAhXEXahNZ%2Bp5T5fZE5Xq470SWexhdHv0Y5BlJgtRFErP8PlaKPSYoFjTzvN7qlUks4JiA0aXfKBQpRL1b3uUVMfIPrkYg5y284%2FBk3sABMSdAkLQUrPrDjxiYvX38F3Ory4ErH8dn1zst5dGOEIngl%2BumSOIKG5yUa6GyIW87jAgsisplW%2BehuhY4J5MwiGfyA4FmG6t1WBqNA1rL8zzDG%2BdQYNvtveRFHDIMHQvba7FO7WIScqi0YwLSVt2WGOmhqAOmOHCnAD59WMyHi2jYTKh3DHeDu8BYa3i%2BHbMu2Ef9M4I20ajqdKqQB2BOWpoW7efGK43lac9aiOtZnLs77fc4SM5cw6feXXMJHyyRaBF%2F4PBzScLmX1g5g7dKhXNQz6kigzzoD7l7bu3zDCh7ddzipHLfNwyGCKvO1Apf8utzF%2BnWGID8%2BGPAViDy0vzAKR0S2XuY8mJzVvTLWNKkO2921Ae5Nrh7MpIl6Cqgz11fyBvf6LFvzntrYKlYjKyYnwcrIuXJw6V3u8iBY8dZg3AL0zBJJrOEQ3ANgSbHFkphKHmXpLHvzu%2FZfizIvvx%2BgLxysZqN0mhQIM7JQCrtc7OO1eTZQvYq6BfFEiAsiC1FjZjlDCzqOTNBjqkAd0XUke7dP7CNoLvD9vxXROsX%2FXT2BxAKc1d%2BN7JFOLhF0P%2Bq1b7hgwss3KH5BVmltt6G2HuDGw9aQLa%2BPEnUaGwIi%2FAFOSGJ%2Fdyv4mbMvWO65wbanAAjfOx9qwnj3UWkwomKfNCIm6JJM7cOJrF4w1plzSP7mw1tEDhjQXiydIdzv%2FmTEpHSyFI02N%2FinDN6eDMy10v%2BDcDIFysldGobQCFpxqV&X-Amz-Signature=75d2db5ed8b5b9f7c9af1a93e9c09b07e15d1dce56a8e5fbac66ef50d80f170b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QEJ5BFT%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQDPNsXxik2CDM8XeWFzaJKobr2%2F3N9lIRvtS9y16KdD4AIhAJREkdkNwCHVkTt0wZXJeJTqtMKce9tcCUSJsMbk8OFkKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxAQG%2Be1lQALZ427Qcq3ANSNj4ivQ3hAhXEXahNZ%2Bp5T5fZE5Xq470SWexhdHv0Y5BlJgtRFErP8PlaKPSYoFjTzvN7qlUks4JiA0aXfKBQpRL1b3uUVMfIPrkYg5y284%2FBk3sABMSdAkLQUrPrDjxiYvX38F3Ory4ErH8dn1zst5dGOEIngl%2BumSOIKG5yUa6GyIW87jAgsisplW%2BehuhY4J5MwiGfyA4FmG6t1WBqNA1rL8zzDG%2BdQYNvtveRFHDIMHQvba7FO7WIScqi0YwLSVt2WGOmhqAOmOHCnAD59WMyHi2jYTKh3DHeDu8BYa3i%2BHbMu2Ef9M4I20ajqdKqQB2BOWpoW7efGK43lac9aiOtZnLs77fc4SM5cw6feXXMJHyyRaBF%2F4PBzScLmX1g5g7dKhXNQz6kigzzoD7l7bu3zDCh7ddzipHLfNwyGCKvO1Apf8utzF%2BnWGID8%2BGPAViDy0vzAKR0S2XuY8mJzVvTLWNKkO2921Ae5Nrh7MpIl6Cqgz11fyBvf6LFvzntrYKlYjKyYnwcrIuXJw6V3u8iBY8dZg3AL0zBJJrOEQ3ANgSbHFkphKHmXpLHvzu%2FZfizIvvx%2BgLxysZqN0mhQIM7JQCrtc7OO1eTZQvYq6BfFEiAsiC1FjZjlDCzqOTNBjqkAd0XUke7dP7CNoLvD9vxXROsX%2FXT2BxAKc1d%2BN7JFOLhF0P%2Bq1b7hgwss3KH5BVmltt6G2HuDGw9aQLa%2BPEnUaGwIi%2FAFOSGJ%2Fdyv4mbMvWO65wbanAAjfOx9qwnj3UWkwomKfNCIm6JJM7cOJrF4w1plzSP7mw1tEDhjQXiydIdzv%2FmTEpHSyFI02N%2FinDN6eDMy10v%2BDcDIFysldGobQCFpxqV&X-Amz-Signature=19dd8a6e7711728272b20073ac7fd98390d9f24d20371b7d53442c800a312849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCQIDP3R%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQCky6Fv6PTDWiB%2FQVqBkaGsSs%2Fxgjc2MfhYe2f1TdQWfQIhAJACYQo2Fgwdmmq1dUFdaJrM%2BL7enoluciLF6jtzEzLUKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzpEkdu1vbTuVNw5KYq3APhyBCqC5DsIwM%2FHozwiUKCvhcrbdjq7IsaYyeQ4RyojZURx94t5uj8JFBe3h4N902mCnH7JdR3rYPlL58JCi%2B4e%2BNzaOx4hNydYwjXtFTU4OwOgP4I55H7ipBqIDSqnKYys4cZHucjtEGyayVw9wo7O835p42WIw3N24H0kG0rJAZjpIkDeGmmcKjMORC7zFXOdiKQMdb4zo%2BjivV%2BIHtiZFK43KjntfNmCJ9N7uWHWvZZ6bTSnTXy2UKUwmWj%2Bn0yqRuz9gMVm71bB0NllngBJJO6qgP9xIhQYTyLThVx3T%2FH0JiQ2ljpWDZT3nPlFMIShMMjqwe9vBKZu3ibnLgQfrB48EWYdA%2FfLta%2BzrEVX32LSzFnV%2FWX%2BWjU%2B8D430SbfSSMPu4DvvK4CXLNKcPuFT5GzCMzQRxRaQg1SmVGfPe4VKyuooN%2FmgvNwBaCSS3U4wbioduZzVGxjiiQFRVoxbcnoW9vmzHzDVo3Y2GXRzeetWOjeT5xNFyphp1p%2BC9ndbsXE9PYYbSjTpPTHUjQr8azm%2BJjcEEY9osNzEqV0TiPu8QiBvk3f0%2F9Jyl5AVyrT%2FOpK%2FdsFbc3ssbFiVnpBFo5JUYdhRaZQ%2FXjVqgY06mFEdGWyZbJNDJsaTCoqOTNBjqkAcQ83MK43rdS6FnycK1WNoctSGH86DiKedM1Wxg0AQsehSJZo964MVNsi8Ow2CFxGwRZsqzMtU5F93ObgW6clXuiQ355T75ixqfGcJXoVsUdsV8oHQg442R0lE9HLvZMwLsn51uBVO1REcnbDKQeNDAikeo3M6S%2FpqbZHA22MSfsrpfbCDlYVy1ZQ3yiHqCCxikHsEmd2fZ0STZ7sBPUNuGS5BmF&X-Amz-Signature=12e0d49beb1c480630e6bf02832f33ca61bf282713df42f9eb2ca7d16df754f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSEIXWSL%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQD1%2Bpv80wvtrh%2FRFHjQQoIa58%2FjcHoN7YKSmCPci0libAIhAKaiENEYk%2FCaanccXErXUVnHA5qQKD2nuiyTdb15uwEzKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo6otjUCyVnAIi6MMq3APmOkR2gMn%2BCvspNnGAQVq2jiC%2F%2BaTQ8m8DLRj1oW8H9fZUQcNvR76df7wB0Q73%2FXjEPQcEEPzQ715XG8OcjTHXiVfI44X0c1gsCfABSfZS6FlA7PXuGz2KdsvtSnqXufVHR584ag2qtFLWzwAQ4kgBylSpr6Hh9rx9GnRne%2FXOzuGfJjyM9H6240ZFpIjq28yCrB3HkqemC1uHc34%2BkeGSjcjNQ7DxfCGsULIUhI9nj3IDqqTXX9qE01Qdbl%2FIZL%2BJxVnGYF211MaZS5gwjzkiUwf4eDN4a5WMAgdhKNUEmhWBtqvEB768uFBX7SteG1YTH2oB212DmqTFzYhfqCcsQXQjksAL25tIvYYfXF1uKNlUGQy%2FB7%2F0Q70%2BhEU4poAUNJxan%2FN9ONjqH%2BlD4FfgIPGuPJPVttGOHHSrkuEzmF5QMBuMfRIGPIRkkhjuiLexf9HJfGxfDHDSt11OxyhtvKieCbRqKgL6p7B0QgrBr6roLp6Exbbras66blDFsCjCpXwkdPsWE60k47XefWRFvUlAMMx17SUXm%2FadLAPwpprVaYN%2B7hel8FNQKH8J24bl5SZvtj2qn2Xzc8i1KSDVbT3HdWkhK%2FcU1paj92%2F8fGmVYSvIjHeV05zJJjCpqeTNBjqkASTAtHDhDnhGXExOCcnIGBgj4LIJOgqXp%2FYsK7QmJGRa%2BMFcQr5hnNAj2R55s2ZqzdErWocqxFAQ1rhl0uYhaW1kNpHtujp5PQWT8KjMKWPS4Nw%2BDCxEAqEsyEuzLldqTc3ZRYw%2BsHli4zfuoTsuPppbqTgpBBlSMiOQVyw0l5wy4nB8VMrKEVp71hzFp7OGl2TxYJINq9ntcQoK78B2%2F0r1q51w&X-Amz-Signature=0d776e2941855aac21304a01285010242c1b405ca55fe9f92726a150e062cf4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSEIXWSL%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJIMEYCIQD1%2Bpv80wvtrh%2FRFHjQQoIa58%2FjcHoN7YKSmCPci0libAIhAKaiENEYk%2FCaanccXErXUVnHA5qQKD2nuiyTdb15uwEzKogECOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzo6otjUCyVnAIi6MMq3APmOkR2gMn%2BCvspNnGAQVq2jiC%2F%2BaTQ8m8DLRj1oW8H9fZUQcNvR76df7wB0Q73%2FXjEPQcEEPzQ715XG8OcjTHXiVfI44X0c1gsCfABSfZS6FlA7PXuGz2KdsvtSnqXufVHR584ag2qtFLWzwAQ4kgBylSpr6Hh9rx9GnRne%2FXOzuGfJjyM9H6240ZFpIjq28yCrB3HkqemC1uHc34%2BkeGSjcjNQ7DxfCGsULIUhI9nj3IDqqTXX9qE01Qdbl%2FIZL%2BJxVnGYF211MaZS5gwjzkiUwf4eDN4a5WMAgdhKNUEmhWBtqvEB768uFBX7SteG1YTH2oB212DmqTFzYhfqCcsQXQjksAL25tIvYYfXF1uKNlUGQy%2FB7%2F0Q70%2BhEU4poAUNJxan%2FN9ONjqH%2BlD4FfgIPGuPJPVttGOHHSrkuEzmF5QMBuMfRIGPIRkkhjuiLexf9HJfGxfDHDSt11OxyhtvKieCbRqKgL6p7B0QgrBr6roLp6Exbbras66blDFsCjCpXwkdPsWE60k47XefWRFvUlAMMx17SUXm%2FadLAPwpprVaYN%2B7hel8FNQKH8J24bl5SZvtj2qn2Xzc8i1KSDVbT3HdWkhK%2FcU1paj92%2F8fGmVYSvIjHeV05zJJjCpqeTNBjqkASTAtHDhDnhGXExOCcnIGBgj4LIJOgqXp%2FYsK7QmJGRa%2BMFcQr5hnNAj2R55s2ZqzdErWocqxFAQ1rhl0uYhaW1kNpHtujp5PQWT8KjMKWPS4Nw%2BDCxEAqEsyEuzLldqTc3ZRYw%2BsHli4zfuoTsuPppbqTgpBBlSMiOQVyw0l5wy4nB8VMrKEVp71hzFp7OGl2TxYJINq9ntcQoK78B2%2F0r1q51w&X-Amz-Signature=0d776e2941855aac21304a01285010242c1b405ca55fe9f92726a150e062cf4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZMZC5TF%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T094100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECEaCXVzLXdlc3QtMiJHMEUCIQCE2PJac6us2ehqLEgL2AJ59pway61p3%2BBMy7AxUG6nmQIgZv4DaHHCiVZADU8Cfn%2FKGql0y8dDYJboRq6SHwbh70MqiAQI6v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDKgDcIjQ%2FCDqdb2RCrcAyItiZHKkfna4GRssZlOIg%2FmnyeYGPcc5a6HrqnvRcNsAYi%2FNHfYBKdGOdRtV%2Fi7UxwcyOsvJx7fFoU9AQ5niqSvxJ%2BFFQx52mDvQJ%2F27lJdj8V17%2BXFuh8Jvq05k%2B4xxrTRchkzxliM49k0FnSHQlRjaVaoiUg%2FxZ%2BNQZ4yREbCX0w3swo6yyHCBwOJQyiUo8PD3U1xvs2HPP%2B9fweKkOX0BMt0OBbmYeskDHWkL8b2bM4VvdGWtIWmal8%2BaYFrz04P5Ebf6gFdipqU1MCQuIZTE5IFhvn1tdd47HJFtjBTcYyk3ZmZcvr5SNmx3JvQ6k%2FLs3W9SZRs2FIXRWdv1aWzOyVCYnVKDPc8JmV6fy4nPAkF3cnhSsa7hZQbzpbyn78pNeOw3VFt24QATVfRLLuuEIJwYIfiDZpAqKTEfmISiKJv8uJYlwdZ6O%2Bxfge%2Bp71EhNhe2I3QSp3TSi%2BnJ%2BjL8tLHGYWC4GKbUOTqQVxlSRqIg6PT7260%2FwN5nIWrs0VxqEAL9lEXqYVzN%2FcBkVbKSUQQF7QJ0RZIy8YULzNrU4S4hnG%2FBna1d0siJsJ8iU2fPz%2FqIMB5ZeKtWOKQHNDk5%2Ft%2B6ijoslXRAzsoP1skAe6HrdXELTiRdznJMJmp5M0GOqUBsx3xTGVeS1TdT%2Fj9iYXZHYv6j3tJ5HljoAXVW%2Beuv3nx4%2BZcYX2byv%2BD%2F2ttmtNtzTpuq4WCnNcTMpZV1%2BlMUdgPDxVsIMezb21vEhCKGbhzIoqsDQCiA4hYk1RtwWALeO%2BEt3rgpzuVDDSgWPnastseDWphxrbgOPXnAeEYu8AWMwWKL8Pm%2FNmvKPApSKxMcrOAH9z6EOziaMKOK%2BlUnzfNYKoS&X-Amz-Signature=b4d52042aea815b253240acbbeadd75b72338808df132e8755a0e3b9c12f4620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

