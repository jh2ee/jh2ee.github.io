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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PEPFVCB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQClnKdvZ1PGd5XCkZEDdXdtey8jrTbRXToFY%2BsjEeyQ2QIhAJwh%2BCETW3fmaJfxhGqToFg3uSv8NMyMg6IxSCvb3FlvKv8DCAEQABoMNjM3NDIzMTgzODA1IgwoIOBSP47MABfUjCQq3ANuzjRUeoIsIgdzNgefrN%2Bpa2We5YdTpF%2BBSqMU%2BteOU5FMbnrvz88%2BB%2BlUglooAzeSNHaTJ2qsUE1WARTBVJ6WcPxoZRe4A00hTqEhCbp9iV%2B8%2BijW%2BOgrdDexBm%2Beh3LSnwT0wixIk32RBcebRMgdntXmmUrlbRrJ8tWeIYy1Hra%2B2sWpn6zHgekpCzUGFgEFtz2m7mhs4%2F%2B349UBke90zGSdjI5ifsMNlqGntixeI5og3trmAS1OIEEXJdTMI9eTeOXokGCOnXHvB%2Ffc3KqvaVm9trsqMeXWkLLa%2F6NAPDQvevNHml4a62Z43Ph%2B8OBOiJkj0M5jYWIDf4h0rFh8OaWAUbC4tPbksULXEOsH6GZb4gyMN9we37hk1lw6Wt8S30%2BsGEp9U4%2FgybyuXlIb07ElMb7r5D0xRoscPSff7%2FySmnLNiiFzDgh7CT%2BJMS4qA4H6HDm9sy3a5w5eIw7gMkfBIRj1JL6vqdlg5ON6mdyATjo2Rq2g75IvAuf4KROX7U8TOEPICD78LOzQOygG%2Fnu7lDbatAPYiUnKb0jrmY11bZq02GrJMSX5d0SckiTg9nfpsrMpsMCiUszqrJj6yS88SMicd2EJwJViVTWjzV6CGOLtd8iX9kI2XDCawenNBjqkATCDB9x22GOmAo8sIyxGvsr64YRkazgS2S5lqqZKd0M7WZx38epx4qCNwr5ywz7xTu9kgv%2F6ikMb2x1SikHYo%2BUSiFDvckv2f%2ByJ1vpT3mJCALreVcOLK7b9z3k8%2BgScdsGHJwFLf7VLPIreJu7AuwoeWWCOurjLlSYzAe07x3TzP9pXr50U2ZBQL%2FMZBnwZLeX2B4dlDQRnoA15e19lDmeV9ude&X-Amz-Signature=f143ddaaa1ca513bcda17d9d29762a14cfff54e81fb940c0bfaeb5c98a1b13e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PEPFVCB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQClnKdvZ1PGd5XCkZEDdXdtey8jrTbRXToFY%2BsjEeyQ2QIhAJwh%2BCETW3fmaJfxhGqToFg3uSv8NMyMg6IxSCvb3FlvKv8DCAEQABoMNjM3NDIzMTgzODA1IgwoIOBSP47MABfUjCQq3ANuzjRUeoIsIgdzNgefrN%2Bpa2We5YdTpF%2BBSqMU%2BteOU5FMbnrvz88%2BB%2BlUglooAzeSNHaTJ2qsUE1WARTBVJ6WcPxoZRe4A00hTqEhCbp9iV%2B8%2BijW%2BOgrdDexBm%2Beh3LSnwT0wixIk32RBcebRMgdntXmmUrlbRrJ8tWeIYy1Hra%2B2sWpn6zHgekpCzUGFgEFtz2m7mhs4%2F%2B349UBke90zGSdjI5ifsMNlqGntixeI5og3trmAS1OIEEXJdTMI9eTeOXokGCOnXHvB%2Ffc3KqvaVm9trsqMeXWkLLa%2F6NAPDQvevNHml4a62Z43Ph%2B8OBOiJkj0M5jYWIDf4h0rFh8OaWAUbC4tPbksULXEOsH6GZb4gyMN9we37hk1lw6Wt8S30%2BsGEp9U4%2FgybyuXlIb07ElMb7r5D0xRoscPSff7%2FySmnLNiiFzDgh7CT%2BJMS4qA4H6HDm9sy3a5w5eIw7gMkfBIRj1JL6vqdlg5ON6mdyATjo2Rq2g75IvAuf4KROX7U8TOEPICD78LOzQOygG%2Fnu7lDbatAPYiUnKb0jrmY11bZq02GrJMSX5d0SckiTg9nfpsrMpsMCiUszqrJj6yS88SMicd2EJwJViVTWjzV6CGOLtd8iX9kI2XDCawenNBjqkATCDB9x22GOmAo8sIyxGvsr64YRkazgS2S5lqqZKd0M7WZx38epx4qCNwr5ywz7xTu9kgv%2F6ikMb2x1SikHYo%2BUSiFDvckv2f%2ByJ1vpT3mJCALreVcOLK7b9z3k8%2BgScdsGHJwFLf7VLPIreJu7AuwoeWWCOurjLlSYzAe07x3TzP9pXr50U2ZBQL%2FMZBnwZLeX2B4dlDQRnoA15e19lDmeV9ude&X-Amz-Signature=f143ddaaa1ca513bcda17d9d29762a14cfff54e81fb940c0bfaeb5c98a1b13e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMGKD4BZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCzaHQoYmbtr3EQwJD6oqtjfOf9Hw%2BiZgMdRzzvJ5LOxAIhAL%2F7FnNyKrhAPqCnm3TOvm2gDdGU%2BlDkrnbn51V0CPTnKv8DCAEQABoMNjM3NDIzMTgzODA1IgwjTgPUlup3T5miLsgq3ANJwjT%2FW%2FHFSmI4MBlWsRyAfwVmshGapMOfT66xvqL7nVF1I5AjUtnmd1NcFeuc6NcfFCaQ5ytvj2L6pEzIBe%2FImsS0YR2re2VQK4RHGDDmf2lWRXXFB2gHz5f6Ue9HardDMD1HnJiXjleM9UYDSN194UJH%2BmkjWe11lBnv8n%2FJUvto9AGXZwjGSHuoZzTiSeQafCOM24Vyte5Ljag23Zzb0jlV0K4bpFwacIv7JERHFtJE6UQuInIpQho3IH6BRrerpxmckgP5qfoixtqDV%2FSKqg6WgPPIzcup9b1Lo%2BxpZUQ8LAcdTDOczIDDOJgXP439weFeRIPdVCKe5gHkx2YZT55doHB2jnxf9o2QASyWhIgM631y5q2haRAgGs0HBtPfv%2BIamgwfqMH0EzOfVfqAlmVKz1DH7EEBaldnEvRgkMihUk72gZDMM0fwc62QMronD%2BIYnciuCXFTCKidq%2BO140oXkNUfjYsyXtxEJVBX0e9%2BtMYG2xqsxZYGMR0lLVbb34N2G6hmgkIfHn5uAmJZEDsw3bt%2F8QDa0oG30G9K9GQ1jx7zwWZlxxVzN%2B5tV6kAhbFE6j4LMSsYaiKGLDrOZjK%2BvgLJvHvlFu4MTHdrdYk4taAE%2F%2FlssH9PXDC7wenNBjqkAXlA1Dra7TFazlcKLrZo1rw3Wcv0Za4Kaa9ocNQB8cvQ%2BRCxXgvfpuLwrrXr3tWfl3cZOFJAX8IoZTT6%2FN8kKQ1mg4sKxE%2B32bCZBt%2FZarSMbZoFLZ16oyYCDxUcuVAHwt26jo5gD8BWCXGJEByuvJSNALOeF1LJbnWmNvU1F2PynHo3Lg1HNfBCnTQP2vNcOtv44kxlE%2FOZd8HULdFTHOjE%2B5W6&X-Amz-Signature=85cb0f886e36542c4faffcf8dfb13372cfce3293c62c17e5d6f1b28d6819b8d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJRMP6ZA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCuuux9gOhWx6OMrhCVbdJ9vKSdyu6C5VK0tKIRUBzIgwIgPyWFDHoMbpG14lC2%2BCOEmJat23YTyATk6WDaYZJRcMEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDCDmlbM%2FQCIv6%2FCQDCrcAw24A3h9oAVPCeQ1c8D49vHHTeVcA14P9B61daBeNkNyUHToVhcFaDj%2F1cqHCHHSc2XpKhhlFBd27xtPknJi%2FRtLlNcCHtModkmE8Rc7scBlQ5D%2F6J%2FEoyL6FaEPBwUurP1Jt4IZWZm2MTuEoULoK64I0ysI%2F8npNLkaeZYN0RYM3VhIOjqRMo0%2Fx4qKvCA1BVelKdsx8CrhCSn3avMWlxYh9LhpIB0zaBSa6CMdcm7C59E4F9B9%2FmU%2B5LEoxJhEKkIbkqTRFJ6bW864mexGyLxCnmkWcyxc1tPCLyxDP1Pon6HjwoXWXgnYQg6NN9KL9C997GZuP67oUVqo1901lO3W2ofCUnVK3g3Cw4ocZDSveUl3P6FqXI3ZOGBrufr7YLQ0T4w%2BomU0iwT55TlOKMPypBBxqdOJW1xJObAOAKqAbz%2FMPqbOpYHADnr6bx3G4Vj3Kq%2BW4lheXsQiSvDlBDko25xMnxXRQpKbal3uXX2qlZ27iIM9Ewe9EHYKn2LWGdrTiUC3%2BKUmeEDNJnN0AeVuBt8RjXQwGSH9ktjyVHPSMpbs1hg4xCBfQG9HcPptzQeMxoYwnBVWc03xx3E3IV3ZCffoSYJphoH7DxAo5ZR%2BQmmK2lPYsz9YrXiKMJrB6c0GOqUBIFLRUjFScGHYLOeAzA%2FzVdkzCJ%2FXLmEBniaacMcc8irjuh2jd9aaCgjygKk5T2r%2Bwxwv6QiA7KHhbxB%2FCggZz%2B%2FGboM%2BKCqFXIWzW66X6VKOgAScI4OuGfkGL%2BaqSTtYpKOTOG%2B%2Bi%2FnFupD3Fy9ijp6CpCsyK8A9C786NpAEEKp0aYcwZw0a8YEaD8gdYC0h11OXyIqSLFvmJqi5VBoqD8uIpSbk&X-Amz-Signature=a4b2ebc59fbab7cb5ca907a06e7fbc643eba6fba25176a2023b1172fafe25906&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJRMP6ZA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCuuux9gOhWx6OMrhCVbdJ9vKSdyu6C5VK0tKIRUBzIgwIgPyWFDHoMbpG14lC2%2BCOEmJat23YTyATk6WDaYZJRcMEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDCDmlbM%2FQCIv6%2FCQDCrcAw24A3h9oAVPCeQ1c8D49vHHTeVcA14P9B61daBeNkNyUHToVhcFaDj%2F1cqHCHHSc2XpKhhlFBd27xtPknJi%2FRtLlNcCHtModkmE8Rc7scBlQ5D%2F6J%2FEoyL6FaEPBwUurP1Jt4IZWZm2MTuEoULoK64I0ysI%2F8npNLkaeZYN0RYM3VhIOjqRMo0%2Fx4qKvCA1BVelKdsx8CrhCSn3avMWlxYh9LhpIB0zaBSa6CMdcm7C59E4F9B9%2FmU%2B5LEoxJhEKkIbkqTRFJ6bW864mexGyLxCnmkWcyxc1tPCLyxDP1Pon6HjwoXWXgnYQg6NN9KL9C997GZuP67oUVqo1901lO3W2ofCUnVK3g3Cw4ocZDSveUl3P6FqXI3ZOGBrufr7YLQ0T4w%2BomU0iwT55TlOKMPypBBxqdOJW1xJObAOAKqAbz%2FMPqbOpYHADnr6bx3G4Vj3Kq%2BW4lheXsQiSvDlBDko25xMnxXRQpKbal3uXX2qlZ27iIM9Ewe9EHYKn2LWGdrTiUC3%2BKUmeEDNJnN0AeVuBt8RjXQwGSH9ktjyVHPSMpbs1hg4xCBfQG9HcPptzQeMxoYwnBVWc03xx3E3IV3ZCffoSYJphoH7DxAo5ZR%2BQmmK2lPYsz9YrXiKMJrB6c0GOqUBIFLRUjFScGHYLOeAzA%2FzVdkzCJ%2FXLmEBniaacMcc8irjuh2jd9aaCgjygKk5T2r%2Bwxwv6QiA7KHhbxB%2FCggZz%2B%2FGboM%2BKCqFXIWzW66X6VKOgAScI4OuGfkGL%2BaqSTtYpKOTOG%2B%2Bi%2FnFupD3Fy9ijp6CpCsyK8A9C786NpAEEKp0aYcwZw0a8YEaD8gdYC0h11OXyIqSLFvmJqi5VBoqD8uIpSbk&X-Amz-Signature=150983a6ff8d363b21d78b6423a8b6d10db178975b2a363903db0b96970eafe3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THQX72BY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIHJyuXtzcXUHWobQnR9Ckdjvg6G%2B84%2FVNas9iz9cnfMwAiEA6VppESmzJRqLjOkaIEfgoRc%2FLTLaWU7lJpNrwfLfyZkq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDEHxQ5Mw1MgSL5uubCrcA6DB%2BBAIb9UJeTnJE%2F5O7881L6LmDiryKtEyIekPVqrR1hoksNXZ1FpD9Ul3qDL2S0jyHpXuRrfpxliA7DIyN2pYVvYcktPjiNROJmlzc4x5fIasmIMxFABmtNaL23LAfKtnlXa61UHqtfeKl7KoCJW3JAj74TbtqSRuGiGARRruQbBJ7E43RkL0%2F5s9E%2F3GpGIlB6V3xnKBJlb54metRhe6aJmIv0CExEjtEglORl0hVT9fMwYu75T%2BmhGIHPiEcMRUjIwwh67nkPdRAJAX42f1txVziVtL%2Fnd%2FYQmV3S7Nj0c7f%2B4LUWkgEEqFefrSC4pLESJPE9jf4g7HaMunTNVEYNuiWJfEoTKHmsi3bjQjwYVxekjfCL5JXjGn%2BMtdeAvFECsGkBoLWfv8FtIR5biXzvVoGyJ3GZbg21UB3HVLqFznbtkiAE%2BqYTtKWwXNMFHJS%2Fe0gpN8InV7bHKbb4myxtLD66y1%2Ft58hn0Lt5nce0Fa%2F6%2FLLRtFl5AmEe6UjJ4NlSyDXfwzoiir%2BH%2Fpw7oEmtFHMVVot9BJ6pDD2LAkoqyI%2BevepAgk6ZSDzUMpOeBWOzcJm4D0xQ7IvoxrcmpzupATbI5GFHRPpy4KlsfXsahC3y%2F1ewxdavXIMKTB6c0GOqUB%2FCCowKoJuS8%2BLffax2v8Btl1Uf0%2F2ORrcrqJPSmjvHqKzhgXNL2TZ0jyTQqM0ioPqpDX4onzjv%2FTIVrPe8TX06MDP3gDZqVdFhBxBpD8IvxnJ1l2Fn4oZ9iNN0wY7ammRT47Ba%2BN06Eepwealoh%2FtLyXCjlQe9Qt2jwmS9JBvXIHurb6JfYegnFYGvSh9GaHzGTLIs5LHOxO%2F5ZxClbFNu%2FJhqIk&X-Amz-Signature=1f44a5f85502aa47b0b844e2331cb4fe5220cde6a566e6e86340ac47af585d4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKIQSHFL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQC1hm9ZMDv36Bk1tuVbSoW8aU2a%2FankrS7XiWjAQXId1gIhANGqoqXdzUwvSBEZH8bL3nPGf%2Bi7M1VFzvyvf4qh8EUCKv8DCAEQABoMNjM3NDIzMTgzODA1IgwFkXGz%2BwxYywhk7xoq3ANKQjiuTxoVay3pl%2BmCGSozld84Lw6C5ILHcedCWL6pwHWXmXaPnlZMHUB650FFJ6xXSOVdy%2FL1%2F3LPS76txnvc5utn2mtVoeVOAFGY0y8yFrYc1vmHRqGNQieajLPnm%2FpO8%2BY9Q9YiKunSPwL92K4jAe3W8Ssym18JpBpU0JB%2BX45UwRtaak80lHT13FtBJVSyj2ExV3616PYCJsITY7XJC110t39N1EjHRXYhupduG2hSQlWJ7CGYhwnC%2BnDDpIEGkR%2BsEhb42jrhEE1U%2B3UP1dTpJCJ4ylpYjRlwLdY9qrigfc4X%2BKljUPvht%2FAnl3j9i4UNfUCzEVCgCJMJ9qA%2Fy3QJ5h7QNZ%2F24sAU%2FTFOBtgPF6h20277S1Cjc%2F67Lu03mc4lC3xLHmVdtfIL13WJo8aD%2FTWvQLvxu3Y8JOQOTSveVso4vhi95323GtHQnGVAwZPFuy3fRg3pCdVHGXFTC3f7qW%2FYeRrkjd4xYqXeZ10Of8yLxrILVs1qUhEFG9Lh2GM4PQg4%2BzwsZ8JG0F3ys%2BsSZ4fee9PEQketKe7NjWic6G4hX0XMajFMZkIOltBYy29VqkuKdibDbOd4qO%2FiiLMmQjIPTm4cfuzhZ7u47jnIhXYkdIMXDlrZljDRwenNBjqkAYkbXEfBauKPxvby2CrA53CLosXRW6kHLOKdSoExd2IuwZPsDPUAoHCF4N0P72WTbz%2FSWaD15PCuV5WbKcv1L9mCDgmV3CxKvojRsEgAAAUfHwfLvIVI2%2BbtpXBPE8CQEi98vqapEhxd4nHX4x7PA%2FNjxVuTGZCPC9FxRGm1U1LRhFur681tbcOLczNCJo97LNE9tOtPbmYSyNg43xLjlZHstITP&X-Amz-Signature=294771d9dc8074dd3d90aef88a746bed5e2b5a3b46f7592b02d7a0a6f9eb8427&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCWKVNQR%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCFcRrzK0tTJ19bu2BxE7W1sjmb5lZuSbgXXgEPL81MZQIhANQyr%2Fb8ukcp5QFJgUycNvWaCr1NupURpjDV6kO9meZoKv8DCAEQABoMNjM3NDIzMTgzODA1Igz1r6PvvI9zwuWmbYQq3ANZQN7y3b%2B5QQoIIhqiJwVC%2B29wb7a%2F6kfRWc3ilSsAPQUHen31h1Bk2DUvnAAGU2deM0ILNkDXKncPMeUoQHhDBiWJ02sl57f1i3YS3TMw9lkT%2FyvLh08xYyOhS123Og2l8ud6BNALFGVBRKpx1nNU9n%2BSz6Pbcwp%2FBxwChxe4S73qEn16c5foGy0A53OkDmF5xrVDRCTRb18olK7cfMudu65nsgxlbbRp6F9%2BRL%2BvgoJNp9NxgntYXk2LDu7loNKt82TyzUz2TmoBpT2UxzhEd5axgFb6FwQC1VZAZZoAq0SES16C5djOUpXroumvWxKUExOH2wF7HF2cKDXkpmViiRIr2gtAKtqQa1tfX6puRHyXSZxPqpEnEZWZldIawpORGheNni520oA8AzAXLT3kvDSFybdVqh%2Bn8%2BEOcnV7G%2BPCrd5D7QlnT6ZS073jAl77u3yYoXCq5jG7gxCzpn5t8%2BFXI9alfMM5PQozUC9OJ%2BM6XMsXrIY5XjAoxAaCDetQqks0VirVlZacmxymju2HmZEZPi4jwagW%2BBUE%2FURkKcIKKoArV4Vi9Lhu%2FD%2BRv7PZiI8NVO1hxF1eiN1f8Jzy3slt8XPphLoFOXwz02ypDs6uvZJHPhJRmEHOCjCHwenNBjqkAfWKDr2G8sP0bWhJeS952zBPJKSUvlbUVRfltRfCnQZaGIuJyiBJG3UWRuGITOvgG6LDljQwLGM7KWsrhamHFrhWvjCS7%2B44jqP%2BXc8p2cbtzBSTwQj36teLX9faxY2Jgy7JpvyAl9CEJvd1YoQn%2FSTtaKGMjMyxGSgOgzTQgKY8GSV5khyG07mE09aCnVNzsG1SFUJyfrT97SROhdQ3zRVeZkr9&X-Amz-Signature=4072f3ab254539680bc0aff2cd7cf1e0a6ca8f79bfe5a98863dfd423b0304126&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQNWBLPE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCkub06LiGP0HM6EgyjsTC1r%2F0%2FIQnqeCx7vn3gjMyZ5gIhAMKI1M0If6Bf70XWeMv7a3mAwDUzG74r57YXackxOlEGKv8DCAEQABoMNjM3NDIzMTgzODA1IgxoL%2BoWU3QlOyLYtTQq3AOAJOKU6vH8OYjXCiANAykRMJQK%2BIss6z92nYI9h99Q6jlAQCoK0tjg3m64ZIIOJ27MnzJW2GUbN3x9u1UZa2BQkEapmN4rUvTN0pR7ga4kEKqh3cXqfy%2F86FmiAbev8OwxX24P%2B4wOZgcoB9t%2FWS8kQVamcoegIheo%2BNeDLFD9uLn4m2V%2Fn7IntS53ZwfJmDE9%2F%2BwJOvlbRErKtrWNXgN865zSihfvRswQv4Fm8GtDADVaKs8%2BowhHTu8z3xY8PfiAbUH9eQFZMs%2F%2FC9U1jR0JTCmP5kiuAxdCVxrLH8lxQBOEeduz7wYOf6dvNflCkku8CwxIFMOtTj8I64alWs4xc3hpNh4y6ml8r25ObI3K112zITeN7h9xtGWPf8%2BjMOaxkiae%2BMCcvqnx%2Fko%2BBqTm%2BNkzAPc6Y99dqPpfEE76uIMRXQqBg0wICSH1zfFvf5ZrrhRSXXawwCuDu63v0NW0lLYlleZ%2BqhimlpUVNv2%2Bd47vplddTR%2BZgtYZU%2FIpFhOB6BXCnf6oo9poIxc8INvke7vBbhyt8Hbdj66nQ8HK9vMB1c5VTZEJMM%2F35g22F%2FdSxyti56mwsYbrzCVHw8i3bZo6lKbiA%2BPz%2BVmmLzKKmjwKe3ucJekKcT5CjjDUwOnNBjqkATLEfIs2ed0%2Ff1%2BwBfvKVsJFtpBLjm67LqKEPBUvLqGZm%2BqxHqSBi8qKUKLjeRrWUInwJC%2Bl1%2BbvS2uAR9bP8IPuPCXkIr3c%2Bh%2B9iIhiI9UDv7OWW8CMvFt8gxqTazGzhljXtUMTHQiS7nkari13ML8uEWu41qs2388s%2BXuV%2F%2FzN4zC%2BOMfzX9BI6If%2BEHaDHdz94ruLYEbtx0bu9QsH66ZQoD5R&X-Amz-Signature=855a0fc68b35747719eccc8b82c7213157ba1c4da26a2ec04f36e35841117a40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQNWBLPE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCkub06LiGP0HM6EgyjsTC1r%2F0%2FIQnqeCx7vn3gjMyZ5gIhAMKI1M0If6Bf70XWeMv7a3mAwDUzG74r57YXackxOlEGKv8DCAEQABoMNjM3NDIzMTgzODA1IgxoL%2BoWU3QlOyLYtTQq3AOAJOKU6vH8OYjXCiANAykRMJQK%2BIss6z92nYI9h99Q6jlAQCoK0tjg3m64ZIIOJ27MnzJW2GUbN3x9u1UZa2BQkEapmN4rUvTN0pR7ga4kEKqh3cXqfy%2F86FmiAbev8OwxX24P%2B4wOZgcoB9t%2FWS8kQVamcoegIheo%2BNeDLFD9uLn4m2V%2Fn7IntS53ZwfJmDE9%2F%2BwJOvlbRErKtrWNXgN865zSihfvRswQv4Fm8GtDADVaKs8%2BowhHTu8z3xY8PfiAbUH9eQFZMs%2F%2FC9U1jR0JTCmP5kiuAxdCVxrLH8lxQBOEeduz7wYOf6dvNflCkku8CwxIFMOtTj8I64alWs4xc3hpNh4y6ml8r25ObI3K112zITeN7h9xtGWPf8%2BjMOaxkiae%2BMCcvqnx%2Fko%2BBqTm%2BNkzAPc6Y99dqPpfEE76uIMRXQqBg0wICSH1zfFvf5ZrrhRSXXawwCuDu63v0NW0lLYlleZ%2BqhimlpUVNv2%2Bd47vplddTR%2BZgtYZU%2FIpFhOB6BXCnf6oo9poIxc8INvke7vBbhyt8Hbdj66nQ8HK9vMB1c5VTZEJMM%2F35g22F%2FdSxyti56mwsYbrzCVHw8i3bZo6lKbiA%2BPz%2BVmmLzKKmjwKe3ucJekKcT5CjjDUwOnNBjqkATLEfIs2ed0%2Ff1%2BwBfvKVsJFtpBLjm67LqKEPBUvLqGZm%2BqxHqSBi8qKUKLjeRrWUInwJC%2Bl1%2BbvS2uAR9bP8IPuPCXkIr3c%2Bh%2B9iIhiI9UDv7OWW8CMvFt8gxqTazGzhljXtUMTHQiS7nkari13ML8uEWu41qs2388s%2BXuV%2F%2FzN4zC%2BOMfzX9BI6If%2BEHaDHdz94ruLYEbtx0bu9QsH66ZQoD5R&X-Amz-Signature=f82a53f84ce985e3ca42307863dcd7fe8b395eb5fbc279c9509191a241569e45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YODQVQAJ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIA7CheEM30U2%2BoA%2F3HK29F8bTNzMM28%2F0W0QEBKaAvI6AiEAk9HMDQDahsGO8vzFfbnzGWKyRarPUiSCVZu%2BMoLsTj8q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDJjWoyBHpa608P6PlCrcA5QVOEzN34JMHo01etx8HjExOcFJ1raKmg0Z21DiPvhJCouDcjbpRR%2Fod6lBxamQTu05U0t7HjwmFTmo7z%2F%2FfAu02Z9gtkaOO473usdaJjzIld4cRlBBSAYJfK29L7vXyQK4n9Sj4GIycguq4qvhInSU0nhgDjvTiiE6FC43ci98cEGuM9plPVi%2Fcha3Lzjs3q%2FoWOCnsULNZnFma2sq6zj9htzVMp%2F%2Bul73B8GlVO4%2FlwrwkBhFn63uFhaBFRqsc2DeVuH9UC%2B01GNQeLJfyaawgsBimDqrCJSEohi4p%2BksM7QpOpC3esyKtGUuA4Wr8PRIjR59uqugF8%2FGLMJIEAMj5lJv3pzP%2B0j%2B6sR603DwAUP5LSElclcd0avghjCW2ICM6WR9k3C2EBgDwuKe3E0XCk8kMZ0xNZfGEHAMVv5lLSXf66oRVAZw4ok2IqYKihrYE6X4YOjKS2vu0mWga1jRrLZzb3M5hN1GTggjZ00Ku15tAu6OXEP76vOsWVGxQmRiB50N1PVMOdC%2BruiYoMXsg%2FmE8ia9i4SGaJVoBTgx7H807YZsgU0kUIF3%2FxXJD3%2BtIewv1MSCo%2FnqPvBDbFsbsA96seIsc%2Bmk7wS2VD6KiFDmNyjch23ZX0ZLMO3A6c0GOqUBfhGnGYrMVgspjezUZb1KFdooHOhXy3C7iQP90SoEy5KFnN4aHEuuBez2fD%2BcEcAzNMeIQ0bLVGrT%2Ffx0kB0vncbZ3cxDyZ1%2B5sQq3aJlIivF3zm%2B3Bq4aU4Svon9qWonG3C%2FadjrKrH%2F%2Fxs2M4RsWItwHM%2FRoeITwHdPoUMplohftvzNCBXE3v5u0lA%2FHkjdMu%2Fd4diyruSSEV3YGnWKQSo1L%2F3Q&X-Amz-Signature=cfc496582a5360b9e3e8df08a27dec2df79dcd5d7d573fbf4225aa5d9a6e56bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665457TSXT%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDlxXGMXiXAzAeYHSFuJv8qilOU987qfJiZ3jnub79UZgIgP4QJXh%2FXGtuYlF3HkYRflfM65z1%2BsgfiihhqvTgXGskq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDO%2FE%2BxQerGA8sJ0W6yrcA0H6BlbzpEVklr5rNiPNn6%2FQpA9ItCZn9DO5G%2B690267O8pfyY0OXQOlUosV8FQzoKy3P4FGI%2Fw%2BA%2FPRWa1iOxWqO7XEfTZFOSvKHp4bLlSqBl9DWffpphqCiYjVcfCWJNS8ChQsiA5YTGHx4QkKTerwPdfrTtt%2FMFE4VcutnppaHditeuY0xQt9pq8Cd47%2BmGc6m%2F%2Fvbn8H0EyL9NFU5C2hmnQZ1xmQjltoQIPqyu4eI9kRElIPBz3UINEXQAlDVw2shxYLFNT5uDiaacJzyrbsW9WuiGBjMqvYjG3WXKDHNf0F22epOWdcVizybqtvSM9Phf%2FMEnlJsKjcSkVIuYF%2BU1vf%2FCpHIm6WMuJ3JoE02%2BKVJOfMQCLah1e9weiHyzxqub0Bonyi7EhQfQJBbUjqWLd4Uw3PBxW%2FcdhmUKc2PHPISlFyH7%2BouvBz3a9boQzwcewYPHu6LwpcmsoUiaTsDFkjRl7CCa44pr8o4TRPujztTnEpMnoS%2FrbawGcZa0hqfB5Z57YJD%2By3mqM1ZvDcSfHEWkp%2FC5dZFJgPc2qAQjcAxLo%2BZvrBv%2B0r5SKM3FBVwWtGn7MKCaHeAMAOFr3UNU27Dyzy84aJG0W2kS8%2FU1R17SxJrVl8lmW0MMTC6c0GOqUB4Syiop4DFp7qTT0xTDHUbp13mJJ4O%2BlbevWCBApPZBq5zUDwnchlyFEAyUafyzMTJm9h%2B%2BzPEitG5DU2PkMpo4kTDDXzeoD4NX6mxQ%2Fj%2FkgiVDqFSAmdaCV%2F0t404MVD7WxErApRJDmVB%2FM%2FAKl0uswh3MNELJ7fvJ97gzedPAm3nmAKjF05a8zhhqc78R4j9X917S%2Bk1dTNFoQrHxnlXTdN0iFb&X-Amz-Signature=13a0df7aee280025c1217a5287f6af3ea2c35f131f2f19df5d65c24a092d8196&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665457TSXT%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDlxXGMXiXAzAeYHSFuJv8qilOU987qfJiZ3jnub79UZgIgP4QJXh%2FXGtuYlF3HkYRflfM65z1%2BsgfiihhqvTgXGskq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDO%2FE%2BxQerGA8sJ0W6yrcA0H6BlbzpEVklr5rNiPNn6%2FQpA9ItCZn9DO5G%2B690267O8pfyY0OXQOlUosV8FQzoKy3P4FGI%2Fw%2BA%2FPRWa1iOxWqO7XEfTZFOSvKHp4bLlSqBl9DWffpphqCiYjVcfCWJNS8ChQsiA5YTGHx4QkKTerwPdfrTtt%2FMFE4VcutnppaHditeuY0xQt9pq8Cd47%2BmGc6m%2F%2Fvbn8H0EyL9NFU5C2hmnQZ1xmQjltoQIPqyu4eI9kRElIPBz3UINEXQAlDVw2shxYLFNT5uDiaacJzyrbsW9WuiGBjMqvYjG3WXKDHNf0F22epOWdcVizybqtvSM9Phf%2FMEnlJsKjcSkVIuYF%2BU1vf%2FCpHIm6WMuJ3JoE02%2BKVJOfMQCLah1e9weiHyzxqub0Bonyi7EhQfQJBbUjqWLd4Uw3PBxW%2FcdhmUKc2PHPISlFyH7%2BouvBz3a9boQzwcewYPHu6LwpcmsoUiaTsDFkjRl7CCa44pr8o4TRPujztTnEpMnoS%2FrbawGcZa0hqfB5Z57YJD%2By3mqM1ZvDcSfHEWkp%2FC5dZFJgPc2qAQjcAxLo%2BZvrBv%2B0r5SKM3FBVwWtGn7MKCaHeAMAOFr3UNU27Dyzy84aJG0W2kS8%2FU1R17SxJrVl8lmW0MMTC6c0GOqUB4Syiop4DFp7qTT0xTDHUbp13mJJ4O%2BlbevWCBApPZBq5zUDwnchlyFEAyUafyzMTJm9h%2B%2BzPEitG5DU2PkMpo4kTDDXzeoD4NX6mxQ%2Fj%2FkgiVDqFSAmdaCV%2F0t404MVD7WxErApRJDmVB%2FM%2FAKl0uswh3MNELJ7fvJ97gzedPAm3nmAKjF05a8zhhqc78R4j9X917S%2Bk1dTNFoQrHxnlXTdN0iFb&X-Amz-Signature=13a0df7aee280025c1217a5287f6af3ea2c35f131f2f19df5d65c24a092d8196&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HEP4KIS%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T093914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIBqXwbJ54ueQ%2F4REih04Ub6hqUDRTbBTCEc2kAVPlrXVAiEA3hL2tKPh8BNjUmLohUzUOPtVudTU18Yg%2F3N8%2FCBkB%2F8q%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDMirNWGIwJzFRFA7XCrcA4SHdKuottwTtSbq31rnqvKtQu3PXUGVNNBNlj5zp8IoTWB5ZvsEa3KLGX5KJjWakjNcggZ9OPL%2FTKaWGIzoM0HEJIJ7nCRFkF6Pbe%2FraK6aaLKWK58vhjXPNrcWgsCd1Nh8%2Fp8rgWgE8SdMsLgM%2B3nJ15lWtiw9PMkIyz%2FQoCdbrfm2vO8LbpOhd9gGP2NW04p%2BJYTVNTT7cTuV2yotidD5Tk9DW14gZRCPmc6pze82My%2BWus2JIzq2N71utiLC0N7PjLJOd4jI0WwM2ujTCNj1eh3n99BojEki20jo8rBOKBaOJxBtUCX4UsTeIIjWNdu5nWmx7aQH6x2adww95kn3zBd5Q%2FztsjcZkKVcdhQUw923vpC2KGxttSHhqrsVMqZ9zfx%2FfA6eGCh3%2BKJJN88KwdvyQcCZivu93tBLNXHmworPPCMVLs1%2BVZofCEklFh9DARyy78EWdilmaU4oc3ozETABjCEl2a6RYK9kKhSpFDvwmMP1%2FeRUU6En6FRo84AwwD%2FIV9o6GNOVz2aOAybcQQc17I05m9rHaMws5C0v2zlgz2zguHhSvAkb%2B4bK89S3IVUAf2jOgLd%2BAv2njZcUs9g%2FiI%2FdYq%2B8M764%2FXiBsg2%2Fs6FXlvrLLBoxMITC6c0GOqUB4FkIdOYXjobwzwn3UkpEHNp8lYyp0ApQTnItTeAXtCbPfQLn5QqVzO3LXgHa%2F7oU5BHBG7g1wUNm8jRr4%2FXRXdT27Xmnhz3At7db4Bw8THEdAdjpbnjZZ0eNRbGJedMYnMtwtGaU7SQennFEgM7k1SC1CyiYl80GiJoIthCPKH2rtJbeQBjswNliGBkuyluC%2Fb8ObPDLH%2F7ZVrr5Xxee7bhX4SHY&X-Amz-Signature=583371cb1eceebe23789a7df95f80e1ebbb2acb2e2e0532db21b1917e1514869&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

