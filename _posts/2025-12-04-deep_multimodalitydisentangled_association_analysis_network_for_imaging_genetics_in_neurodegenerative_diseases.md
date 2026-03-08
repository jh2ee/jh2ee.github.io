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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EHVHKXF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIEQUy12EIRTYvnZwzrTBH6kqD%2F179TyDsGh6nxa69BMMAiBQnWDsQJtRKrbJ62%2B%2FggJIjVohXCCBnLLAr2MCgHO2QCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIM2X2URDvh4aqu7bOkKtwD6J%2Bq4iBTt%2FxnLRhGW42Cprlqb70pFV%2FvkYp5b59%2B48rzeXloqT0P47ZxkJYaHcGbbqbuKJqyhCJMBwjd1FgHDxtWhjxZK1DPeCAPUF%2BX9Y8zmnZ8VGAHmtcmO9STvOhro3Q3XDvHV2urw2Jjcp8iOM%2BRhT05PxMKbmNYzPMLxlMLrj%2FAUiF9fSvEPRpUQvUjeyU5zMFaov%2Bc8H9nJ%2FmQ1%2FB6zWpH281rRhiF3%2FZ9KFpSOZDCRg1y7Ay2MV5SJF2ooprdFN6%2BhQuuwbK8Pkm3VasfdF%2FWhj%2BysH9dO%2Bi8uERfoWghet2lreshNdk1fA%2FgJFwxOzxsGT8U83nDGVqks5ge%2FmbTC4t2OFI037KfVAX0POqnTTLxjE93CT564H4gzJgjGao7ta2O7%2F5ApbcNLKL7so%2FrQVhyATPyEHVU4bSxf2ZHuxPV3qx4LglMUQzQVK5Zp1tz%2BnuXjQniOs14IIbHXMlDvbBzXG6Lr%2FKDkmWz%2FS6fewp57Ob5ElndK7NAyNkqpsYlZU%2FT%2FwyT8WjGxsVBWlL8cwK%2BTdE6i64N6%2Bx0NrZT47Zsf1A4nbW6htrtpG2THua2dzOIBJjtsY81CSw2GYE3NO5yL6T9yv4rukz0H5zri2m%2F0qf%2BgpYwsvazzQY6pgHXSOb3XArNwoeAH7YGuhF9eWFotMZhVyK8Zv9mu9sfSvKg8I%2FIZC03xTRGWdROt3Gm7NX%2BB38kCpLGc4%2BYUI%2FzURzWseLKm6YlrQQy9AcfJksrxXZVzXh9INJ03EeW0Wb3Gy4LFDxtTWo57jfuF33ZygF%2FQo0%2F2H2%2BApTiay%2Bbp%2BVssHtoQqfrj9P6xy94fy6DPsiMDJRVaNPRBRw60dnbPV0Rj2rP&X-Amz-Signature=60b24a08c52c4984089fe3a2ecb1644c5bfeeabc82bcb5356dc0ffb274de719f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EHVHKXF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIEQUy12EIRTYvnZwzrTBH6kqD%2F179TyDsGh6nxa69BMMAiBQnWDsQJtRKrbJ62%2B%2FggJIjVohXCCBnLLAr2MCgHO2QCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIM2X2URDvh4aqu7bOkKtwD6J%2Bq4iBTt%2FxnLRhGW42Cprlqb70pFV%2FvkYp5b59%2B48rzeXloqT0P47ZxkJYaHcGbbqbuKJqyhCJMBwjd1FgHDxtWhjxZK1DPeCAPUF%2BX9Y8zmnZ8VGAHmtcmO9STvOhro3Q3XDvHV2urw2Jjcp8iOM%2BRhT05PxMKbmNYzPMLxlMLrj%2FAUiF9fSvEPRpUQvUjeyU5zMFaov%2Bc8H9nJ%2FmQ1%2FB6zWpH281rRhiF3%2FZ9KFpSOZDCRg1y7Ay2MV5SJF2ooprdFN6%2BhQuuwbK8Pkm3VasfdF%2FWhj%2BysH9dO%2Bi8uERfoWghet2lreshNdk1fA%2FgJFwxOzxsGT8U83nDGVqks5ge%2FmbTC4t2OFI037KfVAX0POqnTTLxjE93CT564H4gzJgjGao7ta2O7%2F5ApbcNLKL7so%2FrQVhyATPyEHVU4bSxf2ZHuxPV3qx4LglMUQzQVK5Zp1tz%2BnuXjQniOs14IIbHXMlDvbBzXG6Lr%2FKDkmWz%2FS6fewp57Ob5ElndK7NAyNkqpsYlZU%2FT%2FwyT8WjGxsVBWlL8cwK%2BTdE6i64N6%2Bx0NrZT47Zsf1A4nbW6htrtpG2THua2dzOIBJjtsY81CSw2GYE3NO5yL6T9yv4rukz0H5zri2m%2F0qf%2BgpYwsvazzQY6pgHXSOb3XArNwoeAH7YGuhF9eWFotMZhVyK8Zv9mu9sfSvKg8I%2FIZC03xTRGWdROt3Gm7NX%2BB38kCpLGc4%2BYUI%2FzURzWseLKm6YlrQQy9AcfJksrxXZVzXh9INJ03EeW0Wb3Gy4LFDxtTWo57jfuF33ZygF%2FQo0%2F2H2%2BApTiay%2Bbp%2BVssHtoQqfrj9P6xy94fy6DPsiMDJRVaNPRBRw60dnbPV0Rj2rP&X-Amz-Signature=60b24a08c52c4984089fe3a2ecb1644c5bfeeabc82bcb5356dc0ffb274de719f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626TDRLPB%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050334Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIHJ8TMd86mzuyx57u0Tz7gbB%2FCYqfYUnOesRRZDc47dyAiEArc1m3JtxPmisztVmV%2BFmxaH617ywXYXpMVg8rJpWOSkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDDK0Yux8fqN5uJsUfCrcA7Wp2AEPY27MNFqzaTe9GC%2FkJsmnSl2R9QryPyxs7QnB6%2BKdIZym4tsqT8m8weAkdVporD1GzmleTx0%2BUq5iBTr%2B88l%2FOaPtAXCXJQPHMWj%2B%2BfK8OkgYh0mbNLDhMbeWB%2BP9bROqzq7jVZUZFygwFHH0%2FBIJfaVdEB2njJ2oLP2rk0xxa9GxAnY3jhjq%2BrRq9X%2BYop0pu7KTahYIt%2Fx9Io3wiAuVSyUrmmRnIyDEBeQ64tAZV8m0fi9mKX4lt%2Bo1mpEWcTOn1p02TUSiEJzItskLMA8cfqP4lWf1UMh3lCNrINXQ%2ByU3WlmXM4UNg2O7uB999wM9coT6Wk6cQWcvJWQnB868fk2h8ed3q5kF8eqpgt2ZzfS5XafsjhpdVZaLECro56GJlZOU9m7%2B9dfoycEhoYlUlRdYf03%2B3ONKoUz7X4VgDVZJIO8OYHDTvgDwT%2BNID3KOSJR5b0avdlde6pmHeA%2FdxUXwmg4mmR6C9NPEmarbHGZ%2BvwLiKgWcM%2FAn59Te4nz2q7H6HvwRNCKFjFrAtPJ0%2BAHKyBCkM4yvjMs6vZJ9SviVX5%2FvM%2FhZi9Q%2FoQiQLw2JJqpKvjZL397tmrDTdWFd1iKcDTB4%2FR6BBBBRjhPXMs8n%2FVtswAipMIf2s80GOqUBYFNOLmqNHgvRFp9fmkKRff2hKhkqz9mYj9w%2FHv5oZ76EOHIDRnS5vauwGPFEqAQKWpoY0Eg%2BfdwjrdFJ6QcLe7tb0MrO%2BlbQwb7eQmTLZwLdmM8udUa50jcplOnU47lAv%2FzcNGkc1dBkuoe0qFYz%2F3RflgjGRNeWTjTDvg%2FIzXzrwRFRy%2F5s5dB%2FqGN18OSdoD%2FjVOYU%2BXaCZhcOsdYXJQ6SwBRU&X-Amz-Signature=82ad8d10ad648e90e141747c9f192cd1fd9b494347178aa47f82f4881414fda2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BARKBOQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIHbf7IvnXgh0JnuRKG1Nx46Yxs89XJYYQgA4mEYSqwi6AiBNmY9Ws8JYvBKbhGqvsAi9GuLBKBcTVxsPwySZV%2BC2%2FSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMA0BXu6qznEdy0RnYKtwDcOZD3OKsEiU3R45zfxB6PrW8n4r2QtVMPjNaVJH4E8GD11PzGEVXQteuHkWoKSbR49%2Bk3PUPeNeuFHDYit7NU8hq0IwZ5ByELFPLHlkd2j4p%2FBiaTMxZq2VmF2puUg%2FG%2BPNUyYwC%2F2sMmyOFomheqS89%2BLArG5MA4zj%2FrCsFJuQMNLsOcZrefS5azMgWBetC594zBOUwZroLNR3%2BXPctySrxn7RIwY49ljT9hGm0MjZfPQWh%2BXASxhRxvcQk6f8FxOeL44HM3Dcjdr3pP2tFmxXNuPMU%2Fe6QYvfV%2FYOEBLLW%2FIvSwTwxVvDGc4x9aE3PInD9TblJH2VtDOgut626gKJmXUc5GVtkCUl46Mn2Yv0m3USB%2B0JIpPfZhLC%2FggTMucX3akqAKdU3y5aV8O%2BFobQ9eOM3RAis9a5I2bN6TM57E7C8UQiuPw1nRED%2FyshBEMAZsiGDGPrTwXgYdvCLlgJTRI9e2hyOOGbPHkbLwVFzWiY4n9%2B9WP4GoZji2cvGtfIlMAL2Ge57EvBPb2hm43dWUSb%2BD2g1LkFYQsv9RqsTH1dItyRQFxf3fDUemOSusZPcnLBB3wBOOz2bePwSos1G7n3tNpsK3LagBqoEanA7T2slaAl0gLJ2%2BS0wrvWzzQY6pgHc0sjolmDduL2FDXA6xwIt6QMQJDYApU8MZ1M%2B2gfbvubOLLUa7aG81%2Bfc0gEpSteDJtf3NYo0upC5xevO4E7JxB%2FKjBcLM1yntA56zFFZjRSyQBuV6skQDsY71ED8vLflW980EQetjA4gYnrDGxQnUDVlco2Mj1pMvkdcRyQn2jQquUH27XCPQQANOYUJ8K1R38tMlDtjuhLJvJeiXhHeKSfSdf9o&X-Amz-Signature=3dc3d9143b9843629ecee46ce6e1eee62577ca72211053793ab6507ba72cd2e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BARKBOQ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIHbf7IvnXgh0JnuRKG1Nx46Yxs89XJYYQgA4mEYSqwi6AiBNmY9Ws8JYvBKbhGqvsAi9GuLBKBcTVxsPwySZV%2BC2%2FSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMA0BXu6qznEdy0RnYKtwDcOZD3OKsEiU3R45zfxB6PrW8n4r2QtVMPjNaVJH4E8GD11PzGEVXQteuHkWoKSbR49%2Bk3PUPeNeuFHDYit7NU8hq0IwZ5ByELFPLHlkd2j4p%2FBiaTMxZq2VmF2puUg%2FG%2BPNUyYwC%2F2sMmyOFomheqS89%2BLArG5MA4zj%2FrCsFJuQMNLsOcZrefS5azMgWBetC594zBOUwZroLNR3%2BXPctySrxn7RIwY49ljT9hGm0MjZfPQWh%2BXASxhRxvcQk6f8FxOeL44HM3Dcjdr3pP2tFmxXNuPMU%2Fe6QYvfV%2FYOEBLLW%2FIvSwTwxVvDGc4x9aE3PInD9TblJH2VtDOgut626gKJmXUc5GVtkCUl46Mn2Yv0m3USB%2B0JIpPfZhLC%2FggTMucX3akqAKdU3y5aV8O%2BFobQ9eOM3RAis9a5I2bN6TM57E7C8UQiuPw1nRED%2FyshBEMAZsiGDGPrTwXgYdvCLlgJTRI9e2hyOOGbPHkbLwVFzWiY4n9%2B9WP4GoZji2cvGtfIlMAL2Ge57EvBPb2hm43dWUSb%2BD2g1LkFYQsv9RqsTH1dItyRQFxf3fDUemOSusZPcnLBB3wBOOz2bePwSos1G7n3tNpsK3LagBqoEanA7T2slaAl0gLJ2%2BS0wrvWzzQY6pgHc0sjolmDduL2FDXA6xwIt6QMQJDYApU8MZ1M%2B2gfbvubOLLUa7aG81%2Bfc0gEpSteDJtf3NYo0upC5xevO4E7JxB%2FKjBcLM1yntA56zFFZjRSyQBuV6skQDsY71ED8vLflW980EQetjA4gYnrDGxQnUDVlco2Mj1pMvkdcRyQn2jQquUH27XCPQQANOYUJ8K1R38tMlDtjuhLJvJeiXhHeKSfSdf9o&X-Amz-Signature=42fd0a9b8398ee2aa3c0eea3e27570b93889c4542068362da35d753aec097fe6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJBXVT2T%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQCYo%2BNjddglSXp2Su6aVOYAoBLperEwV4ciXeyueSIBqwIhANCGyeY%2FVosV9AEXo%2FdGmMPd1zJP%2FtJNe5ymsBK7bzInKv8DCA4QABoMNjM3NDIzMTgzODA1IgzFsXrw401YIZNARfQq3ANgZpI%2Ffjyh81OHxwE4oGNyV9ypuNbDlk6LJJQ8up2ksd71g8r92ikbSNsHWC%2B%2FB%2FUlM%2FwWRvUlOMIgHUjaZ6wTcQmaSP3kF6Vfhkr5VMY3M85ksMs%2B%2BreKUYBR5Vom6cCGh%2F612yI54Yl8g%2Bcp6D1MwzIB1Y31FEHEUImRSAGntuvD1%2BtvVeTSVwwN3Me95j%2BR4XveDmzsBZKLd9A%2BCs%2F5qTs0Baij4tQAwsxm3ODa9gzKeiPUyQtU2Ie7bvxLpl4Yt7%2B4jI3vT7%2BLKVEaNDHI2ZMWQ%2FWylQF2AuOj2gxVc6iwbYK%2FpoOvsxf4MJW9iNizwIDqL37Tbm70fK0%2BCQVyEJ%2FpLIOStkFm6VoJV1CplmYw91Q4bsWWIu3L%2BSmvNMMiKj7CA9xNbuWNoOvkmfD%2BaFMggJr8J%2Fry3BErD4ytE8vinoOH7J2N3x8u7RmuBsUUKutpoHnXpynPCJ%2BACe5HrOmFyXBBCGXYZXgMJEP6sTi606vLarnZBehvAuVHAD9tjJUNkvcBPzqxD67zsslMY293Cp62jydz2rcrnSQfoHi2l625L9GR5Zr5vfQjF%2FebdaGKiHDo1HpywU5Nw3opOcVoxL9%2Fs%2B7reC4ewNSlGbazCP3YURp%2B%2BCR9BjDp9bPNBjqkAb2WB0Mekr61YLC7BY49RksJ%2BSnOYdtwQj%2FUf1C2DUdgEG56eYWC4WsW3TaZDMIHIio3mf62WqzXfq8S5AVmqBKh5JMfjCuDZNW6KiN8iwqvbsHRR66mI%2FpXdNu0Y3bgy5C5PnLcUNGT7emHu6nno%2Fx2LROoap3EHCx%2B6HiO4bPlhm3LdsWaanscIlnny13ERP9t1jKmXOm%2BhBU4mQjdz8fQq1O7&X-Amz-Signature=a3c07e93e35f82b7577989498beb9f0705b492e82c5aad929e98c9d819da8200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVEJ6QU7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDZ8ahsw5HGynkvKlqYisDnN%2FuZ0hGj%2FxEH088CZ3P1vwIhAKLNm7NZoxw0S9Z%2B9FTxQh2QrF06lRR3gi%2BENffrHgH%2BKv8DCA4QABoMNjM3NDIzMTgzODA1IgxRW3BG2bj7qMP2RfEq3AOWrUsWUTLPcfqprwBPPeZO%2BawJvvfEwSG0qgGOXJojuqS3ulI%2FKQxNL9U5K0REZY7gq2%2F6mlwRujrvkdNg7IEY%2BOmH1WkOnU8QNSXgYvAvELG%2FD6BR0W6Sn7w7h9K4zYr32CC25sf2GTTFqdxEQTPCfILEnIy1mmGJO3l1oyi8ZDwH4Jg6AumLv4RvHkmKJyBafJm%2Bx3frm2r01u1OXREvcSP5T3o01vff2F48xbrkhwVU0IYUjZl1OGKa4H4AR02FAYcb4I3a2p6%2F%2FLPHFT0n87i%2BLhlNkdM7CUQyXjRuXcd4p5BoWmKaOrvxqdjb6lkV%2FPHC3EEdqDQczE9HTc18a8kXgdDIk2c00QmVUHRVR7uy9zk86u%2B73XP3IOBcBs37%2FZsNcDlRquImiVQh0ikQEJwRtJw4U2GybcTwPBLId2p66ymt6h4okGg%2FausYqVgCYIAxHbTfjoqXmdo77nO%2FRSAq7yIXNTt2%2BdrQxjP%2FFosDbBpARapE6dN9Iztux3hDmYfENwv2yGBqOOZWi%2F1jlpg6VLWx7HOPpd1lLo9k8amrsG4b3XMOFGEMYnk0BDUB%2FBgru05Wry%2FM1Bh63sn7l0pBU%2BT4Xk1aoe0p%2FGui5CTodFZm5L5kFs3j1DD29bPNBjqkAeymPxNGLSeOFciwE%2FJHVvBwEz4VxMT0Xs17OAHRFoDDeUyIz4%2BhpNQvUDXZ3lYlDUKuHoClFwQ2ts%2BzTxGINTC0cpqsLAiAWpe%2F5PeukGhDn9f%2BPWsOlqYoQTjYaXsIBn%2F8KtH26YtfrVZGjJpCH8NE4SB9QHRtySI4YwzxQPAHLn4E9HaqMUtWgkKoflgQCo0Jp1QPMgdeXnqDnTSTXEbtEHmy&X-Amz-Signature=71c329029faf511142e8559e3decf621cfa678ca37418baa6136d368ab4bd43e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYQEKWIJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFFdct7bLHjKkWiTh8NYjKJcEHYHLoqeY7o8ZzjpjrEnAiASi8dBZoZYkriRgcRDJRCKoxwtcIM3cssoBxByPcoFxCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMHqsSjkV7qqn%2FttcYKtwDCmWHVN2P7gtwNRIOdoNANAlr2f%2ByLwzwYbqWYtUB6hzavTNYY2h6DKWPnEGhhMEti9orFITYbMFLGZkrENx%2FCw0%2BwAHQp%2FWPkBs5P9yLLJATxrIrV3LGVb0Utuj8Gxz70o8Q4%2Ber2BplK06lLKKRiswxIQyQR1eSaXr1j%2Bbty3D2hsySAsJpaHyxRvD%2BnDhjmN22g9zI1Imcgl9LZfdX2yN8mhbLLcl0xQsFsd2WK7pB%2FTj4pm6OKegX0g3tGRaw%2Fk9CUAHp9p%2Fn2H2G36u%2BvpuT%2FGavPzQ%2BahD09teYkzsIXFJzyJoKdMbTnqTOLXJJtm2MA%2BiUf4%2BEleZQN7ttuv3r3i0%2B8VEpTf%2FQqHvZkSQpz7oNt7C5uHZc587UDbo%2BVeVZwTeUzdesdRY2DKnCOH2YueUFl5l02wGLZPu2I89UR%2FoRAMrPaf%2BxDuTZk%2BxNfucPjHfARrFFCpBq5wcbJAOfnqYR8Cord7iD%2BgH%2BxnZdN%2BaVnXO%2FiQp7S688yf%2BuZVIh9%2BrQPpYFPFxNKQcxW2w0oRb%2Bptf0srUPrbIgx7cCxRnu2TuJrj4mHmdv4Wi83MqE0h0O%2FfdebHa6zFVqU6VZVSRt7cuVo6FsMt9%2BCcUbeFQX2KX%2FRQqeDKMwzvWzzQY6pgFx0enAW0IpDYFUdNK83r2eIbWdp6%2B93o%2Bh6D1d%2B6pF23ptxBvAg57cadk5RtMtO%2B4RylZ47078gp7GERlUWK2DPUtMDLc4d4vNMKm8codPx3znNWAf%2B6toZj6z0mLMM8IwJPm2AuAoBEfl623uqtBAkLvjqeUL4V1ZjcND2kCSHoNC9tZO9WYJeVF7rIemJnBVWC0%2BzgAdfi7pSZW03qA86yJUBJ%2B%2B&X-Amz-Signature=860286207e892262812973872675911c20f81d06e22565be4cced26c8ded5770&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GY4QVCJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIAleFK2%2BOFes4z0Tt%2FTKlnVrYdGslmFN%2Bao8djvsPS%2FoAiA%2FZza%2F6iFOMglfVY9n8P3XqZOJUY%2BiEV5QnvAiSJMCFSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMU4gBfQoG4%2B9nuqclKtwD1Hh15H0zQqKAmuCO%2FNPzzhac%2Ff8nz%2BqfIfC3SLJizeTUqs3aYft%2FySsIDQhHDHytbVaIbOHEkkWXkpJi2vunCFssAkbgLsXuv9Tf2w6joFo1dellS5DW1W9iUtBPPXIav2uCkmNeCJl3SANhJqpZ4pNdM5txc2VyXrzW20oIQfApJ0bhg1%2FBcV3T7eLKGQROX0tVffiBsJExTo9hzmc3KfGV8c%2BafkcmceTGhwhsmGA0wZMcJeexooV3Q7ZsQ1ZCy60GWu1IrKw0vket%2BvsSMy7uAgsdu1JelzukJ22tWEiU5D%2FrAAQ3ZP9nQQuGaoWQYrN1EOcYGMXSdIXlUFL5xHrx5oVJWq1vwuYiTsASzqlXkVY41rqlRdAr1Kqihv2HVMNQeyLyFUM3ojIyQE4gOd5UYgTfbUtsKRmUl1DL6cDeJWjq8aoRFeMVDT7RA14ZUKGETMlKbcMoZvsMctsjgwgUwknAZmINfoetqCGbN%2B7TX4OZsj%2FHnnoarcni1aJv2WSsqfTXPGitd4eqa21qsRpjU3WhJlgamVF5dSaufhwtjUah2VOWRcQnUwXWS4ljUkrUGHaAqyKIXZAnk8Aty9izJj8Wi%2FdDq16o1icyhowP1DqF%2BE8ywg3xxtEwl%2FazzQY6pgGd%2F7OBNmsAzyqWtZRHd4t4msbQFuSUFqxBXP6e6MzWdqOTZ8uDbxwbycrnY3bqtZyRItvBMs6g3hcu15uMWtu39ejwYqvcllo7X6xU9SQY09t5cey%2BwFSacnbDbUUTAYSQ%2F4%2FAGxnCVkTyp35Y5kIdEQHp6kJ4dgXiFdq4rhOd2fuuJFb5NyYNPfyEJbx1JzS3qcWuE3lPT1azYPRKQepQsK1eSNjo&X-Amz-Signature=63c1ff92bc72498a46ea690670d1571e7461edb4187bbb7cdad8234582865898&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GY4QVCJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIAleFK2%2BOFes4z0Tt%2FTKlnVrYdGslmFN%2Bao8djvsPS%2FoAiA%2FZza%2F6iFOMglfVY9n8P3XqZOJUY%2BiEV5QnvAiSJMCFSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMU4gBfQoG4%2B9nuqclKtwD1Hh15H0zQqKAmuCO%2FNPzzhac%2Ff8nz%2BqfIfC3SLJizeTUqs3aYft%2FySsIDQhHDHytbVaIbOHEkkWXkpJi2vunCFssAkbgLsXuv9Tf2w6joFo1dellS5DW1W9iUtBPPXIav2uCkmNeCJl3SANhJqpZ4pNdM5txc2VyXrzW20oIQfApJ0bhg1%2FBcV3T7eLKGQROX0tVffiBsJExTo9hzmc3KfGV8c%2BafkcmceTGhwhsmGA0wZMcJeexooV3Q7ZsQ1ZCy60GWu1IrKw0vket%2BvsSMy7uAgsdu1JelzukJ22tWEiU5D%2FrAAQ3ZP9nQQuGaoWQYrN1EOcYGMXSdIXlUFL5xHrx5oVJWq1vwuYiTsASzqlXkVY41rqlRdAr1Kqihv2HVMNQeyLyFUM3ojIyQE4gOd5UYgTfbUtsKRmUl1DL6cDeJWjq8aoRFeMVDT7RA14ZUKGETMlKbcMoZvsMctsjgwgUwknAZmINfoetqCGbN%2B7TX4OZsj%2FHnnoarcni1aJv2WSsqfTXPGitd4eqa21qsRpjU3WhJlgamVF5dSaufhwtjUah2VOWRcQnUwXWS4ljUkrUGHaAqyKIXZAnk8Aty9izJj8Wi%2FdDq16o1icyhowP1DqF%2BE8ywg3xxtEwl%2FazzQY6pgGd%2F7OBNmsAzyqWtZRHd4t4msbQFuSUFqxBXP6e6MzWdqOTZ8uDbxwbycrnY3bqtZyRItvBMs6g3hcu15uMWtu39ejwYqvcllo7X6xU9SQY09t5cey%2BwFSacnbDbUUTAYSQ%2F4%2FAGxnCVkTyp35Y5kIdEQHp6kJ4dgXiFdq4rhOd2fuuJFb5NyYNPfyEJbx1JzS3qcWuE3lPT1azYPRKQepQsK1eSNjo&X-Amz-Signature=a3ed422ab2d839fa70a783f6be114cb19e0187e64fa552f82a63f8c46e668bdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE2F5VCK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDcxK%2BHCE5kXR7BxDS86u0XMwcEaICxk2wCIBO6ybw5ewIhALvXZlO08Ud%2Fc36FUUjiScJ0YKC1mpVlIISdFCG4S1%2FrKv8DCA4QABoMNjM3NDIzMTgzODA1IgzbPO0NFjeRP%2B6vquwq3AOYD9OBu%2BkIiRo3%2FvaVXHJRtl3zNG%2BXY%2BpAVvjERiER5FnZdF%2FsmiaC4hcQRxHcyAq2lc2rWH2h0%2BrM1xuj1liW3JvnxJyfkiDWvOlzq0rng6Hitwi%2BBENPbUiIjYhiErUsm%2B83RF%2B3TRwslSxEJPCfOHyiRKH5DPb5we0POpPwh4UECRLzl8umRWpmEL9vyTJA0sAGK0gSjzc7%2FwDNPnKrFParkTD%2F4V%2BNls9Tv6oKX%2BNCdqZp%2B3BN0x0mujCLTpTdVRQhkMPAptYki%2FShk9KptKFMIgpTlih6oP31K99e34S9nT%2Bo3fkK8E7y%2FMQRwo0dkUGnWHJ%2FjmIlhjhNXpGjAs6Idr8K96AUqoFf0vNLsvMbihtygzG8GBU%2B825wzvnd4gIVg1jPWd72Q7OkcsKZ%2FxJKB%2FjNKVdry2zk%2B2kwPctXB%2BU2CftT2xWnY3UaJXwEuo6UWzCSnUFwIyQtoLy8MWVk3ZydLmVKfIG1n8Ukt%2FWE5J8zIzlLNxe71rMfxjionOxt11khDNb1X%2FlhIjMPq6G5Y8FCjEsOiZZGHOpdPEEXkNGSxdYe2t1chsyVq%2BI%2FXwfcwfOhRsDre3Zg3E9ro7nf7qh129nerkWmh9Sh9p9R5yylgdXA4KkctDCi9rPNBjqkATUXtCYYWzyTWiaUOrZ7yQ6TFRWKq0sD%2FjDA%2FHa4sslqCfA05DAZXhe1n8MEm9qz3M2qMlsQNRPAhnrE2cpkpW2A%2BoPbRab5%2FmHQVwouKeOvEYh0eMYHZranzfCUDFjA9GvDFYoHJtlDVdnfBtS8SA80p9ulH0xMx0TmcpoYGcfOFQSgh9uOqfZ7knztCu%2FjByJy152blIso55Pe%2BuBAULkqjCFJ&X-Amz-Signature=038787824403698bc39426f227975896ac56e017d9eb4b6a5134e9738d636cbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQUF3BQI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIC8cCl5YMZADXLxXMVTs9npm1ChjiPeO4bi1kanNsUFbAiEAspGN1hZ%2FO1UlnqFlJHt%2Bt5ZLdcfz96u%2Bpc7zVq25nNkq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDNLosGo%2BB0bH%2FJuJqircA37f89SNV5hUY6jD8ADhZ6qv1L0ePXuwQjyuALcNSCDeTwdeXpWNKBsl407EANmaZQ7jlhZYLxbzu7gTkDA8eDmsQSZXSSJ3ktA1DEHDzgv4a4hsAeI%2FbLtS6mNwB982NWBwDMAv3T019ItDn7iSye4aGmHkOr7dQWTk181bzD0eDM6q95RsS1qxjyPvGEWakzqHAV%2F4RT5D%2FnyJtjjSCubjcn98lWdxxNcn6SH0dGL2mIDKWRD7DBmyG%2BY%2BVtM0RnD7K99GZDAZltZMOLxOclRtR7JdCw4HYdSUMIAx7R2olUz%2F68vC1pwSup%2FG4tp5jikhFYx3DvBeVszrsfURTozOM71pTIkzqyPV3aflpExeiF%2FJrMzMTjWue3HF1sD4bk8Bmt2HC2T68%2FQJEQiHohqeuInBMJOcL4K2Np%2B35k3zdn9TiKNr14StCLQXBWZsjPjpuCpmpfrFbtrkZaakDUfD%2Bc2XfOu9UDYsEmYtDVoSGmBtW4daufXCsJIM%2Fg4QA34gIhpycLhnGkGzVWFSTh3bDAoL8S2e1P0LtarerrSu95fis0FcqoJi8PD6BHLnHWW0PmaqPP1HNRXIsXt9DMnEwALRpQFyuKDre%2F%2B%2FenWS5aAH0IVXiLSnDL5MMMj1s80GOqUB9bhtq4ld9dJ7eyT%2FpcAOEqRFKsqv0HpBUGncUDgOG68Sq8%2BDw3JYKbyRLY6sPn1OFzhwwGsGROzXwOk41vLFWYBRiY1nYOHUkRCfJ5iVkKA2qfffe7bip2TLYe%2BnrnlbXFGy7EK%2F2Ju3yT%2F4J%2FEhfdq3XHgYHQHF6spHDT2APb%2F2rOp%2BhiQl%2Fa5%2Bog3CTF5QnskVOzTCh5r5l27KewnW%2BPkkspmx&X-Amz-Signature=c603754a31b2558f295b2672ff556bd4344c86591c3d8938a8c25d9b11ca295b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQUF3BQI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIC8cCl5YMZADXLxXMVTs9npm1ChjiPeO4bi1kanNsUFbAiEAspGN1hZ%2FO1UlnqFlJHt%2Bt5ZLdcfz96u%2Bpc7zVq25nNkq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDNLosGo%2BB0bH%2FJuJqircA37f89SNV5hUY6jD8ADhZ6qv1L0ePXuwQjyuALcNSCDeTwdeXpWNKBsl407EANmaZQ7jlhZYLxbzu7gTkDA8eDmsQSZXSSJ3ktA1DEHDzgv4a4hsAeI%2FbLtS6mNwB982NWBwDMAv3T019ItDn7iSye4aGmHkOr7dQWTk181bzD0eDM6q95RsS1qxjyPvGEWakzqHAV%2F4RT5D%2FnyJtjjSCubjcn98lWdxxNcn6SH0dGL2mIDKWRD7DBmyG%2BY%2BVtM0RnD7K99GZDAZltZMOLxOclRtR7JdCw4HYdSUMIAx7R2olUz%2F68vC1pwSup%2FG4tp5jikhFYx3DvBeVszrsfURTozOM71pTIkzqyPV3aflpExeiF%2FJrMzMTjWue3HF1sD4bk8Bmt2HC2T68%2FQJEQiHohqeuInBMJOcL4K2Np%2B35k3zdn9TiKNr14StCLQXBWZsjPjpuCpmpfrFbtrkZaakDUfD%2Bc2XfOu9UDYsEmYtDVoSGmBtW4daufXCsJIM%2Fg4QA34gIhpycLhnGkGzVWFSTh3bDAoL8S2e1P0LtarerrSu95fis0FcqoJi8PD6BHLnHWW0PmaqPP1HNRXIsXt9DMnEwALRpQFyuKDre%2F%2B%2FenWS5aAH0IVXiLSnDL5MMMj1s80GOqUB9bhtq4ld9dJ7eyT%2FpcAOEqRFKsqv0HpBUGncUDgOG68Sq8%2BDw3JYKbyRLY6sPn1OFzhwwGsGROzXwOk41vLFWYBRiY1nYOHUkRCfJ5iVkKA2qfffe7bip2TLYe%2BnrnlbXFGy7EK%2F2Ju3yT%2F4J%2FEhfdq3XHgYHQHF6spHDT2APb%2F2rOp%2BhiQl%2Fa5%2Bog3CTF5QnskVOzTCh5r5l27KewnW%2BPkkspmx&X-Amz-Signature=c603754a31b2558f295b2672ff556bd4344c86591c3d8938a8c25d9b11ca295b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QK3C4DUS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T050347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIEnd4WLQwYEATP%2FQwN97n7uDNS3XhwpXEbuhrYWyDhkAAiB5ahCJWk16Qptm7L2kOxKrfJKcRmsPOR8vFNDveogKXir%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMtPCJqJq5Zhd%2FeMCEKtwD%2BTPs0xOjpf5eoYUHjWSqESt00WwPCzrwH%2B0KDpeqEDuJuI6sYT68jJcQKOcZDX2k9zrhp%2BOVEgHWuT6E4wToc9f1pI0EFAWh2o4gFP9OHwYTJjPj6lOhOQNzVFF6O8YX0672K3jkgJSY%2FTz%2Fp%2Feqex2jrwzRzL0opokki%2FvOcwSvKJIwf%2F5UFrEX0mmdhJCEJOdMxo0brKJjGcYmib9DFX%2BUBSm%2FQNtRBe4eZD3%2BFotJEyxUsI92YSr98EjoQbanFa1OF8r3jgDmqhjJtJQAYuL%2FHRNkLRo3MoAXw3O2wWWd5Y9wFSpNkp6n28pljLXuQVnCObNyk0Cbdx0pnIq6clh9AnvIvv%2BkwORIKEALuM3unOwcSOt9HcthFrsRTVYuCQqm0uZxy%2FcEjQTaaSo8gIor6Y%2Fx9BI1Swp%2B1gE9D4nrly3hZ2EqFDWa2sgLymza3lXLMq4pvZC2U8ma9Dx%2F2giAEeM2sJh0xo%2Fn9F2QKY8XeU4ht742rW7YA1FyUMsaC6WOAUjjRq1lTuiXBXQ8c2DIQRZRDhpyGLZ7JbSfSyoALP3atxeZJVBsv2kt5VtMhFRFFCYdrQvJcypVkJp%2F6P8Wph%2Fd3NeR4ewxzpqB%2FQ07kOf4bPNqKcqMZvcwrfWzzQY6pgFzvKOoKKqZDiAHQHM0Pmzi7d0yniVyBAlAm1Aojcc%2Fqchps18dqcYGLvEo4c2w8gt0JXysSRoAIjN0YZwuiHFqqR9xASS0SopVgDT0hCFdAWsW4lVP7e5oJvP8dLaOU4nPqA6l8Xho5pBJTuEPxTvSRwRklG3IYgnLst3oYLmRhc3rVjlm9WjHZJx2dCagiLkgb0MsTOGlxk8j7M%2FlurYj2x%2FA%2FQY4&X-Amz-Signature=7b645d2b858872c63ce06503990acb4a459869fd903f2bb3193664b286fcfcd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

