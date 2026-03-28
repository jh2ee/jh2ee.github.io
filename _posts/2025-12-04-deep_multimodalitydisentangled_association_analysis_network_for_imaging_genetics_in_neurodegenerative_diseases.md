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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM6R7QNA%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIBTry%2FfMBwlRVMj9%2B2tU2UJEYRpv2%2BGo9rg9NWy2RaPSAiEAyrZI4kBsvxY6mx6AUxdjHzEr3FnL%2FQEV57PUfodPZ6QqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2BdW8UdlsI5v%2BSVFSrcAzPX1cs3MJ9FtteGBIZlNRFrlGOv%2BPMYQsHU9v59HsxPaXSZJcnMAgyWM0ZjAP%2FRHZiIF4l%2Bi1t%2Fm7tQjEdxhMlFmnZWZiiUrnKAKdu6G%2FJ7x2ofbkt7EJldNjV%2Bo%2FUPGWi5taFS3G0Hus0X5Z9SXS3BS2PxTcueyAkzYCcFWrPUjVrHP8cNH4JNH8xPPmqjyD9oql7EAbhCyTxzduxx1RTHwL5bj%2Fc%2BBi6cLbGWOt4yckfveP2ll%2FDcZFnzqTJj0zjwoMidevdfVF2tnictdewj4ubELJohtyr%2B6S3gRk%2B4RY2Ce5b%2FwLZoJuQx85GMgi6Uv80LpQOAwPsQmKqdG2w9NXruJFYwRBXuEGu7s64TuWNW6qRd8eKyVtQgyjPLokoytYMWGIAS7ZFq6aVVFViiRioEAPS6RjIB2YxdA31SYsjb6pV97DRl2Mz2Zt7hPbwgplu7V3XzYQYaXn0fFVJixcBRjjl0rbycn1IWq%2BYIKQV1yyjUcwyYXScC3dj9TL%2B2kdamPFpWr7fpUTfkPJ8ToJGpZ31Mm2evkkcsvp0K82W5bQzRK4PLmY7LMSU6LU15RaC7THS2agG3Flj1EadSn8qjNwosfgN2%2BeKyLzZLPaiy6MvPND5XEOW5MKOOns4GOqUBIrJv%2Fp1d25YK0HEzhKj5d3SRd96WsoFhDlLXlpZH3DlTJ96Z38ke6XqF0OguoqzHD6BU97vq9EsfKGHIk9X3YEZDdCL88qfbnVmXMF3cUr4Y97FnORf%2FOnJWQTutWtdFzQFq7hS%2BHt5z5s5QMtUig20Gva3B4E5FPJF3TR2bc6ZUdPCv9yp2ZtWZbKabN%2BmbJm2DrLC8juQuPu%2BjIQb9aR1nAELr&X-Amz-Signature=ef9ff5639a5409c59d862ec044fe41dbf9911fae0cd69c3896ab1ad39f0c296b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM6R7QNA%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIBTry%2FfMBwlRVMj9%2B2tU2UJEYRpv2%2BGo9rg9NWy2RaPSAiEAyrZI4kBsvxY6mx6AUxdjHzEr3FnL%2FQEV57PUfodPZ6QqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG%2BdW8UdlsI5v%2BSVFSrcAzPX1cs3MJ9FtteGBIZlNRFrlGOv%2BPMYQsHU9v59HsxPaXSZJcnMAgyWM0ZjAP%2FRHZiIF4l%2Bi1t%2Fm7tQjEdxhMlFmnZWZiiUrnKAKdu6G%2FJ7x2ofbkt7EJldNjV%2Bo%2FUPGWi5taFS3G0Hus0X5Z9SXS3BS2PxTcueyAkzYCcFWrPUjVrHP8cNH4JNH8xPPmqjyD9oql7EAbhCyTxzduxx1RTHwL5bj%2Fc%2BBi6cLbGWOt4yckfveP2ll%2FDcZFnzqTJj0zjwoMidevdfVF2tnictdewj4ubELJohtyr%2B6S3gRk%2B4RY2Ce5b%2FwLZoJuQx85GMgi6Uv80LpQOAwPsQmKqdG2w9NXruJFYwRBXuEGu7s64TuWNW6qRd8eKyVtQgyjPLokoytYMWGIAS7ZFq6aVVFViiRioEAPS6RjIB2YxdA31SYsjb6pV97DRl2Mz2Zt7hPbwgplu7V3XzYQYaXn0fFVJixcBRjjl0rbycn1IWq%2BYIKQV1yyjUcwyYXScC3dj9TL%2B2kdamPFpWr7fpUTfkPJ8ToJGpZ31Mm2evkkcsvp0K82W5bQzRK4PLmY7LMSU6LU15RaC7THS2agG3Flj1EadSn8qjNwosfgN2%2BeKyLzZLPaiy6MvPND5XEOW5MKOOns4GOqUBIrJv%2Fp1d25YK0HEzhKj5d3SRd96WsoFhDlLXlpZH3DlTJ96Z38ke6XqF0OguoqzHD6BU97vq9EsfKGHIk9X3YEZDdCL88qfbnVmXMF3cUr4Y97FnORf%2FOnJWQTutWtdFzQFq7hS%2BHt5z5s5QMtUig20Gva3B4E5FPJF3TR2bc6ZUdPCv9yp2ZtWZbKabN%2BmbJm2DrLC8juQuPu%2BjIQb9aR1nAELr&X-Amz-Signature=ef9ff5639a5409c59d862ec044fe41dbf9911fae0cd69c3896ab1ad39f0c296b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSWOJQAX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIQCXuOTN%2BpODst98oZQZC6kYaaEdk9HM89HcFKbQokurNQIgFmj8%2BLpjOBK7cx8o4owyy1eMeQQX5P8QVhaGUqxvNFsqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD1FhBtMA%2FQI6Xv2KircA9kyN7fO3t2o9w5%2F18y5xDQKPLbviDXDcn3k4ElRZEQcPxa%2FXfRfvlhZIX%2Bsux2QTcH34dYI3%2B2Alk97%2F4pOvdDOE9RmbjejjApNFcezHorZJkZB1vA0jkUAq9Il%2FGEV9HtcoCH9tQb8be5Bw5uNPRgg4dcyPsgZclfvkNDj3Cm48Tg9VFic6H7BfzvTyOSU8TqyyDHc7SkocJJKWZmMVDLUJT6%2FCaJAOSyjMPkzsJyZ3289D%2BuqLunFJwAH78eqYI8phyEa7YWWLvk4czkUXt8Pl51g7PzIMmASNBo4XrFckajtoUs7SGHzZLlHS9geHS1qLWSOABYEx3H4%2F4HqqPRd9YOEp9bobgr0GpUi%2Br37lwzw6zffK%2Bixfoqva3H%2B%2FVcd%2F%2FxWPoz1JHwyg4g%2B4QwsZovxVJhGQB8%2BkulxMkhVtoAk5XrEui9HlEPfo09gotl2PDLhoX%2BiOaeyaBF%2BbTe3M6myH7UjcVCEllDrhjG0Gs2FhlrMK9f4C%2FSS2EzyU0brbH26KyEnzA7%2Bu19ey%2BaBE23ucqXOtumy8PimtpL56OqtGeMLXDOB7EAZIE3qFI00QyxDg5sHsfmuH1E%2F7bBYtJ4yUfMOdNRIbjQ7wYqdUoLiQU7OnPz0irukMLSOns4GOqUB5djdPuR1Jf%2BTfJoyHCMyAvcvztL%2FeQVD9wXZ7pqPlAySL2qH2M5svaVaOPT0vxC8dCNvquabrzvF5UN7ZS%2BRP4tu8RemCH2O%2FcD%2F%2BLhTBAYeNWU6kUyyK4dDhvI90UeMT8uabbz%2BAzZNMVk6PT3MVUo6uQL9ufQPs%2FybbJSZsL1cOu34HGIJ2TK0SsvJN%2BoAQydp10IJl6zjIONePHCuYQNwhQAY&X-Amz-Signature=41994fc9e9db928816ba0a236a7a49dcd326e55957f73c29af645f56241e468f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J772JMD%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIQCpNdrHjiOHhF9%2BRv2FO5jDO2Zk8XhSBQqscdD0YQ5JQgIgDnbnqOTjFiDFHiY5j6KIV4%2BVYz6FeE5mc7FVJe2xIqgqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL7KWHiK8paRyWmWnSrcA4P7NIQ%2BHWixDK%2B7f0ZoIxP7ICypIWYDIHiWBZ7vkTwfaiQvkC287IJvPN9egAUkcpVZcFDRVAPWujrVQyqE8Vw3cQ4%2BdvhZE7S5G1MTjFEVB799VDwk9KGoGo6x97PgF6odDq6ts4n1yEw%2F%2BUP%2B91MWzs9h1M%2Ff9hNzxjJWdTVuPp8zu3u7WsWK0r3g51scHpRA7LKAW0%2FilnfOIeYWvNu42jOjZjs%2BTrvsYc9hKe%2B86K8%2BudItMWgti0tHWJy5l%2FcssuR2VVe66HtgPatBCSMymrkW5Z2N9Afuy7dOOjm3SXwHYploUAFkV7%2BoF06O%2B%2F9VABWnpt1X50Kp63AAcLAwMxV3WbumLbv819r%2F%2FQl8ExcW3D2r7KYaM6up%2Be4xrqVFlD8T6HS%2BqnaNzVnQa2LSeDhL%2Fhh3SWY6aUNojMvwv7Tiu7cY8x%2Fn21it37aAM8j5nn32ILg%2FheulXv5asqKsgO9%2BSalJ%2FrXhn%2F2I0GrVcaAA7WSO%2Bhc6IpQDTGA%2B1cLQAMjZ8AAKs1HDdQzOdwYaStOx8RiIfscTx4401MGXVvtGb2vnBD37rRVIErB41eBFTSsVsOFSX6kCmy4tovFl9Bu%2FkFDhglCsBbKNqnbJx8kjmHDAPdvYa4tnMOuNns4GOqUBWMoUhSTG%2FCs7lfjxbIEsFgVCIP4YvevROtuqY%2FZaetq4zN3TKoGmG0sYcipJVJf2dNKw7puYa78jrqol951X8AoZ9VJ2Vb17ptm8M7VZ7qHA9zbL6z%2BzyZLHQdWbvQQpwD%2B9kOLLcJBwu8wxK2nf58DcYrLYq4P0LnN2RA6J4Qk9WF9lBzNLjVscqLWGqsarD3QXF4hDbEIL7OZHe%2BCrQ6nSp2p3&X-Amz-Signature=54f6c74df2a6f2976db4cd15bcb544494e9d7c8b1454e597b270445a4d759b66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667J772JMD%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIQCpNdrHjiOHhF9%2BRv2FO5jDO2Zk8XhSBQqscdD0YQ5JQgIgDnbnqOTjFiDFHiY5j6KIV4%2BVYz6FeE5mc7FVJe2xIqgqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL7KWHiK8paRyWmWnSrcA4P7NIQ%2BHWixDK%2B7f0ZoIxP7ICypIWYDIHiWBZ7vkTwfaiQvkC287IJvPN9egAUkcpVZcFDRVAPWujrVQyqE8Vw3cQ4%2BdvhZE7S5G1MTjFEVB799VDwk9KGoGo6x97PgF6odDq6ts4n1yEw%2F%2BUP%2B91MWzs9h1M%2Ff9hNzxjJWdTVuPp8zu3u7WsWK0r3g51scHpRA7LKAW0%2FilnfOIeYWvNu42jOjZjs%2BTrvsYc9hKe%2B86K8%2BudItMWgti0tHWJy5l%2FcssuR2VVe66HtgPatBCSMymrkW5Z2N9Afuy7dOOjm3SXwHYploUAFkV7%2BoF06O%2B%2F9VABWnpt1X50Kp63AAcLAwMxV3WbumLbv819r%2F%2FQl8ExcW3D2r7KYaM6up%2Be4xrqVFlD8T6HS%2BqnaNzVnQa2LSeDhL%2Fhh3SWY6aUNojMvwv7Tiu7cY8x%2Fn21it37aAM8j5nn32ILg%2FheulXv5asqKsgO9%2BSalJ%2FrXhn%2F2I0GrVcaAA7WSO%2Bhc6IpQDTGA%2B1cLQAMjZ8AAKs1HDdQzOdwYaStOx8RiIfscTx4401MGXVvtGb2vnBD37rRVIErB41eBFTSsVsOFSX6kCmy4tovFl9Bu%2FkFDhglCsBbKNqnbJx8kjmHDAPdvYa4tnMOuNns4GOqUBWMoUhSTG%2FCs7lfjxbIEsFgVCIP4YvevROtuqY%2FZaetq4zN3TKoGmG0sYcipJVJf2dNKw7puYa78jrqol951X8AoZ9VJ2Vb17ptm8M7VZ7qHA9zbL6z%2BzyZLHQdWbvQQpwD%2B9kOLLcJBwu8wxK2nf58DcYrLYq4P0LnN2RA6J4Qk9WF9lBzNLjVscqLWGqsarD3QXF4hDbEIL7OZHe%2BCrQ6nSp2p3&X-Amz-Signature=7223a6d5a48f842c7e02aea5a4443f781539be84c0b91795aad1ac0afebffbbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWXV2SBE%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIH7K7g0QYzDtE7KDkPMol573a8R0LxK08HoZDDCWpRxlAiEA3K9hkEuhQ6rRRurzoJbajINa%2FXRWNQskKjSYXJr5FaEqiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB6GTDhG3wQZHuTo7CrcAxe82eaT5YsfeODdVRgcfRyteD9Lazz6g%2B8uJuttcylchLNAW0fIcpUEQDkAkcZpi0CvqTfBczdi6aUo82cjlSujqBZr9NmB5a5S0h%2FHofgWtXVA0eENo3fv4zey%2FrEdAQ%2Fin6tm0HixnhGVKnDUjFT9OBvbFiHM01BWsBWOKTGshAJFUCTZAqAbDVtETaf9WiHvQGlfkZfUkl5EiTZF4Uw6z1jNJQNNX08OoYntoIBi6DmK5v4uJqQ2Cv8MTqCtJXMmRZg1YFwACV17JF5j%2B5QaVqjUO35VOeW7%2FFdgNw1SygaHJ30xv9MJVa3BOK5SFkTwrZm%2BGulgP%2BaIwUunsWxIY5lJZY%2FD4A68I2yiwiA6abdXYApNpUspN9rbGxfQj5YN0ZWNRuiyhEKfTLsIXxTDWqjJ5NflhN%2Fx49tsw7W%2FxFmK5edJHG6sZMJSDZTx453RaMNvh0yTHu7UaSV6uZaRGZGKPvJtxuRJMU1C2svCzR1yIkJKGtsqTvBvRrAVCUBn1zwG6nMPv3iDzSEZllL0zH9Awi6ygSyRjrH5dgCMBauSEtATkn6eWE1dfeKk4zzRWgDd2uOeU8U5rjMBpi2nIfUlaT0JOP7PaarFG1%2FC4rv6xr0TNwXZk7G8MNKOns4GOqUBfi4Sf8vfNb10IIs0AxSwAWmezMcTUqh97tq0rT4h1lKJvy7sUsl06tB7MNE8ivpD%2F9P5r63q6nuI9P5Otj7saW7CMt3Iv1Ykv5RqGwlx%2Boj03HjPOPrAr6MAEeBc2BBeQZEUHKCKgw2maB4Q2BK8vPBW%2BFymzxz3TUE2HQnrRhR6hjSncRdbGE2%2BZAdp9h39M12E0ur6GcxiUDhhkU84b3qQq7ve&X-Amz-Signature=00f69ad76a767f0e6094ede618a558dcba33250f2c43b1bf5a62b515c810aa1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOTBXCDT%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIEgi%2BUghlRiFLf6h7r0L82wQ7TutAxtnuyVlT70f5kHfAiBXG6lCYsO%2BGQYyTOEk3NeEmxv86fSwwVgjBzichJC3iSqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP7rkBLovM%2FJ%2B2c6%2FKtwD45H8NNGZasxJiOu7ms6L1TXisYDONc4P9qRJDsVyCaxPi9g0UYo%2BsT3ZExMI0TXyNhpq0bnmP7%2B75XGeywVNCX%2B4uPz41z%2FQ6BqPsqVDghd9BAXI8XjgO6%2FDMnoCALiPKesJRx4Qg7lR%2Fowy6dzANUr5If9zDyQ3LJYwbxpZbg9jml8smCWomzRb5o5JPkOODexHPWmHsV3u%2B0YOQeslxDxfTYQVnxj%2F202vJ8zJdaOSSYatQDq%2BDgk9nwuysWChEqlJFRh2YCbeK65LKaDNaaZhRzzNpS97YwXWJz7McRHC6gl%2Fk6pX5E2RoHe1H5Lm%2BNd9c%2FQSmBbw44USu8NhJx1H52ij2e5%2FvdV91l3Ha%2Fz79DXxyrYeJvsxM7p2glejn0rTWB1IZze7NxU4yKOBieGlZ0Uq6xtU1li7q10jlpbMf1I0jVM%2BMtVvCcpY1UekElitER6svNND61mtfLhJHlUP%2BLdn9xunlIghdoOBu06Z3ohrf2q6sh1R2ks%2Bp5LtiblN7uDfgj%2FeFer6VU2zRY6Apgws%2FKyeSz4Ydo6InRj5w5GSAKmRGKdXKfjejHB47PO%2FeqrnxZe4kWlYAcOH7nb7bmBD3LuJlRo5s6rzANEp0%2BdD%2BSG7YIfF4Jgw8o6ezgY6pgFVoaLsE1BlMiSfDjD068zvKOB3Et4cWgWyHmcNI9rr3GBrI6Oa0R6N15Ahypjtv1gqb0nAsZaQI835dR8NJQOMozYYmRCluTNfAMSxmaalls6LHoREoGizY5mHnil2ZbYN9v6%2Fce%2BszvwP3TAKT3An2eKlId%2FuMK%2FvoIiTz5Tfv7J8%2F4QBtYUHKEr8U8NRxa04t8NIVTM%2FrWmutKGq%2B50mEKRZ%2F09y&X-Amz-Signature=95218080def56a8459b0a8158eb054d9001c01b43a5d9cd6bc2e65025670319e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQX235QK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJIMEYCIQDM0tJ1yUHJcMc0XCFVTsAGSSbCp46NrL6qgtNd9K9aMAIhAOvGu%2BF8Vge45J3582Y0QGxI5jv5yGLB%2FLMo8T1ZVTpBKogECPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZqjzodYhsKUgxv08q3AM1bggFruKRMpUg9HF3oM2CCW2voFBUZEqUWjpnL5ldybggG5Kb4GSJ1MxK5oJNWRCqGV7HOvjaILoEcTXlamnz48ACukVPYTfoMiLD3P5vVsuJ1KfUY7oPQ9WA9d%2B2mGZDnLEajtQRZGgqg94s1KVfSmp3g%2FSfJA5IiexdL%2B3lg1BtaT%2BOVpyLPYvu57cPtVekcyRGsNGIO2PPic2KIIyPMq884kyW5srJ2VaftBOqVGkoYzj25wqffgaQUR4oMiUbSpXHsWQkVRLr3MjmaIge74z45b2qt1eViG%2BlssAjukAEf6KC3pcJc8RnLQn9kBshgOh5B5rNNIBodQ9xPBHRDZ%2B9Jzpcsp4Q5gVxk13JZ7D1%2Ft%2Fjy3AxqXaH7F85Vk8bGwxVVzBi9v2CtC4IKPrmyfjRSltWTtb3e0N%2FXYA6%2BZ7a6PuuIXEfoZtKr4MXrcTzaPXjU%2Fg7FjSd1kc7nYvHtuuOQP3pCsK%2Fu1WGw0LiL3h5oZBy7yc3VDCCY3NzKYypqpvj%2FLGSoTSPKpJzOkIF11I%2FzCd23mkOa75d5vmq3OByAHqyCihgjXeosYWjBqJNpWKrABwTPufepYMbBhgl5Y875UlodKPA4Y2Q%2BZOcJ8fN%2FfJRLPar749SDzDOjp7OBjqkAUehty2ejlbug1tEZNYqvqsSjrlrRsxxq7Q8bad%2FoqHPX%2Bc3G6kkyG4%2BqCIUftk1wD213TXYbICA%2B348y2192tWiQa7tF9JBRMiDPvJ5lkF7nr27o0WmztHW8M4wfwHTNjBf5S5gZEVWlmqBLfxZ5AD6CoRgJ6suWAzFgVf%2B2B7fVwuNjCXbQ%2B0OYo0nnC75ajDdf6kHJxxTIWt0hNfotNKp2D7e&X-Amz-Signature=76674f59ce1b8d39726058d6ea52df3dd98698d76c71a047c7d2e9bcf1dd3ac0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNGPYTJ4%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIG3iuvZQeuWBHYHGEJ%2Bv3uK9%2Bsot%2Bnn%2BZqVMUd%2FmH4tIAiBv8%2FV9ivMmrRQJpYDtClvxSUn2ZXRdMjjN%2B1dc4WGf8yqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6Nj1XnEWiM%2FBjAC4KtwDMVUo%2FcU28QASriEcKto6LRpuCDb1VDljt%2FjnxizpIMsQtxU%2BRgB0G3IC%2BoZHw46duxzm8IDx0dqH56hZewpAtMaF5BL%2FxmFOVyURFIOqHhmaBdd1fgG%2BHR3QxN562AU3hepH2gK9mqZa9Fn935l0TCbR%2FD%2FIhIcuzSKFtnW%2FgInqAXOkzqd2GuhWtwmEoVrsB9EDR9I4S29jNFaUIVxg6ezHXhfagJthd%2FhPXe3zvKPIFPSP5rCxzD8P%2F3qTGvg8rhRpz0kP9I7MNuNj5qSzidgZ9pjHJaqNLe7vjG0qW6jdE%2FZtQOS7Xgo5JtNfY5oLhkYExiLk0bctdcfquG97LI%2BI19E2ZgBqZkWFe9fnPtmqThQ3jnTkkK%2BeEquNowrsAtyhJDdI8c0s%2Fx37yHfsboyybp%2BNMBbg%2BP0%2FI%2FAgrI4uHC834pAU0antG0Gb2ML2Fhn%2FYnRNJtt11sF7V%2BRa28yOec1y8supUZuwJJDcMlWDfIabyY%2FdKNfm0kfG%2Bf%2Fkps%2BR62yJHKic8msdHIUTq9m0sLf%2BsCkJj4br54a7JfrDQqrOfqk8pVbVpDmP8LMIDDdMb%2FvcmANU22nTCJYK4CudAZMXUPCxz77Y1%2Foqm6us%2BJQNvA4h%2Bn%2FwtIYw2I6ezgY6pgF3nUoKYwN8AnjLYb1Oc3CxOUCUbzJJ1vMkCSLJtbHJgjKhuszBF6Oy3Z2qvfWZ3XqxKLV05UHeRA0%2FAJOAtC9LJTeXAvi%2BSgkW3fGTDDoxI6J8LHVJmMabNxdQzEsQ%2Fec29%2FfHtDCCFZx6XwQqQD0iY5Gf%2BjscpoZC4PE0txysbqP5yWNfLd5FKv6DZfiF83kNI8VcHjjbWn4plYDUg05whMdYw57Z&X-Amz-Signature=89aa334b17002628b2fb0f1e76f9b28b5e72ecd70eb0287fdfaa608f2555a875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNGPYTJ4%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIG3iuvZQeuWBHYHGEJ%2Bv3uK9%2Bsot%2Bnn%2BZqVMUd%2FmH4tIAiBv8%2FV9ivMmrRQJpYDtClvxSUn2ZXRdMjjN%2B1dc4WGf8yqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6Nj1XnEWiM%2FBjAC4KtwDMVUo%2FcU28QASriEcKto6LRpuCDb1VDljt%2FjnxizpIMsQtxU%2BRgB0G3IC%2BoZHw46duxzm8IDx0dqH56hZewpAtMaF5BL%2FxmFOVyURFIOqHhmaBdd1fgG%2BHR3QxN562AU3hepH2gK9mqZa9Fn935l0TCbR%2FD%2FIhIcuzSKFtnW%2FgInqAXOkzqd2GuhWtwmEoVrsB9EDR9I4S29jNFaUIVxg6ezHXhfagJthd%2FhPXe3zvKPIFPSP5rCxzD8P%2F3qTGvg8rhRpz0kP9I7MNuNj5qSzidgZ9pjHJaqNLe7vjG0qW6jdE%2FZtQOS7Xgo5JtNfY5oLhkYExiLk0bctdcfquG97LI%2BI19E2ZgBqZkWFe9fnPtmqThQ3jnTkkK%2BeEquNowrsAtyhJDdI8c0s%2Fx37yHfsboyybp%2BNMBbg%2BP0%2FI%2FAgrI4uHC834pAU0antG0Gb2ML2Fhn%2FYnRNJtt11sF7V%2BRa28yOec1y8supUZuwJJDcMlWDfIabyY%2FdKNfm0kfG%2Bf%2Fkps%2BR62yJHKic8msdHIUTq9m0sLf%2BsCkJj4br54a7JfrDQqrOfqk8pVbVpDmP8LMIDDdMb%2FvcmANU22nTCJYK4CudAZMXUPCxz77Y1%2Foqm6us%2BJQNvA4h%2Bn%2FwtIYw2I6ezgY6pgF3nUoKYwN8AnjLYb1Oc3CxOUCUbzJJ1vMkCSLJtbHJgjKhuszBF6Oy3Z2qvfWZ3XqxKLV05UHeRA0%2FAJOAtC9LJTeXAvi%2BSgkW3fGTDDoxI6J8LHVJmMabNxdQzEsQ%2Fec29%2FfHtDCCFZx6XwQqQD0iY5Gf%2BjscpoZC4PE0txysbqP5yWNfLd5FKv6DZfiF83kNI8VcHjjbWn4plYDUg05whMdYw57Z&X-Amz-Signature=72126591553b3cf060cdf96653e19e236a0542c2eeef609331e126723b2693fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E5RGLYS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJHMEUCIAGyg9GoUXkyZ82dMjryQmzHybonK4SHP6naYHl%2FPvlJAiEApak8xfKOgvd%2FftTdELIT%2FZgallby1m1l4wfl4HYRaD4qiAQI8f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE%2BvHVbUnWnKxBUN5ircA6WO7SfTRF2oA10mB6p7ZcEW8XVvs4oNKT7TcvfDddzxrNNokxp6hfpFJQwXOgU482suniMCf6z0au6GzthL5kqCu3Xb5lOGMOMOJmtEDOOh4LCyiZ8HrpeNZthWbNOJ8d%2BcSEioifIjqJE9w%2F0ra5SEAs%2BeigB2fi%2Fp7RVRl3uKKaKKiEuZE9IjGwECMqLDy1%2FVBCyzOOMeoOEb2cYNhaP81G7mrHapGoXoTFVFGyH8MQSzR2umeQGqJab4hc5LcaTHetkKMHEjunHzkWL%2FMhtlyynNTUGmybZdpPIUlWjC0ylRb8V5FKbd2D7EFC%2FtV1a4IqkrwI9pIcwzbbnvghWVVxJIvQdriNLgMQd2d4I8y8VjmSQR3B5H5l7u5txvVojpQggjgOR%2BMcouQPJtG3P5acgcTGUIsNeqGGGhSl4DTyKWPO0p%2Fpj0Yn1Km%2F8x3xEUxEPmWxRiFAj4WOUnLyOcd1QosEbLOi7D8bfudSc%2BXgawe%2FozoMX5x2hxxUMeYFArCqYQXKr6AXckuQ9BPBYyalVzlCXVUUaOhfkwjSncpcojzQMUAFNc9F3iQg4UPOleYKrFOm2e%2BgBbL3VBpFZuAmOoTbced7erd7gJH2Lc%2Bk%2BXTg60BcU2h9JIMMiOns4GOqUBS6ad6f49VffF6TtEPAVx1py0L18C1I9n4QeQXSaiMAF2vbdRE%2BbSUboW5UxFzOhDqSywZYmqu4NUzGab0b%2FvPY2v6totwrSnLfD84lrdkMY95UBddWziZ%2FlA6Q5y7kVbgzL2wgpROAqygr0IubZ6XLmCElaRVqvoX5Rj23qeG4rjEWdqQyurtwAC6wBwVY2s6ZhCFljP%2B%2F57xlUP4td1IL0k5c0J&X-Amz-Signature=65d0e149e23b8fc2e570487ef758f8d0bc475457bea989f629ad574806dbcc81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRXXMGCL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIBNyqkMJ7l2%2B9M20UsmBKsA8H95oZrPysJH4w46QXUnNAiBu4fcWGvhdERr9VY7HsxqqSV%2FniTSYRBes6X5XvI%2FhriqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPwHbyYyYzQaA1OptKtwDKuTYuRl3VZ%2BDV2F%2BBUjMHfr6l00Mo5MoJ9SrkpV1FpLtFLY1ef2qq2Ex0yzuAcH6jx2pHI8PjwxPv4r09RcAZNFPFSL%2Fog%2BP2K949QETrx6VdKmuHHScMgQbioMKXZuqO7zNrpXmfBOgOYA0on%2BZ7P63vA7tAuOMHTfHmMMIdX9Zgff3fQ3wlgkcF7qGymcyL5jqBpr0rR0EUr7XJdvQ%2FVdw043BT3lQVu%2FA9khIsWUKyRTudxYyOUlDfbE9Zf70R5haZqckvuijwErcK9EDtneLZ2tWWJKrHG%2BJB8Xw4gdPCEQBgpIIYH0iLw0IbJ9JQXlnnXVWFtfHSTu0kyq5pDbP3tNCBAJs0l8J5Tw7E9cX1rBcYUmhyWs8Rp%2B9OU%2FPtNS3sngD%2BLWOSZFWpFmKUHKvhbwiJ%2Bkr5aDiWThkMw1EKyw7M48a4bhAeb2c6w%2FH%2B0qKf8HAXm8UqmC2Vfj5LTfugoR%2B3%2F77vxVUHLAtqf%2FeFpev2Yy4bkSsCrCp2RJEgsmsN9mMMuDjnIYIsLVzhITJanL0bKngMa%2B3cr%2ByderWTvYftZCzDZadII8fxhoX%2FbcKDBk3F5P948xYBSKrFIjLjovUvD%2ByYwcBsEqVA1GKjYklNROUIMuwSvwwto6ezgY6pgGyYAU%2BvorQFcSc4Z0csOgHyCeyLYxXC%2B1AW7fjUxo63Eabi0WMqRgsnNnmvOBqsksH4vxJM5wSrp33SVyFKpzS%2BPszrr7SRooiwkgys%2BSd6UVSFjzfpIUIh1nIIqHke11vwgBkRv3Hnvrr%2BdrnJCWQnMG71qnwwgBMAxeCNbJqzxZzwJJgu3aMOdCW3vxdEVcrYUZen38ObmuIRoosCP54Jx4QHqdh&X-Amz-Signature=97170b447396480ef777d4e15c09ef3ad427fcc01c3111de3d483eea7a7a4165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRXXMGCL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIBNyqkMJ7l2%2B9M20UsmBKsA8H95oZrPysJH4w46QXUnNAiBu4fcWGvhdERr9VY7HsxqqSV%2FniTSYRBes6X5XvI%2FhriqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPwHbyYyYzQaA1OptKtwDKuTYuRl3VZ%2BDV2F%2BBUjMHfr6l00Mo5MoJ9SrkpV1FpLtFLY1ef2qq2Ex0yzuAcH6jx2pHI8PjwxPv4r09RcAZNFPFSL%2Fog%2BP2K949QETrx6VdKmuHHScMgQbioMKXZuqO7zNrpXmfBOgOYA0on%2BZ7P63vA7tAuOMHTfHmMMIdX9Zgff3fQ3wlgkcF7qGymcyL5jqBpr0rR0EUr7XJdvQ%2FVdw043BT3lQVu%2FA9khIsWUKyRTudxYyOUlDfbE9Zf70R5haZqckvuijwErcK9EDtneLZ2tWWJKrHG%2BJB8Xw4gdPCEQBgpIIYH0iLw0IbJ9JQXlnnXVWFtfHSTu0kyq5pDbP3tNCBAJs0l8J5Tw7E9cX1rBcYUmhyWs8Rp%2B9OU%2FPtNS3sngD%2BLWOSZFWpFmKUHKvhbwiJ%2Bkr5aDiWThkMw1EKyw7M48a4bhAeb2c6w%2FH%2B0qKf8HAXm8UqmC2Vfj5LTfugoR%2B3%2F77vxVUHLAtqf%2FeFpev2Yy4bkSsCrCp2RJEgsmsN9mMMuDjnIYIsLVzhITJanL0bKngMa%2B3cr%2ByderWTvYftZCzDZadII8fxhoX%2FbcKDBk3F5P948xYBSKrFIjLjovUvD%2ByYwcBsEqVA1GKjYklNROUIMuwSvwwto6ezgY6pgGyYAU%2BvorQFcSc4Z0csOgHyCeyLYxXC%2B1AW7fjUxo63Eabi0WMqRgsnNnmvOBqsksH4vxJM5wSrp33SVyFKpzS%2BPszrr7SRooiwkgys%2BSd6UVSFjzfpIUIh1nIIqHke11vwgBkRv3Hnvrr%2BdrnJCWQnMG71qnwwgBMAxeCNbJqzxZzwJJgu3aMOdCW3vxdEVcrYUZen38ObmuIRoosCP54Jx4QHqdh&X-Amz-Signature=97170b447396480ef777d4e15c09ef3ad427fcc01c3111de3d483eea7a7a4165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQBUMRQW%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T082323Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLXdlc3QtMiJGMEQCIEHVZAs2bRphG4P%2Bl7yj4AmGYwLpVeSRN8Yt%2F83srkigAiB5upbmsG0qWj4p2jVFVfgGOLsI2YKdYy1a3rfj3UdoTiqIBAjx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMEbj8mgQEcECnf2zBKtwDBU2wlXSZtOROf7aJhTyA6kpf7We0VlZQz1lZreWyxh5BM3I8t3nvUT0CfsK2B716MY7nrF0Obnm3H6YCDnaWlcix7iK1i%2FFVHs4xExmf7rF%2B7Yo376p5OKvUR7zY09gqe8FQmrr7eSDhb4Y55Afjcm45yQYoNcRuGFRxmgwTEJP2NLH%2F4otQQagxPqpRM7M0pD55Lz0LRz0muqPSbtXiOtQXNzB%2FiNYp8qKulf%2FCSgu6ytnYGbq4MaRQN01S6C%2BaLtaWVlYBX%2FCcwXoCDS1jHJ2T%2FtlZT%2BdzpOw36%2FtnR5RGZcpmqOo%2FBIrr5RdjXXVrkvrPphCJE1TnVYEe4MeMM%2BIdfAm%2BSoERB8p%2F480PEXm%2FGIfGppJvhsjqwB81zMBkcG6ECpU0JxGaAiKrRwSw8PwkDn93GHf2mSsCEBU9kFDGwDhJ%2FXo9o%2F5cZQK0AlDyIgwj4A4nTE2DzdeCtyMMOBqzG97iqZ%2Fb%2BmV1MbHDVPbLYcYu18LyBvBQtxx6shQcug38fR9mJclVqOMWWR1jdZ30TerDODMtX%2BSdC3fU%2Bobij4qdxRruF8MPIL5TffJcxuLJ%2BdzPB5oMUKwOmUY7Ip%2B8vE5o56f9rpXuXrcyrGcCseh9pRmSYcRTewUw0Y6ezgY6pgFm8BvXUpV1rfQOnjPV1SWD%2Fh5bj%2F8gzSfdopEgrup2R7f1z8FhdghATaAL3w3OlXbuDrF1Xo5LUQrzWpFCMKBSjSQsTFmUNVKsdZRoL5jALxmWMK4Wy0QgXK%2F%2BN5ERAm4c20lLrKQm09w%2B5Hu1ThNk2Mul6zmUNDUzaYJRdO8trf%2BA3fd%2Bb8k%2FtUiFWtySSzJtqDPoOp8rhkpSJcVjUYFCMCy126Mu&X-Amz-Signature=f28c569a6f5a04fff4b8721dcf7e75156370d2736e5520f9591bd130cf319737&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

