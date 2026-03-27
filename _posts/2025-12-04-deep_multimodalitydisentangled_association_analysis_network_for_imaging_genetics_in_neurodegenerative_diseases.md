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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYYK6GGW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIEHhcCFMRpAH7712m1Mor4YMYKU6fk4t2NHUXESCihHNAiEA7T9pG%2BVDe1gH20AkZoAjBCisJlB6Nk6QzqtdiIH22s4qiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL3zqfGmr3UoY8cE0yrcA%2BRl2jGZU2jAcx53oYDBPLcqyFbbQ%2FJVmAldliI4AjSe8kmkisAN2uQD5YkGzN43Mi8rhTY3195Rch16HeBhFYG1MUASyE87yHE%2FU0tjMtf4EoAfFqGh1VaMqyKMZU0WiTZtK%2FlZFXMkkCYBmWwj6H7DR14S61Q1IDSWvO4%2FCpV8kvMJo8MWIXhwE4hUmJc6QSSO9LGhjDASDRzhf9BMmQaapt04OsEWBUZ6q8E9VZtgBSs9zh%2FO6TLIC%2BieEykyg%2FYFVkVVQLQJfIT2K%2FfUMAHfVFwOc0mfNCJD2XpSlXYXq%2FzWrIq7eUxfMcY57sAqCJx4yY5raCtYfS%2BFs7Z7cwBtuaWFuAwgtbhEa90HivNenxpEhvhFXOAdSMaiXX8phCJ5WBaSGKLvNKIqj7yhT%2Buq%2FdzVGISryyBWiQlKfZsSc8LqQoZb3IUhc%2B2N35YhhgSbpjNOGiVWYnJSDq0RJBjpuEHJ83XlsRCXB8hmdV2zngW9nNd7Ws%2BstvqUhfSKOo%2BmgtF9%2FYbNtUzSumvheGM0qO5vU%2BMQp1HZI%2BpItfkHf3Wfud4o7Cf2ds0kjWICNpJqFxXSuyXY1rqkfN3bgnfI9X71MRE7WKYYegHCrn4RkSizrlClYVFaM3TEMM2Gm84GOqUBWcvzZeKO012dmBayr4KUv4n29qjvakWVQzzuLnJa7ypqQjexstIj1Sl9MQ%2BWR1ulo8TALZmAhHMXiXRRVjDfeX7I0yUnn3%2B%2FKKRYFlVVJiL6%2Bcd3HZdkX9X4EuqWl7dDwaDSiyYCEVrMG%2BlyKjXq1SZcSLoIGgbhGEABkpbt7kapiIOU9Mb53U5gq%2FnOE60dpa8HE5OKpPm0B9lr0PuOY5z4mYIc&X-Amz-Signature=952d3680553fc6c6b91f3ade68ec0f5959cd52c9db9e827249edb0871cbb14a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYYK6GGW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIEHhcCFMRpAH7712m1Mor4YMYKU6fk4t2NHUXESCihHNAiEA7T9pG%2BVDe1gH20AkZoAjBCisJlB6Nk6QzqtdiIH22s4qiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL3zqfGmr3UoY8cE0yrcA%2BRl2jGZU2jAcx53oYDBPLcqyFbbQ%2FJVmAldliI4AjSe8kmkisAN2uQD5YkGzN43Mi8rhTY3195Rch16HeBhFYG1MUASyE87yHE%2FU0tjMtf4EoAfFqGh1VaMqyKMZU0WiTZtK%2FlZFXMkkCYBmWwj6H7DR14S61Q1IDSWvO4%2FCpV8kvMJo8MWIXhwE4hUmJc6QSSO9LGhjDASDRzhf9BMmQaapt04OsEWBUZ6q8E9VZtgBSs9zh%2FO6TLIC%2BieEykyg%2FYFVkVVQLQJfIT2K%2FfUMAHfVFwOc0mfNCJD2XpSlXYXq%2FzWrIq7eUxfMcY57sAqCJx4yY5raCtYfS%2BFs7Z7cwBtuaWFuAwgtbhEa90HivNenxpEhvhFXOAdSMaiXX8phCJ5WBaSGKLvNKIqj7yhT%2Buq%2FdzVGISryyBWiQlKfZsSc8LqQoZb3IUhc%2B2N35YhhgSbpjNOGiVWYnJSDq0RJBjpuEHJ83XlsRCXB8hmdV2zngW9nNd7Ws%2BstvqUhfSKOo%2BmgtF9%2FYbNtUzSumvheGM0qO5vU%2BMQp1HZI%2BpItfkHf3Wfud4o7Cf2ds0kjWICNpJqFxXSuyXY1rqkfN3bgnfI9X71MRE7WKYYegHCrn4RkSizrlClYVFaM3TEMM2Gm84GOqUBWcvzZeKO012dmBayr4KUv4n29qjvakWVQzzuLnJa7ypqQjexstIj1Sl9MQ%2BWR1ulo8TALZmAhHMXiXRRVjDfeX7I0yUnn3%2B%2FKKRYFlVVJiL6%2Bcd3HZdkX9X4EuqWl7dDwaDSiyYCEVrMG%2BlyKjXq1SZcSLoIGgbhGEABkpbt7kapiIOU9Mb53U5gq%2FnOE60dpa8HE5OKpPm0B9lr0PuOY5z4mYIc&X-Amz-Signature=952d3680553fc6c6b91f3ade68ec0f5959cd52c9db9e827249edb0871cbb14a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644ARIGUI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIGcHSQyqqxbnI683Oqw8aeZWqhjakrmrUuTto9Y40t6DAiEA6gSsWHdSeLZvOX8thACATlu2anim6kA8ihfyPUFzJTgqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFRjVM4%2FfXyTT%2BISYSrcAwfXcp3uMMYbx%2FZw6HbgbJYO4PmIhyrnAF%2Bw0TB2GhwKAgPXGbBQT%2F4xWDJArqzAR7iygjiFDENeoi0G1a9EELKblmpGRK3AsBtet54Dqi0EuOvSVQf2DrQazMfojCDSIbxC01Dkp814HxxxvbWH6U7TCWpyufWX9uoOxm8qqhd2nZlefZqDKFaFYd8Nb%2FFwbWsFRJtVRByUjgRN43akwH9EXT5n1Y2sb4AY3LfD7eHO7Bu22mQ4GCziAMjBWBnwga6IbacitqtVDNFh%2FmE48wC4JT5zdregk1WWTdi9tl3G2djZRfdOj3yCUZidNG64rEjqa4U%2BdO3t3CC12nJJARHf3wnrfCrnRKL6QFVBMScp6Xsy09txmDfUVhrIE%2FNA26zQS7NNn%2FHGE1x748aWPl3yAI9uh4giRPCzHNY6RC9UEquYnslmrv9UxAgU6wGyZF98JmZaBNZBRCnpEb92drK%2FJyEmCib%2BNCSDsvtn78hKzs1bFL7OpcjgpbvBttG%2BSHOwN9ykbtplbSBFFrZWkbHp9gZXGIi%2F56p7HASfmVdpzyQckb%2B%2FwkJP8KOTnA3lJea%2BiAztFTBGw%2BItlcq5k%2B%2B5Ae5k92gwZpGE1d3OnGOTHW1VsyCziFdOG%2FEUMO6Gm84GOqUBs9i84GFr3K0dHhaAAKGDfDjA5NbbLppdDDgjxyne5LJ396%2BHvdpC7PkWsXyedl9Js1MG9Ho7d8XCOELGkiE8h%2BzFQ9V5hUQfhL7jZtMYRbZ5%2FkCT%2FhEfAOjf%2BvslvJn6Y%2Bx2XHjf8WjTHX9BdTaD169KO4i5WOk3gk0Lxzhn9YP3rUaidfJsZShBTA9rPT4eG0NPYzPov%2Fl67hkSfDNKGKpO%2Bd%2Bs&X-Amz-Signature=f7aa359c77d03ca923eaf472ec2b304b5ca3d26b7f9c21abbc078fa203d40479&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466644WYM4D%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIG27U7xEB1XFTEOeG1EeA6nRQFrGJt43%2Fj%2BvxQAS240uAiBq%2F2EY7P5Fviuk3tHcoX%2BmV80V5wSw%2Fln1K%2FkKiIVsXCqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGo0IDfmwCW6Z1J1gKtwDsCNh4fE6FNS6GAXiHc3hoAcCVAY%2Brq%2FgbN1q86j96YVhsSNPr4%2F%2B2olEvjS%2BcJmTlnuVIVhXGQF7A%2F2%2Bk8ODxTijJ4pT3avMNhMFLZ%2FTXJkYCIcllZRR3npu5tZFSM25zqqywV%2BlqC%2BBLQzxG0sbfXchrlt3IEgYAAsPDe1OUxw5etWD8LR%2BU3f7tyMIg3qb6gqOfmGuT2bZLSx2bZPMQYZSmeFLzMXqXIbsJNG7tEqjNkcXXZBlxhb%2FJjvi%2BzsqYpbkMwT5nO3ocsiqnknWGa%2FURPClHsNpCaERBYyNDOZBO3gWCB3iHbK9uUzwtN0WvtiD7OFs6oMRqAtnW7DfGzmu77DGG%2BDoG1AukjxfoGh3R3d7D8n%2FOXwLwgjgyMPJcwQ33lOiVH6F9dZTY6H6yb%2FdeH9DKhkh4HKnTF88DMfz3T2VGa%2BqKbQUkEBx5pS7lkLBJ3WKQMNhIPYwrvAYCZwlCasqveFgGsEodng5iD3yMOUm0ZdkRihjbjj%2BINuTiLhm89Iv%2BfDcn0kEIrNTWr1Y70lb87yNhn%2BGa11GzswL8FZ6FevRYQuAwsI%2B2DQ3eop9Hiwp6TWP47csrliEjT2wnEpRe8Iv%2FHTEoBfl8hqI9Mm64r2ZDXAmMK0w6IabzgY6pgHHov1DVWgF7%2FisRpmwFcQS8AUe5SnhsKbJD3onoPq6JAVDMBa8wDrALbiQkcMRBStnD%2BK2PYM1HNLTPobqohywtr2H9mbd6JfMTwPNjZFZsaV5n%2FmmeTjlazBvdCzm0lVqFWrnJxQ99RFGORx9tCnhHvqRJGxNBHu7n2%2BDFjAZGyvyvNYyZ6B75RHb9nPvR%2BRQbIEkyg9PTUpj4JQYQjWvL2VV%2FVam&X-Amz-Signature=23ffe674c308fba0d7f42e4b64a99da5f0546ecf014d91831b4a3b80fa46d128&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466644WYM4D%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIG27U7xEB1XFTEOeG1EeA6nRQFrGJt43%2Fj%2BvxQAS240uAiBq%2F2EY7P5Fviuk3tHcoX%2BmV80V5wSw%2Fln1K%2FkKiIVsXCqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMGo0IDfmwCW6Z1J1gKtwDsCNh4fE6FNS6GAXiHc3hoAcCVAY%2Brq%2FgbN1q86j96YVhsSNPr4%2F%2B2olEvjS%2BcJmTlnuVIVhXGQF7A%2F2%2Bk8ODxTijJ4pT3avMNhMFLZ%2FTXJkYCIcllZRR3npu5tZFSM25zqqywV%2BlqC%2BBLQzxG0sbfXchrlt3IEgYAAsPDe1OUxw5etWD8LR%2BU3f7tyMIg3qb6gqOfmGuT2bZLSx2bZPMQYZSmeFLzMXqXIbsJNG7tEqjNkcXXZBlxhb%2FJjvi%2BzsqYpbkMwT5nO3ocsiqnknWGa%2FURPClHsNpCaERBYyNDOZBO3gWCB3iHbK9uUzwtN0WvtiD7OFs6oMRqAtnW7DfGzmu77DGG%2BDoG1AukjxfoGh3R3d7D8n%2FOXwLwgjgyMPJcwQ33lOiVH6F9dZTY6H6yb%2FdeH9DKhkh4HKnTF88DMfz3T2VGa%2BqKbQUkEBx5pS7lkLBJ3WKQMNhIPYwrvAYCZwlCasqveFgGsEodng5iD3yMOUm0ZdkRihjbjj%2BINuTiLhm89Iv%2BfDcn0kEIrNTWr1Y70lb87yNhn%2BGa11GzswL8FZ6FevRYQuAwsI%2B2DQ3eop9Hiwp6TWP47csrliEjT2wnEpRe8Iv%2FHTEoBfl8hqI9Mm64r2ZDXAmMK0w6IabzgY6pgHHov1DVWgF7%2FisRpmwFcQS8AUe5SnhsKbJD3onoPq6JAVDMBa8wDrALbiQkcMRBStnD%2BK2PYM1HNLTPobqohywtr2H9mbd6JfMTwPNjZFZsaV5n%2FmmeTjlazBvdCzm0lVqFWrnJxQ99RFGORx9tCnhHvqRJGxNBHu7n2%2BDFjAZGyvyvNYyZ6B75RHb9nPvR%2BRQbIEkyg9PTUpj4JQYQjWvL2VV%2FVam&X-Amz-Signature=cd8f57f024341b4db2f58f8745f5acac920149057a780fb690824d19204dddfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RHHPTEA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCusW%2BwOIPZt5TGdRFX0rsks20vOOfNUz63%2FNUfHcpf9AIhAOZjZVAicUvPSndvMNnlNfDAtrJmqujWPQV4KzI9dQBNKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3crVpYshK%2BnETxgcq3AO2%2B4dURGmwJn4NWLBtrXMYWULiRnanRNwnKAQrN1ZHjPVpsR2dhO25MwBOhmC3AuAQVi5wxxkSeQq9T5sIS13WvExAx5%2BgBpEwOIrc2al7rSb%2BCuRDof8fdBm7LCKtWKLZAguXHL68YbXCqsEP60rbcCMdUN%2Bbo%2BqwU8IF1KjtJ7l2BBtHdDZRbvke85j9xtGpETdVIZu%2Bdd7sserpsorx3M36BkfwpzcU7V%2B%2BDD9dirOxiSmrPZ%2FFjfoFiltU%2Ft9gxphP0yHENKadAUnt2ifjQ4EVGJF2SmY6KS%2FMJ1azoHPcBO%2B4tmS7zpc%2FQ8%2Bh2BJcjoCFmjnMXhVkGNpnnYet03YPSiO6BzDJWTU2sTpLK1rZWIaN6wnWP2qmXrWh2rCJh3WMOg3MBDCszTsxPNJj2yCyDstXAIEczVrLM8SJ6Vd7WgUL4IFc9EQjOVd%2Fgg7z%2BCXwSNf3R9Int9mu%2BMXibFtwBTNWSVjsiAA8esdJBAr8%2F85QcP4TxUnOa2XQz5RqmT80mAnz1UvGxlEUzag2KC4%2Fe2IzmsCPTY5OfRdS1gehMTE1uTF%2Ff5ibRdiJkGpq6xAus1uWLedgXhYK%2BWsB8tYkojLuQ2g4ZSP%2BnlHZorXwzQ3rCSZn08F1ZDCsh5vOBjqkAdMi7f1HXONQqHLaEYJNfxAKUexdv%2BIGahhVlbDrMbag8rkFcmsDNm4IudFYrXvJ0RxgI3uQb4I%2BW6JytFK4xutmLDmn9f1MrjB7Sg8I4BmzqgKUlZgSt2Gs8k20tw8WVG2omm5bVKVEt6efhRv5sy%2B19XfEM7MD6gy1m6AcdhysqT4%2BtDj3mYDvaUcScD6vP5u5cSuux0rY2pJx2yFIexAULJNo&X-Amz-Signature=f5a7330535e192b4c45ae912e40853b06d0878fd91f5bd200825f1d741ad623e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM6R57VJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIBnXE9g7neq%2FTOJJJM2ufNmC3v%2BSiOUyhMJgRrtDMrsoAiB8tCjLbtd5rGI7g5wCWrGxE7LzIq8FXwakuS3w%2BM%2BL6CqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrr0Lp9gdaWnv1ZI9KtwDjXqmL%2FgHbsvpA5sBd0jmgc8bulVjPJHie%2B2eew%2FP0r9Sz5SMl4EdtUfYgKiCcDAATK6pqYTcVy3gBbJivLBIm5EDzDauOFR5avx%2BaWoursGY07LZL99bWhVLk%2BJjskfRTGMy%2BIHthIjrJ1%2BDf9ttn%2B4mK6x%2Fo%2F5pZH65HMPpeIRs2ay13aRZYTC5aLedNekZzy%2BJ9rIVBeW3csq0%2BsmoRF%2B%2FODUs9zS5CpSuGY4ZXXnVSjtTHeN%2BrBPUnZF6FbnuB7CDgJaU0Tvck3hIdq7Xjsh28W3mH0YXKTQjDCNXOb3u7aUroT6ItMNPoqc4y5ZQZCK4jkjEQseufToiRCH8NyL6%2FuvOyVf7e552NVhmnddAnRxOjAK4ciU8LYkyLx%2B0l0Ev55tcoDoJITdNCCeyFuIPWt1rxgawaCJ1whVEC1ftOGnlMYxax0Tdi52XIjPHuZ42%2FwWapvvRL5S302gOQnW%2F3bLVstwgCN7z%2B3lgyAnj%2FU%2FIpMWGA%2Fes1Zy%2FAVZHvuoC9HiYcl0aN4urLq27IURR5N7DzIDKhoR5sdXgXyyBHusFS4Lq4iJ7bfp6HEKhdD0H0M%2BtRyNC1Rjt3G4EeGCHm5eHznYRnaNWPu3ZSOEL6ldVGrnjmMGgph0w7YebzgY6pgH8wB3yYwPRKO9YrMrIS1qQPUumJC1bpCT4sCgyb8JUHnR9aA5Se2rQdgYErkjvXIWm1H7h4AdiI08%2FUpQW2xuh90nwcpeoJlqL4nBlpylcsXF%2B0haqyU8eN2s68gkUq3RHOFPrU5sKjONl1oj8tXbGt77aa7AxsPeZOURNA3YvDiJEkGKBrsn94ZyB2CvlVEYBL1XD2AH%2FgeQH4gQxnjry8s5r4fSW&X-Amz-Signature=6eed2ec3e8d8ccb592bb4f66f93e5b8cd77b92dd2769fc580809057c950260a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOSAMBQB%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIEWrQ%2BCeMnaKtp7w23kvW8E%2B17jpjN81oMBmMp5VJxBYAiEA5wHqsL84Y4rFg1Pw%2BLKwND3oQymE3%2BAFcwU6qkYMijkqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMFmCgK%2BTB1rfQ2LYyrcA7yPOz8Zb0nQLVkjatbRBJzmc467D%2FyPjqW7xByh1HBYvaUqDZQmf%2FX%2F%2FoR7KinAhsyqyF8tm3EaQA%2Ft6yI0E4tbqgK35zJFj0D%2BP7SaIvG2NVEvf3UTav8P%2FNJcOva%2BgiOs2thYJPCxhdzBjvmRPpSNQBrEBir1Ur%2B0Q9hlomKoagog02TJR%2BzEyqQRfGM9%2FORQnht0jV5GYrOozS3t80JXJM6blI7EXqq75RIyc1Uerrh%2BXjpi9wweQH5%2BHPRIB3lf2Bzhui3hIeZjeAaqwa5wrnyhFX96LnBADKj0s5sqNcI67CY0JW3GdnvpCit27Qq1C%2Fm4kZqvvbZQgTrmEIobPx33DZkBIxyQg1V2CzVDnwCYI8btqIK%2F0ehDdMtTyXUe%2F4TglhaDS8sXlhGlx0j64S0hlQXLq%2BljkXi78N69%2B90%2BphgZzGpL3IrGPQfCKvnYDLpoTjdzwNlNrfsGJyxBLNQJwxGzj%2B9ROrgn%2Bw%2FBWdh9R9J04y8kiSGOjMRWTjBoJ9hjjvWws4p3C%2FwLhr9f0eqktFbXFq1ixECw3thAGWGi7h1kUtYGSavdW41CBFvf%2B0dRwleWHUN5l5gnf9bp%2FiUyAfnvxALNAIvinAWN9rnVrEMcRFvqef3kMP2Gm84GOqUB2Ek3jM7mYm0KyodQbhgrq%2FVWkUUruerynJt6s07fvCSE39OF2IhxHFE811cbYr1bUWNLLbCHNhnR%2F9GJwjHR%2FTJsPLUVar5iMM0TWSC27DMxwi5%2B1HUzAFuvhzMWiHhhYAOQPCeILKXVX%2BspFGn5nyeYDE1fXn5wPfn3AZILpqgQFTDkY6ggoJIxfG2JNmfRrqanq2jJbdsEhZtlFDNQBJXXwUug&X-Amz-Signature=40956e856c56a7847170e4120cf31b091f27e939f81aca1b746103570cb5252f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSMZO4NO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCJVZ09nnFecm3Cpd6TBOXkHFrzuOSIPOOQ%2BV3fe3PP2gIhAILQeTloTDd%2FNPRje2LsRQIYE0ekcdBjrv5jWKSfH6zGKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwpDb4Pz6WuGFdVME8q3AMrYTXN1oFCAc1%2BB0Ug2096AheNDbzO52EKBfYMPSFBOQSQ6AGSfY7HhjvzguaydQFc0r0ms%2Bl5OR5CfGC8Xg0cTevuex8s%2FZk20DUcr0Mkxv4AGmUutiArkayQkn53dEVC9s%2FDRPQG9%2FhCu5okGAppDn09uMOb3TFZT%2BiW7nIN4XZdmGw9CYIjf6%2FcUcMbPDlm1iEK5jtW8peJiaX80Xeg1sV32P6QzFNQWPtGD%2B6jYG65Z1ysqLFvVDIBInfG9CjcLh1zNiKAsmG5hiWYicv8vj0ZoYDcfnpZ493%2FBG04i36f%2B6xMXYfkw1pXp2gOhXZK7eiyAJjNR9FD0jMGYFKh5zi59PeSbuZN0w%2Bxe%2BkXGnhd7NAunYmdkIhr6wHdpk9YYEDyaL%2BZDhH42K%2Fs4niPdJkfkfADv1VLwsXD5cPJ5xTgahcPUhCmnG7i86MCuLRYMb3ZWat6FDCuJPWvg3nOd2suODiO13XvKlWKJfYWAI2ltpAjeTx1Roh8sNVheBVCSHyAFZ%2BC%2F4d2CK3ml%2F5mJ1hC2sKlYJr8dlOZiSdCa3wkOtIm1GNmDein73KipeidPn5f%2Fusd9T8X7rpWlm5KWz%2FoaFzMZOA3LIId%2BbSgbb6xVD%2BJlMYKPpzznzCXhpvOBjqkAXTNQAFvou0X1zW3caSSQh6rwaMv%2BHnxjpo4paVT9Had%2FwxIpLVSFXi7WYu%2FqGd1pPs4XC8VyjKZGg0CM0dVWNRiAxnvGja7AQncUnuSnii11rUH17soQcUnn%2BxY3Avciv1lGtQX3tNXkNqL2Dv8ChUVRz8stAlBm661tsCqkQxbPgUBxBguVKTc6IbdsY%2FvZDPVGi1I7VH3pE8VimfSooxR6o3l&X-Amz-Signature=3699adb32520cdd821fb37f1cb5a0dcee020d552bd1590792249ed27ab42aa55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSMZO4NO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCJVZ09nnFecm3Cpd6TBOXkHFrzuOSIPOOQ%2BV3fe3PP2gIhAILQeTloTDd%2FNPRje2LsRQIYE0ekcdBjrv5jWKSfH6zGKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwpDb4Pz6WuGFdVME8q3AMrYTXN1oFCAc1%2BB0Ug2096AheNDbzO52EKBfYMPSFBOQSQ6AGSfY7HhjvzguaydQFc0r0ms%2Bl5OR5CfGC8Xg0cTevuex8s%2FZk20DUcr0Mkxv4AGmUutiArkayQkn53dEVC9s%2FDRPQG9%2FhCu5okGAppDn09uMOb3TFZT%2BiW7nIN4XZdmGw9CYIjf6%2FcUcMbPDlm1iEK5jtW8peJiaX80Xeg1sV32P6QzFNQWPtGD%2B6jYG65Z1ysqLFvVDIBInfG9CjcLh1zNiKAsmG5hiWYicv8vj0ZoYDcfnpZ493%2FBG04i36f%2B6xMXYfkw1pXp2gOhXZK7eiyAJjNR9FD0jMGYFKh5zi59PeSbuZN0w%2Bxe%2BkXGnhd7NAunYmdkIhr6wHdpk9YYEDyaL%2BZDhH42K%2Fs4niPdJkfkfADv1VLwsXD5cPJ5xTgahcPUhCmnG7i86MCuLRYMb3ZWat6FDCuJPWvg3nOd2suODiO13XvKlWKJfYWAI2ltpAjeTx1Roh8sNVheBVCSHyAFZ%2BC%2F4d2CK3ml%2F5mJ1hC2sKlYJr8dlOZiSdCa3wkOtIm1GNmDein73KipeidPn5f%2Fusd9T8X7rpWlm5KWz%2FoaFzMZOA3LIId%2BbSgbb6xVD%2BJlMYKPpzznzCXhpvOBjqkAXTNQAFvou0X1zW3caSSQh6rwaMv%2BHnxjpo4paVT9Had%2FwxIpLVSFXi7WYu%2FqGd1pPs4XC8VyjKZGg0CM0dVWNRiAxnvGja7AQncUnuSnii11rUH17soQcUnn%2BxY3Avciv1lGtQX3tNXkNqL2Dv8ChUVRz8stAlBm661tsCqkQxbPgUBxBguVKTc6IbdsY%2FvZDPVGi1I7VH3pE8VimfSooxR6o3l&X-Amz-Signature=9198757c389e02434fe84bfe386690d59da2f3850262f94708332c1912021dd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3TNOO6M%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQD94jf8QazB5jhVTH3b8Z%2FPFpYBpecuAZVcqvwKafJszwIgaEdlfHyzeVGzVwGK7zqiYPDQwJzn6HGJF4M3xMu86xQqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDKjNhDf2KB1%2BS3f2CrcA%2FMB8BW738IvzxwE6soWS48RDpr7MLA8cQlTBqPqchDpzvhIRk9DsJJtC%2FX1wKUTDJaulCnky0F4pqCmMU64%2BK7bIk%2Frro8Q5Aj%2FIKp3W6x%2FlaT5Lx%2BGzz3W37rkr3OgxFIPUTL9Dn5kKjcb2bwwCfbsYdI%2FUcc5O6G9OXzgrGVb7f8hO2JnwYXXB2MZRJ5Azeka0Fntdo4OSmFuFqv%2FZM9%2Bpx2uJL4%2FJ1Z2vjz7PvkccZIRSDPRN11%2FHJbaxYT5325X0fJ1H9tq1Z0xqkBqS02OAep%2FJf131bFLwfPBeso0e3sE1R12uiMj9UcHNB49u%2BfFlXy4jP8lihswQcxJJgSDk2b8NWYw7k35uYRq2WP9OEuZDNp%2BVnZLGkcEjMeFCjriMU35ISOXYhqofoDO9TOK%2B9g8qElaXEtiA5dUuKS3gkXAA5l7xKNfbZwU7varSNABkKL46Ag0J8zTBsPM4IGVev%2FPlutrcBunK2JECSsDYWnamPcxjWgDChg61iMJecSMObfuADmrXkZR5znRHH2OwnM33DfGEJ3mJTG64RsR5al1rgrMIVHbcCby8P%2B7zg%2FyzYDiLjC%2FVV03ixz65a92byl7DzoA5UqBHf92HU0dgeHc3zptjS0UfZiVMLOGm84GOqUBfgQ3JeKKgoQkRHxK8emeXHDeqemhm3cxWdc%2BE4CLfN2P6IWN4I0M8E1dmnYJibz%2BBywKf%2FNryq5rm15gKKZBQXkjDCjIMKp234R4jU9f4kF3yJ4SD%2BMK10U4E4sYBXWgdjwSkbFEhppjYp5FKNii4Rp7lRe79DNj5OEbr9MeP5vQBTqSg6xLosIZk2JBAxFRJQChpYNCOq4swqE0XjstcjZklUst&X-Amz-Signature=6bc8080d54dd0a248d17ba29c39c024b4a0c477031f336d80f75ddab99025715&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677RFITVK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCnl0GQC9H%2B8q07VVIFS2qTWNRapGL5MAcY5Kb%2Bu9%2BrHgIhAPQRCxssEjWBPNA8PvqLMHB%2BqySywF7V5l3O4T%2BVFrxXKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2BFu3BKLp%2F6%2BYZhNUq3APk57BZg%2BWY4aQAFTrVTe5XEnVXlxeWglLsRdooCrEvMNagVgDYiddL6rJOHTOOncYxX%2FpZpBz7xtIV8dfoa0A441E%2B0Y7dWdKRFbUISqk5RlFDCRcK5uYu8CCGZ15PVG0pfV3XynCZT2%2FLo7MQYv0mZw%2Fm67YT0GVAuHozvPa8a6Nb4BWGMkrJDP0uzOvHIyt54TFxw%2BK2q22XVF0%2FQUotGGS5B59YL1028sYMILo8x2ClFvchzx69wM2%2Bk18op%2B2MCOjIdOkeNQcXI5EuW4eDzx0L1pIDaNlPeDQ3t2QuEdf5EHmMCgtBBFSahJ3QbDiJyb4LmVISpO9uLIzjP29aVvq07fI3HQZanNm05825e71flSce7dJko6Nz4lFEPRw%2FBO%2BCzMvHUiSuBbhI8FXuoVHo26ixPMQRUPNp9bI4SmFIyFclkPZtL5%2FgjNRO3p3yJtwYca5BOdxrbFteSkjT3enVrpy4p9VCehc%2FYIHjZzcF%2BogYNSocOnyuAjlpwWW7C4goytuKMsshMjqbgXc0tzwt7WZE%2BmxTPGGnGRIs1Wlcsmkx2s7kOgqwtGv99aD38T9GFE9zPLH30oDmyZ8s5OSAsBqTQz3o2QTqZISQLjEyJVVzWkKupvvs5DC8hpvOBjqkAQGIhlqIVA4k2G4qEgbFv4pec%2FNY6Ut8BWAWn9HlceJOSS1%2FyVkOKCdIKQTkUAckgCkdnYEA10YrDPfdsw7yme1uZatO%2FpXGBcWgrUL4JzCbh0qBxdpTtyA%2Ft62pqfzzQK%2B7seisT0LYnQkzTb3J7mtJg5lzUZsL1uYGP5x5SXViTmLIRO%2BqZFPzpOU%2Fl6wrJeoAbkPZMRgTk%2BvUggJ0vieNfY3j&X-Amz-Signature=d1fadf259488df9f2050cdee347ad3153e43cf821793ebc10a7578462e71df1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677RFITVK%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCnl0GQC9H%2B8q07VVIFS2qTWNRapGL5MAcY5Kb%2Bu9%2BrHgIhAPQRCxssEjWBPNA8PvqLMHB%2BqySywF7V5l3O4T%2BVFrxXKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2BFu3BKLp%2F6%2BYZhNUq3APk57BZg%2BWY4aQAFTrVTe5XEnVXlxeWglLsRdooCrEvMNagVgDYiddL6rJOHTOOncYxX%2FpZpBz7xtIV8dfoa0A441E%2B0Y7dWdKRFbUISqk5RlFDCRcK5uYu8CCGZ15PVG0pfV3XynCZT2%2FLo7MQYv0mZw%2Fm67YT0GVAuHozvPa8a6Nb4BWGMkrJDP0uzOvHIyt54TFxw%2BK2q22XVF0%2FQUotGGS5B59YL1028sYMILo8x2ClFvchzx69wM2%2Bk18op%2B2MCOjIdOkeNQcXI5EuW4eDzx0L1pIDaNlPeDQ3t2QuEdf5EHmMCgtBBFSahJ3QbDiJyb4LmVISpO9uLIzjP29aVvq07fI3HQZanNm05825e71flSce7dJko6Nz4lFEPRw%2FBO%2BCzMvHUiSuBbhI8FXuoVHo26ixPMQRUPNp9bI4SmFIyFclkPZtL5%2FgjNRO3p3yJtwYca5BOdxrbFteSkjT3enVrpy4p9VCehc%2FYIHjZzcF%2BogYNSocOnyuAjlpwWW7C4goytuKMsshMjqbgXc0tzwt7WZE%2BmxTPGGnGRIs1Wlcsmkx2s7kOgqwtGv99aD38T9GFE9zPLH30oDmyZ8s5OSAsBqTQz3o2QTqZISQLjEyJVVzWkKupvvs5DC8hpvOBjqkAQGIhlqIVA4k2G4qEgbFv4pec%2FNY6Ut8BWAWn9HlceJOSS1%2FyVkOKCdIKQTkUAckgCkdnYEA10YrDPfdsw7yme1uZatO%2FpXGBcWgrUL4JzCbh0qBxdpTtyA%2Ft62pqfzzQK%2B7seisT0LYnQkzTb3J7mtJg5lzUZsL1uYGP5x5SXViTmLIRO%2BqZFPzpOU%2Fl6wrJeoAbkPZMRgTk%2BvUggJ0vieNfY3j&X-Amz-Signature=d1fadf259488df9f2050cdee347ad3153e43cf821793ebc10a7578462e71df1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y25TMJ2B%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T183815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIFt6kKB5qx5uo138pnM05seH0dcZv4fCahtTerrmSzGEAiEAjcgLWGUdveEo8ZB5zKJcoYT3tgv%2BrhUDosDSCoNc7DQqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD4OBacah9cmeMyzTSrcA%2FjM%2BNOHPZScmdL9yCGy2pVhzFgyMaCfvJFFNtrQY4ONQT3YXa4QmUNFyClaeJphv6shEiIOms9F1%2FtBSD5W0hQo2Cg%2FuBQo4SopC1ybogbneKpBg4kjItXiVQ7AdUNu859efSlJyO3AZ2Q%2FFvXUsRRYABws6xd2%2FcfuEJuZApsTeQoqhKCpqyXFHC7hSqM4jdaKO7pGt81nW91h30ijNsq4Vgid9szF6mOAk1pW9J2ifURQo0HiOwvGekJmAuov1rtcR4Watqb8cqHLzIcDJ6iMzPrCSUBbLdezL8EzJObK7O1crmTdH7Y1Ko4MpyoVLwIpS1HKvBW2emLUXzMPrG%2Borv6QRk%2BIeHRnvXevNTNWnFbcb2ShTZjbitdw4LRwQ4OnDAYNo2onQCpTQRC%2BUyy1eNqHRh7MwXuMXaNylFKBFFAao26XHqPYKfdiOqU0h0SQJNHkj38bp4yMst9y4x4vMFZhdauKi%2BGaAlf5QS3h5qL%2FJ3l6AgTVhWxOZz7wesA6mOAhq8NW5VVEWZV8HbA7eY1ODgB0easutxzx%2Ft9Oj%2BMuVbe2lNVVII8PM4r6M%2BUae7KsNZoK5Z1wF4H0Tw9ZFrIx5aASJbY7oJLoZ1ibpBlR6D9hiWhbZBgFMN6Hm84GOqUBg2rCkVAowzogHBHYvYQF9a%2BQVBOGaFUB8UCM365FM4gZCteeOhftdiFDjADQUCY7vOu7dGjlEEhb1wrwHIoW1yllbjccJ6wniNNlMWUWz%2BvFkVLleMTzH6DsB8y061GK1uabJIC7C8vT%2BkADL3KTwj5kqtYQvAt6BM1G6bdvo%2BBQlgkNWuJsDsTqdTbHKpdv26JVFnKY7UwKtS3g48LwFq0KwHjS&X-Amz-Signature=bd1344a076a6077d358751f73fdbd948dee55d015b9ceaf0226f9190da1e3ee6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

