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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEXKZ6WQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDI3AIubgF231Vr4o9Z1TH96ILLKNNU5cj7P5C9UNcSxQIgQS2FOAQHYvKT%2FH6nHQ6sKVDLiT1mBYTOTu5POxFCW0Uq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDpkkWvr7clRFMtswCrcA%2FPbrtFMhWsdOjWxggT0waGv%2FJ7jEMLrBoc4fylHSYhQMtDmAZoUEnPoGZiFX8JQsylwhkc2rxVvaDpYxb0Xmjm6LBzDmZjg%2FbRWlHTXVE07ku%2B36WkwTWdVdG1XawDWh69LkwlJ8Jva0mtuMU2%2FVsCZa3idpwTEVy4TFKUxXLbyy2J00Emfgk3BaYT95T%2BLZj2lk%2BzSY%2BZdpwQPbkOQ9Sga%2BO1yH4kjKYKzj%2FBjhkbJRQI%2F4hEBahhwIXR2SR416VfySSdakmAtxCGobgLC8HYQbUsJfaInzBYnVAf%2BoN1d3gtGOiulj8zTZ7wVhA8zEfj9s7oU7JVsLgjyYaITOYNLBFfHpqcBPqx9TsBT5rzB%2FX2AMOUsQTQKmGWkMKCWamW37jvMxSF1MBMVIRBt32izM0pVtRNhzgKV3JwK7fuA3r6pdFqhlugIcTHbbFsgl2fudqia9W7aO%2BuhPB41Ytu6qXgyzr5c6Qb2gYVp5DUKdMBqDeByd6ZND5Y1DxaKeMXIfL6niDryQxjlPywCSbvl0f1VjwruSWtZr%2B38IZnPG%2FuCnXD9vxExMgVfiCbq1vo%2F4hofkq6xuFDBJbYLfu8XQE6hfhCbUxaZuIMkqUmzSpzN5XJqoRVBo%2B5FMIP67c4GOqUBjBj%2FdOtj1N8uUybEBOmEIlGIXazLHUBXs50005GeKBnnJg9q7ChEg8NEv8gj4IzxjKVQGcRj8Z29WPdsJROPNBlhYmGbOnFisso%2B00AJkR3kZvkhsb1xvdIFOoIOcwgOaHthnrmhehTs6OZBDm5%2B9sZ3X9nI7rflLdjvUo1154%2F3p5tmjEfjjpQSjOBDYVeaDUZW0hKIq7GUY2E2AH3IIZHOUtTU&X-Amz-Signature=56408b30633b6d73d3044865da1e37c0c41b991a52a387527e20187fcdfdb455&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEXKZ6WQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDI3AIubgF231Vr4o9Z1TH96ILLKNNU5cj7P5C9UNcSxQIgQS2FOAQHYvKT%2FH6nHQ6sKVDLiT1mBYTOTu5POxFCW0Uq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDDpkkWvr7clRFMtswCrcA%2FPbrtFMhWsdOjWxggT0waGv%2FJ7jEMLrBoc4fylHSYhQMtDmAZoUEnPoGZiFX8JQsylwhkc2rxVvaDpYxb0Xmjm6LBzDmZjg%2FbRWlHTXVE07ku%2B36WkwTWdVdG1XawDWh69LkwlJ8Jva0mtuMU2%2FVsCZa3idpwTEVy4TFKUxXLbyy2J00Emfgk3BaYT95T%2BLZj2lk%2BzSY%2BZdpwQPbkOQ9Sga%2BO1yH4kjKYKzj%2FBjhkbJRQI%2F4hEBahhwIXR2SR416VfySSdakmAtxCGobgLC8HYQbUsJfaInzBYnVAf%2BoN1d3gtGOiulj8zTZ7wVhA8zEfj9s7oU7JVsLgjyYaITOYNLBFfHpqcBPqx9TsBT5rzB%2FX2AMOUsQTQKmGWkMKCWamW37jvMxSF1MBMVIRBt32izM0pVtRNhzgKV3JwK7fuA3r6pdFqhlugIcTHbbFsgl2fudqia9W7aO%2BuhPB41Ytu6qXgyzr5c6Qb2gYVp5DUKdMBqDeByd6ZND5Y1DxaKeMXIfL6niDryQxjlPywCSbvl0f1VjwruSWtZr%2B38IZnPG%2FuCnXD9vxExMgVfiCbq1vo%2F4hofkq6xuFDBJbYLfu8XQE6hfhCbUxaZuIMkqUmzSpzN5XJqoRVBo%2B5FMIP67c4GOqUBjBj%2FdOtj1N8uUybEBOmEIlGIXazLHUBXs50005GeKBnnJg9q7ChEg8NEv8gj4IzxjKVQGcRj8Z29WPdsJROPNBlhYmGbOnFisso%2B00AJkR3kZvkhsb1xvdIFOoIOcwgOaHthnrmhehTs6OZBDm5%2B9sZ3X9nI7rflLdjvUo1154%2F3p5tmjEfjjpQSjOBDYVeaDUZW0hKIq7GUY2E2AH3IIZHOUtTU&X-Amz-Signature=56408b30633b6d73d3044865da1e37c0c41b991a52a387527e20187fcdfdb455&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU6M3QCU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDBfosL1nzLd1SbNOa4Vbpr%2BUuFbYM%2FoJA2Cj9y1jfiJAiEArBH64Jh5NZ54TL2SGaEBokOO0%2BQNj6gCVo5sBrN9e4gq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDIEPv4pKf2x10IExuSrcA3GB%2F52XX56P2mUDu9xu1dDrtO7RrdpSAY3PKPWoGAz9O3meeQnvF46XHTqwvy9wCCqfbw9iVatyz%2ByDT43f5GwtpPTaWLGuXc8NltKBW6C6FxpxlcAdY3bLiQ9EqrLR7vKxJ%2BDPpAwAJXm1ENXwckBKf7yvd7GiaqZglGwJUc5STyUIiTpg0GwA3cMNvSLCuJGA9jdYbdyfoINCJpDVBBZroT8Tj2uMW6rPjV9dHSInA82RRP6hgxj4HJRikesk1GXPJxVaeWT26tWNvgEnBvl87qSI%2FUry6tK9c2JxHUh%2FB6LHtxu5BapnFTixWiEmZO2aIa%2FT1m4efpN%2BZ%2BTHPXb1xtsa0Q6lCdb%2BP4dz8aOu54VS7D%2FTXQoBU2Muh2P3HJKNiAoToHfhq63MLhDdZlTM9wjgAtmHEoncs%2FZ3EEEozCThtdqEWHMkUt7LlhRPHZ7wy3BGdbhYXz9beVRKMXJH43%2BQPx%2BA7Oc8l%2F7vB0Tf3pkhuJhX%2FxGGhOTYZRuGBZg5AdgaQDo3Iu0fB2TVnL6e%2BzI1%2FMaqcsDS0FK%2FqsqgEDRar6ZvrTvCABiUpkFaPq01qtc54DFS%2FzKfy0Y0u4wWcL%2Bx%2FPeHzHlVMWXww%2BgZpu77w9lYumgKU1A8MLDt7c4GOqUBfFfQud7gJxXaqd6VMt9Gp2rK3hU8JUo2xaugliDZY5bWbTGnfl8v57EsErdKXBGjVoRbQeKy1HrD050fROBaINI0B2DxV4d2fZpfc7nWrELVIO%2BA3XZ8XtK3z5l1F2NwRfokfZnbUz7KglI3MzIPJcY%2BZ0ljELR%2FFtVzIR5nK2t%2FYXZ%2BsTtEvsNuoOjn1PbCjpA2mcdVgr8Q7W8aKbgbMAuHz%2FJ3&X-Amz-Signature=b50019326a0ccf8c822fa241b4700ab684cc2f9351bbb93e348ee326b39d0f73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXNAH4ZY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0VJCAr2dnqBWjDnOqqhSaX%2FkjxAXSgmW8fsBqq63J8AIgBncbh9ftgr8dC1kpSZz4UAhdn1lFg%2B7C3a6tP1Nw3Hwq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDJqqAKW33o9pcbosACrcA1zaC5Ed3FfUJ0zdX8cTt3qefJvLkmEt4659km8zOB5T5pNRA57HI3drzKa8cisWrG1%2FNVwGHI%2Bbbi93d2v%2BxvsvRN0hmJKS8O21yMyWpo2c19rNOuHn1HfswYw4Ntvroc6u7mGX33haS%2BHvA1OvUbYvJLaCWLF9UpZ7fsBwFXVUNmi8QdSwkaaLjXKUQa2FrQhLeAbawHNfc%2F5FzmccU2cyTCbnM%2Bz0uAflegNloN%2BH6cbnIPii6mCQuPFJi35zaZWcTrUoyiBEnnr1m%2FWX604yOuuldScuGfHZawUr4u%2Be3I%2BJ5JvH1%2FdAPOCrzh9p%2Bm7oW2tiaKQ3RlC321rp8iR3S%2FfbBTcMEhhd%2FGkum1limcETNVH89nN0%2Fa3vucCoFp341JlFwTvNsVN1y8tz3MDxwSaldGPODSbEKhYMfax0%2BdsX8NO9OskhpnBKw8POvHC9n4RFUy%2F5YVsl5uUNvBCFaXzSzyYwfxVj%2BBkmafTUTpKIjZLkPBqbeBo%2B5U6AoxNuWyyrpMiW2QFuASZjCQfxmbFVfREgiCbQFRfB61BAMdMqFwabs%2B8gg6hdlg3teYw%2FxqwDT6yL%2FW301c2uKx1TWqXROk4qEXLQ4dj4VBzZ%2BGNXjkuHT9frPwhdMNrh7s4GOqUB06ZBLimfSzQNg2E6hmSn4fiRgO36peeF5Yq0i5Zz3THfM8cNvz0fhckFxJ%2FLDA2JKsri%2FKHsDPUkPi7HBZQSF5zNw6fuQ5Fwyyg4uw1lF6FBdzE%2FwlLiNkOdYrh7zw7aQuJ0k25b9OFX7y%2FcnL8kz1aT5p6WS8nrZhkzA9Le5anUfb2K18mvDaj8S7%2BNwyajY80F3w%2BIk8vcbzmAUgtuNlJ1F9BR&X-Amz-Signature=acbb4a267ef37baf4bdf44baa1a05afda9197e4316fddd16592dbbf439624181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXNAH4ZY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0VJCAr2dnqBWjDnOqqhSaX%2FkjxAXSgmW8fsBqq63J8AIgBncbh9ftgr8dC1kpSZz4UAhdn1lFg%2B7C3a6tP1Nw3Hwq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDJqqAKW33o9pcbosACrcA1zaC5Ed3FfUJ0zdX8cTt3qefJvLkmEt4659km8zOB5T5pNRA57HI3drzKa8cisWrG1%2FNVwGHI%2Bbbi93d2v%2BxvsvRN0hmJKS8O21yMyWpo2c19rNOuHn1HfswYw4Ntvroc6u7mGX33haS%2BHvA1OvUbYvJLaCWLF9UpZ7fsBwFXVUNmi8QdSwkaaLjXKUQa2FrQhLeAbawHNfc%2F5FzmccU2cyTCbnM%2Bz0uAflegNloN%2BH6cbnIPii6mCQuPFJi35zaZWcTrUoyiBEnnr1m%2FWX604yOuuldScuGfHZawUr4u%2Be3I%2BJ5JvH1%2FdAPOCrzh9p%2Bm7oW2tiaKQ3RlC321rp8iR3S%2FfbBTcMEhhd%2FGkum1limcETNVH89nN0%2Fa3vucCoFp341JlFwTvNsVN1y8tz3MDxwSaldGPODSbEKhYMfax0%2BdsX8NO9OskhpnBKw8POvHC9n4RFUy%2F5YVsl5uUNvBCFaXzSzyYwfxVj%2BBkmafTUTpKIjZLkPBqbeBo%2B5U6AoxNuWyyrpMiW2QFuASZjCQfxmbFVfREgiCbQFRfB61BAMdMqFwabs%2B8gg6hdlg3teYw%2FxqwDT6yL%2FW301c2uKx1TWqXROk4qEXLQ4dj4VBzZ%2BGNXjkuHT9frPwhdMNrh7s4GOqUB06ZBLimfSzQNg2E6hmSn4fiRgO36peeF5Yq0i5Zz3THfM8cNvz0fhckFxJ%2FLDA2JKsri%2FKHsDPUkPi7HBZQSF5zNw6fuQ5Fwyyg4uw1lF6FBdzE%2FwlLiNkOdYrh7zw7aQuJ0k25b9OFX7y%2FcnL8kz1aT5p6WS8nrZhkzA9Le5anUfb2K18mvDaj8S7%2BNwyajY80F3w%2BIk8vcbzmAUgtuNlJ1F9BR&X-Amz-Signature=d70bcbe8948e78e9ee594b5b851edf1349988be3fc1daf3b7f02a743edf59fb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYJJP4OO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDwkCX%2FbuARwxbkfKP0YH3p1BFHOBvYyKZm9SMkfgbEKgIgCtVhfKP7yRHPvzbG%2B2lBvvaIk5n7GNnqkfrDEWUhBHIq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDMIFR72s4UGxyhiTkSrcAwMnN0ed%2BBHLaCTlww%2FuBR%2Bdubdga89kkv%2Fj9PnxME9Syy0gEoykEXjFx2LRo20x7VqfowkejTdIxsyaG2CKD%2BfnwI%2FmQ58UCKXKTnpdNnf%2FatIizWfBngEuR2BTwI%2F7BXxRpk6mzzVTnNSjYg39XMq%2B14LRgPuv%2FH%2BlTGokK%2Fy60mC1TDhB%2B4QHnni7qqEUxF0DG1%2FjnQaqU3qgnfSds%2Bijmre9%2BEO7Ntfaap2uGRQT1rrP8muV9PZc2YpNDiZ6cv6aOoS76uQZ2r3cFydLPqM8HzwCuMjFaePHfCMn7RGpXNk7IRF4rp859bl%2FcSAGGPol%2BAJj5Az0jDbhPVZQFWRxWLBGYMWh87XIrX1BtaWgfm43ZGmXKFVtCtIpd%2FK5purE3FrWYO3g%2BWSyDg3HZD5ug59Hp2BxEu7fiI7w5Sa11M8ym5QB2DUvmqn%2Ft5dT94rha%2FjEpF8bzxACEy%2BXOBhYArMR6vTweRqc4mT0ClQl0JGjILYsMNkAUWfbwb7OwRWuvTwfUbGgBtnKDXDTYw5RGDSFov%2BGCv%2BbFDZbWrSe90xO9U%2FVsfeDbIZMVbwibdF196voiTrF2ZB8r9y%2B7dbQIrtXbogDoxVHEaBw01e9PbbwPzfqTLro1E6eMOD67c4GOqUBqvYsGjBjbYgRCKJ6%2Fc304n1%2B9Alne1tBSZrgTD9b9WZ07t5j%2FY%2BhjFxW4ZNUdJAet0M9zDOv7Ee211Tw4rBNwlJjz99lc5HZOq7oyw%2BMIjtFucr5QDVLIYfNNDxdD9nR3XC1YqZP6obXDKeMBNHDVxSxnanz7%2FCAqdRp8s5Z9Ig87lfl%2Bq0andzXzxlLnqX0XtPc8u6mnARalWGmx216eAtQPsAE&X-Amz-Signature=138102555fe8d2d8efbc08e6533ce1402064f0ceace6f33c41b380e2478f9210&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V7UUTMP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEhg%2F%2Fx8acHrkBRG%2BpRuKjAsLkU4nW3Japf38qJxIFL8AiBeYdVG0tjXh8%2Fi7qW1ElZpSgySNDHCa1WF1ym3v1aIoCr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIM8v%2Bm3shaeqhhnVc0KtwDTWfHB4lULLAAW%2FEK94em4sO5FHLAtBwos7fyP92k7RCOhF9cboB%2FclRFMMG4LF4rqz2wbphOMnTyrl71wcobq2BAdO%2ByCc2LovZZmnjP4X9UfctfvZIlvbP6%2B4QDRNjeuNp3h6OfaX0GJ0wXplJjsZK9fHHko86wBvua7iEUHj%2B%2B9FHdSG1C1%2BOfYI5w8WoOmRhKzgWJRdwguQdrWG1arYE6CaNy1vnFfKhIrAd1KizZhlpXtl%2F%2FPfuf5ZxvQ5HSCoKiRtTGYaVVqUN1cuoE3hKYLzGDLZWI3oAfcwQq%2FPAVomK%2B9vNpGfv8JhKRrlGaIlDAgyaR9R16S22IMYVk8RZMBOti13JygrqRN7JtFfesOIt66vjIVBJv7pqiElGY25IUOTaMxRe1bFeBGebjryNjMAcT0xOF1sUIVkyNp4EOK99jgO37V6ncGmpIwozEWKWK%2ByD0zE4ca67rnSxoAC9QFm7Xfmz9a0s%2BJkJoBEYHGWEC3p%2FQnBNPUL%2BHvpW4KTEnXEh4dcCh4LDVXCBsl9mUBqJ4gAPoUb8ZAX1IusI5BjdgNP8o5r61O1PETLjVgWStXZq4rTuYKjcFDt0UTeMeKudpH5jEQd74%2BFu4snQAOnWFrpWkrh6qZ7Yw4MvuzgY6pgGLrWQdG3Qks1EvxPjUo12Ve5I30wS%2Fm5uGraSFpdVBa2jNKLn3cSwmp08b23BxD9LSJ5laD9GYmZM9lNpBrFsXECQNSn6xFMX0ZfDj1nrUxSCfBX4Zq%2FFNe8%2FKB2lihV4N0d%2FpJtNFU1HzTtQPQElyJAtS3qT8dJra43qk%2FdIDjaan4ygoncwxIywLyKEDe7ad77EODLFEXuXMfLYsAzGmYhJ%2BZJtE&X-Amz-Signature=c2de29724cbdca9a8960add60ee71620ba0caa54dc7511e8c6d641a6974ac72a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3QVKH6K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoshPrI4wTcS6UaQrMwR0Tskwp7VVtyejNIKvtxtxqXwIgd3lhMkmmaStT%2BcYas9UyK6Fj2IoeIh%2FmXaQs1pSkZXUq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDKxtCh8KHWxtt96c1SrcAwVX9WbO8vKgW5IUdigWzMpX5wwPUxKTG3qIW7EhyrFgvNrCM2HM465W4kT2euhbXFFR4t%2BKJHlguxTyzvgkbWcpN4X3d70zaU4tPwpKVRRbfkkQVAgRRnB8ijpDjfvzD9mYGn%2FywFjTJuu%2BOapnll7kQcCy1XEYFdZUoFn9uF9wTqlkhG6onWaFvI4ZgzbKx6m2eMDmHfO285FPrqDKUNXf%2Bs%2B%2Fb7GnHtHMTb34dwuzLdSfO9bbiVeK7clj8kyi9X8geq%2BldKGIf7DH91CLp9ZVpvx96tHk7umL1K9WsTHN1Hu5co%2FuX2BnZ%2FHY6x7doRPv8XImgs3mqNK9R3LgxS9VbFfUSt7zB5Bc%2FPpbZ3oIFa0ofFc53esqI5Hodrfm59YFaMQG5o%2FIe8SuwotcSOQ6ffz9igKAxocCIG%2FJoDZOxrA9yN%2FQLOsX%2BjjYbX2r7Vq9Fr6rY6d5swvtovUh%2FX9am4it2G2wZm7SfCr%2BSQCFF1S4h3i8VRmfAOt2imVPPGhUM92n1XrZojDpol2qcIGoqUdwrSCStIqMensI7Y7rR8KiuI8pwRnhdVX2QartZ9sWTtnP3PaqIv7iqErnsk9AJKy1zcxP0IiTQIxJ%2F4Fp7Bgvzovy4BVpQe%2B7MJf67c4GOqUBTTiMs35A%2B%2BEEVJyZHHdfOeG5yEEHCoPjyA%2BqqaJS9p8DlKzXOBb6ruJ2U7jSxNKcfPSpIt57amTwogOv2zCMK4cZN6GdacFHnWdOBs8IaZNPRBweJwLw75tgmvbQlNeuFKph75ITsOdmdKlIUYGxXZ%2BMwNoyIYpeTFZDPiDe1uzR0a2ctXIlc1CLNLhHbiiORxBox%2FVI%2BBT%2BTooG84y44TFrBTeR&X-Amz-Signature=7173b4b765f7eb3391e5f0d7bd3af28806786868f32426107128dd02f8cf5d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5IF4WDU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB0dyDCYFhC%2FFjIhseylAQq8fdT9D0vXmQThY4Q4w%2BgtAiBDocybXhx9AbotIpXNVxm%2FyMCxt6Ik9nNvysd2PZr5XSr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMNzGV7AHGylkX0cizKtwD4Hm7K91Ibi3ToPxBtFpyGvF9bWagkrWpE5JDbDhoht2Vl91uXujOULamDHNDsh3zjd9rXf8jMbU5Fs0paQ8nQ%2FHfkkPfkUsMUNR87kmpx5DZw05VhZ69XpAArZRJlkl2Ll84lm9UHZVS3dEWNOqsRk9CR09EyYDG6w%2BYe7kKKFmAhFmlEP5DCNZPpw4HUEBiA4MigE6ZdnhiJ1LyIEDPJ9zPH64m1n8Zl%2FRahEcoafTcxApl3%2Fbtu503QAHXZBvPHO%2Bvc6NeCMb1m8GFwh4Hw2sqtHIXCzPQmMNOUQDJf7hn%2FfvA5GBHHddNVgaUd0mT8T9AyPF41VUTrY9OhTwKHZWora4P%2B0jFNfo3VawIojzGKmyhOgge%2FVd2CtYWBPX%2B9lR9kIX4hSjP0YgbbYiTiQdCdnqo3wqdlU7zabSJrKvmtXVOMC1HhhultwpTSxJERUsOAEC8KxxLJYnT%2Bxdky6mwXoJtmI4l4hsB629gs6KdBIYUGui2uoxIMUZ8OXWtuyG5aHHDf8uDOQPi8bmJanALHxNk61BuvvS3vlRkRJ%2BgwPo5CFX9UWyiTcz%2BWEUbXgsSD88zP9wTa2LVrThqrsu4WPe9%2BTii8%2FfR68OUwMmw1eI8aemtQ6P1BW0wtf%2FtzgY6pgHzmdxMYgC6Kyfo%2BfLfJop6UrBNA7qpKVhi7428VLADpR%2BIItKdxIMT59PjimyrtGKgnn8hes%2FnnLtXnat3ma%2BIrbbb5rc%2BFUFkV6fr6gFYszaa3sDy4HtHRuQtvbF1hTzwNdCi3dL%2BoXjeXAjvzWrkuzGboRHv6Pw82bdx7U6DJ3YUc8ai%2FnAIR7e%2FyvGKGuRivtUbcu9dIOAONUtNyWOgY%2F9FI0qY&X-Amz-Signature=1281440b1abb4c1ca1b7e29670754851dd3cebf4c44aa225eed89e4e4ab05466&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5IF4WDU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB0dyDCYFhC%2FFjIhseylAQq8fdT9D0vXmQThY4Q4w%2BgtAiBDocybXhx9AbotIpXNVxm%2FyMCxt6Ik9nNvysd2PZr5XSr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMNzGV7AHGylkX0cizKtwD4Hm7K91Ibi3ToPxBtFpyGvF9bWagkrWpE5JDbDhoht2Vl91uXujOULamDHNDsh3zjd9rXf8jMbU5Fs0paQ8nQ%2FHfkkPfkUsMUNR87kmpx5DZw05VhZ69XpAArZRJlkl2Ll84lm9UHZVS3dEWNOqsRk9CR09EyYDG6w%2BYe7kKKFmAhFmlEP5DCNZPpw4HUEBiA4MigE6ZdnhiJ1LyIEDPJ9zPH64m1n8Zl%2FRahEcoafTcxApl3%2Fbtu503QAHXZBvPHO%2Bvc6NeCMb1m8GFwh4Hw2sqtHIXCzPQmMNOUQDJf7hn%2FfvA5GBHHddNVgaUd0mT8T9AyPF41VUTrY9OhTwKHZWora4P%2B0jFNfo3VawIojzGKmyhOgge%2FVd2CtYWBPX%2B9lR9kIX4hSjP0YgbbYiTiQdCdnqo3wqdlU7zabSJrKvmtXVOMC1HhhultwpTSxJERUsOAEC8KxxLJYnT%2Bxdky6mwXoJtmI4l4hsB629gs6KdBIYUGui2uoxIMUZ8OXWtuyG5aHHDf8uDOQPi8bmJanALHxNk61BuvvS3vlRkRJ%2BgwPo5CFX9UWyiTcz%2BWEUbXgsSD88zP9wTa2LVrThqrsu4WPe9%2BTii8%2FfR68OUwMmw1eI8aemtQ6P1BW0wtf%2FtzgY6pgHzmdxMYgC6Kyfo%2BfLfJop6UrBNA7qpKVhi7428VLADpR%2BIItKdxIMT59PjimyrtGKgnn8hes%2FnnLtXnat3ma%2BIrbbb5rc%2BFUFkV6fr6gFYszaa3sDy4HtHRuQtvbF1hTzwNdCi3dL%2BoXjeXAjvzWrkuzGboRHv6Pw82bdx7U6DJ3YUc8ai%2FnAIR7e%2FyvGKGuRivtUbcu9dIOAONUtNyWOgY%2F9FI0qY&X-Amz-Signature=b8590cb3be7b31fa0b02659e03fd9ce6a5cb38da64159f01db638108042f4458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RM2LGAH6%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdEO7uzlTr5tP5%2B2RYG1I%2FzqcoTDvpf%2BRIkhcUMIJlrAIgcPwgeveF15qYAvmVL4ialvnmC8SlGweiWkgTQMHhaXwq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDCEHs0cseVdzffhY%2FSrcA%2FoquHL6Gf2BwSdC2zmeYUn9KUbY3e4jEB%2FIncItT1H8fiX%2B9soZ%2FOK2kiIkHt5jplp81xmYY9ft6NfEhwCJLzojsglCxky6XozAaL9BrtXP9uzPwwCCmDCJnIvvP9d1TGd4hgpao3jkzCsGsLHN0zM1nvQthhP8eTgng%2BYy8o43Gofn57QHZQFNUwySdE7iCVFQoOQf%2Fnq5KulAHjzXGP%2BSFCdLfSMAUPCFZ756NYozA%2F89xngMBYsyt7MJBT05hUhem8YOXSqVxjlLbeZTL7lTAiP7HzuVux3%2Bdx9JpFWjBA7Rklti8t3t2GJS01ZK6ca2rlIL0ErSef%2FyuYM4dOx4AqYWZZmQuOy%2F4O21FTBFWcg2%2BTIR621nDyu2zch4Oi804q9xfmOfzZYT73HnXIKQ9jgO%2Bk4LEBZqUQpUA9J%2BkxD6sdXU2TUSs%2BeFX8yo6XyLqfF0Q08cKW46uwbah8TXbeeLSRTAlj0rggQJp%2B87obB%2Ff8v52FtTueu7S6ZUkXqE%2BA12z%2FPWQjDPqE3uFxzOByor2db34AZUh8CBZEIs1iV944mCMtpHRo31prOHr4GMjPWNqdeFZUohIEdd2ZCNwKuBSqKU5%2B9TMFuvudrre95dxW%2BP5WRWmrpxMNz97c4GOqUBnkcsGJqbbfnuGCl091Bm6S6dmvDBQHI%2Bw7bGKAZ29VK6OkvDntsxpsR94x%2FFX9g546X%2FIrxEgM%2BcpUy%2FhwKdwNBNZzj%2F2u0HAqEE6nWxs9a68IJlp7TBmFCUDwk63hJQBjyugoRRnFyA8Um6AD%2F31Ngd536gUWkNakn3IeJAEyHfwGX2aoY9FbV5qNu%2Fr06AyoP1ucKUc3t4L%2FrqAq7fgjk61P5j&X-Amz-Signature=40375ed6ade8382fd2b239160dc267afb68f4565e80b9cc4b3270e515975faea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVXXPOJS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdaTm7w%2B7%2Fi9ecEZbDZ9YQAzXS%2Fesh%2B2pnIT7aVGyy5gIgTLuNP02yiXYhZI%2FZWnjQrVlgM1rvv7paXwNTH0OO02gq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDM9vbpDd5CtkiBnGwyrcA%2FjPrv4iGflM%2FKYfo84tGBPl8jejuYbtDVao%2FAoJPuRTtWEscFDJPBalpwQk52a%2FfNE1EK7B4W36V5Mp06bvkxcs09qlTC0OasuUgF1taqgGIs9u1DCXOH6Y%2BZHitAWAuQUMjO5fwuxxVW8wMmePduLzaR%2BcHLic2SfXmUmo7Gg1QY%2BAW2airOcuu9bcFN0HQbVgKsdjwbnNbo%2BkDVLDPhgKKFicNc%2B%2F8lBEFEDbmdwp3dqzzjvNEvNGYMgUiv6ZDQLGT226kdmf5Y5VBFMTUCv0a%2B6CbOblWPsUBUBPgBjB%2FHDrQiTz%2BiDpvd9phqIqIJId5Q2P8%2FCzOOxj9Ia4xDsebSb3zmLv3YFWlsHwnM%2FrQRgsYTYfOHOQskwY7g4ykMx2Wb4HepgSsjpx97wQBZyp8RbDuhPjqSgmI7wKK0CE1cGIPib7U%2Bb0Zh338YFHU1HlPW7ijEZ2Q%2Fv4%2B63jO%2FI10Ii0RtEZimfjYWxpptwUyGa%2BOOHEQps4UEcRsAccxsDMO1i8F9SAHSXbTkvlNA4SEPlPy8k1ChSJQJqUEFgonvJNnpmLyEKEAd2cZek%2FPjj4yF6RQkN1XpVAUzgd4tRPwBUVflSZLTAwH3FgB5DQL5Yup1YHQnRQE0whMNL57c4GOqUBoc11%2BTtT1b09tXfh6P1eAVDENU1rPkQCCUB43vvpLfPWkgh%2BYdC9BZdusrxoqjYMzFe9VQDUHbGijctcG8%2Bn29Xv6kIej1gdzZMJQVDE%2BnhRUGGDdvGbeTrDmOjpsTEQr0kmA4f4KVKtFDmxuZy4hEVDJYCkgwFC7Z%2FLbZESnWs6b7cMHbFdAvMGA2gdXkszHUUXvFFIBXfLbGsyBKAgK2tR0D%2Ba&X-Amz-Signature=b2427462a5ac09b5b28c180c790ddbc7c75e659dfab8d5711d12d47a616fba5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVXXPOJS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdaTm7w%2B7%2Fi9ecEZbDZ9YQAzXS%2Fesh%2B2pnIT7aVGyy5gIgTLuNP02yiXYhZI%2FZWnjQrVlgM1rvv7paXwNTH0OO02gq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDM9vbpDd5CtkiBnGwyrcA%2FjPrv4iGflM%2FKYfo84tGBPl8jejuYbtDVao%2FAoJPuRTtWEscFDJPBalpwQk52a%2FfNE1EK7B4W36V5Mp06bvkxcs09qlTC0OasuUgF1taqgGIs9u1DCXOH6Y%2BZHitAWAuQUMjO5fwuxxVW8wMmePduLzaR%2BcHLic2SfXmUmo7Gg1QY%2BAW2airOcuu9bcFN0HQbVgKsdjwbnNbo%2BkDVLDPhgKKFicNc%2B%2F8lBEFEDbmdwp3dqzzjvNEvNGYMgUiv6ZDQLGT226kdmf5Y5VBFMTUCv0a%2B6CbOblWPsUBUBPgBjB%2FHDrQiTz%2BiDpvd9phqIqIJId5Q2P8%2FCzOOxj9Ia4xDsebSb3zmLv3YFWlsHwnM%2FrQRgsYTYfOHOQskwY7g4ykMx2Wb4HepgSsjpx97wQBZyp8RbDuhPjqSgmI7wKK0CE1cGIPib7U%2Bb0Zh338YFHU1HlPW7ijEZ2Q%2Fv4%2B63jO%2FI10Ii0RtEZimfjYWxpptwUyGa%2BOOHEQps4UEcRsAccxsDMO1i8F9SAHSXbTkvlNA4SEPlPy8k1ChSJQJqUEFgonvJNnpmLyEKEAd2cZek%2FPjj4yF6RQkN1XpVAUzgd4tRPwBUVflSZLTAwH3FgB5DQL5Yup1YHQnRQE0whMNL57c4GOqUBoc11%2BTtT1b09tXfh6P1eAVDENU1rPkQCCUB43vvpLfPWkgh%2BYdC9BZdusrxoqjYMzFe9VQDUHbGijctcG8%2Bn29Xv6kIej1gdzZMJQVDE%2BnhRUGGDdvGbeTrDmOjpsTEQr0kmA4f4KVKtFDmxuZy4hEVDJYCkgwFC7Z%2FLbZESnWs6b7cMHbFdAvMGA2gdXkszHUUXvFFIBXfLbGsyBKAgK2tR0D%2Ba&X-Amz-Signature=b2427462a5ac09b5b28c180c790ddbc7c75e659dfab8d5711d12d47a616fba5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRVV37WP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T152435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFqbe8gp3uESGvVK3UggwJqLz6Ts76RU5NE58btGYRDnAiEAt6iVxkUPLhpJhZK0L0juQfMUqV8bGGAjPZEuBvTrg7kq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDGSvNJswYdWXVlItgircAweLgOlXO%2BA3U6q%2FE79c1ehhjkmCWCq2SlLAofARKCfZbi1QkFUhApuoN3XiycynRGONADBZaxjHSjj58HTkCG%2BcyuranT%2F5qEupe2D1Q88%2FF830b8cIkp4lgxD394KicDGUCtfXqZUTlvpLQcnlW9jA%2F7AYvu2%2B37G5EfWk7muKLRRrerzSyUOOUItQW0fEA6kc2H6xXbOFjuS92rqhlUkLvzcZ%2B32nhCahNMLpqUuvQJLTQ%2FToW9bt%2BTwXa14wjoB3GY2uHo8UWbQPam3hL%2FiNtliSU4yFT1rddotaQhXDF24dwixvJMHJNWfjDjVjrResZDIQujXSXYqZjO2YBTfpKV7Rg8olhOVt9WeSbwvEVsQlNdgxL9bumcVyZ%2FQJppJAdKpIWoKhuLpQEtSQCgCVv6lCsGO%2BpOx6RTyr3Ra31EozHhtOAjB1TsEyQqN7d8%2BiK04pLeuOfD9bfYIw%2BxCtmWFJtofWszflS4iJNR3v6e3vV85bJJV0tFU5Cg3bnNrmZo70ib%2FtluibdqT9%2FcnunruixVvT46xwqvpc9N1b1popO7zxuxSNb77fmf4TvCIKFPqas0rfj0NqOfobD13hOyQMC2US8lt7PJbIUfujh9YqGnqlw8WSqnYgMKn27c4GOqUBY%2FiM5%2Bi67nSiWHmbrHWtuXRqMLdXiKrNj2b7zvrQWBQzOfjxTAeJtKj7Jmts57NfTMQwm7R1xJdjEa2O5xgU5QEAOhQEWkn%2By7SHiZZyagIrts0uVdRJ%2FR8TsVhnlrqmw15A684ianIZoVGBAV2IUtZGUiJ%2BSG88xtN5XWnXmBOq3z2SG5rWLVnSyrInmzfLARIbaNVt56ZomfonHNrdgOTeeUl3&X-Amz-Signature=ab79bd13f36f7962fb53e0cd267d23ea1ee4c09d4a43ac4345846eac54d744c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

