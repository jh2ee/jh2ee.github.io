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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7TZ2U3M%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCH1T8IA%2BhVpnDG0gOIZQQzpE%2BR8LD%2FmZOqCu7WcV17OQCIQCNi8M0NjoO%2BPwOJ1Inp%2BkegNW9JwZ%2BtZdx4sxYCsLbSyqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMupVYh6336%2BW6RdBhKtwDV1xE4xTbhGBL%2FAQEMzc8dTwHIJ09oGozBMo%2Fivz0X48o9LL9sexNMTmFvz52bfCSQq4rAtgg%2BJH9gHx4cb3xh9wE3e%2B2%2BliUTeZ9p0erG5YnVFsTFHjB0foTpsruT%2FjSiWR2m3VcY6pZ77v5p%2BbkcGcvnzoh9Z8h8lqd9SupeM%2B3NEYSwbyeIoaHRQOM5vJu6pX0PngG9aBvaD9tweH6nqgSR9jumYKemv7xt5wJLlS%2BHIZwnfqfU%2FhnbW99wdg5FPzo%2Fq%2BcOVrGv3cxfJgv1meQUB%2B%2F8Kgm%2Fb%2BAqjmDZOYd32CRdyFZtoaqR5M0DoUj8HDwMPe%2FNdGlN3uVppOln84x9Xu5yv%2BAgF56%2BHS04uo5GMTiBJ5rKOuaM0x%2BVlwXFjGfi1wzBPRmsKhb8gy5Pec6nrZeMMlfKgDF7tycuIYRwKvrk1%2F2GY%2FrMgnNCmJDtjL74YJMWXd7rp2m1Ge5XkRFLSB%2B58Fmv4njZQ1hfc88wqgAMgkopV%2FApkxs36K%2Biy%2Ff8Jv%2BXIqeR7veKnW92okY9YGF74F%2F3n8KRu72kNpt80kYcsfBMo4b%2FhFlMnrS5PgMzjcnHunCnDXvBhRpnvmOf1BMPkqs0maijWyOz7nhEqlWPiDrs%2BVdSikwyJ3lzAY6pgGkgYIm8UovxL4E2ohSORz4iiILRM5N%2BxhaEcy%2FPa3sYGvhGczBQSp4dGFAaF28dcq4SfVVLZIy7W5l0uLNoSNYThBGOslQC2G1MZ3WOv6skXf9QK0twF%2FSO0YEqbq2bhPZG3vhg3ybi1ssLrrCv0gvagmEnspeC7pSX0K24owKjjh2AS5dfLhW4uSdGvas61hHwrCk5SoUjnrKbEA5%2FOvK1TnRH1U%2F&X-Amz-Signature=23650c0537f31445eaa7fe49d75955fe59993746d03defbc5a991294f8cabdc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7TZ2U3M%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCH1T8IA%2BhVpnDG0gOIZQQzpE%2BR8LD%2FmZOqCu7WcV17OQCIQCNi8M0NjoO%2BPwOJ1Inp%2BkegNW9JwZ%2BtZdx4sxYCsLbSyqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMupVYh6336%2BW6RdBhKtwDV1xE4xTbhGBL%2FAQEMzc8dTwHIJ09oGozBMo%2Fivz0X48o9LL9sexNMTmFvz52bfCSQq4rAtgg%2BJH9gHx4cb3xh9wE3e%2B2%2BliUTeZ9p0erG5YnVFsTFHjB0foTpsruT%2FjSiWR2m3VcY6pZ77v5p%2BbkcGcvnzoh9Z8h8lqd9SupeM%2B3NEYSwbyeIoaHRQOM5vJu6pX0PngG9aBvaD9tweH6nqgSR9jumYKemv7xt5wJLlS%2BHIZwnfqfU%2FhnbW99wdg5FPzo%2Fq%2BcOVrGv3cxfJgv1meQUB%2B%2F8Kgm%2Fb%2BAqjmDZOYd32CRdyFZtoaqR5M0DoUj8HDwMPe%2FNdGlN3uVppOln84x9Xu5yv%2BAgF56%2BHS04uo5GMTiBJ5rKOuaM0x%2BVlwXFjGfi1wzBPRmsKhb8gy5Pec6nrZeMMlfKgDF7tycuIYRwKvrk1%2F2GY%2FrMgnNCmJDtjL74YJMWXd7rp2m1Ge5XkRFLSB%2B58Fmv4njZQ1hfc88wqgAMgkopV%2FApkxs36K%2Biy%2Ff8Jv%2BXIqeR7veKnW92okY9YGF74F%2F3n8KRu72kNpt80kYcsfBMo4b%2FhFlMnrS5PgMzjcnHunCnDXvBhRpnvmOf1BMPkqs0maijWyOz7nhEqlWPiDrs%2BVdSikwyJ3lzAY6pgGkgYIm8UovxL4E2ohSORz4iiILRM5N%2BxhaEcy%2FPa3sYGvhGczBQSp4dGFAaF28dcq4SfVVLZIy7W5l0uLNoSNYThBGOslQC2G1MZ3WOv6skXf9QK0twF%2FSO0YEqbq2bhPZG3vhg3ybi1ssLrrCv0gvagmEnspeC7pSX0K24owKjjh2AS5dfLhW4uSdGvas61hHwrCk5SoUjnrKbEA5%2FOvK1TnRH1U%2F&X-Amz-Signature=23650c0537f31445eaa7fe49d75955fe59993746d03defbc5a991294f8cabdc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG7O5R6L%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICU1HYW%2FE7b7Yi1YvaPxAAMDVZwWxQZXPowODKpLVo0%2FAiAyMXm%2BJrisgBv5Qe5iCOjg4Cz7CrvpMZmHYW8jhbHbwiqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMs8K2WW7XWS3xixoNKtwDAdPynJuF%2BoZYkJyrG7gP6UU80tCZbQWkPYA1XsNKn1TapGzIPT6wOVDHDATTIFpUvVZ%2F6bCpJwZmFyMEYB9BCPUNKRgiQGpaVlxRBqWMnGDm2dqTZi8M3laWgTxkA8NpsRLzCgqn2MYQoE%2FqpCq%2BcYS5VpEqF1Fz%2FcrHTZOHpaIaN7UpDZahh%2BARfeuYKNqa6tDRqghoNefFAq0WXvyGVdOv3%2BE8m%2BIwOloainCo6BHBS9%2BYPg%2BFhmUicJWdVLOGXmSzPTq%2BlOF8R959W0z%2FKVqmaMKE2J%2FkKw1XXUHLE0mvASNfnlu8otWC0DaQ0huZkMtJZ8Oj%2BhRDOgAOEvkCbdndfJV4RvJnxUx35SIdPLOLFAtWva4NUiR4yxybT3mA7YUGHREXxcDhyP3n6eJaJ54u0Et83h26yAQvkTmckpOFvx%2Bp16IlqesnvV23AV%2FdFU5ZxJdvxsdCkhvpanzInuvMDPNY5iSnYWuNCgu6NwfzGkznbnTQD3dvrXaWJ69uEo82Ro6iy1UnLuBxq%2FKh0B9eD%2Bx66VU9QVeCDxP6jCaOavEE7HC1MvrqmWdItI9KLzFdmvG4bJ44nP%2FXaAXxI%2BSgseIrW3Rpda6dvlK%2BEzseaYYtgTFoh3YviKUw0pzlzAY6pgEFIfrS4aqpJ1hSsSdkl6iI55t8depaCVZqdzRu1T484D4eIUGXzuA8%2Fr6zcah48%2FNyV2hqN4zIEc9VdInjJIgluuhj8BJpS6CmTCYhg1qlgcD0y06mj8OQt3MnW8dTbodJqwYX680fqwAARcpwl5WhJRmFS1IuWa0pKoBI%2BXkECNO776sTHsVAiBCF%2F3yOCnGA1Oe3GSnsKYNuDUoNmEqD3DhCifq%2F&X-Amz-Signature=98417cf5d4116bfe8c8889a6ed04bb56a603da1685303bbf057a4d750e0cf7f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SOXIUN2%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxKeio%2FcbEEiEIjMZxznT5S0%2FrRGlK55zHR5uoZ82kcAiB0q5uDhmwhoYAU7ljd92w04NXuALkn34omzf7ljKRoiSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyFMS752F%2F5cX8%2FK%2FKtwDlaf30sYlgP4aRjwoxq%2F8LOzb6AgNy%2FHu6ZhY%2FnLqT%2BqvSvPS7YR%2BXHVGAiEn05qhJKJQwgJDLEComgnEXU37zBIncT1vIQ1iZTM5aRREV3Lo%2FPeJtOwASgN%2Biv87IGWlSKv4Es%2F3aAJS7Owz7TB0mintHxc9rlKLnreTsmA%2BcFPNggvrzCccA7QfGLRkW3H8nJxcWngMxB7l%2BHuB1m9dR6ytSNiFDvGPXX%2BOE0Br0BYkoX2DdCXoyJUaX1%2B4u%2ByMGkBP%2Fiy02k4eloIlADtkxLWXxcFDm9w9XGhzc8wFcnsSZBjpvKHrq02Wc0dn9RIa9SVqSLOxYgEakMLcy3ye5uZfqfaiNAhzUM76sV3z7AMOvw5cS%2BPcmP6EPGN75gpNoFcdS%2BzoXmGamwEzTAVc16FThTTFib8GA%2BeJ9N5qR322puWesPmX9jxYFU71cr4VkKY7OkcogvH5LPyU5dJg4iRmDOdz%2BPVX%2B3gZatQj8WIfeaw99nAQmX2cuBhlrmOawaA059gZbGoka1%2B6oI3c4TBjjVgVbm9Rb1aaZrz6Qs736AR%2FcFqd5AOwPU%2FdYntzEfrIM1y%2BzpJ9wgvCjKI9XkWkrIvz0MOBJakTFcUmuhIoPz5aBTCoH8AIg3Iw5pzlzAY6pgFzuPuiCyStOses4SDpkz5T6PY8Bb4dYaGj%2FrzJ6ZtoVV7ehI9uCA8l3s4ROfNk0sFWZTNztDuMj9p9cUYhRMq4aC4BUKQ3eX9S1XEBR0r29DXhKcq8ram82SZTrq%2FZNN8jgDCd6QTyI8HYoyHFd%2FB9l%2Be%2BF2Y1QSkzY7UfT9CEQHdcDKIwz%2FEtgMZ8pZtckG0OJAORH1roOdxPyh1t9B%2FAV6VQf4qh&X-Amz-Signature=50948ac533275d44be686e87eb173c4996686f37d4c53cc79c8f1272ec1d2a34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SOXIUN2%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxKeio%2FcbEEiEIjMZxznT5S0%2FrRGlK55zHR5uoZ82kcAiB0q5uDhmwhoYAU7ljd92w04NXuALkn34omzf7ljKRoiSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyFMS752F%2F5cX8%2FK%2FKtwDlaf30sYlgP4aRjwoxq%2F8LOzb6AgNy%2FHu6ZhY%2FnLqT%2BqvSvPS7YR%2BXHVGAiEn05qhJKJQwgJDLEComgnEXU37zBIncT1vIQ1iZTM5aRREV3Lo%2FPeJtOwASgN%2Biv87IGWlSKv4Es%2F3aAJS7Owz7TB0mintHxc9rlKLnreTsmA%2BcFPNggvrzCccA7QfGLRkW3H8nJxcWngMxB7l%2BHuB1m9dR6ytSNiFDvGPXX%2BOE0Br0BYkoX2DdCXoyJUaX1%2B4u%2ByMGkBP%2Fiy02k4eloIlADtkxLWXxcFDm9w9XGhzc8wFcnsSZBjpvKHrq02Wc0dn9RIa9SVqSLOxYgEakMLcy3ye5uZfqfaiNAhzUM76sV3z7AMOvw5cS%2BPcmP6EPGN75gpNoFcdS%2BzoXmGamwEzTAVc16FThTTFib8GA%2BeJ9N5qR322puWesPmX9jxYFU71cr4VkKY7OkcogvH5LPyU5dJg4iRmDOdz%2BPVX%2B3gZatQj8WIfeaw99nAQmX2cuBhlrmOawaA059gZbGoka1%2B6oI3c4TBjjVgVbm9Rb1aaZrz6Qs736AR%2FcFqd5AOwPU%2FdYntzEfrIM1y%2BzpJ9wgvCjKI9XkWkrIvz0MOBJakTFcUmuhIoPz5aBTCoH8AIg3Iw5pzlzAY6pgFzuPuiCyStOses4SDpkz5T6PY8Bb4dYaGj%2FrzJ6ZtoVV7ehI9uCA8l3s4ROfNk0sFWZTNztDuMj9p9cUYhRMq4aC4BUKQ3eX9S1XEBR0r29DXhKcq8ram82SZTrq%2FZNN8jgDCd6QTyI8HYoyHFd%2FB9l%2Be%2BF2Y1QSkzY7UfT9CEQHdcDKIwz%2FEtgMZ8pZtckG0OJAORH1roOdxPyh1t9B%2FAV6VQf4qh&X-Amz-Signature=bd599827454ea1da8d92985be078b0701904dfb1108007dde44d088310599077&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEOUFO3I%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEIKye2q8MLTq%2F9iBvm8tOdZwmT4P6Y46iy7s8yhtcj%2FAiEAjYcdahFJBwf068duH8EAW1lq15ymAvm3VeRLiE2DGbAqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFi%2FonzFpnYF%2FNvSSCrcAxukVmGLY3fx7WkUNJ9wyUWAj9MxMPmxecEri6wqheZVWGGqLOdVORvPt2c3KiZf8MeSWR%2BVY4WhB11ap%2F5T9mNWvWBp%2FQusLIXg2H2t%2B6Og%2BF%2B47iPmVMwqVR5MVPg9gj5kezbObMsUtJEpMLZO9zxMeRhz39jxL8bUq%2FKzNxuJdoM%2FcHjhRbRiA5koKGBCdjs9qjCJiTWZ%2Fw9Xo8z6DUmFETdn8uUdh%2Fi9bwxKwluhjokmwdFQguJRVd8Khw6dU19d3jcQ%2FonnO8r3x%2FD7pbYsrmBsGmEXKadP23goxg58c5nw9tb11aYVc8ixcbzJTAZ8Y7y8BuoHB%2F5h6oEPieSBjDeS%2BDL08d98R8MXdaw7RZjRxfHkg2Sx%2F%2BtT9doqLw%2Fiq6KBl4lxjCyCPE3OPr7LJLRGmpafzStBXi%2FKss%2FFkqDfezvsgX9DfcgZl8%2B2n%2BP94C1k%2BGV1hCGe24MY4H7VXCujiN4zkUwVoOvv5iMPycYjxPNv4J6Z00As8Sj%2BqU1pj%2F1zsX5e9KWb0HIXol3zpYGOKNPzfTVLC6MFrrsEq3GZddldfQLxSqgILAvvOJKWsl3lJEnZR%2FoBUhLBKJxCO%2BHj%2FlyFtdflyB1FxWQ9VRBNNhZTNxNZUax6MISd5cwGOqUB6XwF8R46i40LTidxvsLTsvhVDWbxvSva5GIosIpWqpEv3Prl5XxTUW2%2F%2FNtS%2FbzzkTOvIyS%2F3%2Bdzczx%2FDCmLX9lwwEsc5HdRE%2Bfnb8noMhlmVSEvEY2rvDnayQ2utkU%2FyZ%2FQ7K8jXOQamLQqtY4VoQlzt9jO8kwP7cfa29syJBkP%2FN8uOigBus%2FlutcCcLritEp7cnRitsP1Q39aXd8y3MUwcX3Z&X-Amz-Signature=31ebe2ad2e91e56bea83a3c5af8655a9d27501defb515b099268ff2ccf63cdae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKX4MFBK%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDW1kuuIaT3Qa1c6zUbHMSC0IdPMqMLDhAgQnI6iKbCmAiAYq9veiw6CAs3vU8k1xMSdFIMmcLbSFy4UwgLKfrowMSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMogoScJQ3okd6l4W%2BKtwDq9FP6r820mAOXcybSFgMRageRGZy3p93J2celdEfaXuXzEp%2Bmg1FrrTOK%2F2gmOQf30YL%2FX%2BHkn%2BL8nAH3HCWeUwE9ywcSPT%2F1VHbsQLjBq5fngNPGeMCMi5CEcjz5NKsFGH9BjLpQZ%2Bx3L918mbD5xXwdoQJ21YzKpDw9zjQvglKOqEOfI4M52COyLd9Y6npYKeiAAmpiqvZLK%2BQzsWhM2F9xYWP0Q1IvKUzvuzLc2p84bMGznz4nAZGYz9zzlICvsb1Xmw2etjD%2FZc7PbT4fyU4KtH7KMSQr%2FusmMdNeqrKteQMESDiLyXoRC0auHlA5psLTjSg2S2nTS1llAcwI1EDpxhjGJecL3jz6tRXebwXcaAV9NdLR64Ve2wPimXFfvY8euzo7stdO6H96R4hiXI%2FXjvQvPljpl3pvahMFxvP4U9TJBdEtuYIUAgAkJi52xxJ5fkBpzCrNa4OhQcLD%2F1fDtO%2F%2BxPd0wibbIiNeMUhJ%2BfqSaNHBDjtq%2FxBe9aOG92qd00jNurJWtyraSD%2Bk7sjjjGvAZpzcAGwh4es0OXB3k8FxC4gNWFButGGdI4ywPDxRcL9gRnid97niUtxpOqpqa7%2BMvHR3gqeo0GxeqLmM6PMCj%2Bs2JJwFIwwsZ3lzAY6pgG3fsdQP1bk4L5DCOr4u1ihtDquCUIN6XMxr6PFfTzFKqKCNLn3jIlOx9g4KWv4zDSE38wY%2FjN11X5449FEUvNVCZByMBNoQaw7ciAruJy8C8dNP%2Bnp43qwD3P%2BcJrPVjHoIan%2Bt%2FG0je7dhYPR0M7Zoavv7SQyuqUVyCrYMu%2BRc9WOGSEWyVKWmCcGwRSASKrn7Rae46EoZaAHXmCEBQqmIdlLwAQr&X-Amz-Signature=f99e6580911e73a45c0bf18b19e5bd60b119c54889f713650e5dd57d90e9585a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2YUGKZL%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID0MlyKkm3drRZGaaz1iq12bDrHs%2F8C18tK3jRkeQjlmAiEA9GR0iMkWPZlDjcIegw02W%2F9zScoSGTUUB%2Brhtt4xNusqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEaAbuzHR0Ut3Mb3VCrcA1FJ5EzP8C2RFGN0lWM8JBLp%2BANChDJ30tsW82IrJXtc9Ev%2FKNua1Zdqm0MCOzPHLsze%2ByCaMl9SvXqf11Kt4%2BHvLgsEXhodNQTVTPPujXS9s35Xg2rXm2cLStXg85aCZN5uvC5X2qUTlfM3ByoaJByRpGqgju1GyRftF7ZIplM0dOVDs2Fe80Qu3cXx0Eqg3LZ1l3ZK3dp2BM6tqGP8ygXnXLvHlbVmyTwzC0V%2BZru6dECgDzv0Qs88QIo5SMhP7aMq53pmykaFURX4reRSeXDyf7Fr3%2FuA5lRIYJSawn%2F2HGf7R3NaM0ErDemT35Smn8vJOsmsqVqUMRsJIRH5HTC9Uv1pfPkydKTY4af%2F3X4zGqWs8P1KKZxe%2FItd%2FdJvp3Y0UFdON9RpCuOBMOAA3pDz82XfsWmtM%2BjEw5oJMg6o5P1k4bPlkAV3GQUagWaNGYN1fEnM9LiPzuFDQ4NHD9ahrxceQ9XWs80o9vl3HtvfKOhcDZnsx30mmIBz%2BvSJze60IJSJbVifMaV9lfASXWcubgl5WVl2uiez%2BZaNzBsH0l1YHDoyDMZU4GVxElk%2B84AwB0VU91DHcmc79DqV4qgP3Yfp6jeO1NTf7yveGusupZISU8Lvr2SyalKIMJud5cwGOqUBo%2BQjDV5HZC6ZGZB7FvpNFlslbMmaIJl09mbxwHorG%2Bx5E8Ca1ONRCzd7WtspK0zTlDaskYJH%2BKrXnMOHEJqZtLCwaJDas9JvIB1o%2B0mvyt%2FfWOGPKSb3xLIJQqd19sTW42xewRagCLGM0rKlzh1Rh33xGDod3eUb%2Bn77%2FGjxQwCKv%2BT0jKAEROs6%2BZoa96hLCs2ACeF3sERlDtSaYMSvriPee7Dt&X-Amz-Signature=8a172b20eb11154692f5a540ecd4e3f19a8df58dd4e1dd7ed0b370a44e867ce0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6AJGZ6L%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFKp6C3h1tYX9%2Fha%2FgYFHb%2FfwdQOt89w8dI3z3bF742AiEA1ZwbMjnhR%2FgmwkYFBnC6M739KHt28MrxflVworDpcbsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKTdfyKbTcUGAIYmBCrcA7JFXvmbtGvPaX%2BZXyyPLMi9FsDPE8wdcVF9foktOqeQFlGA%2BBARIWqKnLs1h2Sq74U9K5iA4Pg4dN4FzjOQgZFyrZIDs3wI63mVadrgG0YuPR2l3TLYnpgPatcBix%2BTORm0zIHMVV9oJ3A5gOvWFjqYJLDNamhNIrk21C531PwIFbLCyC0Q7in4Avl0oHVBAOS9FzKK3VgdOJgpszmjHfHOsDLk6jCQtqKcjHJLc3z9u18pMr0S8NCTpEsQaA6Ab2do7Qd1ULdyM%2FW35LkWAUE4k5wesqpmSzo1M16RyUKG%2Ft7pb%2BVz9LOjOunlO%2F88P6fzIsrE7ZPp3jT%2FrIgObkgPHfJKiP%2BkhFxGZqVqOhg7m%2Bk4DhXGqINY8kCzG6wfha6XaMEkcTBwkEZXj0gJaMRUMjCLf9XiEEiQQcSNnwRfUtIznP7Djat57yliNNc9blPeiltLvaH2%2B3gYUK1a0a4ofmAC38%2Bz2GYb364AuTo7lXwLK8U5HAZXr0xdK4OfA%2BPJq4TGRgGXbfgCfXioyaBsylyWCPyzQ9P8xgg2Vjr0Z2bj7ufyTSvsDHynY2knf0yGcU9Qcq2GXkUYhqIXq255KJCzPbPPMUFyKzQgEi2F7aZAfHkOB0k2Cr5QMLGd5cwGOqUBZgsvvnFvs92rz5QItDF1xo0jcbOD54paSrFt09ScJbrP7MIjpbKtprvJNbv5LZ0cLaWdo5xmbkfyvHpultH7fl1%2FYvDdiTWj5m1pvANJV2S5JgMYsxl9VgfEXotC2I5kcAaNDGUqoAU54sAQxkEXRYYslO1hddUZVrm%2FXSp3aCIXel4we6%2FA8zvKNndSp%2FBJzfHt6G0XiDGm4DA0zrSlj7KMq1x4&X-Amz-Signature=f83a5a6d32a33371304dd2e879781ebece11279d0fe62745e00fcb22007c6f6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6AJGZ6L%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFKp6C3h1tYX9%2Fha%2FgYFHb%2FfwdQOt89w8dI3z3bF742AiEA1ZwbMjnhR%2FgmwkYFBnC6M739KHt28MrxflVworDpcbsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKTdfyKbTcUGAIYmBCrcA7JFXvmbtGvPaX%2BZXyyPLMi9FsDPE8wdcVF9foktOqeQFlGA%2BBARIWqKnLs1h2Sq74U9K5iA4Pg4dN4FzjOQgZFyrZIDs3wI63mVadrgG0YuPR2l3TLYnpgPatcBix%2BTORm0zIHMVV9oJ3A5gOvWFjqYJLDNamhNIrk21C531PwIFbLCyC0Q7in4Avl0oHVBAOS9FzKK3VgdOJgpszmjHfHOsDLk6jCQtqKcjHJLc3z9u18pMr0S8NCTpEsQaA6Ab2do7Qd1ULdyM%2FW35LkWAUE4k5wesqpmSzo1M16RyUKG%2Ft7pb%2BVz9LOjOunlO%2F88P6fzIsrE7ZPp3jT%2FrIgObkgPHfJKiP%2BkhFxGZqVqOhg7m%2Bk4DhXGqINY8kCzG6wfha6XaMEkcTBwkEZXj0gJaMRUMjCLf9XiEEiQQcSNnwRfUtIznP7Djat57yliNNc9blPeiltLvaH2%2B3gYUK1a0a4ofmAC38%2Bz2GYb364AuTo7lXwLK8U5HAZXr0xdK4OfA%2BPJq4TGRgGXbfgCfXioyaBsylyWCPyzQ9P8xgg2Vjr0Z2bj7ufyTSvsDHynY2knf0yGcU9Qcq2GXkUYhqIXq255KJCzPbPPMUFyKzQgEi2F7aZAfHkOB0k2Cr5QMLGd5cwGOqUBZgsvvnFvs92rz5QItDF1xo0jcbOD54paSrFt09ScJbrP7MIjpbKtprvJNbv5LZ0cLaWdo5xmbkfyvHpultH7fl1%2FYvDdiTWj5m1pvANJV2S5JgMYsxl9VgfEXotC2I5kcAaNDGUqoAU54sAQxkEXRYYslO1hddUZVrm%2FXSp3aCIXel4we6%2FA8zvKNndSp%2FBJzfHt6G0XiDGm4DA0zrSlj7KMq1x4&X-Amz-Signature=32375975d7e70e28fcf609efa3a9c820c6b2f9c37a092fd677fff2d6d0a7e628&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFSMNRHD%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICO546B8kn%2BdmVQe7ZoVfuO1uF50YW6AUBY9ZApSllegAiEAkO24AelmLrQDjtyiIYk%2FgTsoJCIKOjyr2rzvXoUJwYAqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDXM0jAZIe8%2B1d4XryrcA5N4dgVsdWQ7HlyTFuVkDXq65tkUiMprp7bPR7RrJm1pgrhfiujrsFO0FPcOWV4YKREMgD6VrdVS9vb8%2F3Bw0O9WpwP43OcA4OInJzy4GVSO3yebtE978qGuD6UxNrXGyRF8rLRx2G3AM7%2Bi6hsvFm2YZvoM33xCEZi0jxewRcpBmog1NOuIznqAgg2WqXtiuvZuVt0oAZWdYbppX7oS9NTt8S8QUyGcbrwJJOwTFXqSIXnwAMdkxUH0reHZ1iZU94tKSy2BDPfotbR4DTUmI%2BpRXkRYNDrD0gbWq%2BDfx9k2R5S%2BNI79DG6bctFmJl3ehHsn6aFMiq3VEeEv7xy%2FtSQjIqAZ4kLKAKtYrxrXs%2B8a3bRNZhxWKbnGg61bsXtUkUYTHdbJpD7Mq%2BqETqKvht40k%2FfhJU7fSrGf%2F6DsnQngoev1NLwGNfdPkYUIXFKvZGdGZPZzLD%2Fki2FjUv1VP9i4vHCoR1A7plh1sK4Se0mFFh97lCI29RccUWaAi4Uwgg8TZV4T4fT5Dp%2FK1XwETTTOIwYLCmbOIJJViKyxsZytwTszn2%2Fmn4r9IgVBv%2Fqr3q2G%2BDfZ3iUEhv2YwhaGOJjiAbbnryI6GHH8gNA7pZTBVmRnnyz0q%2Bt%2BJ3h%2BMMCc5cwGOqUBnEkftoadBV98NSFWfn%2FvzDNAayIirgbACel5yiBjcEVNBwZqEXZdsvxIvrpL7vDT5CoHdlH4E42WqfNUip4M8Pze%2FSu3mYqtjVwgpAjZdeo9T8lyqmaW9CaGl7WxwEB%2FU1aGsb6k6IZlKTojSXsexp4%2B8I5NCKCnYKCw%2B3vW1jIQIEnpks6R1Lg3u8PRRBW9XLgfDEXH9mrE15pWNhFV3SOfLTd%2F&X-Amz-Signature=698e869163dee2f6d683c9ee8349ac03b34089edea1499aa230c005a7447405e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BJJJOVZ%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFbVTcLij7LXy7E%2F7vkZdgdpqjlxUN6Mqfxj9Cstx09fAiAIBLaQIyRnYU7QqR%2FdHrkKt7Q%2F9xl%2BHMAySnVy4sX4CCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBdS%2FeO7oY6jTL1exKtwDYjdHjaoLMz9lCO06o013zUp5AozQDa63ZpQSdfFJK60MX8hyg8nm6LnRZzVhdQG99o66Rm%2BDFxkY9KVE11lmDX5zLPXxrwWLrmI3VwoPJxlnosafav8Ou0hCdon3kzydUiDyo3wk%2B6gJspQ5wK6lOseRsYm55cAZgit3iVzkz0W2z4eYOu2YIdAbEwepWJARudDjAO%2B5SbiP6FP1N92Tbec%2Fe6kI4XKDEVKIe7hYNmCGfpT%2B8j0hzgvsyHthFB2ZpF1qmnkYDYbSHIw9ZMYpaWAfY%2B3MjiZS3dwDd6sk7PIKk6gv0ITYH6DBun7k04zkjJegyBtdzYHZqvcyhnfyXIK49Ket13z3dTb5xV%2FaMAqHh2PEZV%2Bc8jVWqbS2JqOX83UaM%2Fhw%2BLJVCspL2FWegubVpk2PYYvCDOkfWDP9g9wJfvOWi8n7YeEF4D7b4UsJTKNmrkRPftNaCODGP1lDyvkAEfB%2FXM7eyEqeUbOGiZzkOrVhQBNf7723lzbLC07xphh4SMayNdeZ1Dz5dBAAzK21Co16l4p6xefLjnFCF05M%2Ff%2FKnTZZGFgE3VQU3smoPemvVs7WQQzIVqacjtfUyb%2F6qpWGYNi9EK2654TwfrRXvtBNXgqE6R2wQsEwuJ3lzAY6pgF57CTmrJOx96H7vn7fVVSiRLE%2FvC7JCbkHruUHefEP3HBl4uYft5YEpI%2F0NSxDJRHj9RRJmcQITkyZjJsbz4ZvKlSjxFBA1EFwaomGkW75NjNaSN5f2%2FGQ2Ctp%2Bd%2BokUlpJAGdEJeJu6mz4yEClpDilealkaXcFCAXjFbG1qXzAuafxEQVs5Q%2FigytBeIdde3LAhjd7JfO2%2BoGVUFl2Rh8NcrMcT6g&X-Amz-Signature=20a627bd5bda351d2f534a1146ecdb60bad2c058e225fd29c1e5e908b42ee74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BJJJOVZ%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFbVTcLij7LXy7E%2F7vkZdgdpqjlxUN6Mqfxj9Cstx09fAiAIBLaQIyRnYU7QqR%2FdHrkKt7Q%2F9xl%2BHMAySnVy4sX4CCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBdS%2FeO7oY6jTL1exKtwDYjdHjaoLMz9lCO06o013zUp5AozQDa63ZpQSdfFJK60MX8hyg8nm6LnRZzVhdQG99o66Rm%2BDFxkY9KVE11lmDX5zLPXxrwWLrmI3VwoPJxlnosafav8Ou0hCdon3kzydUiDyo3wk%2B6gJspQ5wK6lOseRsYm55cAZgit3iVzkz0W2z4eYOu2YIdAbEwepWJARudDjAO%2B5SbiP6FP1N92Tbec%2Fe6kI4XKDEVKIe7hYNmCGfpT%2B8j0hzgvsyHthFB2ZpF1qmnkYDYbSHIw9ZMYpaWAfY%2B3MjiZS3dwDd6sk7PIKk6gv0ITYH6DBun7k04zkjJegyBtdzYHZqvcyhnfyXIK49Ket13z3dTb5xV%2FaMAqHh2PEZV%2Bc8jVWqbS2JqOX83UaM%2Fhw%2BLJVCspL2FWegubVpk2PYYvCDOkfWDP9g9wJfvOWi8n7YeEF4D7b4UsJTKNmrkRPftNaCODGP1lDyvkAEfB%2FXM7eyEqeUbOGiZzkOrVhQBNf7723lzbLC07xphh4SMayNdeZ1Dz5dBAAzK21Co16l4p6xefLjnFCF05M%2Ff%2FKnTZZGFgE3VQU3smoPemvVs7WQQzIVqacjtfUyb%2F6qpWGYNi9EK2654TwfrRXvtBNXgqE6R2wQsEwuJ3lzAY6pgF57CTmrJOx96H7vn7fVVSiRLE%2FvC7JCbkHruUHefEP3HBl4uYft5YEpI%2F0NSxDJRHj9RRJmcQITkyZjJsbz4ZvKlSjxFBA1EFwaomGkW75NjNaSN5f2%2FGQ2Ctp%2Bd%2BokUlpJAGdEJeJu6mz4yEClpDilealkaXcFCAXjFbG1qXzAuafxEQVs5Q%2FigytBeIdde3LAhjd7JfO2%2BoGVUFl2Rh8NcrMcT6g&X-Amz-Signature=20a627bd5bda351d2f534a1146ecdb60bad2c058e225fd29c1e5e908b42ee74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ESV3HC7%2F20260221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260221T062541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsTQpZRmeinwrQ1rjsLxpPh01Lcf%2BxjXdFl9sQrmLJmQIgRtlISpSTSAvoXgwrhXoilckGMuLItb6lFAJcsKeq2UsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJPu%2BrHnwOZ7SUJieCrcA2DBxRYSVCn6sK0R%2BTSLSWsfI4WvxhacLG3MW0Ov2wOWQkLXca7NvWpoJps%2BGDnszZRsKKWMu9NBvO5sHfw3teeau299kB7%2FIKbO%2B64yIqFBObRbw3GYjcg7Axxp0ONMw0sj1O0T7bIbT1ipx1Wpik944Yzkr57P2DPIe8CInPJxWxlvA3muU7%2FDQx2oUK4QLqOaC3F4eOIAfZiEnMCecBntRi9bE7W%2BpxVAYQzWAGVV56D1CXnUNxbmFsVTZBzHvZGWW50wE5HoeESM2nAVuqy2bQuTa1HM6ZRy6sjwHGclA9Wg0XoGzh1jK2bZqmfLiZ5eeqCFIo8ZSQcLFFwmUCcCtrXpIOv%2BeO2N9%2BYPduEGTyfAaN2dZiizSVJRH4kRcwz62CU888y2RCXdRH7DWsJR7VzuSNe7OpJl7omi2cG2212cUaEDFkP9kVpfygyhDLvCex06p0J%2B%2B0l76WbH4ten5lWlVzffXbXxbX%2F75MVK0wgNcoJegK2mZIj8nEvkjTJuKLceOl9qYiTB7uZBuWesCQY3xa2%2FLLZo6QO8rAX7zui%2Fw%2Ffw1Gt8QD%2B7WIvNDR7YxiuHkp7C9okhwGmX9GWZTvLESCVyfyuVpDTmy%2BUVep67rxPZeh7BjyYuMJmd5cwGOqUBmgxBIPbizaugEild%2FVtGD7PS1D5Huu88uS7ZzDoVMgyxmTPyk7YLIbCW61o3doAUPBuEVS4wyUB20gM1quir2mzrAus850dcJveNg7qEsXfMY3s3%2FNRSoi2GNZd3CWFdnWqOAp93VfpaSlLvnrjhIaNRUuP9uVY24r4WZb39d%2F5fadWbeFkBHlSoxHBSDCRMQyh8YOt19xu3WeR7QOJDf1TRzGyp&X-Amz-Signature=acf46a3aba50748595eeeb3b520499501bca1521aceb7d68b6237c6ced2755c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

