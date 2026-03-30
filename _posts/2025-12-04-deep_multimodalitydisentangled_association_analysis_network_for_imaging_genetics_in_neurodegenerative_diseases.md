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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2ZRFN3%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCokRXh4fJX0R8zbijeytsCEwSj6%2BhMw28xu0Ao8ymM0wIgSim7R024%2B8rNDQFU4XCLMAxQX2lTWvuHNa66b1WmJNgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMr6BJkvpvLZ9zp%2FSyrcA9NkffULfYjdI9F3ZlFkOZ6a%2FWOyRDe7D%2FOYm7DdzZLcZ1v8ws2hsuMXJVeOfHubbSbOTvZOvCiJYzWvbJc7PW%2FzfuROIDF8eTuCVztR5XF6Tc8PoXTb6ia4LMngInPmsZG%2BON0rTfIhY57caiZj%2FQuuPYrTqDFHXQtL2r%2FlLGYxVz5IHyx9DZcAsHXLWTczD%2FChVlBOhu4ybb%2FqjqZl5OpqYAeFhJ4HwBwmtwJ9I3s%2BmSZqWTcEYG1TL7ZuyIi7hkbfhivvBPaFzzuT3wjeT3Yn9mZPjQAIqTg9%2BCoTtxtcFtN6FC793LsXkwDLklXMa7tLJtQmYSdAN17lhHsAxP6AXxbTmcv4Hgo%2FQUWAcdugK9MKkAv53vcErYt4mri8eFVLIWFg7UX9NdU3DfugE6HOKLRYDW9u58syB%2FtCcQm1RRJEOmmvMiA0n0xoXJAiQNxN89y9ERThopwTT3fLPz%2BlZV2iFSzdVNjZQ1wiqw8Yv1Dk4H8oPCx9osMmJrK%2B0TrN9uIxLqt3H9K0dHoBRyg8A3nIy7RCjTZOo4GgbOFb7vKxbV3pCbK5dp0C5N8tuft9g1JLkDlX9x2Kwe5VF5%2BGKv%2FxBu2VIspZhOGmh0wvW684PqTqVezo%2F3U5MKiAqc4GOqUBM7oT%2F3SGMfLw%2FSnH1CbTC2PMdIurOJkFPRwDT2blk6FiFTz2ngrHnlZsWNqBaUvMBvl1N8Ir%2FjUnJxObLCoBREW%2Faa3meQkvDMgHHo3WOtGng4oUdNWCeHZrEgK4KX84eUo5%2BFdvNpZ7YseE4Ue6o5Hl8yDufZob2ExMCmPcFNikQ55rca1TA1IDEY6O7pBVaSlNACRt1Hvs34S96UdDxzSb8AsS&X-Amz-Signature=b0ba050696644ebb25c43942e315cce06daeebc609b7526ccccfe44adeff5afc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC2ZRFN3%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCokRXh4fJX0R8zbijeytsCEwSj6%2BhMw28xu0Ao8ymM0wIgSim7R024%2B8rNDQFU4XCLMAxQX2lTWvuHNa66b1WmJNgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDMr6BJkvpvLZ9zp%2FSyrcA9NkffULfYjdI9F3ZlFkOZ6a%2FWOyRDe7D%2FOYm7DdzZLcZ1v8ws2hsuMXJVeOfHubbSbOTvZOvCiJYzWvbJc7PW%2FzfuROIDF8eTuCVztR5XF6Tc8PoXTb6ia4LMngInPmsZG%2BON0rTfIhY57caiZj%2FQuuPYrTqDFHXQtL2r%2FlLGYxVz5IHyx9DZcAsHXLWTczD%2FChVlBOhu4ybb%2FqjqZl5OpqYAeFhJ4HwBwmtwJ9I3s%2BmSZqWTcEYG1TL7ZuyIi7hkbfhivvBPaFzzuT3wjeT3Yn9mZPjQAIqTg9%2BCoTtxtcFtN6FC793LsXkwDLklXMa7tLJtQmYSdAN17lhHsAxP6AXxbTmcv4Hgo%2FQUWAcdugK9MKkAv53vcErYt4mri8eFVLIWFg7UX9NdU3DfugE6HOKLRYDW9u58syB%2FtCcQm1RRJEOmmvMiA0n0xoXJAiQNxN89y9ERThopwTT3fLPz%2BlZV2iFSzdVNjZQ1wiqw8Yv1Dk4H8oPCx9osMmJrK%2B0TrN9uIxLqt3H9K0dHoBRyg8A3nIy7RCjTZOo4GgbOFb7vKxbV3pCbK5dp0C5N8tuft9g1JLkDlX9x2Kwe5VF5%2BGKv%2FxBu2VIspZhOGmh0wvW684PqTqVezo%2F3U5MKiAqc4GOqUBM7oT%2F3SGMfLw%2FSnH1CbTC2PMdIurOJkFPRwDT2blk6FiFTz2ngrHnlZsWNqBaUvMBvl1N8Ir%2FjUnJxObLCoBREW%2Faa3meQkvDMgHHo3WOtGng4oUdNWCeHZrEgK4KX84eUo5%2BFdvNpZ7YseE4Ue6o5Hl8yDufZob2ExMCmPcFNikQ55rca1TA1IDEY6O7pBVaSlNACRt1Hvs34S96UdDxzSb8AsS&X-Amz-Signature=b0ba050696644ebb25c43942e315cce06daeebc609b7526ccccfe44adeff5afc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JTV2GRY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIBKMPcLU8QrFdaHwx6Ql6X%2F0f9FWMahKlFnfXnAOZDUvAiAL7Zc0CEOodAkp1GJn4pSIPXbJYKcbVAYscVVY3Q9qOyr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIM3PWyFj1iNlP7wi%2BzKtwDHOSL1uC7Z93o4r8MLgVSnkHn%2F727I%2FpUlWA%2F6H2rq4oXgNSpumkKCbBaDRsmVvtM3FLlpqcgwVBerDcfcK8ofVCd%2F%2FhMjWFOia2fvIdzcgyaTkzSOHTtOXLUMoFTdQn1vwBK%2FYVhi1aEBwKmCGXWEMn5HJRjk0l%2Fh274%2FAIzKtOrErkWkEyXPOdh4mY4V0Gil48co%2F08u%2F4hJp11Eg89hwwhDd7o%2BLwiJcw%2Br15CXnSNciMsBktoBsj4Wyl0zxWC03AalAc8GenhuLUcSa41St2xzIzPQkM9YzPyTvIcgXBrcqOO6WXyuqHXoY%2FZw%2BDPRqSXbJDuh125TH6hVb17BTKJM2KVMrv%2BbSRbHLH09UH1QH9WfKJqLfk79hGptZCRNC4TSTH7PmS5j%2F1QQpz78kV8Lrz44ydf8cLAhuEL%2BbbTw9H0zO0EdTLX4I0s5Yjg9irHW%2FXBpzDxhT1QXmufk4UU6htgsdX7%2FHUzPWJsHmeFqX4PWCYvzHD0CXrLSepj35%2FKGLGbl64EcOZo4SbsWN1VjahtHOR67kccpaOkx0vzxDu%2FvnnQqyMDuhtVEEdZNRQdvS3X0ycDkiV3R%2FovQuBVCKsiykw%2B%2BRxTMt5p0jzW3RaMlovx8qtzvgIwnYCpzgY6pgHCWS%2BJYwFIOWML%2BNqxzM2psBpNZFG6UBOM0BcNtaRPjICqo7m80nQTZaIihMb5sCdcVZie1z2gyn2gQENAdWnZge4TkgwqXo17LDbeKUYLdVMk%2F12cdz8tjQyRYR%2BN2sj7Js3l4BD1qHCObUA0yZbkI6xfp%2FVNrw4hdlYk7b0Oeb2D9j16aUXERd%2FqE2nQGdjl6tLLwgMlYIrU04OKZN5c6kToMls5&X-Amz-Signature=faa531a74d99cccbd8a526521e685fd57dff950436b0e3b7e04ba84c7c3b29ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTE57QLP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICM8hUaLBNgnA4cjMphBzKOSSeJuX4ofzkqlqM7%2F8TvfAiEAuGg%2FT33baSY4WLaxrOhMngXRKiXezeWV53hXRjFcMNsq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDE2Z1iqR80ivTyNCkSrcA3zUXgLcyUW7jwS1RZhA7Jlx%2Bzf%2BgSo5I%2FfskZ31JPWR3U2clGESO0Ej5vgbJxE6dBqtAQjDG1VSghp61JJS3FLLv%2B%2FqE%2BCmS%2Bg5wZXrgNuVY%2BdsZN%2FDt0Y4nHKaXXxh62ymYIga8c1uv8WFSwf28scP%2FzpVQL%2Bq%2FHIPxnxGeKYAMIZMXVIiXiPCBt8u%2FB3XAUm0SqEmf2C5uJfnGcKmcppNhfURD9fZwQlueeefMUcEXvv%2BMPbXQz7UNzwsMjGgxsiqhPzjB9FC69TTYs6muJv461xIGqeFu7Oxu5MVCHhWBMYuBiWGf0JTLf1vjm6JWOrGcmuBFdsqxGVPiQzxTZkz4J7URU3trZFzVts6YLhWusuLbDV5sWLnj8Y%2BRDQilM2uhtbFQRyq15wY1uFR3ldJYxUYrWTliWw9r1FKi5JFXXu9bJNEeGwNVeFEV5bZf4heOUqoJRl7Fy%2B5uJozItgMrQdLlyCEO4idANnlTGj%2FSibK5tFScRljhoO9GQsk494y6ML0xNrAtg9MhxNuEq4ZgQURbGKCeCt38h%2Bx4LYFbrXqb5c1DXHL66YHCh1vT6APo9Cfaqm0iWp7IuvjnyIuz6CVn6s8mqoqjEdpzM2jShn4o%2FYbmmTFnp9pMOb%2FqM4GOqUBNlXcL9R5bii%2BhWhx1ZQD6UfHBE%2F7QwofHFzR9gsAC%2BG3vr0h9w3uUd80x%2FGsTPB1Z5225ldFEPUcIJSImADFD1M6pwAzYBPBRwNg8iWCkIdIdxJETKn%2FGE%2BUL8hV2z02dzC6KbefQ%2F9R822%2B3KBVIlRi1i%2BEJtR%2B9ErtZKLg1kOxY%2BLnMHn3q9W0%2BJUXCrKeQagnzHYuY%2Be3POpOOFS1lcT039MO&X-Amz-Signature=29a3546cecc8b9d19ef0c16ebf5c774f29a7731f6afd9cf33f0f2437d6af219b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTE57QLP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICM8hUaLBNgnA4cjMphBzKOSSeJuX4ofzkqlqM7%2F8TvfAiEAuGg%2FT33baSY4WLaxrOhMngXRKiXezeWV53hXRjFcMNsq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDE2Z1iqR80ivTyNCkSrcA3zUXgLcyUW7jwS1RZhA7Jlx%2Bzf%2BgSo5I%2FfskZ31JPWR3U2clGESO0Ej5vgbJxE6dBqtAQjDG1VSghp61JJS3FLLv%2B%2FqE%2BCmS%2Bg5wZXrgNuVY%2BdsZN%2FDt0Y4nHKaXXxh62ymYIga8c1uv8WFSwf28scP%2FzpVQL%2Bq%2FHIPxnxGeKYAMIZMXVIiXiPCBt8u%2FB3XAUm0SqEmf2C5uJfnGcKmcppNhfURD9fZwQlueeefMUcEXvv%2BMPbXQz7UNzwsMjGgxsiqhPzjB9FC69TTYs6muJv461xIGqeFu7Oxu5MVCHhWBMYuBiWGf0JTLf1vjm6JWOrGcmuBFdsqxGVPiQzxTZkz4J7URU3trZFzVts6YLhWusuLbDV5sWLnj8Y%2BRDQilM2uhtbFQRyq15wY1uFR3ldJYxUYrWTliWw9r1FKi5JFXXu9bJNEeGwNVeFEV5bZf4heOUqoJRl7Fy%2B5uJozItgMrQdLlyCEO4idANnlTGj%2FSibK5tFScRljhoO9GQsk494y6ML0xNrAtg9MhxNuEq4ZgQURbGKCeCt38h%2Bx4LYFbrXqb5c1DXHL66YHCh1vT6APo9Cfaqm0iWp7IuvjnyIuz6CVn6s8mqoqjEdpzM2jShn4o%2FYbmmTFnp9pMOb%2FqM4GOqUBNlXcL9R5bii%2BhWhx1ZQD6UfHBE%2F7QwofHFzR9gsAC%2BG3vr0h9w3uUd80x%2FGsTPB1Z5225ldFEPUcIJSImADFD1M6pwAzYBPBRwNg8iWCkIdIdxJETKn%2FGE%2BUL8hV2z02dzC6KbefQ%2F9R822%2B3KBVIlRi1i%2BEJtR%2B9ErtZKLg1kOxY%2BLnMHn3q9W0%2BJUXCrKeQagnzHYuY%2Be3POpOOFS1lcT039MO&X-Amz-Signature=f71fbd2fdc24cb2eb66e6068d581a3419752807fe5c1287c706362603ffe0fa3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675VHPK7Z%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCfhEeCThqJGHHmtcxUMCCK6APv4UaHU0HtWYdvXq%2FrkQIhAMLk%2By5jd%2FoeiMPkEsCpMEMlU7AHCWJN66HZHZvV9tYtKv8DCCMQABoMNjM3NDIzMTgzODA1Igxpi0lKPStDlU6%2FicUq3AOgawb%2FRmkxeuuJZEi1deLKzlVWx%2F%2BavBZtqhTOvbOTGF9Z62d8tEzruOCQsUx0kSULdL2RNmTtSH4LQ88SOKhuMIGezV%2F0Z1qCXnbmuloTMQV75w46rcGCfOpj4oa%2BPRFtwnHLvGlmpWm%2BRWMs2X%2FeFyE0BOsWX6erHVnqXUyxcA9WAu6kBFxm3cKd1Kn3mTIMr0gSpLmJZvmMNAP71dIOy9IJwuWwwBtdv4ceibklG5jV%2BHLl4V2gRzXG1YJ1yRt%2FAxd1xV%2FN8icLs01wnthAOCL0XIr0S1lscyO%2Fb0%2FnVp5D5ykagOzEaWvXsst8vc3wNnw6tnGKh3%2FDikrlNH%2BtRP1GN7bwpELeqNOtVHRzpFgoNmvCA9A9vRJU7VAqbp%2BchkxfWAChBxACKxkkwq6iPb1G7LIsW66NvYZWSWGOE3TrUwduEBf7%2BXRrznMnOJT4HhcDq%2FXNsQcN2qTyQe5Wrw1oCy9dp4Pfqw2ARZNAnTHuNI7vr38iF4V3oIy69ZpX%2FZRg3mNoBDpQbJKAyLpMa5U96MB1C7HBwn3g4EBZawueisCakz0INhGcHxLmt5jW6GDFWZzdblKhRuxuvwpVVQofWU8nxc65e4GvZhYOddwVFSIcOGkJ6%2F4tMTCwiqnOBjqkAR%2BpFhfMQzl5hR2AaAv3ZHqi7NSgXtWUr7C97taDI8wImJRPNEW6tSQE4cO%2FOtW5q6nAypfUwkj0wDzLPq9Yj6nr2NpUeD17tMGdo307nxd1SNDsN8mT4pLwRwtw5YFyCCD%2Bgs9kUL%2FmMhUo9iG8K2QXMlzW52INLMUMRHYLORF22LxUPtVI5kyf93iNu3Fdq29rnwUF4xEZ21FNNwausYNYkDc5&X-Amz-Signature=6f748d309b49e6647e60237c99b94d17935bd06b54ce174fb821f46bfff48d5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBPWDCR4%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD%2FtczJDdBPM0T6GBFVp10FUZqcaUnS%2BqN%2FwARGfzZV1wIgJ7JvnwWOlneBLcp8p27ds%2FjiqrO2rXXyIk0pNVaI5Dkq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDNtTbQdzsq5Kq%2BJ6XircAxRjkUZ5G42CvGj6kIkh83Jxexh0ydo84VtMlEYSG6YSQkq1uzBlcbmLF%2BfpvaxQu7uOMaGDTJgGH%2F4LYaiwxmmNu1CtF7cZIXMRZR6pIqptv7Ol%2Fi%2Bt8mpEKNb5RQ9CKg6Q%2FpzmUlhu9Cw2PCIzhqNTSg2SF21WWT45s9y1QiEu4QSE3JZjPjXzVrkiRsmbHpiQ%2FgqHCL94tvnuJ%2BUPQo8MGF1Edow1zER8HqX8fJ6MIo20RgNk7RCqb%2FdVJPM6M295JyEhYDrWPLIx546t2fJSKzoJv6Lwv2oEb97S4CpJS741DtIADrUQ4YLEZ1rg%2FWkbMSjQPS%2FAw3FWwpdjdKMGYhfMzGSGb6CUtOLrD0A5z1kYyOrKqCWPKQDf%2FsnwizteOO876%2BOpb6QyevC3IelVz1P98m3kOM0pWj32z4QA9Io8anQq5WbvxNIpBHZq2XaU733Dvolqvf4pCS2cD39HuRbZWcdrEZXtmxd3wSTKY0i%2FNBv8un74TCGxuZjVaetUUTl2eZ4KnkkiUSlOykEXGGsLFji8eHf1AtzPHSkaELZO0YN0xYIqEN25kbDLVh7%2FwfmT%2FzdQtlmWYjQXNyE47K2FaXt77jpfUMSm7NuwqVYFfNoMSHAOd1d5MOX%2FqM4GOqUBzJOCEEzOzSJQ6hCx8B31HJmVuVSV8xI7%2BjhLKfYnV7CMbRW2QUPqDze%2FoK2Gc7tgCd%2Fe5AXnbBfm5Uu4nCAot1T6kcYJBXWADrWZowMKRoyf%2FMwbF6E3Ir2r9Fa743vjvXSPF8kAC3gK3RgRv0qbwpftQ4zXJFAaCY2xvM4BKIRvOGm0mHVsOgzlauDAJTwFX1Ny8wOtqRluvyGf3UFezfAKpIos&X-Amz-Signature=662062a674fe920fce45be4d53be8f551cd347a9a9918e3c079366a75184606b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MNSDNFP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD0EDlaaPAHOIsXptUFwSLMHguOQsVIAhsfEal17o%2BG0AIgMXoAYg56CBsPTplhxNxUlGaN%2FlSxD%2FFXjhcFifO0zlQq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDLpym%2Br05Wv1dJoETSrcAzKswFRdSVKAjyFtkHe3h7wQ8S3LXffAhaBD4LVDFL73ehnB1gFtHVaUhPZYszCE0ZoidDEktYDVX3f2OYrzMTXsq7JDPWkrSJ9PHohvuQLnlaTEwkl5vEQD6MuAZHppaeQg%2F8Nx0FwwidBDUpetWqCZmcDvKAe%2Bi%2BDK99Jmx3JGHq83X3wXoCoOSDuERZht8kv4NPXchh3eN9H4O4fqEpGDYV4Awd7XSPy1882yjXh2LcbH1qDplbes66ftNMLZfywitCKnpQ0UGUq628Kai6u1sz4nQ2PFE9kHggwVVOiOgU3tpVecSu8ClloxmMzXAclXB4JHGq6QqLHpIootE8nKhlhg1zF9lVVs92hL6%2FakXtHcW7bA7nWspkiEMJPNdmqktEO03O%2B6mtY%2BUdYZvigNBhqPpy3UHVOkkzfQTuspHU6Vqxu7URO3H%2BHjKvOnJlOBjBr0Rhz%2B1vTEQ8nBC0LlocdwULOdvsiJGy57gKZtXBjBbH%2FbZjS%2FtQOAtBrMGsI%2FIIM2WjnVRrNwl0cIWu8RhvB%2B0kYZ7aj4YgH%2BOIPk5M9CRVh6ZDp8uwqQmOOkDQvyalpZjWV%2BMhLDdbcuaPgkhhSW7gwaZCkp%2FFvpNqnmrietHah7%2BwFQYiBKMKKBqc4GOqUBEJLSwrErKX0JTvZr72tfEtdxjfi0NR0xNqNcUgtyrBUqoCn6lkbfVSGX316Msk3zIt9kcJIkw7CURoIXUqoU27W3CdC%2B0cghwumyFhOodegnEwtaYSa%2FIlIl968sR6bLItKl2%2BVr3QyzkJ2Zbm%2FmaDq1RewBks4%2BfYG1R16dJ5EJ9Y%2BRDTAPrVO1rUPYE9i4V1ga1cGf8%2FddvF1CpYlKbimRWjOY&X-Amz-Signature=80e6c94a1110234a128ce55303677fdae64b35001fcd540d240e345ae22607b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFYNMC5M%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDNpIoEZ9oIaBMYcpTvdCR9lh%2BQRNrYEtHss9WVaYgCywIhAJh5T9FjR4lX9CY9yWCU9GQNruvigQOWqPleYxfVpLzLKv8DCCIQABoMNjM3NDIzMTgzODA1IgzL1Q2xQbEKEvg5xnMq3AM66J9YfE57hSzxzCyTkcgyJDgc0Z5%2F9NiWm9btxHoADvgFp8laMTXpBQbfZUnWQ40C%2FARdBWiPlefUgSm7%2F%2BqroqbCiVCnDxyCrwA1j4n0zEtw%2Frcs8Y2TcA7cff7KKXM1AON9f0JlxA1EXpITtl9mVUFSgH3frAqf8iTOGMRQE94YndPj%2F8ivQxH3Kng5uQAlhIABOa7X5sw%2BsKa3o0wFYBHX2cqqVmu4VsEshnf766L3jWA1juHav4aggmj1rzqnvbUqZPyrN7amFUbw%2FnWtHu8Ox%2FlOriI2EItYxAXgpF%2FjMll%2BTkLvysWdfGrOBigTPzxiMqsNkhyMUSJpSn43xAy8up%2B1Zqgx8eOdEZoul8%2FxDfNvZaqZ6qhbuQFwKniQQt0CpgnD7jZ1VnQqcL%2FnqvgB7oD%2BoYIVwD2%2FpsTsyOGLl%2Fk8fyXarNrK21IGdwPVFMePL4nrHx99aVDbL4ibuOzdwaXNiex9ypGVqcwNFD2Wwt7kqqAkws3WjkQIpVQ1AKSCF4l6%2FDHvafktl7fSBKj2Dak4CWuu0pihfzz7yAixb2df0hoRI9NXRa4XiggyiaKWPCyi2ZzNbUzX6b%2FiSqI5ZjCSc4kysX2ZwZ0vwFLqTu2bE8f17TsSMzD1%2F6jOBjqkATksah0FFQSVzdwMMdvrZpi0lwCp2%2Ba5cMoK37N6JMbEkM1OIKl9xXgkKW1AxKAV3Hr2BEcjvBfTr9QjBbbedjFkfQx65Dgqr%2BHlvDc5KGBs4c1ULU3b81QKCbt95YeUQA7dRyT9GnA7GdBCkAqhBPxVOI21GQKsFFlHPoukt6Bmbmzn%2FMZZvJCwP561iSGZCXp8kl5hLmXg0PWVX2z3eLo5zjKn&X-Amz-Signature=dfb084b649f428aa0196a2a581b2d9a10e93fff2559acff7f62dd1fd16451ec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFYNMC5M%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDNpIoEZ9oIaBMYcpTvdCR9lh%2BQRNrYEtHss9WVaYgCywIhAJh5T9FjR4lX9CY9yWCU9GQNruvigQOWqPleYxfVpLzLKv8DCCIQABoMNjM3NDIzMTgzODA1IgzL1Q2xQbEKEvg5xnMq3AM66J9YfE57hSzxzCyTkcgyJDgc0Z5%2F9NiWm9btxHoADvgFp8laMTXpBQbfZUnWQ40C%2FARdBWiPlefUgSm7%2F%2BqroqbCiVCnDxyCrwA1j4n0zEtw%2Frcs8Y2TcA7cff7KKXM1AON9f0JlxA1EXpITtl9mVUFSgH3frAqf8iTOGMRQE94YndPj%2F8ivQxH3Kng5uQAlhIABOa7X5sw%2BsKa3o0wFYBHX2cqqVmu4VsEshnf766L3jWA1juHav4aggmj1rzqnvbUqZPyrN7amFUbw%2FnWtHu8Ox%2FlOriI2EItYxAXgpF%2FjMll%2BTkLvysWdfGrOBigTPzxiMqsNkhyMUSJpSn43xAy8up%2B1Zqgx8eOdEZoul8%2FxDfNvZaqZ6qhbuQFwKniQQt0CpgnD7jZ1VnQqcL%2FnqvgB7oD%2BoYIVwD2%2FpsTsyOGLl%2Fk8fyXarNrK21IGdwPVFMePL4nrHx99aVDbL4ibuOzdwaXNiex9ypGVqcwNFD2Wwt7kqqAkws3WjkQIpVQ1AKSCF4l6%2FDHvafktl7fSBKj2Dak4CWuu0pihfzz7yAixb2df0hoRI9NXRa4XiggyiaKWPCyi2ZzNbUzX6b%2FiSqI5ZjCSc4kysX2ZwZ0vwFLqTu2bE8f17TsSMzD1%2F6jOBjqkATksah0FFQSVzdwMMdvrZpi0lwCp2%2Ba5cMoK37N6JMbEkM1OIKl9xXgkKW1AxKAV3Hr2BEcjvBfTr9QjBbbedjFkfQx65Dgqr%2BHlvDc5KGBs4c1ULU3b81QKCbt95YeUQA7dRyT9GnA7GdBCkAqhBPxVOI21GQKsFFlHPoukt6Bmbmzn%2FMZZvJCwP561iSGZCXp8kl5hLmXg0PWVX2z3eLo5zjKn&X-Amz-Signature=fe9e82a6c472ce0477c3a71a964125a39502099f8d07035ac48c156150966174&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNMXKEQM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIBgLdqCB0IiVRNTeKrgUN3fy6RYbREYeskYZO92R90aIAiEAykVVZIeOyZ5qgUkClEA27sOPL8VPl8MlpMhV12uG%2FFQq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDEiopORtNW%2FQnYFUvircA6zUQ1YFndB1E%2BsJIFozShLNVwDBNidhEOh4fPajgkB0RF7PLNbkJUvOkEPPAdMREwSRO8CvRGvwphdUX7ZhwaM%2BYyrlK5wxo0wEoC%2BDytlYIPxVsCisfkU8%2FkadOF2vhAXeIBwAMn6pvexaBRsybuOqNXBIAcaEnWljx8laN%2F9TUhK4hTGDPmB1OPCTk6fLMXx7wwPV26TcoB2RVALRoRZvms1t7T075H7XSN20W3LCA%2BbFI3YKNbcJnQ9kTcwZPI880BI0EjPLk8hlyMCo8Vpng%2FYsyOeokV1c8MZVgENwNpdEbONg8Qnaji%2F6buwrAy%2FqepLqu%2F9kPD7SNmJopnAzU0DZmU6gAWGTu0s4CxTXZ7UKoXgNXeuwVhpd9oEStHuGFJGu%2B7IdPRKQ9fyLVjQ7YhV6h2op8gj1vaViPWsfQLKE6pfNUOF7g%2F7wV9rr6uABq4%2B%2BwRLX%2FR3%2FovsQ%2BwMVroOegidr%2F7ZkzWCNvqF2dgdPp4trTlmIZ54AUuGty6A0l9EVqtNrjb7rZl%2B8w4a6tvlSGLu6HuQX1RbbwLDlJDgDPiUwcfSvW9%2B0zqjD194cn8YRhHMgK0MvE6r0rj4G3sfo23sCdJwU%2BJ8xE4k2icWQbpQC9L6b1LFGMM2Bqc4GOqUBeUFDwutz2GBvyx0iTzD1eyw9TysFPuib7ITbLwJB3bqnSvegH7lhgM%2F2UbAgrYaMQKgKnxVZ45n23UkEwvxZEEqphAI04e3xKFNm6j6lf9c0HIq0bGvkwrei8oIH1OG7FU4Q%2Bk7oMWTyOFOu1eRC5yloFac%2B49Dlrpany7vTNHsMlfQ7HUIZgdK6Mq4p4t46JKQGvdKoYQ3nlIrw0qr%2Btz40egih&X-Amz-Signature=2b9f184d3d4ea80f4a03ca80d1f654d483562014e0143a0b6fb51f004f22ab85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XX4KKWXX%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCEOgQKLCT5gZX6i%2FOLogDutBZbr3Vy6zNHFSSXgRh04AIgHhgmhN36hxH1P%2F2rmBHsPD48gVDsKOWAr49LsHF12sgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDL5LYIb8tJH306%2BQ6yrcA4iAx1JGPKkq1VrXF4nJ6HWKOHqS1HcuWHeXNmKKNxcHHWzty1jXbEZnFIqjRfSThj6E22GSUMyk8i7KFkU8HyfyKm2HaibELnntQJcmfUCkBplx24MXvNB9KcwrLfdY4XF5%2BD1FH2AP7a3o739VLFS5BS1llDsEtiTVnIA%2BPLgWE0gwHPWUT%2BerhHZSBmdPLbdBEKzdjbZ5XCgvvsP76HkaOKjSDWzGjb8y0cWzumqKNV37Y%2BLoIYtuSfHUfjCa%2Ba%2BKyLG5rInbXTFrFz%2FwcCUmS4OPy0bUgVIvfDv1cleiuCrD2VJ%2F2KATYSEH7i0pQtd3xz2SvJHfQwu0eltMMK7MSYLZc9yuvNrAsJMo2pEZFBmpjdUIiOiTEEtDaZKkFDZrTbwK1FING0bPk1JnXqdnBUuysDNGV9cgTlyF0p6xHC2o%2FQurTugSVFL4dWz%2BBegkeGCCxTGf9OCscKpvXx7yv%2FvU%2F6YkaiNSPeO5cq0AntNYGbAGyuQ4nxqiQ2lqgVGAIE8sEe5qyLq8A1kBfSxfo%2F1RkGDzBmIOpD4G%2Fp73Wy8Q1SeqtY5zey4EFhCjtVydZCderN5HqWEcRHWmbi2Xp3xDbBvCV7G01HQvk3XPoLXjDBxoQ2vVbRZsMPL%2FqM4GOqUB7I5K9xzoWDalN%2BoTyNFfx6slmnEXikCwDnF6D9hgSuSTZ9CQGzymMdAcpY7hYCAjF7Q02hgp22%2FcKOa7FzpXdjhfjQIGu1vY%2BBbEmcfctQoABqxRwZyP%2FlP5XnaP8%2FBfOlCvFPm167hEFe6vvcx1TSeYTU7P5fT34qcwCVa84p9zKM%2Fae80Amf97n0DGCKn%2Be%2Falg5uCJ1dVs0HcAAsHDObX5TOq&X-Amz-Signature=759c3e2bdcee632aa1ce431c50439cc02939755b409601660298c7550fb147fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XX4KKWXX%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCEOgQKLCT5gZX6i%2FOLogDutBZbr3Vy6zNHFSSXgRh04AIgHhgmhN36hxH1P%2F2rmBHsPD48gVDsKOWAr49LsHF12sgq%2FwMIIhAAGgw2Mzc0MjMxODM4MDUiDL5LYIb8tJH306%2BQ6yrcA4iAx1JGPKkq1VrXF4nJ6HWKOHqS1HcuWHeXNmKKNxcHHWzty1jXbEZnFIqjRfSThj6E22GSUMyk8i7KFkU8HyfyKm2HaibELnntQJcmfUCkBplx24MXvNB9KcwrLfdY4XF5%2BD1FH2AP7a3o739VLFS5BS1llDsEtiTVnIA%2BPLgWE0gwHPWUT%2BerhHZSBmdPLbdBEKzdjbZ5XCgvvsP76HkaOKjSDWzGjb8y0cWzumqKNV37Y%2BLoIYtuSfHUfjCa%2Ba%2BKyLG5rInbXTFrFz%2FwcCUmS4OPy0bUgVIvfDv1cleiuCrD2VJ%2F2KATYSEH7i0pQtd3xz2SvJHfQwu0eltMMK7MSYLZc9yuvNrAsJMo2pEZFBmpjdUIiOiTEEtDaZKkFDZrTbwK1FING0bPk1JnXqdnBUuysDNGV9cgTlyF0p6xHC2o%2FQurTugSVFL4dWz%2BBegkeGCCxTGf9OCscKpvXx7yv%2FvU%2F6YkaiNSPeO5cq0AntNYGbAGyuQ4nxqiQ2lqgVGAIE8sEe5qyLq8A1kBfSxfo%2F1RkGDzBmIOpD4G%2Fp73Wy8Q1SeqtY5zey4EFhCjtVydZCderN5HqWEcRHWmbi2Xp3xDbBvCV7G01HQvk3XPoLXjDBxoQ2vVbRZsMPL%2FqM4GOqUB7I5K9xzoWDalN%2BoTyNFfx6slmnEXikCwDnF6D9hgSuSTZ9CQGzymMdAcpY7hYCAjF7Q02hgp22%2FcKOa7FzpXdjhfjQIGu1vY%2BBbEmcfctQoABqxRwZyP%2FlP5XnaP8%2FBfOlCvFPm167hEFe6vvcx1TSeYTU7P5fT34qcwCVa84p9zKM%2Fae80Amf97n0DGCKn%2Be%2Falg5uCJ1dVs0HcAAsHDObX5TOq&X-Amz-Signature=759c3e2bdcee632aa1ce431c50439cc02939755b409601660298c7550fb147fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDLA3YRP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T100304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIC8v%2BZ1hxSGrDdPasqmHiW16OP3Yws8PPUNOPZrx6Cq3AiA%2BH%2B6pNyb0V1q4aFWAJuMkZbBqG3MhkYcyZp2l2ObP%2Byr%2FAwgiEAAaDDYzNzQyMzE4MzgwNSIMUU5%2FlO%2BpURGHGkokKtwDNUipfspC3NS4JbXf6Orn8fqIFVEtj%2BxhMPVAspTzziTcS1B7OL8uHn8j4UQprL6IoUoR%2BRDhN8UymCwNfbVUoc1MkliVKJ%2BTQiJLKarFjdgXhWSFUm3e91dypkz%2FRWx%2FE392nQYIYTH9wH%2BHMneWwCdSDn3PtWfjUUTEzqKZta2z8FRG%2Ftac6bOWl9aNpP2A%2FM8q15p4Rrvu8VGFHixbNNcSkTz5EKTJVy5jyl5XImPf1qHRMzzoWCOkxKzldF0u%2BZgNh9C921vfek3lCMbPFHb19O5VmpJUdDMyobvqhP51yxyv6gI0T6agR78LCBzfwP2BQIV7B5pqzvDWN2benNSgewGu8NoQbFYYmzkDrHYJQpU3orgKQ4qALoHvMKV6M%2BbsKJW7vniXtJyHypS5unv2txARsM0J5yZRoVt%2Ft%2FGDtAshYiBtoZPraY37nNNlAEAZq2QVCr724PBdE9iuLWVcspnqZRMTPSoj8EVHa%2Bd5jYECYU51YHDlFrM%2BLYjn9bHZBa7hMe3ef1KDgcTPKK1uQUylRfSINQNSjYZEKF1s0hb4ogMx9oj%2BXx31Jf05HMi%2FunrcCT05RX3ju0%2BFyARQ%2FcsMS0AJvO7aFP2sdgPeB3VkkFOF%2Bbi2PNIwt4GpzgY6pgGLsF2Byoc%2FigxGEkyQKps5ola%2Fc17aybRA02Akw6CWeYywPgrCDfY6vpSzkpHrRhf5nq8TNUBLOmyTFldyXBOkP8mBrqmipCQeA90E0t4o4Msi30pgjEFzqp%2Fu2XHqU8iwkXWcoxUO7j0NKQ%2FQro5fhXwIwqXBcGq2gXTQ16mBKXfwoGAs9NdIQuCJsITdrgrty00xWs02d97XXbbpUgTU1PaMo4VJ&X-Amz-Signature=2ccd3c68ae66219c155587ff092cccbea4bfca001075495146a571990963798b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

