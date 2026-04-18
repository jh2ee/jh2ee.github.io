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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAFETO5B%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDJg3JHWibgIZQRQZqqVYwTP2ygvD3J6Xo3F6hD9s4mmAIgLv4D9H%2BIuQumcwdZMWzRgu9xHFVwXoqbQmUJ3RzI1mQqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHKA4OQGt7QmsUs8yircAy79aL3Gb60dqNeLKONb4l45LV12QtpWMmfeGYNdhjh9R4ZQYOVGWx5P0%2FppXobHqhmIFTz33WUDXeLjwCizVawODidefz1JJWw4oSR%2FS%2B2ClBL19XPIuTymxsRRuD01EZCY2Vqjm0ROIsRviWItbY8vP5L9hnMxhyNNFSzcjba3BBiqNY8LtXvre67hYJEyB2w9rKJWXtzza%2BHphdRKvDSjHKaiik8Z4eXcdMdbWeDfNCdHyCBUIUIOgOVgeQVHXqutMM%2FvbGpnh3VdmPjEZpKJgym6GB6TMdPLsqSTERJFHv4O4aUqAR5OMyPlLpk1hwONSebvEQgsiLr9umD94%2BwaYTMKQIWbb1JMR7j1x%2BWx1gvjNBValGulkPCUkjTmANWYpJq0jSG4w4tCm61ISVi%2B%2FI8%2FiCLh2i49cJ9WcIU0glgqA%2BNc7Fn3ZJ2J117lUco3C%2FQu1Tq%2BK10geJdtBJCNBLRSlL0z5%2B7qclGwjS%2F%2FKFaoGpyEHFdBnLCLBO9FtDC7TxBoHUn9kZw3QPa4pymDpu5sNID%2BzNq0Si3dv23Yp7Hpe5X0NUbkD%2FG96MsDamo1%2BydvQ0Cyqrxa0BS7kQIMHMYLypIYgD4752aKwh3Pu1mLNjf6UNHKU1LyMMLNjc8GOqUBkybo%2BZaTye0ytCBuPeuv5dY%2F4pXvDFOTyti4L3%2FkiN8MBUGOpdE8W6IlzjxerdB8ECVD%2FBtKzYqDPTk%2FqAOlfWR7TTJRNd9znqTL%2B75htBCGvbIRh6J7BQwMI%2Bn1F4gvgumom3JnvzgEPTZoWLE8l%2BksD2ozGKqwZlduy1pFjShwpkcnsmH0CsfgSEzbAU9H0WbeH%2FvQ4JODKWSDm6nNVK0nmzpX&X-Amz-Signature=5330f3824d7513cc69f751fab889d450558ef4acb2a7b5eb6902500a67cfce54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAFETO5B%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDJg3JHWibgIZQRQZqqVYwTP2ygvD3J6Xo3F6hD9s4mmAIgLv4D9H%2BIuQumcwdZMWzRgu9xHFVwXoqbQmUJ3RzI1mQqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHKA4OQGt7QmsUs8yircAy79aL3Gb60dqNeLKONb4l45LV12QtpWMmfeGYNdhjh9R4ZQYOVGWx5P0%2FppXobHqhmIFTz33WUDXeLjwCizVawODidefz1JJWw4oSR%2FS%2B2ClBL19XPIuTymxsRRuD01EZCY2Vqjm0ROIsRviWItbY8vP5L9hnMxhyNNFSzcjba3BBiqNY8LtXvre67hYJEyB2w9rKJWXtzza%2BHphdRKvDSjHKaiik8Z4eXcdMdbWeDfNCdHyCBUIUIOgOVgeQVHXqutMM%2FvbGpnh3VdmPjEZpKJgym6GB6TMdPLsqSTERJFHv4O4aUqAR5OMyPlLpk1hwONSebvEQgsiLr9umD94%2BwaYTMKQIWbb1JMR7j1x%2BWx1gvjNBValGulkPCUkjTmANWYpJq0jSG4w4tCm61ISVi%2B%2FI8%2FiCLh2i49cJ9WcIU0glgqA%2BNc7Fn3ZJ2J117lUco3C%2FQu1Tq%2BK10geJdtBJCNBLRSlL0z5%2B7qclGwjS%2F%2FKFaoGpyEHFdBnLCLBO9FtDC7TxBoHUn9kZw3QPa4pymDpu5sNID%2BzNq0Si3dv23Yp7Hpe5X0NUbkD%2FG96MsDamo1%2BydvQ0Cyqrxa0BS7kQIMHMYLypIYgD4752aKwh3Pu1mLNjf6UNHKU1LyMMLNjc8GOqUBkybo%2BZaTye0ytCBuPeuv5dY%2F4pXvDFOTyti4L3%2FkiN8MBUGOpdE8W6IlzjxerdB8ECVD%2FBtKzYqDPTk%2FqAOlfWR7TTJRNd9znqTL%2B75htBCGvbIRh6J7BQwMI%2Bn1F4gvgumom3JnvzgEPTZoWLE8l%2BksD2ozGKqwZlduy1pFjShwpkcnsmH0CsfgSEzbAU9H0WbeH%2FvQ4JODKWSDm6nNVK0nmzpX&X-Amz-Signature=5330f3824d7513cc69f751fab889d450558ef4acb2a7b5eb6902500a67cfce54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAUNFTUA%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQCCSA%2FeqdRLbeO1fB%2B4a%2BmJe31V3MRmA6a7oMtCQwUVkgIgM1yiLTmN5VV48LIcrIoiDScSujldutMhTD7xUMdCvAYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPowan%2FkGEtk8yq2BircAzWZt57bms0eggEK%2FoAMdJgyJfYut4hsU5APQ8KlsavtFm1TfYMHKlbwAoboe65AmPnNFxs5D%2BUNNud49MdZtUl1czWW81F7pgRWv6baBQIn0NXVmP7TQFmpg1kzhLUo8091eJzZJXkAsKcr7tK4GGgrtmrsms4Ts0qEWYI5jVqMx53NhCmuTBCd1zUNCe86cAMXZ144Q%2F21lhxElz3HtPL4O5qDiLtzPe%2BU1FtXzQpyE5FyaVnaCItI4ENwXUriaJkyJtDUPReX%2BejKmt9RVD5TwOcQTxB0FbXGa7ynLEgP6%2BEB2Sjsbtxc79FwGU0SVkMrr3H3CxbvRCxYwADFTAwDME8lky4GvymBEl3IKmgK%2Fxls6eJpe6frKrBUq4E318khVb%2BDq8AgcQXmHEdTEyJVdkHKkkNLIGNtyAQEpdR%2FdBOOnjACfcvHMWrBTdLoQRgDc0FkNjaHNpFLNrWwaB4xKTbQ4EOlYqZVCp6heJaS4BlWKHAtWokBTfIgImpSxlNi6os2qc1ctuOhd%2B009anRhPLUNzD49cNfl38LsGlxO1h891vfdwcLxXfcs4%2Ft%2FUjWqYZJlmeJ61110UnGLQPUmT0cd6KQ02t01A%2F7gA%2FKOwOWuIWywiMRrD4aMNTNjc8GOqUBrIkGQnyBj%2F0k2QEZ8dPjFBI%2FeWfRkAJnnYerqX8jOlrzMMS3uqf1BES%2BK39NYOc9on7bwMMroBt64b7cuTjZER4MsbK4ribTFQNWY2qvDk1HBk99oeKuTarIYoBq6eGmFXJPxbuBSeFG%2BH0GG8O2GK0VOsh4%2BhnC0N%2FY%2Fy8FvExA4m0mrFsx3pZTh9TMB%2B6dg%2BywK34TIt7VgJ8bPwl1CS0%2FVEb2&X-Amz-Signature=db838c76f3a025803d3871e2b59efed67dcf13040d794d922a895a7886b7e2d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTZIW3BE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIHoRdGW2zOzCtfCQNUiGwGJkSRNHc6s2zDYqPYced2KgAiEAqhrIzmQnneBhZik%2BmvvgXxaDXJ9BzJd9fcilpV03FpYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKIe40sywn52mInRSrcA7OYNepjiSzZv845SpX2Ht9u0j1tGXJJhmBTPqa3vM4LbTTpcmuWcRGwRbUxc1vjB9y9Hg4gggljf472h2%2FNtt746hg%2B9Lfu5hYlUpf2VWe8uB3Ex5VDyYQwGRyKh8H0bVfNfPfdGl5miKbh0Xy%2FsMIDn%2Baa%2FPBfi81P9MDaLAJN3vLq2XrvKXzLDGbJ5SPf3DhSP19pUW%2BW9pvzaocDEq0zylp4Cgit0kyG5HRf244%2BFDHy0aSgTs4CfGUhK8tx4occz0lDd%2F0zrEQHrTSb9VQCIXYdxTR9sF%2FUfNOsUHEHmHUP7ZO7jA%2BIUB05a%2FjoOs3aEvhCDfKS0y9rgqWCYUATPESe6Bk8v3tBqy6U7JSNcDgjw62DswI7jO1FpMQ2ziYPxuHFSD9VeZnISqHR7cCBSWdmYJfzlhLldMyqsjZs0Kg7w5INvortcd%2BdekyjAYmsu7V5PcorcOoqu5EoBXKAjFUAgyBxTAtv0uEuezA9qbQBww9hY57J%2Foa%2F7lxpBaNZ%2F4bV9VxXsT%2Fku%2Fp2pvM2OyrIBAi3ufODNLkpTH1NY3ZCjM1bloh%2B%2BVXnaV9VI3IwQ0rk7gW7ZeR7uVz4HCi7O2ZrC8748eY9GO24MNnEBQqVmsJpig8j9%2B8ZMKvNjc8GOqUB%2B5B11Vr5%2BVeBr7WmEYCdVH9KgtSAF98VVtni09L9d2soa63GsVijBF1xsT9IUQc1kNMgAMVvjC%2F4ymhQJn44qFP6tCsg505UjNxZQdvnXL9vEPgZDFZ8m0%2FaDkqaO4ospTFU%2B4oQGvwukOiLG8IfzFidXnqr6IJ%2BV8qHo0j2B0d%2F8gZkncLLvjvuzUEnxgfo8fLFZ7WOUi3exyt0BL2oJqCYMf00&X-Amz-Signature=c755aad7b125ce336b0b7cb05d82e98201cea32e1b709b0f65626229fe530dcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTZIW3BE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIHoRdGW2zOzCtfCQNUiGwGJkSRNHc6s2zDYqPYced2KgAiEAqhrIzmQnneBhZik%2BmvvgXxaDXJ9BzJd9fcilpV03FpYqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKIe40sywn52mInRSrcA7OYNepjiSzZv845SpX2Ht9u0j1tGXJJhmBTPqa3vM4LbTTpcmuWcRGwRbUxc1vjB9y9Hg4gggljf472h2%2FNtt746hg%2B9Lfu5hYlUpf2VWe8uB3Ex5VDyYQwGRyKh8H0bVfNfPfdGl5miKbh0Xy%2FsMIDn%2Baa%2FPBfi81P9MDaLAJN3vLq2XrvKXzLDGbJ5SPf3DhSP19pUW%2BW9pvzaocDEq0zylp4Cgit0kyG5HRf244%2BFDHy0aSgTs4CfGUhK8tx4occz0lDd%2F0zrEQHrTSb9VQCIXYdxTR9sF%2FUfNOsUHEHmHUP7ZO7jA%2BIUB05a%2FjoOs3aEvhCDfKS0y9rgqWCYUATPESe6Bk8v3tBqy6U7JSNcDgjw62DswI7jO1FpMQ2ziYPxuHFSD9VeZnISqHR7cCBSWdmYJfzlhLldMyqsjZs0Kg7w5INvortcd%2BdekyjAYmsu7V5PcorcOoqu5EoBXKAjFUAgyBxTAtv0uEuezA9qbQBww9hY57J%2Foa%2F7lxpBaNZ%2F4bV9VxXsT%2Fku%2Fp2pvM2OyrIBAi3ufODNLkpTH1NY3ZCjM1bloh%2B%2BVXnaV9VI3IwQ0rk7gW7ZeR7uVz4HCi7O2ZrC8748eY9GO24MNnEBQqVmsJpig8j9%2B8ZMKvNjc8GOqUB%2B5B11Vr5%2BVeBr7WmEYCdVH9KgtSAF98VVtni09L9d2soa63GsVijBF1xsT9IUQc1kNMgAMVvjC%2F4ymhQJn44qFP6tCsg505UjNxZQdvnXL9vEPgZDFZ8m0%2FaDkqaO4ospTFU%2B4oQGvwukOiLG8IfzFidXnqr6IJ%2BV8qHo0j2B0d%2F8gZkncLLvjvuzUEnxgfo8fLFZ7WOUi3exyt0BL2oJqCYMf00&X-Amz-Signature=6f43e9a6d0f7056ddba2b8579eff3638a7f7cd47eb75a8968c44fcedae2b9b3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OZ23KS7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQCLf2M5DB9h2xw7h4mMKZIpCTutOcx9jL3ColoUqT3PhQIhALD%2FuQ6CspcoEOA73JAYYjx5LkcasprEfzFvChxEOjWUKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrtZCAvZUAEz6c9AQq3ANMODjvVai%2Bkbf4PDT1pXo4T4u6h8qHmnepqBaGOKmi1V6G1GPino6ZIa%2BQfnQgWBsIvcaJFGyy3SJk210ID6tTSh%2FQk%2B3rx08Hyv84Q1ipuwSoOhbYwNMR2l4iiPDe%2BtxA6Enq2Yabh0plVo1bW%2F1tSVfS5oH0OMn433Arg8UUf68IrglzAHPiB74l4vSxQoE4CLAe4H1xHoL2H0QOezD9hsmZ2hzvOuZzJfTCx3YR8R64PKBpmNURMx0x%2BYW2xQc5x4ygcJoYZHLld0ByYCIwZFwRkTB2CPvLKc%2FbyHH%2F6wSTC16O%2BQfOXzoTq4K7XouzQHYhXtL0M%2Bg%2BL3dj9nFGXUJNvogtEumyk3oeoMZsaaOGwWFbF%2Bt1XpTu%2FxY1tmF17Q2LoF1f9V46T%2BPOkYyve54hh6fXbb%2BHT53Jyvs%2FnMdiIIE2d58KPiF3YguwCW8iVwkXb2UQ1QZmbWNEw4KdxMg97H0VxWYEL180h8KVM%2FNFWuci9kmIP3Dq6Bv1prYXfx%2F59OkyYmvNaYtUbn24WB%2FElpZU2NDtfg6ShFAtdeYhuACH5C77xoLidkCuPg87YsBMdo2GNAG1t01px95dGcN80WxZfKzZk9LpnMhufQnh%2BAivPBQReF2PgzDdzI3PBjqkAd49QmbqwR%2BN0N8htuS1a8Epzl1oGZ5uqSaMsoiujnKLZIgH8NBDi08vcKwBYzElq4yClPCg4T0i64fBhan3rAz6UTdNTUDHKvCL4E%2BPiqbVJPA8z0F3VszRELPmklLCwZ1k%2F7ErlmakaF3yEDN2s2wYGyXy0beXx5KJdZ3rmxUjb7TR4WswQyJAo01csM89mTgt8nfj3vZfkbtS7jFePx4nzTq6&X-Amz-Signature=4c6a0563f3e66862827acb0450a2b89c337bf367b5c3f0f6bb36e890ebd8b22f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXWHYX7B%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJGMEQCIDU51Y%2B1lyO8mR63tmIX4OimP8xWR%2BebakAikAnZXQKxAiBtDTymP%2BhrW4VPuX8XlHIlqBe3Ahnk8j%2F1P1Egb0iZeSqIBAjs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMglnSSLQCLEwsyOGJKtwDOfJRpZ4ot77rsyQtHVkAGGFtWEf2tS9W776oq2udyzky%2BltPcJAoahWzgVyyZI1YuIMnKXMhkA0HupbPTrAF0Uy3amyqmNx5mguyeXrIppPdidJPyjOXQmXTn%2BNPWUYAOKatAuh0ZnpKqf%2B6s3%2FUmsYHANND%2F3f0ZftCTZ%2Br1QuX3ioS29YXs%2BOpClbadEfsvom8n%2BE%2BduAkOrrIrzoRW%2F7IQfYCDlfeoazVz17hA%2FIb3zgZ750B%2FfUfsL67zOn9vhpmOgF6DkZgcdmvnt3VyaBrzQv391Y1KssUpVdgV0hu3F9KWPV6RZNs%2BdN54dCj0kTOnw2Kq0dS7oxmiyd0W9v6oTUcnYf%2BHmS4u8emLrfllrEAhPtme4zNHwmwZbJz8PEThKgjp6quk1pxhqdAa%2B9SkSC6gFweNCH4EnmXwOdku6wD6kq727rOV46lIC0y9WMAiGCN77DeF%2F2wSBNdw0bJPMu0N0rp5FHZiVtNhNRRDn2n5EVMOBWnMdNrvEwe6CvtNYlrgJoDgjZV5qrOhKdq5QuzUi%2F9G441rz4FR4MfLHQT75hrMSa7z%2B23tGKv5PTaF7Gext9TSXF70OVRctKclF4kSOzeWWtVNwDVc1cChvmyTJVLbU%2B2qC0wjs2NzwY6pgGXfsqcprq4ptcm0XDJgUy5%2BO4WnpnGVUgWasG7DQ9pAji%2FHe4OXi4qX6fmKv8CCc8fppeZUiN74SBWFKWzQNLAJLMrq6xBQO60PA1DYhR9R4g3FR9CcKcKjga4vzY8PqG%2BMI4yMTlYP0jB%2FnHfQwX7dLMCbHcAJOipAmwmcG8L5kyduXFU1Ib%2BhIMd%2B%2Fwr2wDXKv%2BuN1at3r6O6JCpT0RcUQLF6hCB&X-Amz-Signature=dc1be65abc4ed7ea0dac0549ce692b8baf0af7cc6bdb91231643750e64519950&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFNS5V2A%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQC%2BxJcI9M%2BmmRN68WCPJOV2SP9yacFQvwx5hWa6hFZ%2BPgIgSeGwiT0Snlcq6%2BjMi5hEoGiAxPlrPgE6GmgoBOHfuR0qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOXwQBBD9dUiig%2FP9yrcAzvD5i8W5nN67VXbtfHyOW2k92oh6bc%2B77WhNkNgajiMxLpdguKpx5%2FifSIEjvrR3U6h9A%2FLXDHuEuUQ2nWZf5Wo3expFqxkWHEcpliQRf6ijjgFIGnejS81%2FozjRfCd4Kx6IWRfvHtmToGurPb9MXtZb0V10na4InpMg6TVtovjZzkjzo4klYL44K9kY0uH%2BeHzxeBw5oBZSFnjX6Lhs2xYpCfBIjZb0QcJkQTdpQGmFseHtGJKZ7tqoppBOJVkYp%2F3k%2F3WdH%2Fnw5ZoNk1QiS8V4OCozrfCzonXpXvxh9W4vPR%2FemYqBf%2FoE4TYgRlR9yY79xSIYJuJ9BFAJprs7wEUe8GZ7meTunpcz2CG3094Q1bE6u%2FWM%2BWqxfsuE11RbTizzNrTTmMF7Je6mSQnwU9RNVwpz2dcjavEHiV6anWnIozT8coKuA4XVPtcq5rD09OxkYJo4mdw3OWbUs4XyYHDSCwQEzPp5%2BjsMH3qo1RNUTix%2FHDc1G3VO62RyHiF6FgEQPPrr85gIWNe5VeYrn1hZgYkf5H31CU%2BmXKZlm4uaX5Si7RwHR%2Fys6QioHgk3vbDRlKR5lSJj2UEDVdSVXN8%2FzTBmN8HsHirCxTwyBDd%2Bngwm7NCEpd9pSLcMJHNjc8GOqUBxA6RCMlLV2KArVV%2FRofM3NPYebeZSrB%2BkJxUoasesvNzomAQKnjrLSuE6Dx1lGE9WBPwXLDa%2BPSYVlFHLMT1nnqJtUNdxCThisFpN2Pbk3jntSGO0Q%2FW6p9%2Fngcj04RBYpeUXdmXrz%2F2lw2GEIZu9wWjrzs4ver%2FRmI8l%2F0Kmm767f1DOxKHwOQh51edU2Q8VSTcC8YDgN3i5TV1jhl5t85cRYKM&X-Amz-Signature=6a88052b7c2ac54b5635b2a5e9be8679ff5f00c14c2db11c1bc2b9744376c096&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN74GGLD%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDh74HPa1jsz0ghcd1SYRCTT%2FWMFV8gFTdj8WnFxMggIwIgcNwCpnMdjK43tawdtIpuibmR0pftajV7RRtScxTBUx4qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMHzcbNohA80rJCtECrcA4IK%2F8JxObHK5ftJs09NZvt%2BrBB1gBlNkfhXsXQH5koQBCjwdZa9jqQx5SfzAIGa8gAIoASWoRYnZNxgP7TM%2FtFubudlxBBC3pq70dSTYbvORl3UZqG5gFy4xiehuJY5ugvdvl28PLh6MWuYlCOnHVckFRjtgAbboah04tdnvUT2ON38mVfYBokXQ747ZhEgPWyFcIqhOpVmJXZ4BoiP525PqOsjcDsCNWBhFz%2BZiARG9PJSkR1gHh%2BW2AUE%2FyVie23QlSgu%2BHZmzzcMHPIPPffWgQNZ3HvI4W7bm5OcYpKvNS6Rko4yeHTgtmU1HMzmDFlsC3Hh0PeFNsww16X%2BycwIK7h7UJU7zngXD5s9UxGB9U7H1Si%2F%2FZz1oACXVHY0n1RwS7G%2FaWpt%2F1uj%2FgtrQCmxsLNZXrRX8um%2FqiONXymhUAso%2B5bxjRBAyK9tuW39rC3q6W1xzRdgCTyHv%2ByFvrg1D6kdJrK3wtKkN4Illt9gmcnty553cuRjfYp5m4zsPl6TkN6yxej0bGKks%2Fj4Y9752TGTXXnRGQXzMypC2j%2BcG0Vd18EsAeQuQiBRDnisIp6ihDqnyzyXxdy%2B0k4jjoxUOUz4wviMkZcqHMUTaleQvuWBycpfRoHpqRQIMPDOjc8GOqUBIboYg4MBf7NfUo2HzHcSsj77YyHJDJjHf3vqj8hISsSyFQd36OeIztaF%2FGlKfZgkbtRNH1158Kt6w2yhbTEOCOQh6sS5TI1AMDWMWi6VWVB3RZHTz29w5wLt2aIy0T1aE6zjydj2Y5voPVw1XAnf68Q5l5X71gEWbKtlbOM3qj6y5XkN8kbz0xarZ4AqOBDX1alwQGf3L7CSnbT3Wyrh2ImjSiqg&X-Amz-Signature=40bd506f591c1f07792f5b25275df8984675d52cd62cebae5ad19f5d9865a172&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN74GGLD%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQDh74HPa1jsz0ghcd1SYRCTT%2FWMFV8gFTdj8WnFxMggIwIgcNwCpnMdjK43tawdtIpuibmR0pftajV7RRtScxTBUx4qiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMHzcbNohA80rJCtECrcA4IK%2F8JxObHK5ftJs09NZvt%2BrBB1gBlNkfhXsXQH5koQBCjwdZa9jqQx5SfzAIGa8gAIoASWoRYnZNxgP7TM%2FtFubudlxBBC3pq70dSTYbvORl3UZqG5gFy4xiehuJY5ugvdvl28PLh6MWuYlCOnHVckFRjtgAbboah04tdnvUT2ON38mVfYBokXQ747ZhEgPWyFcIqhOpVmJXZ4BoiP525PqOsjcDsCNWBhFz%2BZiARG9PJSkR1gHh%2BW2AUE%2FyVie23QlSgu%2BHZmzzcMHPIPPffWgQNZ3HvI4W7bm5OcYpKvNS6Rko4yeHTgtmU1HMzmDFlsC3Hh0PeFNsww16X%2BycwIK7h7UJU7zngXD5s9UxGB9U7H1Si%2F%2FZz1oACXVHY0n1RwS7G%2FaWpt%2F1uj%2FgtrQCmxsLNZXrRX8um%2FqiONXymhUAso%2B5bxjRBAyK9tuW39rC3q6W1xzRdgCTyHv%2ByFvrg1D6kdJrK3wtKkN4Illt9gmcnty553cuRjfYp5m4zsPl6TkN6yxej0bGKks%2Fj4Y9752TGTXXnRGQXzMypC2j%2BcG0Vd18EsAeQuQiBRDnisIp6ihDqnyzyXxdy%2B0k4jjoxUOUz4wviMkZcqHMUTaleQvuWBycpfRoHpqRQIMPDOjc8GOqUBIboYg4MBf7NfUo2HzHcSsj77YyHJDJjHf3vqj8hISsSyFQd36OeIztaF%2FGlKfZgkbtRNH1158Kt6w2yhbTEOCOQh6sS5TI1AMDWMWi6VWVB3RZHTz29w5wLt2aIy0T1aE6zjydj2Y5voPVw1XAnf68Q5l5X71gEWbKtlbOM3qj6y5XkN8kbz0xarZ4AqOBDX1alwQGf3L7CSnbT3Wyrh2ImjSiqg&X-Amz-Signature=2571947187ad30151ea8e6284e96358afde064b2f6c4e865834b812aeb88f544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TQC37R7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJIMEYCIQDeYlDl2DujOUdREe27AcZQxg0YwZZql%2FO3UQu4IkOlHQIhAO8xiM%2BJOUCO4nFpYYDQDG9pQjNFm4WBfS4QmyQO4HUmKogECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwly95Z05Q1wSf1%2BXYq3AN8pfOBnTBuqMofoMHkXSn3NauwZOsCzJJkPLAGCvTt7N1wOQuWkcFm1vjLDQgusGJLdGoy64VebEnY3TdOXnrTt5hDDob1K%2BSx8qHdXGFIC8L9a7qD8ScgcFniG60OtPZ6Zqt8uA7HDCxokcbHNnyTL5g8Ivwu8cCoHMPUq%2FslhqrJHVmK%2F1ReXo4IvSpGqN3EEqbJtA1MX5KWkxFqON84EkDGmHpQLBkZhS3hFTbZsriL6i5D8tcGBQnym2gAUvPLn496JWijgRTpRtK9Q6ffHB58HRgZ2T98ElkmMDpkUbLfOBmjK1LWIxya8dWbva25BY4fRtmBkwSfdsB3kbFce8LKS5EfLZO4qZWwfa2g5VLq4fDRZcB4dS5SJB%2FwJF9b1sWpcPBeTDGh9ognJ%2F1Fc%2FghgkLccxXRgH3Hx%2FwzN4MVvYMYTySMCo59LTV%2FoPXiohpCXYg2UqGsW19YuwbaE33l9MgYHkUXMDb%2F%2BTjkFNqsrr15nlctvSWRd6n3aUSIO2%2FfKpFvmNo7LyUuAL2joTxZ96E7NEmx8a0%2Bdb7MDcy1JM1pBKcg0J8Y6XKdVbBlPSJckHD67n5BcAlIqlhq6bRfCR6iVE4MtR7%2Fn%2B%2BJKxDsdseRgE8mXivwIDCOzY3PBjqkAQHAtK6xTX3FZoszYoiArWH1bd20N6O%2FpAI3VHKzBH5LddMkyTsy5bSWhQT9Cjd8DDWQp%2BdGgTF4J6Sruq1HVNrAEG03CM2BjwTm6fQdjX%2F8J5yHjLfcxh3E6qBK3cUpfS5Y3i9Zb8sbf9mwTKP6v%2F75RQyiVmrpdrQ4QZV%2B%2F4z71H%2BrZKzPLGwQBh4AfpIYzM%2FNNOHQYONz1KQkDCOhkJVTbsKd&X-Amz-Signature=ab6e0d5d6b0ba21d718255d9270e95df0af28e2eba96b82d1dc1f2bd1c0dbf2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2J4SEEY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQCBDkvzb6oipxtgjj3BX91rh8CPPSNnHEoyKEDk%2Blln9gIgdReEXQotyHXoIXXcDyKOjNmEeKTGFswMQ6W0EXzUT1sqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGrQkJXW%2FHDOtc9f4yrcA9h4d%2BwNr0DWIhVkmH6TqHUOPfaq0qZIOyQFyfh%2Bg1vGKX7Gu3bcbbnUeKkBE7OavmrUq7XsuikiyFuYu6dabWfPEzy%2B8S7Y6r27RKR1YC4pb%2BgzJsSiyaD5OHUITOvPgGMiVLCjvsDR0EgJAsIZ4L4UIkowGP%2B65mdCRYA7JEvNMgd5cNrdX4%2F%2BJ4GsGow8YMn5KiL9vS9LefLLABqKnFkD%2Foiwev4FtFL2PoCV9TeW6fcWOkY8v4xtlVpJsPrRJ2Pa6%2Btn2OROzIWZ6X5gIMQBGfAzbu1OP%2B7JF03toq77lfU9tpGQ1al4STnt1EIcRzvOHgeLMigwbhpzXab%2FDTHK9Mh5tlwtmSJCalHM4pnOcxCBa04GtTAL6fb3WjRNAH76H0UOxwr6nPOSAknPbQGajFRJnFNU4ddJzQVWOt1eTXXI%2BxNStDp%2FKg3Dfsfvu6xLQ9aa4kUQgAeqSKLkLr7L29GwsJBUUjetcsUTkRGCjeGir3Q1UCMGih%2FKEp5YE8cfriRQlHwVHMDlcIEW9g9CUjQnioprOFuuY%2FgIxjuGGVd%2F7jiudaYfGyg0rGHOlepRYwxndkubRR2ORS4x%2BclUhzAT4dhy0IdmsCpTOVW%2Box8%2FDGtiSajj%2FcUrMP3Njc8GOqUBfWXUa8xh%2FHvR84dV%2FMaS1fI9KnDm0%2BDzhO6wQLDtjca79BtkBIrlQNZsrlBA1CKkUkNbK%2BOmG4kLEdTkdUFdGytP2GqPPZMaGGmgxa1xV5Fo0xIM11hYjZTgDbLK2kFNWQNC%2BIQvcqHTQZwGswWfcThA2i%2F5MxvziAHHklGMEz76aqzXN%2BKFW0gF3UU4zMFb3p4AnX8wmBC8tVzgKTGZ5cmf%2B%2Bhc&X-Amz-Signature=f9624ec54d93ad0fab06b2dadc0f4f6fab2fda5a5eadedd67f3e07f42a5e3676&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2J4SEEY%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCIQCBDkvzb6oipxtgjj3BX91rh8CPPSNnHEoyKEDk%2Blln9gIgdReEXQotyHXoIXXcDyKOjNmEeKTGFswMQ6W0EXzUT1sqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGrQkJXW%2FHDOtc9f4yrcA9h4d%2BwNr0DWIhVkmH6TqHUOPfaq0qZIOyQFyfh%2Bg1vGKX7Gu3bcbbnUeKkBE7OavmrUq7XsuikiyFuYu6dabWfPEzy%2B8S7Y6r27RKR1YC4pb%2BgzJsSiyaD5OHUITOvPgGMiVLCjvsDR0EgJAsIZ4L4UIkowGP%2B65mdCRYA7JEvNMgd5cNrdX4%2F%2BJ4GsGow8YMn5KiL9vS9LefLLABqKnFkD%2Foiwev4FtFL2PoCV9TeW6fcWOkY8v4xtlVpJsPrRJ2Pa6%2Btn2OROzIWZ6X5gIMQBGfAzbu1OP%2B7JF03toq77lfU9tpGQ1al4STnt1EIcRzvOHgeLMigwbhpzXab%2FDTHK9Mh5tlwtmSJCalHM4pnOcxCBa04GtTAL6fb3WjRNAH76H0UOxwr6nPOSAknPbQGajFRJnFNU4ddJzQVWOt1eTXXI%2BxNStDp%2FKg3Dfsfvu6xLQ9aa4kUQgAeqSKLkLr7L29GwsJBUUjetcsUTkRGCjeGir3Q1UCMGih%2FKEp5YE8cfriRQlHwVHMDlcIEW9g9CUjQnioprOFuuY%2FgIxjuGGVd%2F7jiudaYfGyg0rGHOlepRYwxndkubRR2ORS4x%2BclUhzAT4dhy0IdmsCpTOVW%2Box8%2FDGtiSajj%2FcUrMP3Njc8GOqUBfWXUa8xh%2FHvR84dV%2FMaS1fI9KnDm0%2BDzhO6wQLDtjca79BtkBIrlQNZsrlBA1CKkUkNbK%2BOmG4kLEdTkdUFdGytP2GqPPZMaGGmgxa1xV5Fo0xIM11hYjZTgDbLK2kFNWQNC%2BIQvcqHTQZwGswWfcThA2i%2F5MxvziAHHklGMEz76aqzXN%2BKFW0gF3UU4zMFb3p4AnX8wmBC8tVzgKTGZ5cmf%2B%2Bhc&X-Amz-Signature=f9624ec54d93ad0fab06b2dadc0f4f6fab2fda5a5eadedd67f3e07f42a5e3676&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2O4M5ZX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T112431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLXdlc3QtMiJHMEUCID7z6E%2B7SYk%2FUFBxL%2Fp9AnadotEC49GldimqZHIqWAJ9AiEA1SJ58pjR%2Frrj36JWxYtEcUPxUsj0RMfWXZRvYVh6WhkqiAQI7P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDd7fggqK%2F%2F0dJOy2ircA1NEYvpfGDtbTTqPAYA%2FpWRuvcrexo0jGehrZx5zL3ch8pJM3S0Vi93T85h%2BseF30CmwKHduthu9%2FLR2DAUzC2%2FDs3Yyz0J0oN%2BpAuuRHnOfZR18dttn1z8PFRanybZMf2G0lMH352Td03B%2FkqKVmO4zK7gNtl43kfxi7nHxe6GjNSJobfV9jlcO1Lfy6YNOJzh%2FQp%2B2qvH56tq47m91r7Y5gblJsAP18MvBQcrV%2FbJkQq%2B91Ljch5Uo8I7SRoWRUiDyT%2BNlG4Y2RVwV9ptu04O%2BsYDLC31urj9LZ67lx%2F34Jv3Zqrn%2B7%2BUChBN9jBj%2BpKCnRK%2FDZxEssNyXGBvGOMqhMF9esUspaUZoI4PORzVFKMWPotNINt%2Fu9cJJtviYAWc79IIXlJ3IMf6LfO9pqJfMMvna2qLYNhEN1tHdCYuhL1Qnf17EekDcU3Plk9u2tbdwq%2FBTnJ%2B2hiT6q7Wb%2B9LXa%2Bn%2BpyBStV0N8kHJg85i41oAwaJ44JIO%2BGLzC9MfgxOkTQLlHPjLHV0WVB4p55qqARZuaFfyTQIw4xArpwXCiUQNVxIA5P%2BWiFPBVjd5Wn5ZSvJixmagVUDSG7RXu%2BML8LzZc9nDsh9hu%2F6gD%2BqwDbuyhDkRWBOnQC0fMNnNjc8GOqUBq9u7ha7z56gZjuei5MePdgjLZ4iKdR7M0GNI%2Br34%2FV67Z7rP61%2BsDF5WlzSD7oyIF3336vW8PM4MIKEovElKYD4i1RN%2Bidzxw77sVwC8LmwkIkudxdutp1hO0gqEH76NxknBrkQNXitrerOIS2AvLbQSNZ6%2FVa6Erk3FSgQsIaldXlqljNwvkYsuxJtblipdZPLPEVOEPLuxk0TnPVdGidrZZ684&X-Amz-Signature=3edd171f86f9a335c7883e6e06148877f395bd1a6abe75bc10e7773af5525b93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

