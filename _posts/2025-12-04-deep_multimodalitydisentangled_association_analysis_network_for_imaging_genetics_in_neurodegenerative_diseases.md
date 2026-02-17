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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZBFCY47%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzDK5x2SDkSj0gvl9UHEz%2B7pn7lbkM3x6JN47Gq7lregIgCDWNcnSiCoiyaLQqYM%2Fb2uk1dwJRip%2FQ0GMqIpTv4ysq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLi3Z5lkjCBfLgRtACrcA4kqqTV2lPEH%2BWgikB14CDUYzKkCApoFUlvOZWUYcBS%2FEEdDkx6rkXh5EFcyTR4khPbL%2FgqvLaYHUrY8uGCNKumKgVy%2BUDPqFABhTwloJkygypePoBW1MHEAnRRGUEaLXFLIrZX3bbL3p8aFCsQhIiceW25zO4KrMeOzRczqcKrsWTob3p1rpahaywdUnq3sPZ%2FiFSTpX035KYdilI9KnM6kt4MTO92tb1LVM8fVp0SFfzAVBAEBR%2F9vxC8O87xnEtMteH5MzenZWtlXhGfGHyt15Az8UokDRdU86pc6wi97Y1L9eaDYpvZZV1NlxPKYm88sJXI1mqlvjsFVk%2FUCRaQ3nQW5WPJist1te8WxYy11SZIVT3Mhd5rlMCOMO3Fz%2BZT%2B1KvzFN0YSMlk59JHmBTgnbafeGyGOxciuO8KLPrChxkCPJGXK979j3nJ9zzhYtUx6j4nmY2iOe5d%2FxG%2BmHnOfHVuAmugDmTCtNuc3KT0XPKvc6Wblabha3BKN3gVEE3EnF5pneopXCaCKsYvYFB4bdmyLktYo%2FXuR6qAZiwfIDDdwMpIEnCfgHnHl65yfbaLY%2BrRunfjQ6kHHfDl3Tp2eQ0z35zb3NvvgBtENSLdGNebyl7YfUfvXJhPMP6Z0cwGOqUBtSVmY2tc3RqmLSe6BGFI6EUMLGgi%2FcFZzW2RKJkREha01BAJNasZomgcA%2BKL%2FqFKh%2BPpOp%2BP4gmyFHH5nvXu9oImjuE8uvbXHH9hhHfUL58bEThMyfUdakgVnb9Cw9zqAdvcmmrqRAh3p%2Bn3xJ5bNNDL4V3wdb4iVztdS2VIVpDZTCgkj%2BmQp5cNFNOGvcxWPrL00IGqCs8IJiqxcQY1reKyHYhs&X-Amz-Signature=0ececd21c5c9c3d89c1e203edb727f4fd0ee11e26bf8be2195956ddcc3074fd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZBFCY47%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzDK5x2SDkSj0gvl9UHEz%2B7pn7lbkM3x6JN47Gq7lregIgCDWNcnSiCoiyaLQqYM%2Fb2uk1dwJRip%2FQ0GMqIpTv4ysq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDLi3Z5lkjCBfLgRtACrcA4kqqTV2lPEH%2BWgikB14CDUYzKkCApoFUlvOZWUYcBS%2FEEdDkx6rkXh5EFcyTR4khPbL%2FgqvLaYHUrY8uGCNKumKgVy%2BUDPqFABhTwloJkygypePoBW1MHEAnRRGUEaLXFLIrZX3bbL3p8aFCsQhIiceW25zO4KrMeOzRczqcKrsWTob3p1rpahaywdUnq3sPZ%2FiFSTpX035KYdilI9KnM6kt4MTO92tb1LVM8fVp0SFfzAVBAEBR%2F9vxC8O87xnEtMteH5MzenZWtlXhGfGHyt15Az8UokDRdU86pc6wi97Y1L9eaDYpvZZV1NlxPKYm88sJXI1mqlvjsFVk%2FUCRaQ3nQW5WPJist1te8WxYy11SZIVT3Mhd5rlMCOMO3Fz%2BZT%2B1KvzFN0YSMlk59JHmBTgnbafeGyGOxciuO8KLPrChxkCPJGXK979j3nJ9zzhYtUx6j4nmY2iOe5d%2FxG%2BmHnOfHVuAmugDmTCtNuc3KT0XPKvc6Wblabha3BKN3gVEE3EnF5pneopXCaCKsYvYFB4bdmyLktYo%2FXuR6qAZiwfIDDdwMpIEnCfgHnHl65yfbaLY%2BrRunfjQ6kHHfDl3Tp2eQ0z35zb3NvvgBtENSLdGNebyl7YfUfvXJhPMP6Z0cwGOqUBtSVmY2tc3RqmLSe6BGFI6EUMLGgi%2FcFZzW2RKJkREha01BAJNasZomgcA%2BKL%2FqFKh%2BPpOp%2BP4gmyFHH5nvXu9oImjuE8uvbXHH9hhHfUL58bEThMyfUdakgVnb9Cw9zqAdvcmmrqRAh3p%2Bn3xJ5bNNDL4V3wdb4iVztdS2VIVpDZTCgkj%2BmQp5cNFNOGvcxWPrL00IGqCs8IJiqxcQY1reKyHYhs&X-Amz-Signature=0ececd21c5c9c3d89c1e203edb727f4fd0ee11e26bf8be2195956ddcc3074fd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KLGY4WW%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDx3cUnB3UnQERnGY3Pv0X48mqsfrBiHGZIuxnt64kNVAIgDf4WQaLY61wxw50x4TDtRoQe26jjCHaJEtmouVWKKSYq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDC3IzZsfctB1zjogcyrcA3hpXkQhP5Un1Fj83%2By9vubVIJ%2ByNVdeDGUV5SaUFep%2FuEkhir9p78QxCgN5RVnFWI%2FtsbvSsuLa62QiYkabBdB48lF1op1zqYBCzd2Ew12a9nZ%2B7fTg1nVuAr3EZTqXtOVG10AkT83a4oQAtmQ8mz563QSS7zU%2FFYqLvyWZEVSSeRB88uSYn9q0JSuOVwrxaTZ40GpVtDCmJAvauNLGpT4MqV%2BS11jN8d9oRrsmkUxO4BCUM6MKd%2FhOMVenZbS4MV7%2FV9NClWtjXL%2BcSOpMTibyEOIyGciXIpakQ32Gi579UHpz5zJOJ8qV8xQNvUXtpRq0WfJc3VLVzMg2oT5zZenH1i6QCT%2Bc%2F99hFvF9tyNf8%2BPvofrqkSHYsuqPGB3OXeFWPAn8ZK93CK0WBXL2PBlCwXP4nGUAcd2gUEFGc6qw4vOs5fhXLTpz9kH1jC%2FsR2cpT5mAAjCpdExp5AVuwt794ek1phXC2mibK94FjvO6n0fomUpQYQtKY%2F50VkQJgWXjKAaa3hXFwjhNOWAVNOGkFK%2B1KLyDG1zPjqf%2BFejleyakVWPldgGCQrhTDzWrA2ENbrPF4FQQslwXYbi%2BytLAL11ie%2FFZjm5sEczalIMotD6jDWjhB0tJm0hBMLCb0cwGOqUBAEHqdaSNInSBovKZq8jZNqVPbhsBy%2BgRtfdrP9vqoM%2FOxgO7Z40cuFthzH8VjL7696Ybei5aUUroIE4l6g%2FjRxEmB%2Fu72K%2BukL75l4jxjYeddSuwtNlYN8eNa3YP71ptOY2BtRcn9b1JChk55ckSKHOTkrwRf080h4OuZc0LVQuS7lqbf9KYIzAbyJJGGhtj2F9wfnRijNep4znhlwLNUpyYS1Sd&X-Amz-Signature=fa9e1503da144d70714ff0e4699771dff0a5bd16755dcc25bfc19b119f99424c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6TYTVZH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFCKBM41mna405%2Fv7Hb3UxAjCnmniq9EDfTINCxPAhSrAiEA20s2AEnc%2FoBMBjif2sP3ZdwUA8NUa9z4UZOz2J1koAEq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDNRSKx5q9CLiuJhMEyrcA2i0nZVl%2FtEmTrs6xjSUyBe%2FGPsfXVEndP%2FNanbsUcW74VMHhqmKvwt8KHnIukB1aR8E3bKWR9GcSWgo6dINzjj2htFUFZEDl9JEdV63FdpAgenq96we2p3EdDEsQfYhfxFpQcPINWgxvD%2BPidLmn6m87iO7zu26OUdUgENSRtV6rxTEccw55FGRpIAh%2BwVIJKxwdQmUIobVoE5DPiSgy6Sxe2La%2FV6x6hxxq%2FLQPlCoiZJu02iLMaJnwcDXmK7t4Uhvt%2BEcd1ROG%2FAuX%2B75eQxnEMIjsN2lVEPMGQrWyoB0we%2BI0Oz0skl%2B4UJftCy2QdrI5zg3EXHyXhfrzyzHb%2B1YqD81Tvt01xUGtD0fQmDA3hBFiyGycJq8EICmmX7b8rAWXeDGy4LSQt0C%2B7vZXopCUu5535EqAhuMDs0f39i0eexu5y66mZmleJwDodIrYZy73q1z25tvYBuVdr3eLkO2mOiIkcTNmVwPwNjMWHdHyEU2NDT7sqz6cG2Wt786HsO44VhM8l8MHWH0gmEes%2BHK9FcAIq5AZoNxZ%2FGf%2FPxXZrRzp9lj5pPrA4ZNLszYET2r0%2BfiZgF6Syblq0V78YFxnaU4VRoKWvIDn3NHAi%2BfskBA7ArPnzHMgS3lMMCa0cwGOqUByz6coRyvQmc0ZhThh%2BikOjqR2cuafwPyMTp4oHSzRKsCMY6wVQkgXD2r0lyfXu3j36jtojOzPlrVbc1v2Q%2FDfq5s722Yg%2BXtvgssQ8ySLuPpMKXROta9SKoArtBx%2FLaUu4RPXmFxHd1BN5cVwAJHbcpIaXdBoh5b9zGtLTXRRgh2GDgWxf6aQxLeyP1WSmCeTGn1zyBx%2FwHwViKh6Y5pxaNA%2FxgC&X-Amz-Signature=d545b6c2196fa76041ef89a3721db38bcd25b33177aaf42ebcf0cd08925a567e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6TYTVZH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFCKBM41mna405%2Fv7Hb3UxAjCnmniq9EDfTINCxPAhSrAiEA20s2AEnc%2FoBMBjif2sP3ZdwUA8NUa9z4UZOz2J1koAEq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDNRSKx5q9CLiuJhMEyrcA2i0nZVl%2FtEmTrs6xjSUyBe%2FGPsfXVEndP%2FNanbsUcW74VMHhqmKvwt8KHnIukB1aR8E3bKWR9GcSWgo6dINzjj2htFUFZEDl9JEdV63FdpAgenq96we2p3EdDEsQfYhfxFpQcPINWgxvD%2BPidLmn6m87iO7zu26OUdUgENSRtV6rxTEccw55FGRpIAh%2BwVIJKxwdQmUIobVoE5DPiSgy6Sxe2La%2FV6x6hxxq%2FLQPlCoiZJu02iLMaJnwcDXmK7t4Uhvt%2BEcd1ROG%2FAuX%2B75eQxnEMIjsN2lVEPMGQrWyoB0we%2BI0Oz0skl%2B4UJftCy2QdrI5zg3EXHyXhfrzyzHb%2B1YqD81Tvt01xUGtD0fQmDA3hBFiyGycJq8EICmmX7b8rAWXeDGy4LSQt0C%2B7vZXopCUu5535EqAhuMDs0f39i0eexu5y66mZmleJwDodIrYZy73q1z25tvYBuVdr3eLkO2mOiIkcTNmVwPwNjMWHdHyEU2NDT7sqz6cG2Wt786HsO44VhM8l8MHWH0gmEes%2BHK9FcAIq5AZoNxZ%2FGf%2FPxXZrRzp9lj5pPrA4ZNLszYET2r0%2BfiZgF6Syblq0V78YFxnaU4VRoKWvIDn3NHAi%2BfskBA7ArPnzHMgS3lMMCa0cwGOqUByz6coRyvQmc0ZhThh%2BikOjqR2cuafwPyMTp4oHSzRKsCMY6wVQkgXD2r0lyfXu3j36jtojOzPlrVbc1v2Q%2FDfq5s722Yg%2BXtvgssQ8ySLuPpMKXROta9SKoArtBx%2FLaUu4RPXmFxHd1BN5cVwAJHbcpIaXdBoh5b9zGtLTXRRgh2GDgWxf6aQxLeyP1WSmCeTGn1zyBx%2FwHwViKh6Y5pxaNA%2FxgC&X-Amz-Signature=7e489693aae655133c32014589529a9be0f9cb51b436c011a8c38005eabb4ae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJIUWOWE%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAGe7zXgtDwkccTa2eRZ6BjkQ%2Bz7WRjbtiyioZ7FRO6QIgLlvDZJy2xClXb8aSsOB62D%2BMVtit9%2BoDzPXLSY8Q8bYq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDAkCTEI22lTKJEmjRSrcAyELwcLVdRc2RjQA0jUGZs1bil4%2BEQ3gtQ6i9CcAmQhfzrnvdg2pfy4U6nw4BUVfjBO8PFBt%2FfywAe2KOz0mKoJu%2BJxwYLdKvn9s7ZuZlnIYE6kMQaUaXaBCx3apXgxkugMVwDmiCFD%2BIBNb9EDY8IGLzd5UtN8e%2FBXg5T29To1m8rJPmgbOnqDZGGnllYDAy9rjn8HUfiueoQfcgknI4w2APNYj2KzBDEol9y21spG%2FddwqLe12hW%2FU3jCet18um1gJC8DKymidvlSnXoTZ4xvZpW8By3T174C2%2ByE30mCGerkIkntL1ZCbzmOqAbsNXUWpLeGvx9xPS%2BFJCrJ76fjUyxTEd0X7CdBDUc%2F5CSR6%2BwEm14tiDQOQGZV%2BoaBfmlWy%2FSoN4ZafW3mcpAmNk2vx1ofdvOxZ82aHn60g%2BaoyJoabTpxNwCfuDOSo%2BEP%2BqZdggc3cag7eSahrRoHyRDry1SwPBSdzIk751Lb3i9Q4Ub%2FozhZ%2BW209wMG%2F7RaR33mYKIUJCGt1FZu2TUcqe6DIzl2bnF%2B1iB%2FlsEMMIXa9rzYFHW0Xu%2BEG5T4WRyXY%2BoSkxAVfoj7AKiDjLvDzsZhuwFuAAC1km%2Bpn5HG1NMAarz2ZfC8bUhnGAtVMMLC00cwGOqUBEVLxQCisEIdyT9Xs%2FQbABkjvUjoRC%2Bjhq3obZEDWStZgW8zpXBQlVNfy7RX4wiZxpDOlXbsHFooNBr3GYekFEGTaMYFiD521YrWhyVW1UzSxVlUqzt1NP07FCMJnOke9nwJ9CLG14y8dOeoMpbcJi1sXrt6yPFGIC%2Fkq%2FnVNCYKaT7eQKU7o3dUklMK59bxyCthPLfaN88kvvacBSb9f1ECkhv1N&X-Amz-Signature=3ae5e8a9bfb903034ebf4387ddd67e6244654772cbd01cae48fd04d82d46d013&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQOLMCMG%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCblYTxFsNEVIQHAFB3HSqqPwVdImvyAyGKlu8eUhQOuQIhAMgT8QphbuXAPr5htvmYS%2FoWdEXT4DUI%2BVOnuFjuU0SDKv8DCEwQABoMNjM3NDIzMTgzODA1IgzAHWjV70AU69ydQNsq3ANwH7zR5iHJQrlZJvNSaVF8GX8y4ETgBzJfcgyPpCcR90W6Ysgi9Sr94np0h0bbdyXsLvDCUnMlhmjS0R9bErSFvze%2BbW8rUcbeDFXHb2MqWFjfzrVrSG9gCZ%2FV3U1hTiFKS6Wf9DPokANvizKf4EC8E0l4JKnmWAYCwNyr7pIgtIFMB419HbmsZzFpvBHui8kufN6WNN4DzlLm6leJFB6MFAeINSn%2FYO%2F7W7X0sDNHGhsIW0o%2Fl1NKvA9ZOl5%2F9zWKeLOrAPeLwRgMEmmnwmll8mPt6eRhBZzV5tDJgAy0cmcbL1xLTDZNGVrhAZVddUWgbTciG6BJsC26J0GEif33PvoHkNCkPjgA%2B%2FzTou4nMeL%2B9yIx%2BG7ahsHxfhfsHe6jzjUIUixl8BZsdVjOkgfFO9fz6qfg5vbnkDhfhQIluVp%2Fcumy4rtJNZl001nilOO2wYD3Dcrie7UVSSj%2F18SBMBYNPstTAX%2Fcs7xPpl1G805CsZXlfJA6voH9cXXRWD2LuYUSAcXDuGL4thszNK0KbonUbjYkhFdI2Zt%2BCnTTAew0jZMlRXwPN82vDC27ShjR4czeDuOYU9hpDw4znG8%2BSor8I8T8jU8kvSHJtFOemLOS9PMLkHINTf6dAzDfmtHMBjqkAVfm%2F2iB2Ue26XuZxXlMWehW%2FpRzA5uZBTkM%2Fs%2Bvs01e4dLKpsPJ1MFuZxBLB9%2Bu%2BLj2SMM2RIsgTwJjd8aHy8BdIWqjB0KZsvpaLNWKnUNOPfdcA6oPAuB2BkM0rVdrbse%2BvJlBaHO1V497UOpFBIO89MoQLAoMN4HdMo7xUdd4bKfROBDkvuJTsFxaGndYhq0B7Zush3LTFd1kD7KdzwNcyu3x&X-Amz-Signature=366af9436b2f29c044ed5e405a3c6dc6cc9d4d932e9153330f109710a1a82a28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6TYTVZH%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFCKBM41mna405%2Fv7Hb3UxAjCnmniq9EDfTINCxPAhSrAiEA20s2AEnc%2FoBMBjif2sP3ZdwUA8NUa9z4UZOz2J1koAEq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDNRSKx5q9CLiuJhMEyrcA2i0nZVl%2FtEmTrs6xjSUyBe%2FGPsfXVEndP%2FNanbsUcW74VMHhqmKvwt8KHnIukB1aR8E3bKWR9GcSWgo6dINzjj2htFUFZEDl9JEdV63FdpAgenq96we2p3EdDEsQfYhfxFpQcPINWgxvD%2BPidLmn6m87iO7zu26OUdUgENSRtV6rxTEccw55FGRpIAh%2BwVIJKxwdQmUIobVoE5DPiSgy6Sxe2La%2FV6x6hxxq%2FLQPlCoiZJu02iLMaJnwcDXmK7t4Uhvt%2BEcd1ROG%2FAuX%2B75eQxnEMIjsN2lVEPMGQrWyoB0we%2BI0Oz0skl%2B4UJftCy2QdrI5zg3EXHyXhfrzyzHb%2B1YqD81Tvt01xUGtD0fQmDA3hBFiyGycJq8EICmmX7b8rAWXeDGy4LSQt0C%2B7vZXopCUu5535EqAhuMDs0f39i0eexu5y66mZmleJwDodIrYZy73q1z25tvYBuVdr3eLkO2mOiIkcTNmVwPwNjMWHdHyEU2NDT7sqz6cG2Wt786HsO44VhM8l8MHWH0gmEes%2BHK9FcAIq5AZoNxZ%2FGf%2FPxXZrRzp9lj5pPrA4ZNLszYET2r0%2BfiZgF6Syblq0V78YFxnaU4VRoKWvIDn3NHAi%2BfskBA7ArPnzHMgS3lMMCa0cwGOqUByz6coRyvQmc0ZhThh%2BikOjqR2cuafwPyMTp4oHSzRKsCMY6wVQkgXD2r0lyfXu3j36jtojOzPlrVbc1v2Q%2FDfq5s722Yg%2BXtvgssQ8ySLuPpMKXROta9SKoArtBx%2FLaUu4RPXmFxHd1BN5cVwAJHbcpIaXdBoh5b9zGtLTXRRgh2GDgWxf6aQxLeyP1WSmCeTGn1zyBx%2FwHwViKh6Y5pxaNA%2FxgC&X-Amz-Signature=7ee1ada58e767eb6a46d47d44e0679a37d151a7dc262350929f23600066e422d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DA2SLVK%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHO8yHR3Apd6jV894DSor1HvdNhXnC9cSbLPdqv5sIWfAiEAj7dpSAQIpZNheaW1nqZAPGh%2B2yY3ehfKocBsnskKC3kq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDIxNw6ceZPmnK5zyISrcA6Z8pYjuFGFSwqc7trjS8JmgRoUGudDpN7f%2Fir6g6Eos%2F1VjqIqXsxLi8cx%2F2XsocRGZA%2BOtsYOj1UCVFaN5V3%2F8k3GN6%2BDTF%2BC9SVPIxeFHSqfaDPvHicogKT0AhVbJXET4gEzegs5xyGHDYpRjX3ojeP4dAITEvXZB3nmZQ4CcLRNUpqzbn7Tctp1onrcJ7wfmD2soTvWujoTuXzsFUojc1ZXjBhlVBirdCsds6kBF90SHKnFt74%2FpK6J3fzLZPWKGW7LLPhUGZZzsVIlmgXSB8hD1OJO4hFM8b%2FgYcPiwYFoHFPkxNO5emP2ZPJ7Y5rHQgFZHc8uOnIB0sdSK5ZageNZOFxCOvrGpgQpauL0pI2Whd6lKgyTgES%2B9jQ3gLKfd1dJSHpBXzqmHs3eS2F6kImIYz341FcUHLAOXjZ1emgxgh1zgnj505NvkjhO5hR7%2BAMZY1eAVm5US%2B7JXC7NNTFXk%2BS%2FhzokIXCi53I8CBlw3Z8hV4xF9NHmA1%2F4velJuiVkLgSBQzSePX9khnT7xOnuR1lGJAMCTlIrkLgGGIeGcH1eV669BAmRhtM3D7hRjabVSI3G4JTXGrnY0RkKZJWREM0xmOPF%2FJWZWRlCcszv%2FV8fyxveFh9jcMMWb0cwGOqUBgejlMoyU2u0o5YFw0%2FHWiaALcGguuv1xCA3yMrpC8P0IwzqeoCSI2dZJi3Nyk4mRJLD%2BB1S6nvrcIW2qPK8J%2F4jHez3sUCE34rdptVQPzMPNtmKZtAI40DtmaQ7rwoYc5MPRduPNcV8hh31VtG9ZXXtdm33sg95qHqzGpyLwOIZF8kHrZHeMNGPMZSfRKqScqBOvHG3X8e2QzBh8BLR9%2Bw0PcLHt&X-Amz-Signature=34c5d47da8409099c6a33116b732d5b3c22f481897d4b90459658239977a92c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DA2SLVK%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHO8yHR3Apd6jV894DSor1HvdNhXnC9cSbLPdqv5sIWfAiEAj7dpSAQIpZNheaW1nqZAPGh%2B2yY3ehfKocBsnskKC3kq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDIxNw6ceZPmnK5zyISrcA6Z8pYjuFGFSwqc7trjS8JmgRoUGudDpN7f%2Fir6g6Eos%2F1VjqIqXsxLi8cx%2F2XsocRGZA%2BOtsYOj1UCVFaN5V3%2F8k3GN6%2BDTF%2BC9SVPIxeFHSqfaDPvHicogKT0AhVbJXET4gEzegs5xyGHDYpRjX3ojeP4dAITEvXZB3nmZQ4CcLRNUpqzbn7Tctp1onrcJ7wfmD2soTvWujoTuXzsFUojc1ZXjBhlVBirdCsds6kBF90SHKnFt74%2FpK6J3fzLZPWKGW7LLPhUGZZzsVIlmgXSB8hD1OJO4hFM8b%2FgYcPiwYFoHFPkxNO5emP2ZPJ7Y5rHQgFZHc8uOnIB0sdSK5ZageNZOFxCOvrGpgQpauL0pI2Whd6lKgyTgES%2B9jQ3gLKfd1dJSHpBXzqmHs3eS2F6kImIYz341FcUHLAOXjZ1emgxgh1zgnj505NvkjhO5hR7%2BAMZY1eAVm5US%2B7JXC7NNTFXk%2BS%2FhzokIXCi53I8CBlw3Z8hV4xF9NHmA1%2F4velJuiVkLgSBQzSePX9khnT7xOnuR1lGJAMCTlIrkLgGGIeGcH1eV669BAmRhtM3D7hRjabVSI3G4JTXGrnY0RkKZJWREM0xmOPF%2FJWZWRlCcszv%2FV8fyxveFh9jcMMWb0cwGOqUBgejlMoyU2u0o5YFw0%2FHWiaALcGguuv1xCA3yMrpC8P0IwzqeoCSI2dZJi3Nyk4mRJLD%2BB1S6nvrcIW2qPK8J%2F4jHez3sUCE34rdptVQPzMPNtmKZtAI40DtmaQ7rwoYc5MPRduPNcV8hh31VtG9ZXXtdm33sg95qHqzGpyLwOIZF8kHrZHeMNGPMZSfRKqScqBOvHG3X8e2QzBh8BLR9%2Bw0PcLHt&X-Amz-Signature=c1c124e0c8c006b28bd484ba9311706f694fa4c13dc150acb3608801756de658&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKVISDTF%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIj9kwfL%2BEAJIok%2FLNWM7CB78VNAsN%2FY9R8v41L13CVQIhAJcsq7jS4R%2BQd1ecGOdvuP6fgR7mv1UiTf9GcCloa8CNKv8DCEwQABoMNjM3NDIzMTgzODA1IgyJygsQfUWS7OA%2F0ooq3AOWirMOog97oh5i%2FBTNUBrVnYnHU1RATPeT3httYI14MvBDHyw5IzehO0lFXKzCFELMDSl39C6nCNsFFsLD%2FA773KaypFjP4SM7Oih8T8l487fKSceFIffKCgxvv1YAA9bFwMSTf4u8zZmqQ1XiBkFMdwqKZEPS6WBkNMe%2BkxAGKZD0KslyRy%2FOr8peblVpb9fn%2FBEZkDSWQMuPbAmFVE%2BQZclRDpSi6rHwGWHzwsWRm0wHgpg8cRHdHOadwjgOiVaHReH7okKGS5H0VTvdbFmNFYVb74yCxDgmTQayfeY1om2pAObgKDthXFAfovu%2F9c3S%2F94ZyT0qVkoyPZqtZrefIdJXJQ42c%2FRjyQTtj2VXmDINc94YP%2BWnD5oMgdxuXPaAzGZ70QeEN9ETsRZtEnzrGas929B6JPDmKxFjPxbrUi%2B0OvzgZHp2Hc9G66L8BkwXHtCXqafHJFUh3kcG%2FywB5%2BV%2BjASA60OzYZOyweN5xMkLQvEVT7uPED1ig70KHSSzY7wlcoTB8lj1lNyO6xMtxYZxKfi%2BSDevYFyGUpPKXSUhN05592Jri5OzaF7qSdvwZ%2BgjnCmc%2Bq%2FJZeu2MysAxcR9Y0VfMvDY5MEmGTTkEeMFKUK1mPSNf3oe3DChmtHMBjqkAWwzRHic4ZxywT0c3gADgojzCoJ7RVSmOasJE72CimpFxTnatXWsetrz1tBP2aolleZ6E3JSwo1Kv4x26XfjfI4PRiWRSypzETxVmeByg6Z0PNeiRvlGOLebxeUGjufIPuekzaPNnLpWwANbSdx5foxdUWLMHxPHd%2BlsrGla46RReppyqZAYrV4%2FGwfjVC5J4CGkUCveUE8gxX1%2F0pQ5UOVhvQ5T&X-Amz-Signature=b1c530ee169b2be630c69b38c388ff6bb83c3a927224f20c3451e3861f7e3b9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VAPZJ65%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAjeDmxZLbouPe%2Bpq%2BHnrBf4rQGPBQBbV7pUq3%2FA3QxXAiEAmT5ewIWbtSgRhQ2PiCGXfm5HWYwcccT4odOrRR6%2F7J4q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDAfT%2BqXkJ%2BnWNrEohCrcA8o8YWFDMde9h5glgGWYujig5R66uDkrJ6HURrKzKiyNXH57HL%2FAB7SD3QiKt2%2FQZyKHGMM34%2BygeBT6L84pc4JShvSy0J7bm%2B1tB2KLQKE7Nl4XN9UROt%2FCWJqCjCqxsegutpD%2BPNzp%2BhDvOycXTVA1z01wolQiXesertpRaSn8WyJJKxM3Mpn8kQyda6xFBWF26ojVNvQlaiHv%2BQw46EOV88zaOpsvy9ERomt1oy%2BMQMSmzRcaJ4%2FVR9NKbICxzx8012VCNAAqWxt6rq%2F99jRJHl5WT5jb86ZIWAfGaaOHncyDR9O8JmIxqzbjdmKWv2qwGQhzVRoMExBEacD667toK3RZ8%2FIkYoZfXHwaK4QBWRssfvLzoBeIi7OvVNiZjXNPhkU4dk8F8WWhu6xuCTPhON7KR1mkBOYVJRBtbtMQsFGzAaBEjI9k%2BfBt%2BArl8Lyg%2BuPmeALMJRSe04uiZZvQd%2BEjo5cwXqwf8X7H4eQHHlYfOD0FClXq%2FkcZwPp2A%2BNX7WqdrKzkro82vwQuLpGMbPL7GUq8gnAYAGfwgNtVtIYiCq1r2tuW3diX4sQxfpTBHazwf4wI2b6KBSxMqYNTTcgPz4oULN42JEg7h82DM%2FG2ZzC66cPdO1G8MPuy0cwGOqUBpBt2dI8xdvOfj7wYVFHHJ2exxhSeCAs1QUQYY2y4Sir1R6MR%2FHBJNmwgMJgrJk42S5%2BscryNnontC8lYLFjRJ03uvci%2Fw6%2FQoQws12ywUI2tInJPHCTF%2FnpCPWsiHO8v4LWZvV1pH%2BbgnCr2Ap9wXLn90SoIWKES0aH%2BXW446s8SyREfrSEDz%2B08qAHOTSRRD3u4rUCTJ1Lsg1t5LvUlksu3zXgD&X-Amz-Signature=492d32079fbe6b7bc666e6915753c0f4abc93176f7377ab4d4a27469c41b66e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VAPZJ65%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAjeDmxZLbouPe%2Bpq%2BHnrBf4rQGPBQBbV7pUq3%2FA3QxXAiEAmT5ewIWbtSgRhQ2PiCGXfm5HWYwcccT4odOrRR6%2F7J4q%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDAfT%2BqXkJ%2BnWNrEohCrcA8o8YWFDMde9h5glgGWYujig5R66uDkrJ6HURrKzKiyNXH57HL%2FAB7SD3QiKt2%2FQZyKHGMM34%2BygeBT6L84pc4JShvSy0J7bm%2B1tB2KLQKE7Nl4XN9UROt%2FCWJqCjCqxsegutpD%2BPNzp%2BhDvOycXTVA1z01wolQiXesertpRaSn8WyJJKxM3Mpn8kQyda6xFBWF26ojVNvQlaiHv%2BQw46EOV88zaOpsvy9ERomt1oy%2BMQMSmzRcaJ4%2FVR9NKbICxzx8012VCNAAqWxt6rq%2F99jRJHl5WT5jb86ZIWAfGaaOHncyDR9O8JmIxqzbjdmKWv2qwGQhzVRoMExBEacD667toK3RZ8%2FIkYoZfXHwaK4QBWRssfvLzoBeIi7OvVNiZjXNPhkU4dk8F8WWhu6xuCTPhON7KR1mkBOYVJRBtbtMQsFGzAaBEjI9k%2BfBt%2BArl8Lyg%2BuPmeALMJRSe04uiZZvQd%2BEjo5cwXqwf8X7H4eQHHlYfOD0FClXq%2FkcZwPp2A%2BNX7WqdrKzkro82vwQuLpGMbPL7GUq8gnAYAGfwgNtVtIYiCq1r2tuW3diX4sQxfpTBHazwf4wI2b6KBSxMqYNTTcgPz4oULN42JEg7h82DM%2FG2ZzC66cPdO1G8MPuy0cwGOqUBpBt2dI8xdvOfj7wYVFHHJ2exxhSeCAs1QUQYY2y4Sir1R6MR%2FHBJNmwgMJgrJk42S5%2BscryNnontC8lYLFjRJ03uvci%2Fw6%2FQoQws12ywUI2tInJPHCTF%2FnpCPWsiHO8v4LWZvV1pH%2BbgnCr2Ap9wXLn90SoIWKES0aH%2BXW446s8SyREfrSEDz%2B08qAHOTSRRD3u4rUCTJ1Lsg1t5LvUlksu3zXgD&X-Amz-Signature=492d32079fbe6b7bc666e6915753c0f4abc93176f7377ab4d4a27469c41b66e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQXIZ2H6%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T123023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCB98lSA9BnWzGYxTlKvdeRzKz8MGvv%2FjKvJxsy5LrUNQIhAOl%2BTVtSGjhOlq1XW%2BxNb%2FmPDKZOet3NIYknFY4QkmYmKv8DCEwQABoMNjM3NDIzMTgzODA1IgwGOeyKU%2FnL9yJgsy4q3AMG4Pbv%2BR88H2B9gP2zO5J9%2BlU3isMqyPtezSzZCVEcn%2FZlbvm4h5a6f55hsZpIV29btR80CDFAD5Sh8FWRug%2BzvCj4oBt7BVQ2X9xW53vdLwKRbtw5KIS7MGDodvP5Wcj8X4ID%2BOj6ReHyzs8R3Ji6a3yXEMVTrWVqmIkvtE5Nydij5IxWPZUFlkZ7x16j2CVcZQOPTm%2BZqhQmrpoXQSFu36Z9azDdLLJWwSLN740W4oE1mp62yO7Fe8JNneSTEjmAHgu5MvIr2ZNfAHW37yOiI%2FFaajXLubzWs3gdvS92e0aYTwAhbvmRmVUjb190QargWmlIOZKXPR4YQ4UD3fSkeR5K7MMjcwxuY4kqwumRpEnUdDH5oaiqzGLnRSR%2Fprjn8ciNpm47xxIxDnEn%2Fd1knu0GrdTvyJn1Ua5YDVMt0iiwXNCfOYWlzVOev4rc88aZzgNljg4aQdKw6nNY74dGLIL%2BuM4hf5vhj5fA3%2BIEss0dGcXjodqHKY5XpENpo%2BlablquMsC%2FopUNxkNgsIluVGLcNLsOgemVna7GYspPXB245TDl0vlXi4jfWqjdMPTKpciD6XoXP2nv8j3hUz2a1UfAMGHzw22prqw8s8Ix0XUFJKraDRECA24VLDDAmtHMBjqkAb%2BPeMVVhEi86PaRE6zp%2BpYke%2FOEo7batG5AlMJaYqMqExQJJk3UnkgBFL9OF0FgZIF0zyPMxUHIXWPhHfTyGlolTGDD2VW8q5XZ0FzSS19U%2BgHnIXohB43s9j7pfcu1qhl6uh7jxqCA3sw79PzSj0owDxdRs5W5w1ixAYmbyok9z5163s7m%2FLWcmGK1VhPeMLKDT%2FvOh%2FizNmYqkdRQswe2Hg0h&X-Amz-Signature=19dc26db25dc3799923d532dd4aafb8b8d1d3216b652c5347e1660d4c3643325&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

