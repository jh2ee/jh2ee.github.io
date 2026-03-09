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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y7JON5X%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCa%2BeftXPwfn5EGlgjXYN%2FJ1iR6NZori4dh079SUD5atwIhAKjB1rYUs3ODg5vKF%2FHfnnU%2BGd6olof7oetIia3liov2Kv8DCCgQABoMNjM3NDIzMTgzODA1Igz8RMejBLVqRmHRk3sq3AP2BQJAnxhlfGwi2Y1lt5GgW%2BiHK%2Fg%2FyZCTkCl3Ti6wlijtgHMUcf%2FIToPAvlDdqkA%2B6de1oRV9lPj48hLuUmOWPddH1YfOhjmy%2Fdg%2BqU8IC%2FwIxS7K7Ph5GfPXTkkJxeVHRpeGrVz02QdrRyUaXUapyc%2BcbCjbFY4qiUajWKTw0ccdoMkNQmnH4GJYEkywuZkWjkAIkC3LJ%2BOL7hGSL8S3PVKObFbVfXACjHFx1l5XfzDp2cBOoD6Fh2NZY9Q6mTtwq6Yn67zrufvxqfS2yzIdRzsFIiikLH%2FCxevt5bNcdylS%2B%2FZ5Lt%2BwmYMEyu5jtiej3X%2B8VrBEzLBtdGv4lWbahDXoLxA0xxBJdDDZXbUGkSHNFgIleO%2B1IoMrCvxs2lzBmamgxUJVJm3TYveKuvVmbwoDreg%2Bz8lsHudR7k30iH79cWZa0%2BhU6T2U34HqH1D32J8fBwbGywp5jLou4N3DZfmBX3%2FsxP6WGoLFCRoyqyPy%2B%2FEjF9o0HJROJ8vcST1OA9GrOEes3RnXZtKRQr04pDHn%2B61ntvuoNoNoBNhbBzf20kYdAT8jI1MKRBfeoo6RPiEhP2OZoxZsp2T3uUNh8D8eNT%2FnbJx3y%2BmqAMyrRXUKJMjC5beo8Xxs8jCJ2LnNBjqkAaFFAu%2FUomYfYNFspBEIw%2Bxq0Vbo462XX3qHJXdqs4QTf6s08Nc045Z4TtriF530efXyjEdej4QFcPvNUAOsPooWi7Z82uppFVRS%2FG4uueR9x3OCgVbyGzNrrpCwYYIpkLP4KrostpcA1q2F6niLnL%2Bx%2B4vGuGUghQogvyVW8S3GzLPskH%2BryWGK%2F1Pl1PfJkoPE2r6vJhqmExJKJ1hmcYLnRM0G&X-Amz-Signature=6acc6819daea6f028d41185461bb84412f4ae09e88c287eb07fbecea04a7811c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y7JON5X%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCa%2BeftXPwfn5EGlgjXYN%2FJ1iR6NZori4dh079SUD5atwIhAKjB1rYUs3ODg5vKF%2FHfnnU%2BGd6olof7oetIia3liov2Kv8DCCgQABoMNjM3NDIzMTgzODA1Igz8RMejBLVqRmHRk3sq3AP2BQJAnxhlfGwi2Y1lt5GgW%2BiHK%2Fg%2FyZCTkCl3Ti6wlijtgHMUcf%2FIToPAvlDdqkA%2B6de1oRV9lPj48hLuUmOWPddH1YfOhjmy%2Fdg%2BqU8IC%2FwIxS7K7Ph5GfPXTkkJxeVHRpeGrVz02QdrRyUaXUapyc%2BcbCjbFY4qiUajWKTw0ccdoMkNQmnH4GJYEkywuZkWjkAIkC3LJ%2BOL7hGSL8S3PVKObFbVfXACjHFx1l5XfzDp2cBOoD6Fh2NZY9Q6mTtwq6Yn67zrufvxqfS2yzIdRzsFIiikLH%2FCxevt5bNcdylS%2B%2FZ5Lt%2BwmYMEyu5jtiej3X%2B8VrBEzLBtdGv4lWbahDXoLxA0xxBJdDDZXbUGkSHNFgIleO%2B1IoMrCvxs2lzBmamgxUJVJm3TYveKuvVmbwoDreg%2Bz8lsHudR7k30iH79cWZa0%2BhU6T2U34HqH1D32J8fBwbGywp5jLou4N3DZfmBX3%2FsxP6WGoLFCRoyqyPy%2B%2FEjF9o0HJROJ8vcST1OA9GrOEes3RnXZtKRQr04pDHn%2B61ntvuoNoNoBNhbBzf20kYdAT8jI1MKRBfeoo6RPiEhP2OZoxZsp2T3uUNh8D8eNT%2FnbJx3y%2BmqAMyrRXUKJMjC5beo8Xxs8jCJ2LnNBjqkAaFFAu%2FUomYfYNFspBEIw%2Bxq0Vbo462XX3qHJXdqs4QTf6s08Nc045Z4TtriF530efXyjEdej4QFcPvNUAOsPooWi7Z82uppFVRS%2FG4uueR9x3OCgVbyGzNrrpCwYYIpkLP4KrostpcA1q2F6niLnL%2Bx%2B4vGuGUghQogvyVW8S3GzLPskH%2BryWGK%2F1Pl1PfJkoPE2r6vJhqmExJKJ1hmcYLnRM0G&X-Amz-Signature=6acc6819daea6f028d41185461bb84412f4ae09e88c287eb07fbecea04a7811c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQ7GO3EY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCPgpX70ujMNUrnw5eCBVO7IlkCVuqQJJcfO8R4jEz5bwIhAN1GcC1gdxgMcisCtIvHoeaY%2BLQJlDJV3vKRB%2Fio8jWFKv8DCCgQABoMNjM3NDIzMTgzODA1IgyMWFtetPYkYDtNnTkq3AO%2BSptG2am0soxboLO9ncaykiAidaAU%2FKkBtjdOXzVJXQ8NsxPDVO7TfbPb9PYVgyz7y7NXzWGnALE8A86NZ%2BPtWuvrGl9j7YVs71CeaZISYXzZHfvcnc4lNZWi4we%2B61HORuuyrv6c4slWE4QwVVxQViRDF9gDc%2BjVc4nPaeE%2F4AdflHs97UtcKggSr9z9nGveBdEWcl%2BOW4U4Uh6TJUMddmRnVJJxEl%2FdpOD99Y%2F6%2BFxKqC6yV1mjpTbHmeHGI4wp8J89PB1W0DDIwj8fX7lDLQmFCIWn4%2F3qMnFx7hBKtxYoEF7bJo%2B3s7L4djOLqbnlzYJB%2FIWbRKWfBKxIrnbLG3BxsQj0y2zcw%2BLMnQzRGHjxxJfwpI8v6mzgaPO9R3NwLcxw0H6KLmYiERVg%2F257U0Ty57HHSUgKYXJgimMb79SCWOi5hc10cdqMA4v6EP98GRwRQRyvscnO49%2BX1gk2lgEli3vSK4i%2FLLcy2poqQsXESn8jlCcaFPMiz%2FGQNTCNUBToVTZ9Gt9EcGUPmjCnxxz2VllaZAopzIePqhK4ZX0LXRmYagaQu%2FzLmzA%2Br4zSkqeDq2czTLmrkn0nEA6%2FwJzXNkwUGpVfEwBX3uwHDv1%2FnAdG39bWmKl81TCo2LnNBjqkAUHlWrE7AhE7kjc%2Ff1Ut5SpJltB82of80jlgz3Es3HkDmtxq4Qp5LLBnfUOZbl0uB4jgzcHvTbQz1lf2So8TX%2B2cZOZAtGoJkrTU3p5fnQqoqi3BccdU%2F4vJ17lYuvp%2B02pYOq9D6tVR9aDbb7QnkYzJvaRBjMaYO7hl0%2BeJ9hV14swl23%2FKeSBRwqW6hpwm9kCCc7M8fwSnTyEgJKyEMWP3T3po&X-Amz-Signature=62f6bd22a7471c05ad446d9654b4e46faa21519e9dd6be9b660b05a882fa5415&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZXFDR2J%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDyTS%2FtlrCeLEMsIEakoB9UFZFzfW5dM1MN1RRvYcMjGwIhAKK1vKnv%2FKNtnHQmRB4DBkNJP%2Fz6ZzcIVQosUEdcgTMWKv8DCCgQABoMNjM3NDIzMTgzODA1Igx51qzZm2GWNOEMpwwq3AN%2F%2Fco8F%2F%2FLy6l4bBnkQlw607JIrQqm46cRf8EvRboqYaJH%2BEoghC8I5b4xCD6qlZUVkKsGnQsbmuA5FeP3ZQL7b7nVLhhrUi7EPT6B%2BgOzVOraYIjmsmslLgc1to4MHO4De%2FkjrjIm9JgPQr6eYPlZvTxv63lqMbToQwkHEFSHJt889PdXe9bt6Pw0MlRLsgQRtHkIkrz9FjqMtJGEirZ8PjEBBURJ8I9zx2o25FU4E881Kn%2BszGczAepEaxBGm1vjRRRtAJ6xloCM6tyzNriN36cbSXOtOYEgQDxFX9o4Y3Kuflkr%2BMm8J7mmKdoCzy9msXfukNBAT716chneLMlzD6RVBx1RJhixGa7YYKkxbsGXhJkDRUh3WEa78J50zeD%2Fwt4hj63SBt31I5vjauqztkCO7i9DtRQbehKj5MHMbYpYHl08D8QT2NuFO6q%2F9MKXuyYPjtHWpkObtraJhxCFusTUq5eyGOKIe0I5oxSbKQkpYZX%2FZa8Xzw4mXlRnc6y3zKu%2F9LCjEwJg9A%2Bp4MogyNzUrwIWAy9ag2rpEegSxt0dDsK4aCMaM%2B619NVN2OcmRBQUBJrq7dylaVLZ0w5ja%2BaX%2BeInDSHpfre%2BwQDuM3%2F3VvHwd8UzXnQ0GjDU17nNBjqkAUMT7SqfUynrm2V7GC8d4qNPllcd%2BI6hPyP0dwYMj1jo7cly7fAf%2FSVZzgw%2Fwke9cfwzF%2BXqCTq3SyLudCcvyRN1SbbXkRbufbH4v4u2C8E7ejeflfJDrcq1KL8Iq7f%2BKbya02agcJZF%2BowvTLtULIp%2F2ElKluDBbACOanED14rMwcobkQOzYtFMqD0RZkQ37xcPQHsxZo8m1mF7RcHZQkObg%2Bcq&X-Amz-Signature=41670f1eaf041b740b77ead05b30e0064a6d7dc8854fc08762bceb2bb3173dd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZXFDR2J%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDyTS%2FtlrCeLEMsIEakoB9UFZFzfW5dM1MN1RRvYcMjGwIhAKK1vKnv%2FKNtnHQmRB4DBkNJP%2Fz6ZzcIVQosUEdcgTMWKv8DCCgQABoMNjM3NDIzMTgzODA1Igx51qzZm2GWNOEMpwwq3AN%2F%2Fco8F%2F%2FLy6l4bBnkQlw607JIrQqm46cRf8EvRboqYaJH%2BEoghC8I5b4xCD6qlZUVkKsGnQsbmuA5FeP3ZQL7b7nVLhhrUi7EPT6B%2BgOzVOraYIjmsmslLgc1to4MHO4De%2FkjrjIm9JgPQr6eYPlZvTxv63lqMbToQwkHEFSHJt889PdXe9bt6Pw0MlRLsgQRtHkIkrz9FjqMtJGEirZ8PjEBBURJ8I9zx2o25FU4E881Kn%2BszGczAepEaxBGm1vjRRRtAJ6xloCM6tyzNriN36cbSXOtOYEgQDxFX9o4Y3Kuflkr%2BMm8J7mmKdoCzy9msXfukNBAT716chneLMlzD6RVBx1RJhixGa7YYKkxbsGXhJkDRUh3WEa78J50zeD%2Fwt4hj63SBt31I5vjauqztkCO7i9DtRQbehKj5MHMbYpYHl08D8QT2NuFO6q%2F9MKXuyYPjtHWpkObtraJhxCFusTUq5eyGOKIe0I5oxSbKQkpYZX%2FZa8Xzw4mXlRnc6y3zKu%2F9LCjEwJg9A%2Bp4MogyNzUrwIWAy9ag2rpEegSxt0dDsK4aCMaM%2B619NVN2OcmRBQUBJrq7dylaVLZ0w5ja%2BaX%2BeInDSHpfre%2BwQDuM3%2F3VvHwd8UzXnQ0GjDU17nNBjqkAUMT7SqfUynrm2V7GC8d4qNPllcd%2BI6hPyP0dwYMj1jo7cly7fAf%2FSVZzgw%2Fwke9cfwzF%2BXqCTq3SyLudCcvyRN1SbbXkRbufbH4v4u2C8E7ejeflfJDrcq1KL8Iq7f%2BKbya02agcJZF%2BowvTLtULIp%2F2ElKluDBbACOanED14rMwcobkQOzYtFMqD0RZkQ37xcPQHsxZo8m1mF7RcHZQkObg%2Bcq&X-Amz-Signature=2b36937b890e60b2a6a94bcee7bad0b2f70244ae55afc44c54b37c5a0a85ceb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ST37M7ZS%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCB4eMxaZ4cVsYgA7NjPGnNh60%2BWv2Pe%2FqrtzdXt%2FFBewIgBVmCzm9RvszLKk73Xh7wT00mMPScCyG2OnnPfOtLGN0q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDBcdcWagA%2FvYMAMpISrcAwRl80tjh4TU%2BDa7NlTBCHBs3%2FylmTN9IRmPtNwv5ZCqvdESfPQyw2g%2BAWBs4M0Xlaxg5MN23JFEufZ2yzHjMDfr2QxUP3mMekG1UmZ6r8YxQcO2R0YJFMbJWEXnL6q9I0vLXk%2Fg%2BsBgoIbj6Nj%2BlJKJqffWscTvO7pb7Mm3CA2%2BdKusTjn37KYWMscIUDMfGXXhJDpLkdTLp1RxA%2BAfqBUPa0z3JzTXdBNSCBrCN6iS06Le9DvkwRipua7UrcgRt3esueV1YtAbCIRiqnGqnuQ8zjbrcEeqhKJr7SEVneU3w2AdjpI7aro73XgFJzbFmaouIEViPFLCy2myG5PteaEQYtkRHLg54xlWPinZMy9VALYjcNnXWZUT4Xo%2F3B%2FDhv7B3U9sP%2F2d%2FOZTha%2BlxyeRaf3WzzX9ZqipP5dVf3%2BVuN%2FV1QFVU%2B6AXlY4f%2BhFQMmaQGr2DHauyWtZfODS6Ww7YwWaiO3CgzfwBbL%2FBgLDzh38ZvNr4LCJFhqReBtWl774RnmX1%2FxRNpNtkRQehnZT8CA2wd%2BMak94iGxfWzcfsZFoBxmhLhXr0COPqtHax9h7IFsllbOa7gUrVQqfNX6njYfX14avBDg6HRYn5e%2Fhc3r1LwqRVjyXPes3MNLYuc0GOqUB%2F6tBVpB6kpm9SlOEj73fs%2FycDDNBBDotV8xQyBx9gFZ7YYDDeH%2BzKNje18g%2B6p4ZpCnPMMO%2FFhJHBmpV%2Fhuj1HZSWL2CKJZZcV3K3BZ3YUw2uC5wjejNp%2F8nmuaBOvUDi07xzzsB7BC%2F8a%2BgrsGBB9Gv2W5rYWwj33voCGnpN37RvhXSjHttu1dOF5e7FXaQkFcu3joQTzqXqROAGGy6knVyGE3v&X-Amz-Signature=0dd61bd2053fbd94bb2a3746043a3f172b52a59262a90761c63f386363aa3d81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GLWRVUF%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCo7KNaB0%2FaXmiYba8p0Zx5YdlCiz%2FyXMlLrdoz88QdigIgUvPPu0A%2FkXLDteruzfCKx5MlP%2BhrXH69Qk5wmYNBSGIq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDBTLaIUVqpceFqJC4yrcA7emfm4Em%2FzSUBDTE3Z%2FsINYzPN%2F8EjljWiydr8Zqz4%2F1rGICfjtrSIH7kDx45yOTxH5ceqUSA2%2BJqJUVIWgDpIPTEs89RR8vt%2ByyTNfV1WTcuGJT0ksHuCWEPlnX1hFGZeFPMbwAFZrD0SR6Rd8G6jfcX0SFKUxxdg3te5SUx6pllSV4DPTa7lCFruM7v6upqSz6KpbiWjvm4ZhNYSpcPimXcOzlxpiq6pOi5YF7EdIgEvUeHzuEyLRyxmI2Q1rerNshW477BtjbPQ4THKSeccLGQeX%2F%2BWzV0D88FShuSw%2BZ6iI69gcnjSJ5NP%2BPnWFVTxiK3iJqCpedVYf6MfmeyUcc6UwrkDZAUifDmJCwK7ZiuFzMLd%2BJLnGRXT%2FWJ5BIJdRFAd9tW9g3M7iojBp4Bz5H%2FoXIdHdd%2Bo9j9FBjPm7R5hypY6uOMCO2CUCjvkBqWrZccfycJ2G05nGbrmB9jMeBq9c6lSRHmavwEb65FWECFBODrSnemTiKD0WnvQuqgsSxEpivzSZQwiNMiSBQdefYv5HO6uRZo6P2QBNqbiK3iiJwAa%2FLxOiqNYWTeHye3HIxp0o4872%2Bg527FydtM%2FkW%2Bp8pqLSwyeYqgubcMUgxxRqOuOc8yGY9dCyMMvYuc0GOqUBb9FP2CustuCwjTrlO%2Fi0Ek3upTExIfvNy4siKj3VOouyMHSUGxU%2BjNm6WVGKIpjG0x1EVP2eF23vYH7fVaHgHP3QQ8bCoKUI9HoTQngOA1SQeenz%2FKXF%2ByebyBchp4xNKSM%2FswSvS1ADDjJobh2b%2B%2BoMttYaUqdl8czTR8nfy3RyTmQVqpHR14PdMhXbfrBWKKBgIUgjWZWNmdwuwEG6mQ1QyBYv&X-Amz-Signature=fc2870a5dadc8567bc76c7e10d06fec0a765875beb963a0a6e64b473341d18e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTNHD4HC%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIEu9Kz5sB7ctaQS5XhAQg%2Fm46i6BHpaKF%2FT87RxQ1FDxAiAhWjEa52Ohm1AV6gvmOSB%2BoDhV1Az2GUNroMBcgCwfxCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM6P69nCKgq0is3grWKtwDvljEPHXphXa38FEkmuWvx30svKYr14J2a3Th1JAIyRl%2BPbntvVI%2F4Ddl4qJcQKJa6rX%2BBsQzMufKDmcQS0wWXDtN0vk4zuCt3qMAnaCAOIbfnAOxCFUTIsnRPQeooo7SX%2FE%2FErYjGXcijiD%2BdDyS8DA1zvKiWMQPWVHKeJluihKQURyqo7AbYFRPYlHB8r4iFqrErrj0QkQsWZBfT6E4La7GaANCizksIZ8VDsSTL%2F%2FRRA9cSio3KYiNxdpLcvOZaCdIjBH6Ca4ymI0OUILM3sKoge8uwZlXnvJJejaCJpiKuhH2sf9P4dNWeX0szddC5Aops3XBw2Rrk%2BLCWLf7oyum8p%2Bz9blwSm%2BABXAH%2BhYXf6dvMxz7g8HDWv3KIiDRF%2Fp2cgoh%2Bpio7vvruk1znqmhxOTUATAgoKOg36%2BkqZrjjp0n9CFb%2FaQFhl5VwRec%2BVXA0ucLFufI1aSsKbGCMeYCHk9GpC%2F2eS9Bnudn59tzHNRhH%2B9QPYP03QfZlWvEdFeezT6eOjR%2Ft4g%2FKEp1azXSQKuzdNXOppps6fmhQa36Rw2XHf52Xr%2BNEHfvh%2Bz5QD%2BgzwI1FyZxAZbNzHkXz%2B%2F%2Fef1EzstBX3d7PandhDURn%2Fcq92y9ohXLqbcwmNi5zQY6pgEAHcemWoIxn6dlEmAPyUV7gDJYIvMoWURXte7Qd5HeRCsil9F3Eq3X943eY%2BgANdHL1KNbub8KcTJwUonEjab9FUkuQOd2CcS4spVnh6Dy9xDE3kbbu1IW%2FXKrlTlow0VphW7GiX7%2B7HCP4fHnW2WFYrBWS79QxY1EwjF3kDZ9gPw7OVj%2FvtUwut43jGnptitKPSwB8PvjcSpFfdQ2uJAU66DTNARS&X-Amz-Signature=5e23d6735aad4cd39aad8b6dba406162c34e3d10d713f6399d6ca3dfa8b3fb9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4L4EFOV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIC1fL1s3DgixGSd9jUuzdIrIwtjtBOSsriQ29V15Yb2%2FAiEA%2FVJu%2Bl4Jdd4bT6DZexy1lksq4ia152l%2BvJDKxLBYNQMq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDFw4ey%2BDSQ2iLiqJsircA5hkNEG34mEYu3PiU5JGL2DLYUvADGMCEIxN9YK5LM4ZqkZ%2FtFPJA0u59SdDuhQJsqPKo9o6zWfwRXeDyOewoqA38PC24VtRMcJ0mO%2BWkds%2BSnslKNvrcNOYOSObps%2F3eJN%2F5hyj%2FAvgr6vNVz6n9QNHRWOuQlxv6ujAlVn0bB7p%2Fpsg1z23ncylmtEzOF2WOgNb%2Fe8pGaTZ%2FZpXDHzGlYcudxLmWGKZg0xT9mxZUi1OqJhiZpue2N0EzkRr0jLQc5jWyTFCF1PHzcbsYdD3W8moI4FcncRKGg8cWdyinKlh0FOnYlw%2BCsENaaIcjql0WHGji%2Fj9DogPTNabGabUfiRkH6PKF9BGo%2FTabMiM1JtwqWG3IPKJGUhxBf4EdR5yRcZ0TU0T%2BSKVZNiZh%2FBuaBspqUMj0lX3VrvZa2kqDvPqgjBY6wc0eGj330rwUc2VEdCWTJAf1U%2B2AEcrXi5XY7jXnRpyQdS%2BaQ6%2BrcE7yUKzqsB8olRE7I1Nr11PmJLdUxAIAt3UsFmXFoLURMgZ9nxeMXeFt8PuEvgs8YAFXu7CMaF2jcl%2BZ0RNuUuk5qPhN1qMmovWeSLjByLvX4rFUDM7Sl6OLh%2FGxfqyKiZ3N9APg5OTpaANTOBHu8YtMO%2FXuc0GOqUBLLES8t2LXCg2tH8P%2BDx13HFv1SdXeWUArNn5FyU2J5RXmGbozHnUHiQGGTv%2F%2FOGAXW6iVfzZvvoWXeT24rO%2B1MPv%2BplupMKlVKpKithMwXTDIq7R9FeLhl6KEHq5ydsaf4cuhPvXrMUBS6z97f9g7JNBBC3uXRUtIoFYZuF%2Fc4gaid9nM9w6NkjhGhaGIC1F3pMLrF9E25YfseqrycJjpqxd%2BwJE&X-Amz-Signature=6d82d34228d76464c8e279b889ec31b5d569ede9a3f8456c9c76cec761974b95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4L4EFOV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIC1fL1s3DgixGSd9jUuzdIrIwtjtBOSsriQ29V15Yb2%2FAiEA%2FVJu%2Bl4Jdd4bT6DZexy1lksq4ia152l%2BvJDKxLBYNQMq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDFw4ey%2BDSQ2iLiqJsircA5hkNEG34mEYu3PiU5JGL2DLYUvADGMCEIxN9YK5LM4ZqkZ%2FtFPJA0u59SdDuhQJsqPKo9o6zWfwRXeDyOewoqA38PC24VtRMcJ0mO%2BWkds%2BSnslKNvrcNOYOSObps%2F3eJN%2F5hyj%2FAvgr6vNVz6n9QNHRWOuQlxv6ujAlVn0bB7p%2Fpsg1z23ncylmtEzOF2WOgNb%2Fe8pGaTZ%2FZpXDHzGlYcudxLmWGKZg0xT9mxZUi1OqJhiZpue2N0EzkRr0jLQc5jWyTFCF1PHzcbsYdD3W8moI4FcncRKGg8cWdyinKlh0FOnYlw%2BCsENaaIcjql0WHGji%2Fj9DogPTNabGabUfiRkH6PKF9BGo%2FTabMiM1JtwqWG3IPKJGUhxBf4EdR5yRcZ0TU0T%2BSKVZNiZh%2FBuaBspqUMj0lX3VrvZa2kqDvPqgjBY6wc0eGj330rwUc2VEdCWTJAf1U%2B2AEcrXi5XY7jXnRpyQdS%2BaQ6%2BrcE7yUKzqsB8olRE7I1Nr11PmJLdUxAIAt3UsFmXFoLURMgZ9nxeMXeFt8PuEvgs8YAFXu7CMaF2jcl%2BZ0RNuUuk5qPhN1qMmovWeSLjByLvX4rFUDM7Sl6OLh%2FGxfqyKiZ3N9APg5OTpaANTOBHu8YtMO%2FXuc0GOqUBLLES8t2LXCg2tH8P%2BDx13HFv1SdXeWUArNn5FyU2J5RXmGbozHnUHiQGGTv%2F%2FOGAXW6iVfzZvvoWXeT24rO%2B1MPv%2BplupMKlVKpKithMwXTDIq7R9FeLhl6KEHq5ydsaf4cuhPvXrMUBS6z97f9g7JNBBC3uXRUtIoFYZuF%2Fc4gaid9nM9w6NkjhGhaGIC1F3pMLrF9E25YfseqrycJjpqxd%2BwJE&X-Amz-Signature=12d7e4c9c8b40b777a8c3687369a5c47237e2c7e61aee00b4abe8c1340cb3124&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOSRFJY2%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIETKIAzomI07lLYD7%2B2At6LbvAt0RtCF09IN4FJ5JQxTAiBQ4q9YK6IdA05diGVgy1VC5fiZgGGksUBeBRbYMekbQyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMk9LKrTK8rELzAnntKtwDUiESEgEtbj%2Bdmaljau4IwxO5ZivblJiL%2FMhG0lEokZ6d0V6al%2B9C61lXK8B31dYZ66uoos%2Fe%2Bde5FUIBMTYrSGPBm2%2BJkcQx9%2B2WVyqN01dPAFsaxnXtbCPLVB0g1r%2BNKSv5819JWH2Y2aHfFHtwhYnzffzCktkauTTppq4tqrjpVdorD33C%2FGjq8OSa4f5vEDm3ZRgV6yzfZg9qd803u11p0grMXZ7K1vpoUW6hIHCpDNmZoa3tOmAsX0qVa3g9Hd0hXKlZSvN4oMxsAdUtgyFSMcRgxk58IHDNmQ0VI%2F4IpdCLFK%2BJj5EzLpexCU8kN2U%2F0z2W4DwV4gPXglpMhai6YQck7qwlOETBWjD8wUbJwk5GffUqcR3%2FQHND0QQskjiufwQpcf%2FxHPLyZxhq2nn17ZgHK%2BJUXIxFMcGi8F1Rq%2BDNyt5Lwo8TeXeDEJpJJchn9hT5nQSFUYWXA86E2EX%2BHkgwUolpMwm6CUZL3T9%2FNsYmcSjINnzAeMjiXJPWZ1quOKOCvi5uBYaa4YsYI4FFhQ%2B8%2FMF7LzaTQYtRFo5Bo0gBECGiAU6W%2BSp0OxWI6U%2FICpwlBs9l2zKOjkHnYRR9N1FKJ9qeKXXd9rkLMZyYGTJYl%2FoXVHcvSfMw29i5zQY6pgHbmyroJzDDgO3rcrs%2BIQ26M9iogCsjZ0ukmfiFEb%2BPZtwJUEoMV5KoKcGcZ7dnTFZD5U7GQIdJFB8q7%2FaH0G3J9Wl%2B1Y2GgpH3EikY5%2F27Fo2BtECheYTLBmvSyZB5mcu%2BejyqLYi0olp3Sw3zASTonHHdEOz5vfdgwi2lYnblgcRi5IHRbiPI%2BOXzMlYSzUXRc42ER9vMrKcLeISAVRl8rjHgiMWd&X-Amz-Signature=b78f3b51d61e64b2ae134a69a1d231fc1285ded73fbc27e971699cfb0090a5e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L5T23WK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIC7ttXQTibPUzfguwUhEyXURFmrPuqA9JFer43p%2FQ6ZMAiEArN1rf90bK8VTyOgQpWz%2BR4r0IrJay8isGqqAXFd6g34q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDGStCUmi2FIBCUaKWCrcA%2F5riRAUCQ%2FrK8vX%2FJlUqONlTt%2Fif0lRyf31H7naSBHd2Q4NqwGb%2B%2BE6Oyjsq0s39cdv42g1y1FmDsYHzEb61afxYk%2BJ7iV4nBLId2FJhagsheh2X6Qy0hMtCXGuH%2FGjd9SgQFn5PsMFs%2Bc%2FZsTNzEqF0Q14wsV1ACGP5zT9i9X%2FBJViax5FF4Aww1Ljyd8w5fFZ7UP9EEP14xdxhqozxi1KwG%2BLLij5J67HltRAX6V1L4o1GYHRKec0MKc0DuBaBpgCiJ0xpifdgPbfI%2BFeuFIKERmluCVYIl9Cmkr8imUo571G%2F9omskfkjPQIfKs7zIPBj6UzcrDFKcWk3na2EosxVPCnx%2BkaQL%2B049KlNgpSnJadAubc%2F0ieiEvisCCSSKYj6Yz5aDmP6%2FvEJRm7%2BJgxrCb86tlcl5A6VHYWXxcJnhXAgRB%2Fl6%2Fnb9PisenzvYRd280A%2BKeffBSqDhwndVyj5%2BzCmUDQzTJQeH5fkq9Hk59CH%2BiId0SqKvU9KqmpWszKkez1F2e2EY94TlP0mCtXICH5Y%2BDL4tswkE%2B3Av25l00ETfGNCdU8a%2F%2F5krRvqIGmHVG7%2FfmddwR4TUdF%2BOqQT4CE4bJQn0pcYMJ4MyBkwp%2FSPhumUdZ6dlR0MJXYuc0GOqUB8i2d9RGytq10CDn9sgwSwGLe1BisCryYtRn48UYMK58DJeq8ySKMAL006bsXvPfL40J0ZDG9WGmBYOQ27u7Gr8fQbEywDg%2F1IYiQkmBkB9%2FA8R3GoVtBGehxDg7BTWYAOx%2F%2F2x%2Fx%2BBQL%2BBtFBwja1Uh9GtD6Fo896q4Cvm0Rw9yL6YUrgKrI2t7WbcNmkxd9C8W6X5pHJcidoE7z90LOA3xYQWMT&X-Amz-Signature=c22a6bc97baaeb412ed04fa488c73adcc8ddf676c39111c351bf5acb025b92ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L5T23WK%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIC7ttXQTibPUzfguwUhEyXURFmrPuqA9JFer43p%2FQ6ZMAiEArN1rf90bK8VTyOgQpWz%2BR4r0IrJay8isGqqAXFd6g34q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDGStCUmi2FIBCUaKWCrcA%2F5riRAUCQ%2FrK8vX%2FJlUqONlTt%2Fif0lRyf31H7naSBHd2Q4NqwGb%2B%2BE6Oyjsq0s39cdv42g1y1FmDsYHzEb61afxYk%2BJ7iV4nBLId2FJhagsheh2X6Qy0hMtCXGuH%2FGjd9SgQFn5PsMFs%2Bc%2FZsTNzEqF0Q14wsV1ACGP5zT9i9X%2FBJViax5FF4Aww1Ljyd8w5fFZ7UP9EEP14xdxhqozxi1KwG%2BLLij5J67HltRAX6V1L4o1GYHRKec0MKc0DuBaBpgCiJ0xpifdgPbfI%2BFeuFIKERmluCVYIl9Cmkr8imUo571G%2F9omskfkjPQIfKs7zIPBj6UzcrDFKcWk3na2EosxVPCnx%2BkaQL%2B049KlNgpSnJadAubc%2F0ieiEvisCCSSKYj6Yz5aDmP6%2FvEJRm7%2BJgxrCb86tlcl5A6VHYWXxcJnhXAgRB%2Fl6%2Fnb9PisenzvYRd280A%2BKeffBSqDhwndVyj5%2BzCmUDQzTJQeH5fkq9Hk59CH%2BiId0SqKvU9KqmpWszKkez1F2e2EY94TlP0mCtXICH5Y%2BDL4tswkE%2B3Av25l00ETfGNCdU8a%2F%2F5krRvqIGmHVG7%2FfmddwR4TUdF%2BOqQT4CE4bJQn0pcYMJ4MyBkwp%2FSPhumUdZ6dlR0MJXYuc0GOqUB8i2d9RGytq10CDn9sgwSwGLe1BisCryYtRn48UYMK58DJeq8ySKMAL006bsXvPfL40J0ZDG9WGmBYOQ27u7Gr8fQbEywDg%2F1IYiQkmBkB9%2FA8R3GoVtBGehxDg7BTWYAOx%2F%2F2x%2Fx%2BBQL%2BBtFBwja1Uh9GtD6Fo896q4Cvm0Rw9yL6YUrgKrI2t7WbcNmkxd9C8W6X5pHJcidoE7z90LOA3xYQWMT&X-Amz-Signature=c22a6bc97baaeb412ed04fa488c73adcc8ddf676c39111c351bf5acb025b92ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXIYBQBI%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T074134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCICrnjSLMvHcGn8MHnv4LhIrHmPgNqcY25vN84oNL4boAAiAqQWAok6qHtZYgwAS0qoK97rwC9J%2FWw8nPB9iqKd%2FAqyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM4Ua%2BDWzcFK%2F8L2yIKtwD2iFqJJwAoeOvGKEo30bQiXU32AvogWRBVjaRzDde%2BLYA8wfL0eRujsBsTwUtqqeOFtu9E0d%2F5fxT7Dys9qXzg14RfGQsswkhgdLjrbKcJ93%2B9P1Y7FG4CDlPDWImSFbsJT3suu00Z0WeINK86rgaC5U9pJyH%2FtvKQQafUGnKG2UMLjM7otwydN%2FZi%2FtzQKwvLbWY1gC913qRgLkwCuF3twStCxum%2BKYi3Yg9cUSx4CogMhZxaiJqY7jUtH43P9zbWKoR%2FhTzVWxjfgyeq0qLo27jStA7G4PmwFbsJ%2BtKq1nvPw8P2krRaBMNunQHjzLJpfTx9Pbm%2BgHzzFj4jFiD8dQ%2Fheg9klV6DrplhIepk33zaBsyYRVjCqEp2uEvLBU%2Bvi9nwtRTPnTtov1BX1evuY%2F8XJYvEihFBgSspIrCPPs6BRXSza3eGPK9NScSRdoSvWCGd1Q4d96x1%2F5woAK3TDPXWDoB6PhMyhajfpj9fRVHqxhRLT%2Bbne9RJjgayvjEqpzA3xeO5DyiK%2BD9baoeTwrvynZ9e4Rg6oMLFG6%2FDjnJlMaE2DTw5rup%2FSMq8pTDggtR0iG3DTDlAzdaWclt0MCxZSlQ3%2BIIXpM%2FxgBoFcZj9yVuiHxpKHzfoY0w3di5zQY6pgHN%2F8WOtz9i1VYsdcg2dnDWgK4BGR6%2FAWY%2Flsip7k5R8fwwgmFW9kW5R3kmoWvA0wJEB1Q7t5RV4eyfmrYGrUv8Mc7ynBhREi6gyA716AFnLafGK1Dbm7p2tasmKPVnR8xrLcWAfpEPqRKk9p%2BaZibAoHmDLTLFpGr0y%2B7qzGgwd%2BGMXKS5%2FUkM4%2FlBUOG5YP8odsgILe3gxAV7m2c6phWCwy6Sqk3k&X-Amz-Signature=d0a2fa02cb87dd66e10109de9708b5ee9c47d253c05b78a48ce86fe7fa96b3eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

