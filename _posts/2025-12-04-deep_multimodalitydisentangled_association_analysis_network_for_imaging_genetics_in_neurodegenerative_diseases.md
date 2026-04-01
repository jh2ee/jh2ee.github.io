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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYAFGOYJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIETshgiOsdCV4oLm36Yw40dIlVBJs%2BKw8DAfzWakmmNmAiEAz2rMtosepfaLxtI%2FyyN%2FKx3b%2FJKRmbYjnCwlBmZ3KQIq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDLaBcEDZUHCwAcr2ZCrcA%2BYHm1YWt1VQJZK%2BpV0lxdbsNaSVTt57rqOPdrbt%2BYf3P9k7Ym6izxAmy2pezdCJZxA95CuDcQIt%2Fq6A6xqtZid2JKF5wqIt5K9B4ZDT%2BXYwoMjn2lmMMQQJ1Bw%2F38RmVRFrpcZui3Enrk2biGLfuaupnvUAhA1dKNwWQ53wmIpH%2BWo6Rb6qBBrjp78jaqheLLlXQ09FKnDTY0j0%2Bv%2BsREUWrc64tDLqN8jq0%2BXPs%2FZDmwp2U8DTgtT1EPXuxMBbKT62aA7kkQPHJjHG7EQMwF25g%2FVJSePI%2BuEzPETL2xlTbAvkj8Z8SVb2ZvHL9rIcpu8nyvsFXmcrRgRHh1H8kvSZbkCylGnlMEfVAJN4BbLd5s4j94eOB2UmXZqz9WaH6Bx3I%2Fa4RgIf0jR1jO4RIBN7EJ75eZmZPNt32hjelgQZYGIQXaPY3SPQG4Nvs32bMs3CGpv%2BJVxtd9JV1CCsPP%2Bqs6qZU26iOYAvCyeWqv36bQeW8SdWZyT29ahj9SmrFwNdVN0LqohCE2GuPPp%2FQbOJ1%2FpPPz5IRAdz8Kt%2FV3WBmBQRJqBVWjH%2B9sMd3bDf8gr%2FKHbhqCjCDlSw%2F1cpCBTKGBRoRxwsLqe36Jj3mLVHD23lnSCwBIb%2BtqmLMMHkss4GOqUBdKeOuc77EefMh05zSzEHhrRratkJh%2BUOS75zcv7paaZUpRJaRh2Ew2fybNiceVL47BS7m2W4fF9GPr2eD5po0bsIIF%2BZ8TFRqaprWpvLVJxJKfVBIbksidJPBkCmRIbPo17CEI%2BH9cB4IXFyt53GiIpae%2FpXuyzuvz5%2B7douL8%2FbKAkWLBHms0g4Hs%2BwzYQEYGiHEFfhpGDfU4u5SuvdmXR9R2YF&X-Amz-Signature=019fbe734435c201e449b1215973450960399abc72434e1c20bd07e557604845&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYAFGOYJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIETshgiOsdCV4oLm36Yw40dIlVBJs%2BKw8DAfzWakmmNmAiEAz2rMtosepfaLxtI%2FyyN%2FKx3b%2FJKRmbYjnCwlBmZ3KQIq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDLaBcEDZUHCwAcr2ZCrcA%2BYHm1YWt1VQJZK%2BpV0lxdbsNaSVTt57rqOPdrbt%2BYf3P9k7Ym6izxAmy2pezdCJZxA95CuDcQIt%2Fq6A6xqtZid2JKF5wqIt5K9B4ZDT%2BXYwoMjn2lmMMQQJ1Bw%2F38RmVRFrpcZui3Enrk2biGLfuaupnvUAhA1dKNwWQ53wmIpH%2BWo6Rb6qBBrjp78jaqheLLlXQ09FKnDTY0j0%2Bv%2BsREUWrc64tDLqN8jq0%2BXPs%2FZDmwp2U8DTgtT1EPXuxMBbKT62aA7kkQPHJjHG7EQMwF25g%2FVJSePI%2BuEzPETL2xlTbAvkj8Z8SVb2ZvHL9rIcpu8nyvsFXmcrRgRHh1H8kvSZbkCylGnlMEfVAJN4BbLd5s4j94eOB2UmXZqz9WaH6Bx3I%2Fa4RgIf0jR1jO4RIBN7EJ75eZmZPNt32hjelgQZYGIQXaPY3SPQG4Nvs32bMs3CGpv%2BJVxtd9JV1CCsPP%2Bqs6qZU26iOYAvCyeWqv36bQeW8SdWZyT29ahj9SmrFwNdVN0LqohCE2GuPPp%2FQbOJ1%2FpPPz5IRAdz8Kt%2FV3WBmBQRJqBVWjH%2B9sMd3bDf8gr%2FKHbhqCjCDlSw%2F1cpCBTKGBRoRxwsLqe36Jj3mLVHD23lnSCwBIb%2BtqmLMMHkss4GOqUBdKeOuc77EefMh05zSzEHhrRratkJh%2BUOS75zcv7paaZUpRJaRh2Ew2fybNiceVL47BS7m2W4fF9GPr2eD5po0bsIIF%2BZ8TFRqaprWpvLVJxJKfVBIbksidJPBkCmRIbPo17CEI%2BH9cB4IXFyt53GiIpae%2FpXuyzuvz5%2B7douL8%2FbKAkWLBHms0g4Hs%2BwzYQEYGiHEFfhpGDfU4u5SuvdmXR9R2YF&X-Amz-Signature=019fbe734435c201e449b1215973450960399abc72434e1c20bd07e557604845&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBU4MUB4%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClYKViQK9gFVivF57fck80RDcD1l868fIg3dw184OmXQIgfScb16cPAkTk6x1t0UlN5kQADIrtC0UEXJhu6g1%2F%2BUsq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDGGyBbNp5aKsw98zPSrcA%2BLl3acoGSsjOZsskhq3Wh0OeyZPtwRBWtOS%2FTiy83iYT67w1oOjiKwKExkcuE0NfY4du7VZu4gNxjGiccybffPvTjd9PtzAFyXBhyGKaOHpGW30o0fClkHw9OOG%2BovgTmDCbVtyx8NfPT7Jie9nDYpkT7smbzeQOLsgTDGYWkuMAyN%2FBjzrQoKT2jLut%2FkSoSvekQ0BCmILNcfSn0RKN2IeAaFMLAaSs2uxe36XQeaS1VnT2LWf%2Bi7jC3lPJzWWaysrXCIii0P%2BlIolyEbOfBvDuEGU3vv0UH8hc6a9ICj%2BbsmoRKAbKW8QHQntiLskwualcMJ9q8%2BMVVJkOJKBk6IggIsQnc2DAWjup%2B3SoYN3ulV36038Qmxgsy6FJcdj4BesVm7jZo%2BF45uWwacJBL5u4yESsNrF5%2B1%2Fq3MR8eTKwx2Bmuy0lpzz1p%2FLNNni2iCKAy2RgHkp3oYob5bI6nh%2B1S1SDI6rMngk8Ie2RjlM6RTi53jr5DqHYwccK0G6WY7n%2FX438hyHfd4Z26pdFYpZUwfwnsHKvXeJam5N46Xm0i4z0mNUdnyN3Xs1BpN6FR1D55NhneXBHFYo171rr1z06uX%2FENqsK718oxVKCJR8j%2FMP7QlSLTSv6NlSMM7lss4GOqUBBXZgmvc5REOQitzSAndcFppqWh4EKclJjDtCoN9LzA%2F6lgiaINtZRbU1feGA1BTkzBOVM0TaLa4OE484b1Uva7xHcw3mlvFb4254Sry4BMU%2Fm1vRJIonn%2FmosX1cWtHWF05%2BsqYXN2D0Jn%2FNFMh9tPs275SF76K7xxzvYjTAxWlw0KwubvkKF%2Fh5QVBm3oINGldf6GTfrIL8uU%2Bmxf8Ppq1HWeto&X-Amz-Signature=cf7e84cfabe185fa015f2f7244d8f5b4159b34b8a544f289cfa8d32cdc7729d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WB7RCKC%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDJQFKQx%2BPKbpxSqiAMApFGRhFJAOMWXA8HwV5oUIEC%2FAiEA3SbbHOGCF4Hm1bj3%2B5fSXbPwwdcE1BYMdpJ94M3lb7gq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDN7GativNGbAC82HhyrcA8FPCdLpect1qXEqL%2FhxjH8D%2BOCxx%2Bp4spYY4QOa1nkPEbPd8RL%2BdlP1TCZjMoBe%2BRX%2BASC0BRpVapWEoJfozCZlYTeCYK9l0CaZb4MKEyvdjj1NFDcXupGoRVFRDPxHPbsGJzM24GMumg1PlpCEM36HVaUm4jL0YyvcHpPmS%2BM%2F5zrO%2BUipMenJWFOV70R6zVFCWUF0yWJI9Up86U5l4bFiIJkAd7PWJfR%2FF3drlBjME95vjiC3Kpom13d1T7LbSOBUbEd17uYky7gKh25HLoMr4E1fEiWUkUgdRZc%2B4%2BPaDHh%2FU74Wq0zQ61xsuN3NWVjcdMbBtbJKqVIuB3lmQUFyhAv3XoiV4bjD%2BsmmheCAUMpSzV8EwKusJF%2FTtsd161%2FXg%2BpC9ougB4hU1L7lkXt6U9qJMcZFAUObHVW2kwT57qwpOrBM7148rqEccKl79Zq4JaOVOHwTQMTLSekTGA7I%2BND1CBdr3bm9yXSvWyw9EgwtEAcCHQJTPALeF29Gn18PpUVqwy88ABDIzvJoyFEkrz1dHzu7%2FoOrcvPIxWbYtMORvg%2BANXu3pxjvrOpkDSDDmEYtczZy5qJglSFbEtIistHvBpXzDrtYEAxYVFtgauQZ0usIwnrAjvqPMIjlss4GOqUB7l4frm3FSsgw1K7JN%2FbKalgB2DZkrr4O0V5hIv%2F8hsEnBRHOm6Y%2F8kCOXryQOdhTObZuU3WXPQ9OYo9Sv%2Bt6w2LFC6Tdqgek6sFuXc5bkVKO25xWprgNpTy3yj1IGVhXxIJSeCP8wTo541YHAW7zZ%2B%2BdtkaiqbT3TZ9nHKtowcsWoyvikyeAkC%2BpaoeFngq1cIvmOKEzW3c68zRAt8Anj4dv%2BUJ8&X-Amz-Signature=974e7712b3c231657ee360c017c2a7c10af1536044c770730bb07625025c6086&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WB7RCKC%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDJQFKQx%2BPKbpxSqiAMApFGRhFJAOMWXA8HwV5oUIEC%2FAiEA3SbbHOGCF4Hm1bj3%2B5fSXbPwwdcE1BYMdpJ94M3lb7gq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDN7GativNGbAC82HhyrcA8FPCdLpect1qXEqL%2FhxjH8D%2BOCxx%2Bp4spYY4QOa1nkPEbPd8RL%2BdlP1TCZjMoBe%2BRX%2BASC0BRpVapWEoJfozCZlYTeCYK9l0CaZb4MKEyvdjj1NFDcXupGoRVFRDPxHPbsGJzM24GMumg1PlpCEM36HVaUm4jL0YyvcHpPmS%2BM%2F5zrO%2BUipMenJWFOV70R6zVFCWUF0yWJI9Up86U5l4bFiIJkAd7PWJfR%2FF3drlBjME95vjiC3Kpom13d1T7LbSOBUbEd17uYky7gKh25HLoMr4E1fEiWUkUgdRZc%2B4%2BPaDHh%2FU74Wq0zQ61xsuN3NWVjcdMbBtbJKqVIuB3lmQUFyhAv3XoiV4bjD%2BsmmheCAUMpSzV8EwKusJF%2FTtsd161%2FXg%2BpC9ougB4hU1L7lkXt6U9qJMcZFAUObHVW2kwT57qwpOrBM7148rqEccKl79Zq4JaOVOHwTQMTLSekTGA7I%2BND1CBdr3bm9yXSvWyw9EgwtEAcCHQJTPALeF29Gn18PpUVqwy88ABDIzvJoyFEkrz1dHzu7%2FoOrcvPIxWbYtMORvg%2BANXu3pxjvrOpkDSDDmEYtczZy5qJglSFbEtIistHvBpXzDrtYEAxYVFtgauQZ0usIwnrAjvqPMIjlss4GOqUB7l4frm3FSsgw1K7JN%2FbKalgB2DZkrr4O0V5hIv%2F8hsEnBRHOm6Y%2F8kCOXryQOdhTObZuU3WXPQ9OYo9Sv%2Bt6w2LFC6Tdqgek6sFuXc5bkVKO25xWprgNpTy3yj1IGVhXxIJSeCP8wTo541YHAW7zZ%2B%2BdtkaiqbT3TZ9nHKtowcsWoyvikyeAkC%2BpaoeFngq1cIvmOKEzW3c68zRAt8Anj4dv%2BUJ8&X-Amz-Signature=1349bf505cc98c74a669f7c42c13e096c14fa1eecb798d7610bbb934cdc57f54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SRBEC4U%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDel1Lxn7c0ic%2BEJqfclpm6%2BKMuoorIMLm1Ry2FVSmZ0gIgeUqUH%2FVuKZ9oSwFnsnp9fk907bbeEfP%2B%2B9%2F4cfDy5F4q%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDMh3uF2OH1lEeKnLlircAwheV2Ls3Dz58lF9e5vvAh7sLwsRhR0ziEji7U0OzAfEFR6WDI7dIUrcmjB%2BWyFfsOo7oN%2Fowh2jxmRS%2FWAnHc95xkdP37t%2B3lfhlBrbdicea4mspR62cBt6sS1V7Yc0QmjWPW6Hx0bwduwXgwg7pjru4KX%2B2%2BNwPJdzPYaYD9suUG1l0Wsm2qwHG7AvaUsel2wE%2Fr9BvfRA6hrGhWE21r10uBHhP1EY9PX1B4SseqUJZ%2BoH6LQUWckot0kCtc6Ifx9IZayJZDY9lTQ2Lr1obbuZoc4ng5qBCsXh5Z2vZORFdc6wTSngnkDR%2Bkp%2Fbjptbo7Ka3%2BiMIVS3gG%2FbqR5FzzbAzy99gBq%2Bk1tL7jnhu3XObVuvPHdze0kdTnGhOHY0Mo3%2B7RT1M5bebCN6%2BjbKKZdgrVO6E%2FerRgGqgY6yJkWBwE5x4H9m78Zq9NOS6NRQ6RZ2EKvwG9BFxBnIHqck504PxPtNYsWy24eERj%2BWFY8S9zv4cSQJpEvQJ7dowMiea3LlfFaD2G7S8CVaG2mIg0FfkUTwezggzaQxkHw7smwilZLpQYo1mDMl11zRWFTQ50jlv7%2Fju2F5m0W86roAWUu4cdKrAstUWHCn33pjyTWEA8LsgO0NW1t9LT%2FMNHmss4GOqUBU1Zi2QIQlZHLi4d9SefHJLCzIQlyx%2BWbRZD%2FlBr6392R4BNtYMIYAT22aoTOifA1Ur5mPoqrtIt%2BEjkoHj5IvHUweXcnqAsaJZZM2zFWByy13yaTXlF547y3aZEdQXl5HDkSoEGqTD%2Fut5Tgx6%2FdMDFY0RR21nOJdmXw9%2BD20wcIYICml9NbZ9jOVmE4Jx1ZQkPMopkvm4aCOiESUw98zqtmJXzB&X-Amz-Signature=fb86f0dce1153162047a0cf9716b649aeed6ebc6ced02b717ffd068484446f7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V42K7RZP%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID51%2B9RiNM2JCoT4EqybT0FrJdZEVYZ9fvlaY%2FLUgwTYAiEA1oJBbV2qQ3PbpKKmyRaqTdP2lq%2FXL0VEgw8b6ggtdDgq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDGsqTeczHXM3dRpflCrcA5dg4n88GKKsxKWuDcUrGE6jQxkpDs2dzR0jblYaoYeI361%2B2Fbd0lQSpA0nTwI%2BKZzpiV03Lu14yw9mzQPXc7h4Sb%2BChH2Gj8XyRHyD4O43atOZa0skLiQ2mOeBFGlgHkdIwG09%2FjMQ8ewwB%2FFQG6oul4K0sUn7%2F4P4Kb3QLpi0xO1wov4OZaDpDzN0pVF0L4d%2F%2F5PIcmZtE5YXmCNgLj%2FOsip8%2Fg9Uzt%2Bp%2Fx8prkSYaHejrWkubbEwqtt1NBr5hBrlvRANuXxnYhj4kDX9BpUbf2ZP%2BK3xvz8quewyRL2wb4XFvx%2B%2B3cCd5f4203Vetw3KQP5T6BX6TIlmRAEzF88o4fOL2bnnZ2%2B7vIXBoBifwEWcAjgWt387dQzy%2F%2FvDcXsQKRSxEA42HfhSzaHNLJE0O%2BsFZheSRUFdyS%2FwUJu5NFza7GoAg9H3yruJZ%2BZPcLggkFISA9ig9vzKxFY8E9ae0g1vIE8goFisbH5LUD2s1NgAOF0pgBUgWkT6sCyexaR39pxGW1ZNm%2FkvIFq3cINg0JJGQe%2FHzBTKqV7myP%2Fy%2FdkObNDOK0nGIFV2mG61CnLnBjz34e%2BOT1elS2%2BGootyf7hRuyXhmqkJcdirjmmWFMyj40eq8ZFKGwY7MJ7mss4GOqUBBU20lLDuHAo%2B585xBSYRQItnN%2FENjVcVEm%2F0%2Bz4fHJnXznFrgg0KOz0Era%2F%2FR59nJedwS%2FAFVG%2BTWSSNo65sanswsir%2FK%2BnoQAB6EGAuTdHF004bvbmjWaNZVm5vH65txIQGI1anSPYpxghUCp2pDM6ZJ93hsiH5KJIcPl%2FW4Jh5LydH5S3POAMRywoQWULRVmd6vEhGn71IIkkY82EAV5rCB396&X-Amz-Signature=80b645123e05dea22fa5e9c52b8ab56ba6838bfd08aa643547b63b5fdbcfc1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMZA57UI%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFo%2B6r0Ei%2BSORpbIJtSQqStUEaS8K60g%2FuvMNcQ8gDW9AiBFORpc36dH7%2BvhAveC%2FvWGkeCXmYeJKqqmwgZFso6lBir%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIM2BBBGqfHJbDFWquEKtwDfpd2eY1OfBtoUHdImtsE2STzwcz93%2FwCKG879uRKHLJciPMM7sF1W9KDQV2TC1L7Sa1o7gpmX196XlBARqnDdor537SNG%2BuuXQSHNzTNwfBvonDRUsq1mgR4Lrc91poqz%2Bu%2FvS1y4g8wHeQTdAL2lL6Xv753n%2FdqnRNaZF4eNaxTDqr32CWmTsqXBijanYHRYfaFJDpUt4Ow%2BqEtT4n8lmjZ%2FlaKN1fRJmRNIMckuEgNLSWRvaPG3OF4SJ8ii2485RCdyNjyAUM61DFdRmp42AyBCABzKONvUeyhCnQ73FsLYJlB1Bbne7eNmJV8pnrD%2FtjsHtFbrgfr8TRX2fYz0JzLRG1X%2BV1rBVB4kHJcClZxzlGvHLS0PMqgjh67lhhegC8v0Av7VPSfPq42uBB2RWKDzC6e0cteBmx1ZmLMa89cB3FnIP07vvov4A41LSyzqCy6V2YJTOzphKSpRyqXBil2fzA0D9UIEQHJshI%2BQRjHdCtVSxyCzixdoFehJ6IY1jh2tZ%2FlDrt21iSa2wEA3hHN4Y05Cob6cwJlRsSQoV7Fs18yQsc91VcVQQs7MQaJ4CocyWCkmLNPUc2k46rzeXPk11tH7tvSJUB75vHkyfcUpjLfthvi2wJY53Iws%2BWyzgY6pgHtui9%2F5hRehlNYML7d3ZKqCBHo6sPaP2eLuLNQRIjKrVDdukCnWhKRBNRmnqV2gPjAJOKseF3uVFXPKhjp4gzTmEzUdC0cq6AzQwTq%2B9iZQVMkmryB2VZUQFCbj3yv07DAQWjlxKs2TQ%2FXk670TAkuOtxkni73re45hrwdCnHnwq8LicauoDsMwzAJI09Q1mCKqo0jUvGM2Miifc0hG8bgptdAnHQz&X-Amz-Signature=1f1218ad081fcaf68543c27ae3c71613d1907c5d49223e919bd689fa30fe0597&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TACEPFB6%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCCWIRsAHzbBkAm%2FjGTWzAp8dM4%2BpW6JRAZolp9Lkl0dQIhAIUVpHOKz32GO7jTkTU2NYn45oVpAPmU6vM8%2BLcaVgEXKv8DCE8QABoMNjM3NDIzMTgzODA1IgxIuT1CaXCrmKsYIssq3AOgeAcJyR7bj2yTJN1umH42E25MXaDQONk9s7KTpqdFTg8ivvzfr95eJ2kMthojk5qY1hefGzrUpYTn2m6oaayu8oLYS3cujarkcqkljmZI9YOzTXSbNAGhBLI930HfFX4Zc2xN0X%2FCYuKqzZDoZPMzU%2FMpbj1gqJGgB%2B6froqPEREGmUWaCsQp8M9QLlPNWlZw4wYaC1YjVB5zc9lr9ZN8RrdC5mBLrPkHuDV25rtYqoez3GlGGF2IvbHBOD0pKQgh0034vUvzXjkH1GndjL8jUvrtfAQbzKBKv5YngXonbrpPmwcilnVW7d0S0YQRaNlqBXRsqGe%2FOAg6Q94O5WEXhYKnZ0HdECD75xKN2VoKg03XIRrlDQlZmG9JdHWl%2FRMHzt8J24D98R3iIG10B3fjahqwTFWNSo8dgF%2Fw1HkNNmvpmC947X81qjwxAlpA0p%2BLp8h5VoeOa5TqtM%2BRKzqRX%2BggRiK3V0neF39%2FUX0A%2B6TgzDJaUYGIVgXcw0TwmlW5fqPnBYCo%2B0Ph73EpIzF9NPUd6Zs0zSWZi9WdKBzyulf0%2FbSUfc%2BeVOMitnGZJLQpHd1055swS5mbqSsD1tpo%2FeOTvzxXbQ7YLGPYttVcgJlDQEkYc6V11AlZFzCx5bLOBjqkAQ5Aiqr3P%2FLkwoljvuYTs6fBx4JoRl6wRHVek%2F7aGxMbmYJD2OpR%2B%2FV1Ca3es8g4aWpwbQJmwnmnuKPBArAZI%2Bbfa2MmJdvsZdIK5HqnGolvo5Rvr2uKMAmMTU3d4RdVrRvSvuyOV1LwtnmYBOMLz7%2FHnd%2F18c0fux4rOD1eQq0k6ca9oh95dfchb0gG%2B6dne%2FH%2B2PqElvLFJoG93q0KJTLJ97YH&X-Amz-Signature=7d4f2a97f2e238a5111387cd4daaadaebe204cb643dfdfde019150fe4d29fe49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TACEPFB6%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCCWIRsAHzbBkAm%2FjGTWzAp8dM4%2BpW6JRAZolp9Lkl0dQIhAIUVpHOKz32GO7jTkTU2NYn45oVpAPmU6vM8%2BLcaVgEXKv8DCE8QABoMNjM3NDIzMTgzODA1IgxIuT1CaXCrmKsYIssq3AOgeAcJyR7bj2yTJN1umH42E25MXaDQONk9s7KTpqdFTg8ivvzfr95eJ2kMthojk5qY1hefGzrUpYTn2m6oaayu8oLYS3cujarkcqkljmZI9YOzTXSbNAGhBLI930HfFX4Zc2xN0X%2FCYuKqzZDoZPMzU%2FMpbj1gqJGgB%2B6froqPEREGmUWaCsQp8M9QLlPNWlZw4wYaC1YjVB5zc9lr9ZN8RrdC5mBLrPkHuDV25rtYqoez3GlGGF2IvbHBOD0pKQgh0034vUvzXjkH1GndjL8jUvrtfAQbzKBKv5YngXonbrpPmwcilnVW7d0S0YQRaNlqBXRsqGe%2FOAg6Q94O5WEXhYKnZ0HdECD75xKN2VoKg03XIRrlDQlZmG9JdHWl%2FRMHzt8J24D98R3iIG10B3fjahqwTFWNSo8dgF%2Fw1HkNNmvpmC947X81qjwxAlpA0p%2BLp8h5VoeOa5TqtM%2BRKzqRX%2BggRiK3V0neF39%2FUX0A%2B6TgzDJaUYGIVgXcw0TwmlW5fqPnBYCo%2B0Ph73EpIzF9NPUd6Zs0zSWZi9WdKBzyulf0%2FbSUfc%2BeVOMitnGZJLQpHd1055swS5mbqSsD1tpo%2FeOTvzxXbQ7YLGPYttVcgJlDQEkYc6V11AlZFzCx5bLOBjqkAQ5Aiqr3P%2FLkwoljvuYTs6fBx4JoRl6wRHVek%2F7aGxMbmYJD2OpR%2B%2FV1Ca3es8g4aWpwbQJmwnmnuKPBArAZI%2Bbfa2MmJdvsZdIK5HqnGolvo5Rvr2uKMAmMTU3d4RdVrRvSvuyOV1LwtnmYBOMLz7%2FHnd%2F18c0fux4rOD1eQq0k6ca9oh95dfchb0gG%2B6dne%2FH%2B2PqElvLFJoG93q0KJTLJ97YH&X-Amz-Signature=0854f5773cc1cdb4fe0ecf241eb99299af1e38ac6ab9277735421a659f5b48f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667C5SUUX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEjbzPu4D9iK43VqiwLg3l1fbnbjNuuztbpK1XA%2FEtc%2BAiAKirdXLYWitRtym1m5XpoQbu7qRIIT9ynoYYsnHAFggCr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMkOcCVMTZsDgjQv6%2FKtwDDHjVas1SrQ0HWpYQUh%2FJRU3ia8zGdIjimPLI4%2FBuEdx5Kox48lXZjbcXVCR8LGigxqAUfDs0QezudL4rL9sBduZSw3X9JPIu%2Bj8y837WVsTIku%2BTmeRCohf8tyHUgzu%2FiErzCoRjVZIIfKj8jT6dgqmYWJfkaEJIzNHa7zivwV4elHEAsxZc8CqvWoHpTuDVw5E72EB4iNnjpbQ32soLHh3y4kTgTNZ8IbkSMizyT68Nu5l5dGLbriq3RkGUZrYWSKeydIcDl6n75xnGoF%2FCouvuzOSoL8TOdR7AVeT9KNlA3hr2nIXQyHJSeNOzYCvttiCU5n7A4tgKT6aZHBJA04nIrRNrM8tsRegAk9w9ZpwYHRUV41ukaohpoeWlVi9N5r4YY551zbIQ4rp5fgis8V4B6iE2a9sM4JxVr06kLLaqXbXvrW%2Fo3RpGHNTnPmKjNVh888eAs3as9foepeV57yrWPjyP%2BwD%2Bq0rUdWgS%2F%2BnCMqSOPovn6u6rd3Q1N8E%2FLbShd6tFljRm098b9baln%2BCMe9iD1Mw5CYJH5EfJ3DyKUYyx5%2Fmn0XEFx%2Fu0P2ZF3LxIa9DPqjayBMqI4T7FDMhxjG2oajHyyZGZrJj9zIMzXOQzoVRzMPzpbrUwv%2BayzgY6pgEJiQVI1quxyYQrfmP6dTMgZOl3ihj4RB2j6691VjkTPmpgbCwPaMtukKdtCsPC6Svy%2FwkgfxSQcXTngbhKkMUxE95jl2WozsoS8%2Fj4rn63A1H1oQ0%2Fq4fY4xwW3zCOcPXis%2BcYnlSj9v3ZZ8QQnUqS0oa87QZRopFPpHur58Xn8qY2MFTdIdBJTkv7QnXPjfNejA9xaq5%2BeaE1nRxc5DLHqeS3JP%2FB&X-Amz-Signature=4fa31bc8e88cec267f37fc8f86761705ab536eefaf775037e14a7d97e1df9143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQPXGCEN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZyI4uftvKznNxM62aP8TIIakrEsd1IMICnki2XolVCQIgGC0cz38yzbDUUmNLCJnI9J4ouPtQgD%2BAiweWE%2B1A5cEq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDFUKwdRqvUJRdoXczyrcA97TRfIAoR0PCZfyJ9BgUDQXNTaxLslJsEa2aMbcbplRofvsuNpaIoeGpgnLr3pzaO4XZjUePOtPmUVnYyHbRndoPgrRLhNiMzWk9R9DBv5UGWltUEcnZpfIMLmqitEKu2wCATRg8Jtkz5JBUeejMU0mKjCouu7cRQb1758RdmaK7rAUsOxBr9%2F2ZkeERxXCoD4xxPnjSATGGkOhEM7ChbN9nbs2s5TU%2Bg%2Fs6Yv2Zjp%2BYCMyD85D6fyYIvNZO5T5tYVjWnShGTO8wDIeNNB2Ckoo0kPQPYddndODSeud6yVByPhQzdq4%2FRq%2BS5AsccImekAcVL%2FhjUd21p0doj%2BKUoRIGlhkY9ecdhqriPI19EV2j0pwpiBIG46durHEzG0BM7MiMTIFlHgktieLWGns2u5ZT%2BFeqN7bF5PikycZicpdYw5SqW%2Fj0%2BEVq2C550v5uZ0LUsUziGPTHN%2B%2BKL5uqBbPkCEYVkPlzlNrfojbL9UfZCnW8EYQgj2jG5vgtocpRVGpUTqPwvd6Wr1YktfU%2FUV%2B8aWnpY5oP9RL8LBQi%2BY8G0SvQuXnu%2F5xD1hE7Gen6ZGYCBeP1om%2B4eASGCSkxW5k7DHe1BR2w7uVT751HyQV1olMu4ZZBz7cS3eNMOvkss4GOqUBCjOCV90EsRteZ6X01%2FnXoeZbguwwSQn0CnW9%2BtakTVblvzfTvffrJeEMF3wf4laWNAERm2XUIuw3jg8592F46IWmgfVglv4RCStCv2mjI3p1sa%2BEMroG6R%2FrAiRVwruI%2BMxljDVm6ZyHKLLAy%2BHEsf99mcgF0PRheDWJic%2Fz0SlpucOP8yAiSwV4R7peJH272E7N%2BvYiwfgl13my%2Fhq3Zb0bYhQO&X-Amz-Signature=1b0940bf40807b1fdcb7480cbf69d84299209c674c47e85a5fbe455517ee28d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQPXGCEN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZyI4uftvKznNxM62aP8TIIakrEsd1IMICnki2XolVCQIgGC0cz38yzbDUUmNLCJnI9J4ouPtQgD%2BAiweWE%2B1A5cEq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDFUKwdRqvUJRdoXczyrcA97TRfIAoR0PCZfyJ9BgUDQXNTaxLslJsEa2aMbcbplRofvsuNpaIoeGpgnLr3pzaO4XZjUePOtPmUVnYyHbRndoPgrRLhNiMzWk9R9DBv5UGWltUEcnZpfIMLmqitEKu2wCATRg8Jtkz5JBUeejMU0mKjCouu7cRQb1758RdmaK7rAUsOxBr9%2F2ZkeERxXCoD4xxPnjSATGGkOhEM7ChbN9nbs2s5TU%2Bg%2Fs6Yv2Zjp%2BYCMyD85D6fyYIvNZO5T5tYVjWnShGTO8wDIeNNB2Ckoo0kPQPYddndODSeud6yVByPhQzdq4%2FRq%2BS5AsccImekAcVL%2FhjUd21p0doj%2BKUoRIGlhkY9ecdhqriPI19EV2j0pwpiBIG46durHEzG0BM7MiMTIFlHgktieLWGns2u5ZT%2BFeqN7bF5PikycZicpdYw5SqW%2Fj0%2BEVq2C550v5uZ0LUsUziGPTHN%2B%2BKL5uqBbPkCEYVkPlzlNrfojbL9UfZCnW8EYQgj2jG5vgtocpRVGpUTqPwvd6Wr1YktfU%2FUV%2B8aWnpY5oP9RL8LBQi%2BY8G0SvQuXnu%2F5xD1hE7Gen6ZGYCBeP1om%2B4eASGCSkxW5k7DHe1BR2w7uVT751HyQV1olMu4ZZBz7cS3eNMOvkss4GOqUBCjOCV90EsRteZ6X01%2FnXoeZbguwwSQn0CnW9%2BtakTVblvzfTvffrJeEMF3wf4laWNAERm2XUIuw3jg8592F46IWmgfVglv4RCStCv2mjI3p1sa%2BEMroG6R%2FrAiRVwruI%2BMxljDVm6ZyHKLLAy%2BHEsf99mcgF0PRheDWJic%2Fz0SlpucOP8yAiSwV4R7peJH272E7N%2BvYiwfgl13my%2Fhq3Zb0bYhQO&X-Amz-Signature=1b0940bf40807b1fdcb7480cbf69d84299209c674c47e85a5fbe455517ee28d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG6J4WHF%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T061900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDWCqgxtMlrgvu08oom80V2X5FPwddwUv3DcESdceD0KAIhALVcHB0Q%2FjvMcCkVG%2FrYDLaXbTSaJKs6B682RUxNCQ83Kv8DCE8QABoMNjM3NDIzMTgzODA1Igx%2BuTW8BNsMv4Dc2xwq3ANar7QWDiK6NjarlFg9JdxBzOqzWkFGvEhNcOi13dYFiEAllMEii3gqaGSptc9OBzmtVkxaqfyFg%2Fgtp7fmkAw6NnJvUIOImw12z2y0aY%2B8UZJ6oMRv2g9iV6uoznqwwj3%2FW22k6djECsrxc0hvO5zb8dx3fY5yKBCZiW%2FqwvmeROsyt1lg5TWwqUsLP5yo9kJu0DcRC90iHFRnr12lBCPoV8scuoPKzPWlPrYfsqs5Zst7R3GhT3uVlpGx6eNTSSZButznS2Q0cWCBHjKtujlIjm7LEBfO6Kwgh7mfR0E7zFPJ5vQFyFIpzEyNtr29nDfCHBkPeJJARbJsnLuOQIXWXateS%2B6ZdJz93fz4vhff5URhhwzbgfSyTerDwPpjtEfC41XnocS%2F1EcoVTsXNopMt2GssXwJpLljukEu3BMBNRZcsH5xENLvahkoUIciKEIIarZ0EWhLr1wMo%2FYsM%2F%2BcKv0Vglvr%2B9KubjoeuTzXqt1fTGP8WBkietzBQllbPnluDVpuk7CkgUEItF%2BhXCHutZWojm5CVJq6MmyuSExDiXoJchmygTUcTKtW5xyTGpaPxeIYK1%2BQHpywAPQ6NWczKg8GHCUwhAjRhxuDQIn90GpRlo6HcbXOjj8aWDCD5bLOBjqkARmGDQQJ60U3C6Vkw%2BXxpf%2Bz1p4DPcodQizxrGlqvsN7lPnPp1RY9CvX3frZSlh50za9IM0bfQHBaW7HaLmcGF578XqS7QcRSNjWv1HqtsrQHyBy3V%2BvgZ1eDLAO5OOVNPJ48SL1UySHggBd89l%2FlptB8Z7IK9%2BL%2F7G6LBwBBY34uNQWKENDSbrYNnle3PKElfErYw5cColwpEkq4xf6mOkWJsaA&X-Amz-Signature=e7fb49985974d67bbb1576f7d96857f6a8b2f088d0ecf2f72679849ce74508d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

