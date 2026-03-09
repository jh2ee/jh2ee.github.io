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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YVEBN5M%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD%2BV7yyg4NhhuH8HqCJfdKY0B2ONChywM0ezTJtHMLkCQIgLnebe6DxDDQMVE3ee5q8zIl2EpkPT11CkETMwh%2FcNC0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDDMKKOe0gKGN36AL1ircA3Ar44uEnurR%2F4olKC2MueyUkTxADLb0uToiEvbw%2FZv%2Bir9lyHElzN8ozqb7U%2Bty6XL%2FEhudgxNEn68iRilIyViXtyqMN8%2FE%2Bb6J%2BHs7Ebb0MiE9GzUmYJQFM2qauBj52KzGDKAgUpY%2B0pi7o4tI%2Fw0ichtFaDrVsqKbwuiecQ0y7L4krnWqIQaU6oPTayAS72ptQxQOJa5HcmO2ck5oSu5djfVHJiqLNeZ9hLH78KkhB%2FsmkeG0CQ6josqTK0x7a9oiBgkfLnurwrH3BF0YuKVsn5V061f1LkOQyU8yRfiK%2FAMulDR76%2FqTlcmOP53gdIRm54wv0u5ps1WvSNCeFdl06q42pM6%2FDtWagD2u8iUS2I8rI4DmBsygYSvvq%2BEDz7kRsZJZHSC4lf6cOgWZzgmk51U0svQqvdt0AYapda%2FhJvFZc9R2CRvRb6%2FTQT0YY6lGOEj16uDJP8DeS5pqrBJuGUViQuTQvQ1bgAUz2bDJAbJ5htY9Lk9RAyGzEyAjHhauHQnFL%2BWmLprjVANTDLOc0xvG2uN0LOg4Qv1FUfiuIkS3YOQREPyJGdlzrnlb5DwbHzGkUq7egjOu15EfTXm%2BG8pRtHq7g9GTXBut8Du0ZiL3%2BaNR3L000Jj%2FMKHNu80GOqUBQhGxxx3qeZ1k0kicyvPDS7xRkR4F0UF0woqLaI1dM9R%2Bewe0hHDWDmnvHfHSbywsp2HFxhjT7OPmlJWJlryVd27sGqy%2BpSYsHxRLpURzh32pjfmywnR14jiQ0UQ6LlGvlN5HKZ%2F24Jm2g140a7T8RvJfdd8ye4fRUoqOdyhiceIip3SO9m7T%2BohE8Ukj0U8Pdt%2FTChGpKddMc%2Bp58P%2Bu1L3xJUED&X-Amz-Signature=026e5359dc18dcf30a0047bcc6da07ed8958c225e78e59c703d01277441b4a7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YVEBN5M%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD%2BV7yyg4NhhuH8HqCJfdKY0B2ONChywM0ezTJtHMLkCQIgLnebe6DxDDQMVE3ee5q8zIl2EpkPT11CkETMwh%2FcNC0q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDDMKKOe0gKGN36AL1ircA3Ar44uEnurR%2F4olKC2MueyUkTxADLb0uToiEvbw%2FZv%2Bir9lyHElzN8ozqb7U%2Bty6XL%2FEhudgxNEn68iRilIyViXtyqMN8%2FE%2Bb6J%2BHs7Ebb0MiE9GzUmYJQFM2qauBj52KzGDKAgUpY%2B0pi7o4tI%2Fw0ichtFaDrVsqKbwuiecQ0y7L4krnWqIQaU6oPTayAS72ptQxQOJa5HcmO2ck5oSu5djfVHJiqLNeZ9hLH78KkhB%2FsmkeG0CQ6josqTK0x7a9oiBgkfLnurwrH3BF0YuKVsn5V061f1LkOQyU8yRfiK%2FAMulDR76%2FqTlcmOP53gdIRm54wv0u5ps1WvSNCeFdl06q42pM6%2FDtWagD2u8iUS2I8rI4DmBsygYSvvq%2BEDz7kRsZJZHSC4lf6cOgWZzgmk51U0svQqvdt0AYapda%2FhJvFZc9R2CRvRb6%2FTQT0YY6lGOEj16uDJP8DeS5pqrBJuGUViQuTQvQ1bgAUz2bDJAbJ5htY9Lk9RAyGzEyAjHhauHQnFL%2BWmLprjVANTDLOc0xvG2uN0LOg4Qv1FUfiuIkS3YOQREPyJGdlzrnlb5DwbHzGkUq7egjOu15EfTXm%2BG8pRtHq7g9GTXBut8Du0ZiL3%2BaNR3L000Jj%2FMKHNu80GOqUBQhGxxx3qeZ1k0kicyvPDS7xRkR4F0UF0woqLaI1dM9R%2Bewe0hHDWDmnvHfHSbywsp2HFxhjT7OPmlJWJlryVd27sGqy%2BpSYsHxRLpURzh32pjfmywnR14jiQ0UQ6LlGvlN5HKZ%2F24Jm2g140a7T8RvJfdd8ye4fRUoqOdyhiceIip3SO9m7T%2BohE8Ukj0U8Pdt%2FTChGpKddMc%2Bp58P%2Bu1L3xJUED&X-Amz-Signature=026e5359dc18dcf30a0047bcc6da07ed8958c225e78e59c703d01277441b4a7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5OLL7RA%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCExPN4Q5gHvzoQ34P%2B4gohGeDEAoSL71truGcILknuwQIhAPLPpXc5Y8wqCZrGdzDeOZDOdHnMh4uhl1ce9FzG3nsGKv8DCDEQABoMNjM3NDIzMTgzODA1IgzXIzyE2dGPN%2Bw%2BJu4q3AN1B6zCdbjAEON67QMvj9Brd3pnF6la3vL0pG4y6NP%2B1FDEMt2m1BYaxGa8J%2Ff2yUcSied2A2v5LOr9cHmHSP%2BCa0Gxemd53imj%2FrIse7Tt66ijo41tH%2BWiaREGS7%2Blr3AG5DYLS0CvbAxzqzDvVCCvCbBVmJbIDSL8NN34MAK2sHdIyNlVjgeAkb%2BUg%2Be90oOQpAbLtYdprRAnDnfKNcBo0gv%2FpLwyQ0ibqC%2Bm7nsjS3mYYJngiCV2pcTTbbB58tx9CeRwnO4hlfux9fcZSCK3V0MnauhMYVvNtYORB7WZ5QNar%2BeCT07bvP%2F6PDig566FbuhnG9N5j6r7k7r89WAFOGasz9YsSJEL1NnxVp0sTnKPAKW%2B2q3Yq2ePXIQ4oqzVIp9k7PeN8OV68atxgAc1L5zItxU61bLHQTt7t4rO13OeFuunxmbb7Fi2hTrLT9SwxvMg1WFx6H5Jotw7HUMGPwSqO%2FBz2tplAZRsSph%2BooIbjWVGGR3sgYHq3qJKtY8BJNk3S5t8hNcLXHvChJzWmBGTnLuk1qLJeVYFfUGc3KFYCufgJy5o79K%2FyZqUXmIrn1D%2Fyhr5r6rxIIjLsLLFtn2%2B8ZYvFTBnAQbOBsIR8aMwOafqhnjjzsE%2F1TCdz7vNBjqkAV8mFXWoe3wNTPfldoxlWeBB9AYHNcXj7IFXoHjb7OkKD5VvB4ihY7uTDIkrJWoV%2FqPfo1gEVT%2B%2FeDSQ9XdL73Mon%2FQUGNdDjDkaDSxtVPDBeKAqyZwnolP8XjASqv0%2FFpjMZtjixkEUVrdZqf3bm12r3QtHAtwzQn4y71gsKnsOe5V3nvQyNc6ereIB4DQaENYVPcsR0pMK3WwpBxGb%2FcbFhm4m&X-Amz-Signature=1e047e40a0ed9e41e335fd93476afda6deaa4d99918ad7eab799a6683152be0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5QIANT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIDoLtI8ZunKT0Kjs3G5btAIafZMt0WG9IfoZj2N%2FLt11AiEAhNPsXi4RQqRNCe2C%2FMiZHRwsSCi%2Bk7Be3qrhes3%2BtScq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDH0%2B53YXLzcCVPR8vyrcA%2F5z%2FIp2CAgX5dlhETXRjvKKIbSBHe%2Bm%2Fb0Bg3epEZv1KbmbD1eLMciWaBqG9TbWAjcugzZ0G%2FMPnh2B6tuU1F%2FZr58OWLV%2FftqjaYXCydvOD9i4Cu%2BCcVknAusis1gMUuOiCVo1IZXmCC9n3bfpZGGCRtXrQVbJMx3%2F7ZhBB%2BYvGVAQ3oPANC%2FNPCQctbGa7fW%2BqY5rko4cYudzKHHRoC3GtaCJOtsEoiR7gbCaJaJlJe2B9tdepPoub8WK7S20z9i9KrFw%2FCuI6RSHZ92PG8Y0pkWJTkxKr3PaffKzQDbY4HATLMQwTkhbV88puIiJT%2BqkrVkrlnPIadP7e%2F%2BbnzGMSD%2Bv3PJrjSyrcjIwoDfCFFtKOxVu90UM%2B6MB9sCHFPJib7OJj0uaew61fophvJhIOWOQVhjA0EoIqSkAemYRHcKX7ATJVD3dzyKhrnIAEvtWamNQVa3unx8k8JrmC5dWRlWKkZNiDPhk9Qw4jCx1GoiG4AUsVUCqXC58TT6Q5UlsA6INz3kIwvwkFL32BZhy9UbUoUWg65p0gHr9djTy%2BrDI0ZvOBuGjRiR0qqoRT%2BYc0oOLFDgKcp23nd50IKaL2%2FT%2FmYPTAHeJabbDE7KvVVpSWtfdibytmGSQMLTOu80GOqUB7GzBjbD5p0TAvnLzdQeWfJrgJ%2FEpLl73EnjtYtzme%2BEtRpn1aQeQeAfVrcuQ0h4NILq1Nm3tcF26YC%2F6%2FJW0df73ZR5bORKWIXkxcLQmgRD4yfyrgn2VwNyzA7iNTqSoZJg4Kp8%2Fee0IvBLZFnvvjbnO1RBPH05%2BSdnNAHbsFlnyWS5xiQvmOSOFQX58c7gzjiRpD1TNVgV1KiRF8YoxtdNCDza2&X-Amz-Signature=73f5b760c715902ebe1ffc0edae4e63c8a54e0e0a0b798a38579c53ff775bb0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SX5QIANT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIDoLtI8ZunKT0Kjs3G5btAIafZMt0WG9IfoZj2N%2FLt11AiEAhNPsXi4RQqRNCe2C%2FMiZHRwsSCi%2Bk7Be3qrhes3%2BtScq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDH0%2B53YXLzcCVPR8vyrcA%2F5z%2FIp2CAgX5dlhETXRjvKKIbSBHe%2Bm%2Fb0Bg3epEZv1KbmbD1eLMciWaBqG9TbWAjcugzZ0G%2FMPnh2B6tuU1F%2FZr58OWLV%2FftqjaYXCydvOD9i4Cu%2BCcVknAusis1gMUuOiCVo1IZXmCC9n3bfpZGGCRtXrQVbJMx3%2F7ZhBB%2BYvGVAQ3oPANC%2FNPCQctbGa7fW%2BqY5rko4cYudzKHHRoC3GtaCJOtsEoiR7gbCaJaJlJe2B9tdepPoub8WK7S20z9i9KrFw%2FCuI6RSHZ92PG8Y0pkWJTkxKr3PaffKzQDbY4HATLMQwTkhbV88puIiJT%2BqkrVkrlnPIadP7e%2F%2BbnzGMSD%2Bv3PJrjSyrcjIwoDfCFFtKOxVu90UM%2B6MB9sCHFPJib7OJj0uaew61fophvJhIOWOQVhjA0EoIqSkAemYRHcKX7ATJVD3dzyKhrnIAEvtWamNQVa3unx8k8JrmC5dWRlWKkZNiDPhk9Qw4jCx1GoiG4AUsVUCqXC58TT6Q5UlsA6INz3kIwvwkFL32BZhy9UbUoUWg65p0gHr9djTy%2BrDI0ZvOBuGjRiR0qqoRT%2BYc0oOLFDgKcp23nd50IKaL2%2FT%2FmYPTAHeJabbDE7KvVVpSWtfdibytmGSQMLTOu80GOqUB7GzBjbD5p0TAvnLzdQeWfJrgJ%2FEpLl73EnjtYtzme%2BEtRpn1aQeQeAfVrcuQ0h4NILq1Nm3tcF26YC%2F6%2FJW0df73ZR5bORKWIXkxcLQmgRD4yfyrgn2VwNyzA7iNTqSoZJg4Kp8%2Fee0IvBLZFnvvjbnO1RBPH05%2BSdnNAHbsFlnyWS5xiQvmOSOFQX58c7gzjiRpD1TNVgV1KiRF8YoxtdNCDza2&X-Amz-Signature=caf3281e79d8d40c54bb5e3e5f6a2cc4f7151240f87a5f4bc26f2c1878d4a190&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSKAHY55%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIExI4YkEGG0QWq2l3v3l3EJQ1fDqLL59%2B8ami3denNzSAiEA5ePVX3QLlBQ%2FCla1J1MPDTra7e5QsQ%2BQKBgbKHl86cQq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAVsZJAUjJs%2FJAXJLSrcA0GMIcC5%2BG8TfYKh1k34DrsJedT3DlWCIBxvFh%2BxvmeQr%2B6MhgdOkvoS0xxgK%2BQ0agaf71FYYvw9agKu%2F%2BWedo%2FECGy7yg%2Bs7fgaHZ6eZex4usYh%2BWDrIhKA11ow8qYs5zUbY03X53Th9zxus7x2v0qLumsp67%2BybiyZepLw%2Bvx3Xcu3gmgUKu1ujh0qjegVCxwE4KlEcaA9fx6kv%2B8S17f4N31wmj349uSrt3VLgqvb6nMeEPecJgKgtwLZvPBm32Z%2BmzWyJpGVsyALJt0USz5RBpwoctavEaMyDJmNkZ1jvKxEJBJ0j0H6agN2dJeIjnp3rVuKnX82DApmfnTxEjS7lSdrDyPllUa17bTtS%2BlCSYvTGL36qdI%2FoT97hifZGd%2Bc6fb6WzcUOfQOzw6N6MA5%2B1DVRww0YU0PTdRoxVmcXtig5I6Hf5QnpqvwlNJcbEWSfd7Ijoer%2F9Sy0Of7c0lDS7zU%2B2%2BSbChiZkoNkm0ImRRRKW0SnlCbAkscyGbUL31%2F7m0EzVMExbTGU1YMzXR89XSEyuTitPJJitfHOuVAh1Y32UEdQzDXQeBFcg91%2F4Xy5UuV4u2yS%2FxrWiNe5e2lOOH6B%2Ff59ou9UsEvReJ%2BMMqvBTnJdJhop7qDMLvNu80GOqUBNF1ygLPk6LwywkcLlcrraNGoapmJZNVI4swHhvYuUKg%2BGTeh2u5tEYGaCzYbeX5jSZjKp2ts6Ymr9NYsuAQhJpI5WcHWtd8fpZ%2B2GRuzx88fRx3PPrcapnysL8GQUDSGtwoPKQAeZCIToq%2BCTQYLxRI%2BO1%2Bun6RJyMZGWLSMGozPP6xGKKiC5Uv%2FW4gMZeEZepJNqOYd2O3gxpn3aujFeK4LIAHO&X-Amz-Signature=f4d1434bd3f7528aa9a18c4970c81178c9f7745dd36e3f11266c80e16c5701f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIIKKEO5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQCloux%2B8MaA801%2BfspC8WqqRZukz27Crz1LOVD1Hk5GQQIgOBbOafyymlHQYax%2BrDXwTFRSlgNhp4f2wTyKhVFp7Aoq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAiybsAJi0EzvT92sCrcAzdjDe1dkXja8XExdbPZ7AYVrXndVrwx2Vrv5HL8Ckedh%2FjSfo04gz8N74hMNTfyALWKFh0DkxJGOeBEef0YNmKPS8ukhRFGprolmiHWQnKYkypv2ia4q80SyoOgKYch7v1nvmHsYhWNIz%2FC6tez8GDnrF2Kq0wVL5TIpNAcc3peQDL1ny2znjjjLeC%2BrThF2smKLl1yPU%2B3oMzV982Zo4JlLM7SB3NbVa1IQn8gITDJjpS3DFqsOVYvw0yp7hHTyPzqmHkNvm29XM57jKM6d%2FGtjFv%2FmzyfIH%2B3Q3rCH0K0OEfPnZcWTfm8Zyd4%2FaeJkxUZP7FhdDSZQi5KEIc1GngVNsIQpGVoX3XRDCuCaSsYr26AADu40qlGgpZbtALlbSywRlydMPpI0KjXFly7kHtx7AVxVr2jfzQ99sf4R402kSOMx1fFm%2FxbTbs17cIR6b3%2Bm4jwOY4scv%2BKx4B7gMmC4seq%2FHmEgQC6dxF56kkbWV%2F79jSlEm6sBUlT9ne4CF4vNWLnp2MdEI1%2B2QtOqKrNWlyope7t1%2F%2FyHv4N7ZXWOL42RggTqG8gWWfIwAZMQZbuDKbw9iMGAwzbiCCGlVg5ra8gZYGTYPdRyBq0Dx%2B1MycVwGSdFlmqd8QqMJ3Pu80GOqUBChcgylLfFrOND7lHcOaQuu%2FuS9JULwIh%2FX8SGhsvFdFTuA%2BUKJ1KEIQdHxu0hH%2Fr4HLXj9P861vudDjk%2Fi7PRMs8U0ITLiIqH8LeKrD4duGUOm8pEJZllPHz%2Fntbx4Q7b0ofHvwKtzGFLvyZ68HCYwC6d%2BxMaFXdklP183Ffyb6paDmIAztZctLe2c5kNRA7ymcU%2FfGpW6UbVNasRsxwrqI1t9Nw&X-Amz-Signature=efbaf3c1b3a71fd286a60626e4c6fc19864db1aceb00f4a3f5f3031b8e899fcc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ILH2A6P%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD3rB%2BEXJkJo%2FpDKmzJIr7Z76cTSiwrRtT15nySgUJL8QIhAPnyz%2BmJUubN5fj77OQIzhtzJXDCHJfKHp11VVF80rcLKv8DCDEQABoMNjM3NDIzMTgzODA1Igz4Jcy7%2F941%2FsUEhZgq3AOM8M387Ldbjq1lTntQTxy0aSaqcXwIPPBobKVayf%2FatFGYpGxI3Sf92n17M3s9zzBFktxrlBdgG43K6Qzz4M00FbnIcGS%2BOmSsvAxO4lwehiviH9DrPXCY9JbtKdwcI9ealUpSMoNjKoDag6%2Bck7%2FNMe2nKkB7DabzGUPV90QrxXkqHKcEpJ8XFT71ilMb5iHfVHYh%2BLORrL16C61wod%2BOZlbhhbnEXASAax7IBWItSmFkkKyGwBjbK7RPp%2FAbGbi%2FP7%2Brvg%2BTS8m4MI5ki3PJnwEe%2FxR45TBmNAJ1tv2oQ8gPx6xvKRI3HK7qV0vFz4bR%2Fm9C8WWpmEk4CoehHGDbGF5US3BYOp3Vyr0EMzleBunxojgNafxbt2yxAY5wRVO4O9MQDrHl1%2FhP3i3%2FlhkhCcRXQID22q4TYyMROiVYot3tJOy9BjaO0tfPzqQx%2BRacyZ53xRX9aSwhAKxMBmhXUMqTgLeoEDtHfx5ebY8dsalaqrHAXDkL2t%2F2mTy3sKGU0%2FYtkRIcouOAQY6k%2FhskVmGdKY0uRFqvBPLnbxbA%2B68ZKhgG2d0HFe4WydfBJaI1T%2FWXHMsfd0dDfSTJuS9sG9PYel10QYg6HtAbo9I6l6Ye7lEr7xeHWv8i4TCdz7vNBjqkAZvbV%2FgzkX96WSeVHczDZ%2F%2BdQRdDLnRiN%2BQs4O%2BBY6ut3tlcwzOR14LvqaUAm75OF2ALoHvoQsSrlW2tXMSOKr6DA8MgUjUmRiA4xqpIkjof6e0kXckjTG1YCOP0xUaxIho8AWjua1n6Wd5nrYkapwDj7i7P%2B9fxDZtmSJ0%2BF0d483Buea2xpZV2%2B8z0MJYg7sooWZlBjFHO%2BSd3%2F9hGm2yng2qN&X-Amz-Signature=b0a418826563bf44ead08c496b0a7b6c85de286a5222e94ef3aee18a3c1f7be0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XF4JYFN4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCaB9HuX1bavjCq3IYWqGRWzEVNXQ223Bqd%2B%2FTUEnebLQIhALPY30vZpVQX7SC8MtYqiKsvO%2BuqdeWyXYSCJK50BoYLKv8DCDEQABoMNjM3NDIzMTgzODA1IgwRC1SoEpEFGSmua0Yq3APTAFGzJVjEd9Ln12DQgHeqzx6dCtUZHK9SwJt0eVFJE6MlNwOQUXerC12QVfj6Q9SmJn7nxL5GInHxH7X7q6bzv1hLNirTJDUO4t0FZoFwUWuk98cXMXC2RN0ccakyGFnNycnUwJc1TTvYbGZS9bJBX%2BnHxCE0msDitbbMkTytvA6V%2BFa5lhiHYkAcWZL8nKwlTRGsdThl2uZ12jP5tsXjSxS3RQcKH5w2K1xYu%2Bguoz%2FXm3E0%2BaP93kMA1PCiilOzFNUN%2B3YaqWjSMa6qX7SExrcTYu3pqJf2K7GQSvVlvQ4Bg51MY%2F9nKn81PcRORDVa%2FzSyy9HDbsDz7ci6P8a9pDvbp7H6BNniK4qZeL2MnMzijV9c686J9bSBtuhqJ%2FMEzUCRjty3S%2Fe%2FtsxzWUCig0ePAfHXVN7kagtzoLVARD59S80cpx%2FrgGiqQuSgtAYJ6KWvqetkSLxT4VKzK1ikQSVRVU3wLPyTwyO%2F%2FYC7elxiBgRBhum1cQoOq4Bj9HpmQf0w0Yvs1lpwUr8SvgB%2FXfF6iuAWctmXsqgee2FDRRc4EskvV%2B%2B7eExfgw6UAtZ10EHiE66dao1f%2BwDxvAgbBG4Lewa7RCOCpVoDJ3jzIFNVF58yFzxGPS8g5DDyzbvNBjqkAUymBO2b1%2BDbXwnCPG8dGS9oPyLtgysKk1T3g2544HVmo7RTL2Y2ZXEYjkN1Gt9Be7FSWga13tQDHrsIV2SvZSJmhKrH7KqC0EaMGEgNBJQ3Nt3IUwzsnqPdAeuVLhqZnEIFRvrJuiGkAQSCtaBupvnBl55OMs68DGKP2Q9DytZokv7WtQNh6liOFdNiCZzehcM%2BqaPuz9kPvI7u%2BZS4FfLS%2F5ZY&X-Amz-Signature=00bae289f9b8e58279f169f68a06857cf029a7f5d4946ddd5d38e4c5363f1f8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XF4JYFN4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQCaB9HuX1bavjCq3IYWqGRWzEVNXQ223Bqd%2B%2FTUEnebLQIhALPY30vZpVQX7SC8MtYqiKsvO%2BuqdeWyXYSCJK50BoYLKv8DCDEQABoMNjM3NDIzMTgzODA1IgwRC1SoEpEFGSmua0Yq3APTAFGzJVjEd9Ln12DQgHeqzx6dCtUZHK9SwJt0eVFJE6MlNwOQUXerC12QVfj6Q9SmJn7nxL5GInHxH7X7q6bzv1hLNirTJDUO4t0FZoFwUWuk98cXMXC2RN0ccakyGFnNycnUwJc1TTvYbGZS9bJBX%2BnHxCE0msDitbbMkTytvA6V%2BFa5lhiHYkAcWZL8nKwlTRGsdThl2uZ12jP5tsXjSxS3RQcKH5w2K1xYu%2Bguoz%2FXm3E0%2BaP93kMA1PCiilOzFNUN%2B3YaqWjSMa6qX7SExrcTYu3pqJf2K7GQSvVlvQ4Bg51MY%2F9nKn81PcRORDVa%2FzSyy9HDbsDz7ci6P8a9pDvbp7H6BNniK4qZeL2MnMzijV9c686J9bSBtuhqJ%2FMEzUCRjty3S%2Fe%2FtsxzWUCig0ePAfHXVN7kagtzoLVARD59S80cpx%2FrgGiqQuSgtAYJ6KWvqetkSLxT4VKzK1ikQSVRVU3wLPyTwyO%2F%2FYC7elxiBgRBhum1cQoOq4Bj9HpmQf0w0Yvs1lpwUr8SvgB%2FXfF6iuAWctmXsqgee2FDRRc4EskvV%2B%2B7eExfgw6UAtZ10EHiE66dao1f%2BwDxvAgbBG4Lewa7RCOCpVoDJ3jzIFNVF58yFzxGPS8g5DDyzbvNBjqkAUymBO2b1%2BDbXwnCPG8dGS9oPyLtgysKk1T3g2544HVmo7RTL2Y2ZXEYjkN1Gt9Be7FSWga13tQDHrsIV2SvZSJmhKrH7KqC0EaMGEgNBJQ3Nt3IUwzsnqPdAeuVLhqZnEIFRvrJuiGkAQSCtaBupvnBl55OMs68DGKP2Q9DytZokv7WtQNh6liOFdNiCZzehcM%2BqaPuz9kPvI7u%2BZS4FfLS%2F5ZY&X-Amz-Signature=89188eb7cd0d167c73606c0317d5622ae4a7816bf8c8c5ef8bc55dd3f9937482&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXLSHRKD%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCICSe7E0brcaIihZ%2FBrm%2FHU8uUWNX%2FQ40YPfKSvzVck0lAiAo4c1D6wr4vEhjzzomHs9uMc0CO0EJ8hlwlNtFBJEv2yr%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMsivekBjZ3BeJbMqDKtwDEdpEbKRzIItxaQN7CZ0Ajfz2XGViMv6AwfftR3Hcy%2BH2pivUqfteV8Sreri9wMQsved5MJbJu%2Bn53%2BC6MRH5kpMOs5QLjVyZUDVV%2FD%2BnPmmjVR3mO86LotOsTHYYXbT8R3m0DN6tQQfNOpFvKG6FawLrE%2BwlRFZi%2FXCERuWKdmEc7YrJlqs%2BHduy1HOGS3Qzy8%2BrNaOth0Nw7ayYed%2B0gV2T7OADA9MI2szLe%2FsYSjzw2REa%2B%2Fzg3xWmIe2kmtXjjOMxr3pJb%2FapZRgeaDEJerxDIQFqxB6IjEnpzKSfeaQxyTE1Bmj3rQlLjkeqA%2F5ekzfagM1COV7hWEU%2BL161IqtK3vAPocPAvkAOWoAhZkTBb61hc4Gia82UhV%2BCHzgthrWWENsE4J%2FDo8F4VoFG%2BLsbtZeeKXFezDKqcQ%2BUETno6m3cFjfP5Cn2rqnq1vUVsjxBCJgB0qDXD2%2BPmx%2BJabtMZZeODKL66AhpCmzOO2Jau7qZqShtYocas4ymKQXWSr8%2BVhbeJgjeL27%2BaG8BG8IJpslCW6hmANWuloHdtXU20CKRHgkghjQ4r0SO6T8fQBbhP0%2B356c18iSlGF4tq328I9TxgLNdwOLvBEQHSoW8YBpSthyyTJPu%2FSAws8y7zQY6pgFiiLEDEhbUmBb%2Bp%2FOVmxNWz%2FeaGo2Tb8TRkkOMTNWYH7kY4VgCfim%2BRLUBRxCYp8k9xqLIVtMlKRyghgPcbpX4SqahJSbX6EMaXPi8WVlm5%2Fta%2BB%2FffLx4gcMtGawZW0u%2BuCFx%2Bs5b4tTo6UYee5%2BkCJZAuxba9f4ge90SBcKZCC7mewARF0zILITjPALrPL5ecs6UvYzSaGdSzOSVhXZpWGMXWjKD&X-Amz-Signature=6c6b4c7179fb49e0c534dfeb7ed7ab842b601178b294df3ef04152c692cd3532&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQFNKWIR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIEz78b%2BgWmk9wdpi%2BV40SqAOsbM1UwSpKgHTfbokWNuoAiBIBaGueK4d1JclcuzxzcIaIFen54gGT9%2B50ZEPL3JuBir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMVaLF11cS7MHJdmoXKtwDsJ2m0qrRjuSO3mSA37Da46kj0ZECoiKIvSXrlNWbA59hC5Ct%2FeF0epQO8NB6lHulggcHvhhKUyAFpKs9dPHP%2FS0VQ49y0fd9%2B8xhCaF8JzXHRV8SBS8Gs5LurPgZxKamWvEnby7Cl1fsde7ZyveNFoKv238A2g2z11bvFLwSOcX%2BeiWed%2BHnfzLOB3nNMi4GyNR5B%2F7JFgFj47QYgq4WvixziWGgi%2BxrzZcbwEPM%2FQ5vYyvylnWNXJJZ8iYS9FxUaJ1JBhs0PqnnU7DrFAM%2BlQSkE9s5dzGrhmcEfNaddEMHMTy2LXO8GFeiZ5vrobveweXGGfgK2l5SF3eMg1X5buCzHoXZdfcY0IpTo8AXvPjovCCvS24OU%2FZFifKYZ9c1Y8%2BhAlvQeyIZsmsKae27ckcCwc6kPZOHgAtFCUcMcJZmQFnjJkv8ep6NBxpCShsuWT3HBb160Tlj5zdUuVP3ANP3g66flPqzqr0uv87PO8nCtDMv6COtuBxP4aeODZYLGP8d%2FKa23fzguTfLuayyN1DuzGsBkW8sBy19KOAM89TtpOETt0drkaI7YJZ5vY%2FTh5VteEWyka%2F5nlqiZCgYcyKBq1WWC%2FxUCT2t7uzyY6JnSVNIsEo4ytnUSRkw1OC7zQY6pgFX3DIZbKVGcrRYn4ITqpflnhOHglYFbZ%2BqpynU0Y6jUSFYy8CkCELKR8COr4Nk%2FL9QEFt9TTykWBU32xrXKuWewZqq24W83wfzoBJZvM1bHXKsxbOqYyeH15tPdbZ4qS8k%2BCGlXelW%2BIV812oz%2BKr%2F3VhhDu36FGiufm8MrRzksos%2B83puDgxQEPVzID0GvtW9fDvD0%2Ff%2BZGvRvrShXfoYvA%2FJQkHE&X-Amz-Signature=a8e314a9b74385bc0e803be3a228cf6b692b52d0d5731874b0583777ded64d15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQFNKWIR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIEz78b%2BgWmk9wdpi%2BV40SqAOsbM1UwSpKgHTfbokWNuoAiBIBaGueK4d1JclcuzxzcIaIFen54gGT9%2B50ZEPL3JuBir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMVaLF11cS7MHJdmoXKtwDsJ2m0qrRjuSO3mSA37Da46kj0ZECoiKIvSXrlNWbA59hC5Ct%2FeF0epQO8NB6lHulggcHvhhKUyAFpKs9dPHP%2FS0VQ49y0fd9%2B8xhCaF8JzXHRV8SBS8Gs5LurPgZxKamWvEnby7Cl1fsde7ZyveNFoKv238A2g2z11bvFLwSOcX%2BeiWed%2BHnfzLOB3nNMi4GyNR5B%2F7JFgFj47QYgq4WvixziWGgi%2BxrzZcbwEPM%2FQ5vYyvylnWNXJJZ8iYS9FxUaJ1JBhs0PqnnU7DrFAM%2BlQSkE9s5dzGrhmcEfNaddEMHMTy2LXO8GFeiZ5vrobveweXGGfgK2l5SF3eMg1X5buCzHoXZdfcY0IpTo8AXvPjovCCvS24OU%2FZFifKYZ9c1Y8%2BhAlvQeyIZsmsKae27ckcCwc6kPZOHgAtFCUcMcJZmQFnjJkv8ep6NBxpCShsuWT3HBb160Tlj5zdUuVP3ANP3g66flPqzqr0uv87PO8nCtDMv6COtuBxP4aeODZYLGP8d%2FKa23fzguTfLuayyN1DuzGsBkW8sBy19KOAM89TtpOETt0drkaI7YJZ5vY%2FTh5VteEWyka%2F5nlqiZCgYcyKBq1WWC%2FxUCT2t7uzyY6JnSVNIsEo4ytnUSRkw1OC7zQY6pgFX3DIZbKVGcrRYn4ITqpflnhOHglYFbZ%2BqpynU0Y6jUSFYy8CkCELKR8COr4Nk%2FL9QEFt9TTykWBU32xrXKuWewZqq24W83wfzoBJZvM1bHXKsxbOqYyeH15tPdbZ4qS8k%2BCGlXelW%2BIV812oz%2BKr%2F3VhhDu36FGiufm8MrRzksos%2B83puDgxQEPVzID0GvtW9fDvD0%2Ff%2BZGvRvrShXfoYvA%2FJQkHE&X-Amz-Signature=a8e314a9b74385bc0e803be3a228cf6b692b52d0d5731874b0583777ded64d15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD5PBE7Z%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T164303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQD0GMgv2iDGD7nWUDIOmi8CHn%2BDCDPMd7i6BdLTDSD5GwIgXvqnzaOc8KhY%2BmanLiZUwBDPdxJIRVe9UhNayZkoI94q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDNfOY6wENCkElrxtrCrcAwxpD7LnpQTK1TFyLJMkxG%2FHnJ6JJVhx%2BgCzYrrVMy0VqLkQVqVj5N8%2Fp%2BJBafPzpvLTm50Fak1QdzdzSl%2F74x%2FE3huHraDnhBbPKFIibnOhPCuU1nJ8d9xMcwvgnaeWUi8Pxk4zbb4NT4roD4xXleQqSXQhXrzXAmUkM9oEC8a8Zj2YZ8cQsrWlItMwD9%2BZgIB%2BzdcLiX4o2OyxckO7j5kV2RnPhnZPTjpGk9v%2B%2FA4vxdGZ4cAgsV%2FcrrCjQS9ShFitZWRPPyv5ujKzlNtt8h9zRmjs4MhfcoUvwWF%2FPeSg2ynQeVKRyCAZji6LtBm9Dp3D%2FSh7poTSkrzXt17H%2BY5RpjRRHeGjxqJe%2FHxW1sRntRKjH4U8eeP2fzv7%2BA3rqLQK6g2%2BkNrShYt0Wa6bkSN7EV1fwKOzRg33USvuQ4f0LitRhnnMHre%2FZZ%2BymlpHjnu0hzb7p%2B%2FgXaSo%2FQtGgB4TuNlSIltZwQ6a%2BiTUFS%2BoUJfWbo%2FhHNe9wW7v8rdE7c7EpOrTSq5OiQf3tf%2FX21P%2Fu4saLEETSJfSxofhBQ0YIMF7TuqUwUcmvCglZr5A5KvN5OFWDfd6kwbydMtdsqTrvf3gwmIhdcOziThHexgfRk5h8Zn7oAIw0DBdMJPNu80GOqUBKkTwcW7wV1tqNc%2BBm%2BJCcW50pXAZSFNjWbEldZfm7JU1ehk05ADIt7OX7iVKGJ4Nvm7W%2BfkZNzHDaKXXKoSlPjQcPQWQG7yjpYwulw4T1TTx4M%2FA0YR8ziMhSDRnD0qWidjqIOOmJ7GVo57Zs2OjkWfLYkq%2BVeJHTiiRa0nWAQuEy%2Ba3wcvuvC%2BMmU7eSQT36swIh4L9KiXk3lvuGgTQ2EPuBfIe&X-Amz-Signature=6680057d9ff3f73225c04096a59acb634f0285a88ae1385d764d709818d7a800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

