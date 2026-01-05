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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MVHOMDJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDe7FdMFhv%2F9nwYX2wMqRq4ZKvLEoGqyty02kDbzXPJhAIgf23U%2FuIQRYquRSYeNGcV%2BLw1Z%2BB%2FLdovv2XNlwObnL8q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDI%2FhACIcYAED3WyYzyrcA5%2Fvpl81AIZuctlx2yFAah5mM3h%2F1rczr313YoqJJMHRnnj%2FdYLaecH%2F8apfnX702ecb%2F08XGljW4TLJPWPh9PRBe%2B%2Fh5shVmVSR7XuIU5ce08dFwuhj%2FO7Zif1W1IkFnNfUiSPUL5nuza6Quo9trjO7gUmcp4xl9idvZkA%2BhCHLc6bErGK9Mo3iA3Amrg%2BrDDqN6DSfYXOIVbiTm2uyr3AMMt29j1w8ltWudlPVa2dnkzD6TJnnW%2BTo1f7xZDQ0sImoAA0OkExrXMyzBkOK6jhXmpLcnG%2BHUFKEgRYwZXCNvrjjCrDXE6YrLgNpmtJCN2GKHr7FRpWM7wSTpnLIyDQNppirDFIZro49YWjveaflN7D1g1JAr9uMZk1ZyQekiX%2FOYtYIVpWqqBQz9jKOeaLdnzUpif5DTxJghXReSOsL%2FX%2FgbG%2BdxUzL8ZZSjE3HZtKltVhmf9vXzKDwbyEDLg4UhmXCIkLY8IlKNE8dFod6iEinwIlVmox3sn%2B4vG9anXLMpiy2NjtgO6PfZad5wYZOR6zvYGN45iWEsNcBKFAAaf9rTkiuEnNUCi8YmC8lJbYU%2BFS5A97iLeeBIuU8S6AXwrZoslWIfWJ%2B2XYhVDNrcFbOFgHdsgIU2k%2BUMNzM7coGOqUBvQ0d1S%2FtZafGFhE8SsLeNyB0hD%2BMQb%2Fyn%2BRYvP3ZkrA%2BRSkDWAiF6CZQu9oGlPxoK%2BP35T6nPCDM37VLmmJxauk68wqTk%2B5umY%2BL5gY8tm4ejwZ484MV1NfZMAZ0h8sI%2FvRHnUGrLwJzbvlfeftlGKaz5JUBxHcGpEwo4qK94cS4ig%2FzC6g%2Fm6HeAQBT4Srt5OO40mv19LTcQP52Avm5itttKJ9R&X-Amz-Signature=6f873c525981c2b0d57ff4cbb20f1a1fcefa9f82fdce337ebdc8a6872d913106&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MVHOMDJ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDe7FdMFhv%2F9nwYX2wMqRq4ZKvLEoGqyty02kDbzXPJhAIgf23U%2FuIQRYquRSYeNGcV%2BLw1Z%2BB%2FLdovv2XNlwObnL8q%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDI%2FhACIcYAED3WyYzyrcA5%2Fvpl81AIZuctlx2yFAah5mM3h%2F1rczr313YoqJJMHRnnj%2FdYLaecH%2F8apfnX702ecb%2F08XGljW4TLJPWPh9PRBe%2B%2Fh5shVmVSR7XuIU5ce08dFwuhj%2FO7Zif1W1IkFnNfUiSPUL5nuza6Quo9trjO7gUmcp4xl9idvZkA%2BhCHLc6bErGK9Mo3iA3Amrg%2BrDDqN6DSfYXOIVbiTm2uyr3AMMt29j1w8ltWudlPVa2dnkzD6TJnnW%2BTo1f7xZDQ0sImoAA0OkExrXMyzBkOK6jhXmpLcnG%2BHUFKEgRYwZXCNvrjjCrDXE6YrLgNpmtJCN2GKHr7FRpWM7wSTpnLIyDQNppirDFIZro49YWjveaflN7D1g1JAr9uMZk1ZyQekiX%2FOYtYIVpWqqBQz9jKOeaLdnzUpif5DTxJghXReSOsL%2FX%2FgbG%2BdxUzL8ZZSjE3HZtKltVhmf9vXzKDwbyEDLg4UhmXCIkLY8IlKNE8dFod6iEinwIlVmox3sn%2B4vG9anXLMpiy2NjtgO6PfZad5wYZOR6zvYGN45iWEsNcBKFAAaf9rTkiuEnNUCi8YmC8lJbYU%2BFS5A97iLeeBIuU8S6AXwrZoslWIfWJ%2B2XYhVDNrcFbOFgHdsgIU2k%2BUMNzM7coGOqUBvQ0d1S%2FtZafGFhE8SsLeNyB0hD%2BMQb%2Fyn%2BRYvP3ZkrA%2BRSkDWAiF6CZQu9oGlPxoK%2BP35T6nPCDM37VLmmJxauk68wqTk%2B5umY%2BL5gY8tm4ejwZ484MV1NfZMAZ0h8sI%2FvRHnUGrLwJzbvlfeftlGKaz5JUBxHcGpEwo4qK94cS4ig%2FzC6g%2Fm6HeAQBT4Srt5OO40mv19LTcQP52Avm5itttKJ9R&X-Amz-Signature=6f873c525981c2b0d57ff4cbb20f1a1fcefa9f82fdce337ebdc8a6872d913106&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667A3USSA3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDQqg5Or7BKcFCWuK7G7xmobGkH8Sby%2F%2Fde3H9FGH%2ByJAiBW8ebuunNzFYu%2FCIo4Ihg%2Bp8UZArpQd7As4M1zgBCpOir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMBqSaZ%2FX01bVsQm3YKtwDMtXuWXWyOl6mcywmRjW2RAxaQ34n6pwzXkswbfkr3EAw4%2FdCGDnRqTLS5IgDT4F2bqmwUkQDOz5uIdYf0MODza%2BP%2BqR95pwRmzeIpBNo7%2BIj54DEPPVV%2FeRSgIsqFRqAP1%2FNh9bnAxtHsCw5PzCNyUV%2F98GMnF6RG1L7zc8BnBjcJiUXG1ddvNqNkvoyh6GXOx1dg3Aygq1KRJEmRecLtZzcEbB83woNV%2BRWw1H8hpu%2BPwrOfxguohyqGX%2BrceN0W3Q%2BKeh9RqEFeUidJZCudZ1l8yi1DVL5K%2FT0FtaozKubKu51YA0cf7KxdjMZJmhugC0auH1Q7xM871Hu3UcRVQ6jYzPVy36zSRkTIdNdJj%2FU2dMqKHQLh7inZ4BmGOlHMA3HtAUp1z7tUl4qOlMI9IvkPvpQC8QyISfkTz1L90rUvw4%2B%2FT5CKc0Vkjz8cca6hfpIZ8LWozM%2BsKrkedSrc8i8svjUU7bsrh7ENJqYRSiuH8ra2ysuvl3uhzxkYY6B60kHmoIupFKZTGOTvUMR5IKFnOBfjheNten5X5wqAEs7%2FS%2FnXiPFje3hr%2BTjXqQLKEr9oGwVo0bEq9QbYHwhGjyatxD0ZLMoIBCI%2BiDjYj23WCAM2ESWJ%2B7cpaUwjNrtygY6pgHFLU98lYCdxVZOP%2BxA3CXaKEyjG10wo83F1Y7T%2BJb7SzsxMo1HkN5zrPUMl0mP2M4cCLh%2FqdsvFHGBD0wTkovYMoEdYJLLC0H4d32ItzHcj%2FiIELfjU3pBkgb%2Fqgtago6gxsqLSxzl1xkxOuoeZjyIvhQ6pBAHJfpgQc8YV3QIrC7XpFT1Xn64EwnZzuXVJ%2BSg3ryKz06KptgRDytdns1Lsm3OWdGo&X-Amz-Signature=6e1ae3c34eba08cf7c5753e63efe40c6826679e709c9b81fc47e21d86844f25f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZRE66N7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHWZ%2Bzth2EuOzdrubYHGiFVjWH5M%2F1rhGucto9MdTDRoAiEAgnf17O9nCoaS4RId7K0D2sw2UowF%2FB2Xhbz2L%2FpshVcq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDCDHR3rTkPk8vWwyhSrcA2%2BlwH2jM%2F9s4WgnMrWQvTx1iB3T4q1VLkJ3PfrG%2BvZi%2FfdtViiuZNL18Te%2FGqgO3Ewjh6OG6NgRrLcwlEzGbEJTZznmqMtOzEh3H5WzdENkawaOWLZAdlcaFUIJN8tTBST%2FBYryk21SekqAgekPEbazLA9ep%2F%2Bx0nD%2BmJKHveZq%2BWM3ewGwUP6c3KCFxdmNG5iKeLfjtdqJwV%2BZ%2FbH5BoEjevVV%2FuGl4r%2BnXoGp4rCBG6VAfxBWAS4gALGh5%2BQ4e2wGiT5CVHqM0Dm8%2BJ0SlN0pbZfdITD7i4VRhIekVhX5DlByeGAU5jaA3wif3XxHtOJKpKhv3651010tX7WKv%2BstUiVCNA1bhkHx7tLHyX0C7Vxp4DTZe%2Fuk0o%2BZ2H33Ss4vHVs60IzZuXVGjrJn9CTrq%2FlEiEvZRxIbjVueEZad2C5rTDIMYQZ2wqdh5kKgcy%2B5yf%2BGtuDLNRNfLlOStIzrVKeAZgpeFZIyaEOn8%2FXq%2FMFg70pEPv6XFn%2BDLEAPJz1JzoQUz%2B8AkXX2RrdGZqFrdDNTZ6DAUo8hxFVO52my9E2vWqh6GJg6HXWlhmbC3yNgI%2FWGMPxqBmvx1bJZanU0Q1Sa9%2FbiYpoijPJFPmUEv0y%2FhQl37V5Plk1nMKjX7coGOqUBpdfYAfDF2DosG%2FAv%2B1T2cCk6Z0S%2F28Br7fC1pRmlnZyoUdUF8IO6cau%2BhpDpQesY2Dbke2N%2BvitKhQIpSjh0YDsUKYCvH1CvcZOANnv9eJT6Lcv7z8%2Btb2jKtJADMJB8SnlOSc55wSAwcXcy29KdrnMyQtNSuw70EDiT%2BVQvSkE1d4H7VclsLoDB1Ph2ASHRZ6HlTw8ebkjC5dYnYKRM7VK3wXKP&X-Amz-Signature=5bfb0b8ad51b2ffc7c971ae90a9414d6d533075c222b0938f48068919669b07e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZRE66N7%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHWZ%2Bzth2EuOzdrubYHGiFVjWH5M%2F1rhGucto9MdTDRoAiEAgnf17O9nCoaS4RId7K0D2sw2UowF%2FB2Xhbz2L%2FpshVcq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDCDHR3rTkPk8vWwyhSrcA2%2BlwH2jM%2F9s4WgnMrWQvTx1iB3T4q1VLkJ3PfrG%2BvZi%2FfdtViiuZNL18Te%2FGqgO3Ewjh6OG6NgRrLcwlEzGbEJTZznmqMtOzEh3H5WzdENkawaOWLZAdlcaFUIJN8tTBST%2FBYryk21SekqAgekPEbazLA9ep%2F%2Bx0nD%2BmJKHveZq%2BWM3ewGwUP6c3KCFxdmNG5iKeLfjtdqJwV%2BZ%2FbH5BoEjevVV%2FuGl4r%2BnXoGp4rCBG6VAfxBWAS4gALGh5%2BQ4e2wGiT5CVHqM0Dm8%2BJ0SlN0pbZfdITD7i4VRhIekVhX5DlByeGAU5jaA3wif3XxHtOJKpKhv3651010tX7WKv%2BstUiVCNA1bhkHx7tLHyX0C7Vxp4DTZe%2Fuk0o%2BZ2H33Ss4vHVs60IzZuXVGjrJn9CTrq%2FlEiEvZRxIbjVueEZad2C5rTDIMYQZ2wqdh5kKgcy%2B5yf%2BGtuDLNRNfLlOStIzrVKeAZgpeFZIyaEOn8%2FXq%2FMFg70pEPv6XFn%2BDLEAPJz1JzoQUz%2B8AkXX2RrdGZqFrdDNTZ6DAUo8hxFVO52my9E2vWqh6GJg6HXWlhmbC3yNgI%2FWGMPxqBmvx1bJZanU0Q1Sa9%2FbiYpoijPJFPmUEv0y%2FhQl37V5Plk1nMKjX7coGOqUBpdfYAfDF2DosG%2FAv%2B1T2cCk6Z0S%2F28Br7fC1pRmlnZyoUdUF8IO6cau%2BhpDpQesY2Dbke2N%2BvitKhQIpSjh0YDsUKYCvH1CvcZOANnv9eJT6Lcv7z8%2Btb2jKtJADMJB8SnlOSc55wSAwcXcy29KdrnMyQtNSuw70EDiT%2BVQvSkE1d4H7VclsLoDB1Ph2ASHRZ6HlTw8ebkjC5dYnYKRM7VK3wXKP&X-Amz-Signature=0f79b13ddf2a1e10710e31fe5043785e7586d597df5fb34ffe27f3d5284885ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6LKM3FU%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIDJ5vFgVe%2FEhpCu4r2WulItqBM4DSZ2V9FHpOjq1VkiaAiEApGURZMWMG2o2GNXKp1Syn%2FiDVdHvxXGjBi93uDjPy%2Fsq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDLMtPOL%2FbQ3TlXw6KyrcA7dq%2FX4pI8986t4tigEMOqtGNPNZGdnvMxutC%2BIuZccLFgLmw%2FpMHylDp5e%2BZCXOxfXEHpASqxVuJTD11U6hrKr5cvbGi%2F7K%2B7C3HRsUIkVbJRZRVZSk14Eu7km1jrfdDvz7MRxyMb44nyHizdJv99PKS%2FhrWDLu2IA%2BEvElMBDx9zA%2FS7zLRLwFHQpcS5Y1TS5cTn%2FgIJrPexwHSAI2tOcT%2FTmImSwqYkTS6nqDdV9qgcoegDMojJLlyJAuD7cPBLpM4850ODzgGHUZH%2B3gy1owopQEN60VLC9Z75EUPUNUMlzqWFxMqwlHTfeWMXrs1mT0fwboYPCPt2FCY8PASkuG%2BZ5%2BF8EHoBjwpkE3jqjyP9vMoa4NiMUA92Qh2tnr0YZUWlI0lK2Qeoy5JNHscYUlI9AWgavFWmSahafoYYkqCtACesFMmZcf8yxaih8iskUD8p0UNBmINyNJp9aHJrvIhJGt9iXqRJ6cXFDORaEXRSdoGSbvw528FCDKLGhwMFe2mj%2FufnnGFL2sGo41AWdgIknhZ7N8Qry2fW%2FlIhgJgC4hRVV18OcBxucNMvmWri%2B4bmYw3CfDNiZT%2FmDTjw%2FeqkUT%2Bux%2Fmn5XWld1OAIdf3MetYp5gFgDTvCgMIbL7coGOqUBY1Opc07caVEbiCh4FaIlwNAwRD8F1eICnHpZXNzfUJMA%2BuhtqEmyp787qsiddGlVaZBKYUG18bkMF7mJNDE%2Bit55nkmi0DDf3Af5qNBYftmJPs%2BsHP24gMhTLFLdivCzxS5ki%2BUMH3HNRrba6Bn%2F1IzLdc6tNgJk%2FDkgqcVQFi51lh96PtYDGkUildZVZln6F1QAgFgvrBLWea9woPZJkv0wx6yj&X-Amz-Signature=42601737907e3132216510357fb1d26f6f3396c74a1081c0eff9d12c521b868c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNV5YCD2%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQDO0hK3DmPskfuhr4K7mKXPOXn2JBHwSxxfkeHibZuclwIhALHbgExG6%2FL4bDaoes0ei0d%2BsdQjEqA40mva49bPP7DvKv8DCEEQABoMNjM3NDIzMTgzODA1IgzhkwaHGaWi2lsSRQkq3APbPy86HqPvzTPGaGgIa6Kl6eUZhMsmVwAeY2xr5H2FYnoTC0sVO6J4ptsyyVGYiq6Mw16PInWoD1WXiMZwPzOX9xPmsrBHnPc%2BGLwm1enXMhSLI52eun8pdAfyNQ33pMc%2F1hD8HYxr0h7U2AJgPFjLouYj%2BVpOzVC9KuqW5C%2BH8aFTn56GXfPTazyaof3XPC89hN03ry7nDHfHSOfjes7jmSSbjT2bRCgp%2B8a%2BaSawS%2B9QIjNav3PTbE6Bnel6zNS0aGB0%2F81OnJVZKrlCyyQDqop2xYVOUb%2BFxjIU%2FJXKX%2F6%2FFjg7RqKDfkTvqAyAAMcjnDIsmvWhD%2BumDE86%2B%2BBCf6NhRAqvAHHQCqZaVYUMWbJPoh3pyjk7Q4yecaAHFZAfXDEJj97%2BoMjVKgZ1QnWcNfWg0%2FzrCDyCi711zhtDTBaYq60ZDi71fsx4plsf5Zk16yo70S%2B1IJixdnrvAlkU%2BjFhMTs4uSq6TYeNJU7qgWVGypcJ6tZL0HzLNU4%2FdUwX6j%2Fy%2BgV2PAvlYaUB19QPj%2F%2BXG5CcmQYXH4o%2BLl%2F%2BNIKxFG2vDGhkoyrDCM47IYt%2BFWDshugRZBhDMZDGUonCdM55IWFwOxzxxf9J81ChPkQhcavHlMbbNVXLBTCF2O3KBjqkAWGTe9b14jQhD5ITyhGUiQKF%2B4ZtOQLNGj2WJVnfyqY4gcK9e8YM6Gtgj2O0eDuqtnBk94gC8kWBTZ6cKlcjNxSkNqtW%2FsS8FF5i0kFVpRdOaQ%2B3dRPY9w7mpaPQojjVPjHvEUQJBZG6PZSEWIjY6MEY3DHzLYISsHX21%2BaZ7Xgelm5EfjKzYXdqnGtdyhTskIxeLdAswjpW4%2F6faE63c%2BOt4217&X-Amz-Signature=79ec339dea75631f5a288be7759f38cea9bf05cd9063cddceed2fe30d55503f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G7SDA55%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIHgW0Sh0v%2B%2BoWacqDvpWkp1f8QRU3k8EEgBZP8dgtjk5AiAEXfaXlM1%2FqtOh%2BukO2cZKY5UE%2BlgXQWo%2Ba58k9DZQRCr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIML7UVW3Xc7sIMVKpQKtwDHALuSGIpJs4c7ZoflBUqTafeTxqwax40hXMZOu70ZV%2BvZDj4Vl46noJUmSjo4LMYSkhNNHo3bcJVA2lcUyY0WD8xmBNXTGHrMfHPOnlatfnKPERZKTTT%2Btv4cs6Q5zOPdX7kzwUxzhbX7SEBDJGVRVam9QMNlQGaawsUrgwn%2B9tQ75tv6EHjjaeaP%2BE%2FNkW4k72Bb9wM6P3esUkbhsDZeuZBF8EWxQKpmjOfciEwexXNGQQ9dFptD%2B9uoiCDjLhwXIPS9zO9FXHGiP1nF5B2op5pdkdXu0gLm3R6nOFhq5dZgrMfnJqT1%2F4aLsjx%2FFATYXQ%2BTUaWzBEhv8gSZapbUm%2BpGeQKAJR7w3lOq5BMSpk96COMQkpoKtAVowIbB8g6ta9yWyiUkh651JBP1yGAEiNaUifGsoBkSY2Bn8Ky0THoHSFSKiVYuKUBiprfmdE45bPEHAXr4oyPN12jVvj83G2YPzxmJhhLrtBRcrmEOLCbw4v5xF7le7Rn%2FW7X4C8G7cn5nNVdZHjALabg0siCSJpphdKlEklwD%2Bd9knj3cUIPfstTQ3lgqO%2F%2F5Y9MJcxmb5qeOwcIPd64grBFtSiFtHktIKtpMfSIvY6F1Fh88Fwnakcczwv4XE5r7Kkw5M7tygY6pgFMyXzxuZNbduY3N73YcmK5mLNY1uiCG9%2F%2FvB6vNF43eq8BySKEo3w2fXBdL2pOOG8HDZA2t%2FNKC6tx6AFFDiH4lJn3touqBUnmsMRr5dfRmpGB06QyAoosoyUtyfSDfoKaEJB7%2FdihiSz2kQ33CiFpGxmwGF1YT8BJNtPbvFPGb3NBfnfdUOBNFltgZM%2FUod95KaEClLeAKUiEmPyj%2Brl1Tytor3bT&X-Amz-Signature=5c5815e15eed9a579b8bfad8d3a8c0c081f5239c5add528906a0bd8f96a98c2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJBO63QM%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIBUtiQhMBkh9CrlDaHnjNt74hN7sUo%2FEOiuqyXiG9vQkAiEAsO2MmiBUL2h0aLFwNF6mqR8y0dix%2FzKDjGIjA5k2Za0q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDInNcJOyRJNIFPPuGircAy3r7z%2BkrnhJjaRw2b5F87onZA5TUzbRNwpDe9C7qd8ORyuGAfww4NN5fGpYsIWu0M51%2FQJGV6Jd9s93nb%2BBQN%2BoDGFhDNrNJlzrdjWDkJandvTPXARsxuN6Tr3%2FAM91JhPTAtYbo2adHXb%2BVreXF%2BZEFPMSkFwTKtZj0LktmIM6aSqq3C23ZTZgBIal09hY0fUCLsDejLVCBt0cFa05Cvrb9pHpv2PXO%2B9B%2BPbl5MZOUj%2BbK9Biw76bpwJIAnJ0LFBZmIFFV7yKcMFitlK1%2Fc%2BgWMTuScq3GcER7XS9NF7imcglDtXC6J9XMW0J7Bw1g1ctTG9jOK57%2FgxBDahdjUvBN3uWR%2BYPstmIp4vPXXzJZc4OCEVztXHkCW16QWdqidqoXNPSphkPnYjNJnxjS0Ydp%2BZvd3LJDUVD6bRDYRlacyj6iewf0FM3xui4d3LDIYhYjeHicYyOdstQYNBsmwtOhiY7flM8oAQ6BO7m43hyZIs%2BLMUE%2FeLD0jF7r2rNYkxaw%2FeQmLCHozrT%2FdLed6PQx25YpVrcTGl2g9wLdddmnqHx4ue9Fbe7%2BxxxigF%2FKIPxyREZSQALdLHDKZRPG5lhGdIM4EvVcIhXJd9mJFIeRd4mGWH2S%2Bi00FCqMP3T7coGOqUBesD%2B2tErqE9Vkz%2B5GDuyh8pvEJ95mWLZcvVr0qNrzZeOb3XWMpSXC2fCtmvj4pnCrQyrmfrxHLHDPP5aMPt3PRcQSiAaonLRwfyneKn5StoRw64pnUolWnO8bNN4AQJygL7aMohgpw7EWVQceK45zpEcL%2FUd%2FNp3rlIPvLQP5SNecO8GF0sRoPlnARkD9srJVFKix9vn5CTe4L11LJmmTR7KvMwF&X-Amz-Signature=1b3c2f6b89bcc45a8a0fb0e1079f4946f2b419fd6021b7bc8298fe5c271bc175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJBO63QM%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIBUtiQhMBkh9CrlDaHnjNt74hN7sUo%2FEOiuqyXiG9vQkAiEAsO2MmiBUL2h0aLFwNF6mqR8y0dix%2FzKDjGIjA5k2Za0q%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDInNcJOyRJNIFPPuGircAy3r7z%2BkrnhJjaRw2b5F87onZA5TUzbRNwpDe9C7qd8ORyuGAfww4NN5fGpYsIWu0M51%2FQJGV6Jd9s93nb%2BBQN%2BoDGFhDNrNJlzrdjWDkJandvTPXARsxuN6Tr3%2FAM91JhPTAtYbo2adHXb%2BVreXF%2BZEFPMSkFwTKtZj0LktmIM6aSqq3C23ZTZgBIal09hY0fUCLsDejLVCBt0cFa05Cvrb9pHpv2PXO%2B9B%2BPbl5MZOUj%2BbK9Biw76bpwJIAnJ0LFBZmIFFV7yKcMFitlK1%2Fc%2BgWMTuScq3GcER7XS9NF7imcglDtXC6J9XMW0J7Bw1g1ctTG9jOK57%2FgxBDahdjUvBN3uWR%2BYPstmIp4vPXXzJZc4OCEVztXHkCW16QWdqidqoXNPSphkPnYjNJnxjS0Ydp%2BZvd3LJDUVD6bRDYRlacyj6iewf0FM3xui4d3LDIYhYjeHicYyOdstQYNBsmwtOhiY7flM8oAQ6BO7m43hyZIs%2BLMUE%2FeLD0jF7r2rNYkxaw%2FeQmLCHozrT%2FdLed6PQx25YpVrcTGl2g9wLdddmnqHx4ue9Fbe7%2BxxxigF%2FKIPxyREZSQALdLHDKZRPG5lhGdIM4EvVcIhXJd9mJFIeRd4mGWH2S%2Bi00FCqMP3T7coGOqUBesD%2B2tErqE9Vkz%2B5GDuyh8pvEJ95mWLZcvVr0qNrzZeOb3XWMpSXC2fCtmvj4pnCrQyrmfrxHLHDPP5aMPt3PRcQSiAaonLRwfyneKn5StoRw64pnUolWnO8bNN4AQJygL7aMohgpw7EWVQceK45zpEcL%2FUd%2FNp3rlIPvLQP5SNecO8GF0sRoPlnARkD9srJVFKix9vn5CTe4L11LJmmTR7KvMwF&X-Amz-Signature=73645c8ec50cf00e8bd68569f5b38aa1b3563d7abc1e58717a27c134b8779a10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLSRD2GA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIFLT99Tpge6ndBH1VWEqvgq1J9doUUiTWELxksIWsYoMAiBonRkdlQHpwnpy56hx%2F2V4ksqUqReOdD0GNfS9U7uEByr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMiulW9XXbLSLDH4AXKtwDJTwr2%2B0HgZebqJk1vsymy06mTcVBcblvCehyLhvCO62XnrR43AcuLBFdg1AaQ%2BrwItJjYqR7QXK8o1FQP5xSixxEkQMPnUaSf9AjuwwyYJxenlNK52d1lXtoDCoAtrqehSnMxin%2B2dLNUX7KkNJqj0CKlI%2F1CSXdoSJSrZgHDYW8z5QvpsPaC2jYe2AnvS3fem6djNGAuqIhDQ9sB9jFTxP9kDW9cNUajiOcLwwoSfT6c%2B5c8qYeNcZUcxjMrOFBLiGQhtBGn9hDAs5zNJDIfKBMjUTqFXS7R4f0jhXvHyPW7j%2FS4LE8GmEIV18RcAAD8v%2FTI4QRYjh5Qj5MKdW%2FnYUGS2QoVxeZCxONRRBUnxLQZQXGdo7ji09wwJMwHb9HGv23%2FyxlobLA8Dt7iDxD6N%2Bcz7snHNJpwWtiBRmeCBlLNrC%2BMxE2d%2FMfuuxbDc%2FEEVHy%2FO45hlMpfuZj4v5uSJhjnaRVfDCLeSg5xJt4DUpTO%2BJt7SLGs5e56nHTSWOwmIUesGiUuRJndgHVq2z%2F2mEm%2BKcOA7laTU%2B5tKmynEzzsuU40BowiALDVvuH7l5Csrkt2PwoqmJpbThHhF2ZBZ8sEjX0Yp2mLhb0PMivg8UDr3leyN9Rvpa2H6Mw17%2FtygY6pgFwIgA9A31poe2A8TWegU%2B6xPZ9sQZoDGO4wNQL7%2FuAsXQVFefvBF50DXtswft0KjZXLOGOIjrDEUuH6NPVS5v9KZf2DQldkzrux31lgAY5lHQSuSij%2BN%2F5YCtI19fRWbSaDG7pUpo3FTrUffnbrYge9HjA0fO9gp0sk0ma569wRApfFTrGhBUxOLtBc2QvUU0lIo8WL%2Bh%2FZWAZotMEdMlrMvA7z9QC&X-Amz-Signature=3cfbe3dd86566407ae98940839d45318d07a4fe272b9af0acb639528fa12c3cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLPEC4ME%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC2NuyLG%2FSBy3ZCXlL0LW1CnRzVBDeSqLb4Mhg1VQMv1gIgPBOcePQ%2FKTYg5EyUM7zMatLGfQSDyGRqaC2KoYoFtx4q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDK5xFkU0dHw3k9K4byrcA3VcrHVlmWYYo7%2BUz079D0vrjDuzeIha5h1caUSN2PYpq%2BHINzFjB0Ple8wkMmuowCLdGkoBx65Ku9VtAqHXB9hvJtD8fXGx0aXcmLjqn9475nkE0Z4PHZCt%2FyRRX%2FFMMf5Bcqa7neRbWr7aYrajRjLE8hFxYrzwcLJZ6NGkI7vQoKZBtNuRCk0L11sJOxB%2F7vFr2jWR9CZgQuJRqUs%2FW2W6Y2fzWyzwuYljgf8l6%2Ftc40AGaN5xap4iV4YUgENg6qrKQYe4Uu5bstCw6UwTotFiGcGm1dH%2FsE039HNZ0EhHaNkpFtoUw5LRS5Fuhm1gXAJkjVJFAX7Ww0vwQzLIdQaS%2FiIIXMet66FTd3jcJqpVTv8eRdnmvkpmZJtAWdFdviKGkVVkT%2F7cZ7AacUpsL0VIipwxVxkAMzEJ4LJ8WuRyqtrIvQSUW0%2BSbHKs9g%2BtXVL%2FgRDj7oc9ozmN%2FwoLD2PMnpZ6mGWrYtRn6r2TUC1Jcy8oTjgswbL5lYZQZX272D4LrU6beXrpRtbNq6s8SNcIFwDbKld6s%2F9IuOkH%2Bd8M86P1GSevdG2CAXrwTJoaObkuxXDGfVj2ScJ%2FAMK6BlWZcBoBhE8PfqOwaIS%2FCqxu%2BiI5XtzJzBFOI4LxMJW27soGOqUB36XBR7Mda9%2BOk55YnQY5vVa8%2BVkFwu%2B62%2FMRataYCnZlhepp8ddVYPwsPB4kzvbBIx0vrKQA7VoRseY32vIxU5Uh6tbgu8mrEGxLLPQkOVlNytw6IrMuAJm7MlCP342POUm1qC9mbJv2t7sjVc8K8f0gHmq81Vbh8pFwNetXQRegR76gFEyxpqzeOkMf%2F%2BgwZv6hvxaWl%2F9wBTHvCRMaIizaY1sh&X-Amz-Signature=00bd33e5c266373fa923cfe5c95ccb4c5f8cf583a1e3ee2ddd9db8b5014153c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLPEC4ME%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQC2NuyLG%2FSBy3ZCXlL0LW1CnRzVBDeSqLb4Mhg1VQMv1gIgPBOcePQ%2FKTYg5EyUM7zMatLGfQSDyGRqaC2KoYoFtx4q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDK5xFkU0dHw3k9K4byrcA3VcrHVlmWYYo7%2BUz079D0vrjDuzeIha5h1caUSN2PYpq%2BHINzFjB0Ple8wkMmuowCLdGkoBx65Ku9VtAqHXB9hvJtD8fXGx0aXcmLjqn9475nkE0Z4PHZCt%2FyRRX%2FFMMf5Bcqa7neRbWr7aYrajRjLE8hFxYrzwcLJZ6NGkI7vQoKZBtNuRCk0L11sJOxB%2F7vFr2jWR9CZgQuJRqUs%2FW2W6Y2fzWyzwuYljgf8l6%2Ftc40AGaN5xap4iV4YUgENg6qrKQYe4Uu5bstCw6UwTotFiGcGm1dH%2FsE039HNZ0EhHaNkpFtoUw5LRS5Fuhm1gXAJkjVJFAX7Ww0vwQzLIdQaS%2FiIIXMet66FTd3jcJqpVTv8eRdnmvkpmZJtAWdFdviKGkVVkT%2F7cZ7AacUpsL0VIipwxVxkAMzEJ4LJ8WuRyqtrIvQSUW0%2BSbHKs9g%2BtXVL%2FgRDj7oc9ozmN%2FwoLD2PMnpZ6mGWrYtRn6r2TUC1Jcy8oTjgswbL5lYZQZX272D4LrU6beXrpRtbNq6s8SNcIFwDbKld6s%2F9IuOkH%2Bd8M86P1GSevdG2CAXrwTJoaObkuxXDGfVj2ScJ%2FAMK6BlWZcBoBhE8PfqOwaIS%2FCqxu%2BiI5XtzJzBFOI4LxMJW27soGOqUB36XBR7Mda9%2BOk55YnQY5vVa8%2BVkFwu%2B62%2FMRataYCnZlhepp8ddVYPwsPB4kzvbBIx0vrKQA7VoRseY32vIxU5Uh6tbgu8mrEGxLLPQkOVlNytw6IrMuAJm7MlCP342POUm1qC9mbJv2t7sjVc8K8f0gHmq81Vbh8pFwNetXQRegR76gFEyxpqzeOkMf%2F%2BgwZv6hvxaWl%2F9wBTHvCRMaIizaY1sh&X-Amz-Signature=00bd33e5c266373fa923cfe5c95ccb4c5f8cf583a1e3ee2ddd9db8b5014153c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPO6BHRF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T110938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQC9EQ%2Bw458D%2FGXcnYZgqnNS%2FwzvDN%2BQ%2BgMQ6TuQlJmHFwIga4RHpYRvY8NOxzG5IwXBL3iacPKr%2F%2FO14G8Q4C5l9dsq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDEE9%2FpBytAvP3VT6VSrcA2w5%2FHM2iJoo%2FmjPZ%2B7W8d8JW17vIulOxqblrtR7RfRUn6aG0e5ImAGBPrR3H4dPRyvIIAUldFoIMF2ea8OaVMBzYgra%2FMU%2BsECdWl3GYuvxoM6Xc46KjTG5smkyIBjCFWxWS8Lcz4AdxtvgTm7FP0slFDrrnqO2PNB9RJapp7%2BY2CQ%2BohsgKVSWZSZ8nLjuCVCQxnKxPdG%2BBYGEYSrAfzxXOjw%2BuU8BYcB5u3xiEOXxAKqPv0yq3XOvh4oOUhbsUjiGr7qn%2FgWPu5wihHcHuKqvCPGiwe1j%2BtZwvLbBckrn0eUa2UtazJev%2BMrQTjc7tTkKJaWXFz0lpE4xFFi4lzKkStVAYFSxH8VlmK%2BEJI1G7cC4cj8NKaWb7jXCrcur%2FDcb56gSBQktgZJ%2FBeuOUw28wKeHdtG0NSV7p6Wsgc5F7b7vl6bwkx8cYlDaCj7K2D18PUpJoOnzzutcrnyjAS4fKxtiDS%2Fw8FjXsYb7lflLpfrKUeoKfLPoYaiHvyuw60yPy56apXjkYLbcZ4%2FLZf7%2Bzn6HufUMGBgXQhZHWx7zjTDPngLhARIOZnLZ7klgIov9kGLzRrCx52LNNUTg7EXwG1D60%2Bd3NNs9KygBj5wxb581a5o1CL4riVnIMLLL7coGOqUBvrA1A3pfQrPJgilsa3nveFb%2FmhN8mBq23GhnecS%2FLWmfNvfcaYxmcfbTG4FYVO%2BZokK6Y2dV5brE6kZypDVWnTUKn4i%2FQ6WTNIj5iFM1EM4a88uYKPtl4%2FUQ0FWT9loyrksVfHPJFMbP1ulixBRtOT%2BGSUFSm738TzRsIU9t5Td%2F%2BFx89OPRwn%2Fn6%2F19PIwDXpa9VsS9wtlNUPpQajhYrhZHbWHe&X-Amz-Signature=e336204a526af6c99e4b6ef084ae38e95777d0de08f22baf7158f238303f9c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

