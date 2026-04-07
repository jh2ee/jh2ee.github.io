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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5SKW6OP%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQDmNg6ewH6UVBSqnlDFPNzccyXUF4zzzSapd7FA18mGgwIgOoEDUJKdnnBt6AJhuG09acejeM1fVpeLgs2levRyR0YqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB0FMzSr13Q7I5grwyrcA%2Fkkrs%2BTCifuvzc3BpcgV4pQTb%2BXIRJ%2BfEASUqhhlVu7g6Nl3bzKuXsB%2FhBqa68gm2TKLQrN6mgKmUoTucDnifM%2BlYDLnliR%2FaOlIOUWkMY9TeBbfJexFFe2XTW7laCrXdZOCeBZPQ26%2B0xsLpN1hxETpPAHJDgCTu1ztMw5sJ0vZlwtkrphlwEsOr7rLigEd%2BZITp9AolptJVVfuhQsVbvCjyVDUqkSMUb1L8SRe8jZLBN3te%2FP3qBFhRG%2B7v1Bpwxz2KkMGAFTSoHzqd9hyMQ9l4Td71c5IRtdg5nMpLgdgQitLdzfALvuwKgWyyu4o94mmveayyShG4bBqNE8oc0%2B3X%2B4SHHOaLLY9vh93SKIZv1l93v4HEs8j3gc0ZAdUqTpIBIB4X%2BP3liSoKa2CmWXUvDGIzirBPOmDNMlL4T2qWWG65xFHJ%2FM7Q20g5oR8cvwJpDtLuSkkWtC%2BPOjwoCMxVRX73%2BG8GKbNrAA09sHK6pk8Or4Ht7eJEPICcZSqlXw7U9yseI%2BXwcolVaH2ICOj%2B7T%2FO8ppEFZOQ%2BW8ewIwDJNTyviBHEHDCNz9VgalhfbVSh5peZ2w2jF47fhNux9dSRLs3nC3E4uJpW%2BomD2cKw8NruWnKiuhWGSML6j084GOqUBJldKZgNjJAxl%2Bhmae9FEKyzOwQh8bZFJ%2B2d8C5VgLDx8a9xzKHNf6FWipJo0D4GPCCI8jkqlIVfgz8YoMzkSue3HmwQ5FYBnURAsLb3YKE2z2bD%2FPRPviR%2BHMdfSBmkSKJQ3xjFnMgeXjsFjWgmu5Ih5hW64HKqDsCRv7KUOEotlwACfRxBsUGogjqMIPvuaG4y4CLMx8FLH4%2BlUm2M38Ww1ySKv&X-Amz-Signature=2f50719ede1a345539ab4f74060b4549231d03124efe9876e308208a5d51d59f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5SKW6OP%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQDmNg6ewH6UVBSqnlDFPNzccyXUF4zzzSapd7FA18mGgwIgOoEDUJKdnnBt6AJhuG09acejeM1fVpeLgs2levRyR0YqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB0FMzSr13Q7I5grwyrcA%2Fkkrs%2BTCifuvzc3BpcgV4pQTb%2BXIRJ%2BfEASUqhhlVu7g6Nl3bzKuXsB%2FhBqa68gm2TKLQrN6mgKmUoTucDnifM%2BlYDLnliR%2FaOlIOUWkMY9TeBbfJexFFe2XTW7laCrXdZOCeBZPQ26%2B0xsLpN1hxETpPAHJDgCTu1ztMw5sJ0vZlwtkrphlwEsOr7rLigEd%2BZITp9AolptJVVfuhQsVbvCjyVDUqkSMUb1L8SRe8jZLBN3te%2FP3qBFhRG%2B7v1Bpwxz2KkMGAFTSoHzqd9hyMQ9l4Td71c5IRtdg5nMpLgdgQitLdzfALvuwKgWyyu4o94mmveayyShG4bBqNE8oc0%2B3X%2B4SHHOaLLY9vh93SKIZv1l93v4HEs8j3gc0ZAdUqTpIBIB4X%2BP3liSoKa2CmWXUvDGIzirBPOmDNMlL4T2qWWG65xFHJ%2FM7Q20g5oR8cvwJpDtLuSkkWtC%2BPOjwoCMxVRX73%2BG8GKbNrAA09sHK6pk8Or4Ht7eJEPICcZSqlXw7U9yseI%2BXwcolVaH2ICOj%2B7T%2FO8ppEFZOQ%2BW8ewIwDJNTyviBHEHDCNz9VgalhfbVSh5peZ2w2jF47fhNux9dSRLs3nC3E4uJpW%2BomD2cKw8NruWnKiuhWGSML6j084GOqUBJldKZgNjJAxl%2Bhmae9FEKyzOwQh8bZFJ%2B2d8C5VgLDx8a9xzKHNf6FWipJo0D4GPCCI8jkqlIVfgz8YoMzkSue3HmwQ5FYBnURAsLb3YKE2z2bD%2FPRPviR%2BHMdfSBmkSKJQ3xjFnMgeXjsFjWgmu5Ih5hW64HKqDsCRv7KUOEotlwACfRxBsUGogjqMIPvuaG4y4CLMx8FLH4%2BlUm2M38Ww1ySKv&X-Amz-Signature=2f50719ede1a345539ab4f74060b4549231d03124efe9876e308208a5d51d59f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP7CYKKJ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQDxbm6SuQbTNFCPt%2BKy%2FHcFMX8d7jwBxj50VPZqFeKRJwIgKlN%2FiC6LdbIxGuhXZHvTA3WUcdKVCMMbsmqZUvmZdYgqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAoMIcMDRm7nhAWJJircA8oFyNkmuM8Bj5IXcD8rRwKMwwFTXxMFWkIKgxhOwjhFKNHA5EypjkUh2iErlueYe46WoJ%2BORo4KOzetMeR7l5ZtvxmMd4cUkwsRpSM6LOK3a%2B8pMngw%2B7E%2BWkLUnL4i3Fwt%2Bb%2FthBOG0UM4CVvUL5IDLUCeSTKaWQ46%2FRNCmBfpL5Q6Az7utPu3sntZ3%2Bp0Qkd7G6E1Wr3h7L1E%2BU58kJYrjh6XGSocdq9T3O%2FVgeEb0FD2oJ%2B%2FJYeYCS9jpoPBTniiy%2BZQD9B%2FHkzEXWPSrN8dNLzgCPv7Gq5RLEPMmnWeTEl2be5chshE09a2dnju4rP%2FR7VOcsPRzDBfiJvCtKoz4EWJ%2BqiX5hiMFwFCOUbaNafr6p0ZNOY283H8TZYPkRwB5zKGSSxW0T8V0J5qf78pczaWXdQrOB0%2F2zrfk1SD0ol44CV5FDKe16Y7bErnwqgkeJkR6FQ2jiJtxyIrurQXZHjVkEhbbLQcZJMt0dnbvSN7Eiyj1RlIYHsGLfWvyArvMDr3qQmMPRTBHcg5UjqMOr95mIBeR%2FbC5RD1RZAJmtYKiKMIfCxkpdsnjWmICox7JVQuNFZtctwptKG1AIrEz276YY7eJEXpsiaFujiu2iGafWn33i3oOm9JMOig084GOqUBjzzL7rUHAsMYXERyax%2B9OHnGvNK9wQhMwsBoUcfSz0tuu7JiVVCStW0N6wD%2F42zC69N%2FKvwU4SfRfMnFREXfkQWhf9jy1iQ4r1t5c%2F4xjRj1GQAXEQcaW2zR51XEdSEN1Ru3xp6Xx4aj%2F0P7QwMQJtBnf4nDAXaCMoJxwj7WrzVCEdttS5W%2B1EoL8NXO%2BJjSdDqw%2BDvuuoM0nmoifzms8ZIYCnPU&X-Amz-Signature=81051192aaaa30028544cf352deedb40ea4460c5c2497674b1c87d839d6caadf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN3ASYLX%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQCbmPHHOUdDL24N8FlHB1%2FBNePG5JRqkQOjscBCP7uICgIgZ2qx85TZHO6RSmpSxQgefbckUi6jYi4lMCYWRYfjAzoqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGVZjgenik0eBiliJSrcA52aeLfN3arZK7plLTswL7R9b%2F8u2Rmft62Rghj0BU2qYCda59kwggt%2Ftny4zmrA8eRmCUcJBue4PKMKAUBlveCfUUqUT11ZxzSKSHxRHDWnpruSP0mrShjy1UuLR%2FR1aUsySQl4p%2FvVoZgHUajyDgrV5gh8LkLZKBaBqG4lJX4ri5As6m7787oo3T%2Bt8gr23JDHV1804dQP5muZH0nQt%2BONFHq1KzlOIpHgSXBmxThqvvnv3%2FUBbksdmwSRRFbU%2F8n2wizJLW6fe0K2j4XkMeTYcL8nUu8kCTjsdkjszwC%2B%2BkbFOXJllwZ5cjEWzRN7NlmuP4q3dGpjkp7LJDUFEpvQtBUHORB7BMRS5C77VubVpIdBMMOPVf5qlJeBeInc%2Brk3NPaX3HYDuLTrD4EYQtch%2FuOX%2BpSQifcRUQiksaf%2BZwzb8q8UbA7wEV0G4jBM%2FL1VRB2aYC25QuFCUL6S%2FA7rm2tUKwuepZ%2BaogjxusGgGspVFjs%2F%2BOaz9bgJTGECmr2sIjTaMfW0hxVr%2FsDMvQPEtbeknY%2FuhchM%2FFb%2Far1uxhXGiSXa9jYO%2FalCZCYQTTBNgfPtF6QgY3y6KihCDRJelt0duFWBZ26fUGu%2BVuxZFes3w9aNrylzHPtBMOmh084GOqUBQeh5gEBqc%2FJQ72icZlVplaW2nyM%2B4FiJ57BxyKOoRssxPKbuBfNealQ2QaajCBmVMcIbiWhoPmRv8kLCXUTzu9GttQp14jR3qoG0o9Ubtb1Hbl2AeiY7beMfMG56yWEnoUOoZSB6htrEoNAMvPTTR7sYTZi0S%2B4MSZUL3UT3QC04zTK%2FvZ2jEvwFSH5JIKGLazxk6TcRjOYHHFs9y%2BKj0kiNQBzA&X-Amz-Signature=2f15f08605e86bc212336471a3684666bca0ec20ffef30959cf6c3f635aa570b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN3ASYLX%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQCbmPHHOUdDL24N8FlHB1%2FBNePG5JRqkQOjscBCP7uICgIgZ2qx85TZHO6RSmpSxQgefbckUi6jYi4lMCYWRYfjAzoqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGVZjgenik0eBiliJSrcA52aeLfN3arZK7plLTswL7R9b%2F8u2Rmft62Rghj0BU2qYCda59kwggt%2Ftny4zmrA8eRmCUcJBue4PKMKAUBlveCfUUqUT11ZxzSKSHxRHDWnpruSP0mrShjy1UuLR%2FR1aUsySQl4p%2FvVoZgHUajyDgrV5gh8LkLZKBaBqG4lJX4ri5As6m7787oo3T%2Bt8gr23JDHV1804dQP5muZH0nQt%2BONFHq1KzlOIpHgSXBmxThqvvnv3%2FUBbksdmwSRRFbU%2F8n2wizJLW6fe0K2j4XkMeTYcL8nUu8kCTjsdkjszwC%2B%2BkbFOXJllwZ5cjEWzRN7NlmuP4q3dGpjkp7LJDUFEpvQtBUHORB7BMRS5C77VubVpIdBMMOPVf5qlJeBeInc%2Brk3NPaX3HYDuLTrD4EYQtch%2FuOX%2BpSQifcRUQiksaf%2BZwzb8q8UbA7wEV0G4jBM%2FL1VRB2aYC25QuFCUL6S%2FA7rm2tUKwuepZ%2BaogjxusGgGspVFjs%2F%2BOaz9bgJTGECmr2sIjTaMfW0hxVr%2FsDMvQPEtbeknY%2FuhchM%2FFb%2Far1uxhXGiSXa9jYO%2FalCZCYQTTBNgfPtF6QgY3y6KihCDRJelt0duFWBZ26fUGu%2BVuxZFes3w9aNrylzHPtBMOmh084GOqUBQeh5gEBqc%2FJQ72icZlVplaW2nyM%2B4FiJ57BxyKOoRssxPKbuBfNealQ2QaajCBmVMcIbiWhoPmRv8kLCXUTzu9GttQp14jR3qoG0o9Ubtb1Hbl2AeiY7beMfMG56yWEnoUOoZSB6htrEoNAMvPTTR7sYTZi0S%2B4MSZUL3UT3QC04zTK%2FvZ2jEvwFSH5JIKGLazxk6TcRjOYHHFs9y%2BKj0kiNQBzA&X-Amz-Signature=85f86dacea655e9e6584daa8d57e5d77447aad4f712969f59ff26ff31e9dbb0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAO2EADW%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIGa%2FkHXJjB%2B5WRBhtzkC5PpihCsCQp86fqR64RHCv8xYAiB0y7OKw5zD1lKat8G%2BlTY%2BNT26VHa0jac69wkhFQ66%2FiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgZqLIA3Oddz33rEcKtwD5aniJIdm2pxTtt2a4pKcVKNCn4uh3LR1bE9eASQRAFrnIGWXGfgh5lXWvabOuaSv7FZDfL9dE142%2BRWFnJfefM4LBkCRmrJ1Rjep5wX5Y4PQoXMZQOVZ5R%2B6XGEp1ptpMHnW4x2YU9cSliLXe%2BU6va9%2BelK12sjOZ0nPs%2FPsqflskk72TTJ4Dxn%2FSZT7Af4P5zhBE1kBniqtKD1zfRVzOfQFeM0asIRhDVOVhwcMwTgfxn5lqoJz9bZPmKfa%2F%2BL6oYr1KVbGAZahnhr0dRLDhdJFVQ55Z18oZePmCJX8rCOZlVb%2BvDm5alvySFArpGBHtyqLxyj14Ca4Wv3Bx1tdU5P7Yj32oIwnkEaM377foS7UAZic1won1C6I7kDm0GCpXW%2BFP0B5BmtUP37bA0llwkBQlGceaw3sQ3rSCOHD2EPOJ9fal2wYoI9mK9qPI1BPp%2FdPtLCDGwm%2B4KomsgnugQw66wBkDqxG7u3uG5HYVb%2Bd1JNLCYRBZl2ZlIkRV2jE47g%2F3dcD370FbxqzibkdN6taU4wh9zCqiQ1BYeseOE%2B3k5TWmN1gehXsgmjghboHRHi7Qm0yQP2hwAePCdTdkRrgGqgDvbrW60sISA0WHown6zzxYDZD2tJ5MzgwoqHTzgY6pgEDWVTXsN4f4JBn1WtL68yMzM%2F8Ock649plJTNW%2F7NBBLqhumyPGO3988%2BG2%2FaheBZpc36aa0bDTHCnBwKIGDBAhNvGere1kUbO5R38dcutJ6fUcDuqwNhIPByvUSCH%2B4qvFIhG1IaQ%2BDifsSonu4FWutXOtza%2FvC3Oz0as3Am603hj0NqtHrxmSxUaR3Ng%2BaBHXO6aLqSH74i6nCVSQimTXpEfXf%2BP&X-Amz-Signature=2fdd2c91164fd75dd7add4b7d9a670adf7a28927755db19bd452a4218628c02d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5PPLPUT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCcjMsX2aEqxIufBNuoyIWOaVJ5%2F4cGuZkmUdZ8sGJPYgIhAOa9QNN6U5Y5PldyT6Jp9tiopBjHKTLs%2Bwt7mwZjt6ViKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyXzaJCf%2FzWTiFWCdoq3AMdExfvMgOAgQwtO1lZVHeVYo0CTEkb5RVnCyg6E19zZ0N5iSXix2SHitx1s2wS0QsxL%2Bvd1%2Bzys%2BaDCvfWa%2BCErwc2MxXy80UoGGDvO8gkttQJ13F%2BTUKspSKv58qpX0a%2BPnVHw7jCgN9eqyJ1bQSKrRrhzCD%2BqKS%2Fw8e9DU7ppgrbYZGDhfxrNe0vG3SUcC52uX0D8hthg9PVy5XzcTb2AwiENn1QI8%2FEkz7aH0NCZLfuUy6RW8anPXOX4FEm36P0kDUMWrNustyVDSE4GAvmKhNghL0qsHK2q8OcsHBPPbWanKwiscWmFQph5G0%2F0Z%2BV8XLbSbVZYfOb6IOQ6jpU0Wrd1OIZ4lQsopw0LvK1tCQkvjI%2Fl8OaCoESRN1gPTqB2mYmBfkgqnF1AJVNcR8nHQDle8Znsl4A72NN633Cw68aAKUJpLxjXQs4IuRIpPi0vYaclcEB8vwbaf8l7eYuSSx664XpgaqiC4GnB3YDvmmQku9l4K2xVrHiAIbW5tz9uwkPSIEjPwE5nQF3hXwYh1cCuWf2%2BeAqz0iq5YbLL85ThteIds0QOunvI8YMWAXNCqsm%2BPvSdhZRza1fQNsnHPeemi%2BE%2FmKz6mRsS0r%2FEmA7O0gYTloYfDs%2FMDCbodPOBjqkAXhdqKmJl0uDEQ6JxEcKsU24dY0IZ8rAyMfOCkMGLB3wBEX13HB9K2pQEYBdJNhF%2F878rX6GCXVsTgxc8f0%2BvWz9NkIweuC4iCts6S24dKiISZBPDHLTRv1k3ne0%2FWhzPWZlKjvlIvPxkGZIkjgqbQ3JbT02wNFCM7nNonC6TeGS9gbb2pk75V3oIi7PqLLvo10LU2Kc0JssYbZyVlbzFByWOsnM&X-Amz-Signature=11ef61cad9dfe3c344a34917fdee84ee20d6834ad8c3f75bb0a0ecd42e33d7ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NFKROGK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQC0WGxAD0jevV60BMGAEJsyoNPidzTzgobUbqXwoZye3QIhALe9r1lxdjpy446uEDuniWyrhcjD8VJCTLW4Fb27QWIMKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz0VJ25QSjVoGcfqfkq3APWBSJn1C%2B9x%2BbKS%2BGHvT2JYEvhmV1YGxKjWRyXHiDG186%2FatcpIPxVjuldOYQvNOxV8NjYV3be5xDBvqpNGXUMhvBXgCESqGSpfzsGpR%2FYfIIUnRo3E2E%2B1MzsdEb0IIhZK7OxYTn%2Fx%2BratngivmLq1h8x%2BI5A7kIye%2F9NNKqmUAS0Yleq9KrowiJfqIRrOjKCb7Cm1BhLSwZhtNonntEXWp1CKCUnAd9h9zcCtVLoMNRiZlGiaKdiREjSmpy6r9TTIVJ8EWSRAIZbI%2BSYO1yW86lz3clAbvsIkyMtb49j%2FF5vPVqtebMtkgAnr9sj6YSaXr4WabEMlAML9WF1igaUKdJHcGlmS5n9tkKFd3D7H%2BkGwuzGBPEoIVIvMCGHs27Kd%2BB%2FZCSSyyCpK4ZdPiAIAA4dTBsKzAY57gyGoThB72Dv%2Brt9lpw8gtvrC1lpbhRnNAnrFuffTfGxAhI0iDe%2Bex6D0ZoRCqupt028wGZCopFg5MLkV6njXcygWgpSKD1VLSst3BkYt%2BPPFS67oOjGHeZhrI31R4zHebhyzt%2BFyR0vbDaQGU1XEgMNbGZvLNjEgVZNsE8n74Dvmw%2Bk0BiZuoI%2BUxY5pTYP6Zn0%2F8qUqKqQz4X0iIKDhSPoLTDdoNPOBjqkATNTvHZK1qWPP83JCHnyaj3hgwLV6sHE3ItBIJhIQ6ZoEE9AxLi8DBOpisAMRamdUgswPHFS9oPCS7%2BdfCiRsZqfxlIV5WqUjFEhkNhCx4dYXxfBt1MJAgFDvKabz7EySmpC3fN%2B59KHc%2BWKaFOaQMI8%2F8RY05A7uOsxqW6hIWvcWVzzDmx63%2BJLW4qJzj709HNKKW%2BR7DCB6zvQs2g4sNytaLle&X-Amz-Signature=f2323aa98423ed87a5876d5ac333c3ebfeb78b5dcc5cb6ccabb08c3c98ff03f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMHIVGU3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIAiELZex7XhthLzQ5r%2B4x%2FBJLDjFm0SwqjjB4onaLclEAiEA6rlrn4m1muJ7adXbpsL4h%2Ff6eGTGopkfm3slnaPf5AIqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEpy9hRXYWL%2F9238jCrcAwqcpoyX1ftdNWXySbk64fz9Jf8ZztGk5e9GMkaXO1j9QiX6wPRA4NuUhjOOavampMJQj4sx1KbXs4MtU5Fa64z6TQsnabquv%2BPBbeVythEzaFPwaYUOORheVti6uLJykY5xhus1Z9cIotcoJuuoGGrf5lNGkGnGblKohEmCmLAWQ96jfOwbBCwrAZ6qxcCpMmAvvAaP3aIHjgoYxAlPZo9Q0vyllSsvtsvS4AnGnL%2FjiNvJWQSLwcuP5EnlX2C97%2FH4oTwT9vTI9o2xsQKUt9zhzzSWT27pTe6%2BQ8ZJZ%2FZswmkElxPEAC7akTwDv1a5pGKfBd%2F92kPrqklqFjdYfyn3t5bhNILKNIZEWp%2F32YNBIKjB4N0oLtwPaur1wu%2F5S8c2hDRQ%2FHEIFHU5ZA6y%2Fp5DSyHu%2B1ZPc9rPtgLDMCBBrW0VrTG%2FJKpMZoZbiBHrYa9LVXwuoAL23kMp1y68cs%2BsfweyUWQ7doIOQBVhpAtma%2Fj7EkPsq7Hq841QLq%2FsFWK6htk0l%2BU7c8F7hiOXyXXHsWgoewY3qvywORaqn%2BDERSxBgwTFhRQEyvOZzKDldvpIKG7Dp3dg%2B7Lo5Kw3KmWEz2kzDIf6KbgDvVRPOY6akoC4%2BmprPn%2FkWwJCMLGi084GOqUBB%2B%2F3F9i1%2B7J0x3Out2s3pVBWi8QQWUDJwJdAC2PitjAC2gVU98K8VRNzvuvEDaGsyvSkuzDRxPuBUVjfXeiujlV5yfDyeKYXwlbz4mO01tYsfLAEfOnmNVYz%2Bo9MLLJFDu5r%2FkUhbfS5xZwbBj3b8rcMyEMSLJnCiTmEZqCk3G8WCP%2BL29yoceCM938NrW0jbKGSSJIE3cfYp0lq3xVMPmewIi1G&X-Amz-Signature=384d3a7fdf96d1e12538001d9c7836641fa7a85fa0ec96a1d48e8ed787a16258&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMHIVGU3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIAiELZex7XhthLzQ5r%2B4x%2FBJLDjFm0SwqjjB4onaLclEAiEA6rlrn4m1muJ7adXbpsL4h%2Ff6eGTGopkfm3slnaPf5AIqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEpy9hRXYWL%2F9238jCrcAwqcpoyX1ftdNWXySbk64fz9Jf8ZztGk5e9GMkaXO1j9QiX6wPRA4NuUhjOOavampMJQj4sx1KbXs4MtU5Fa64z6TQsnabquv%2BPBbeVythEzaFPwaYUOORheVti6uLJykY5xhus1Z9cIotcoJuuoGGrf5lNGkGnGblKohEmCmLAWQ96jfOwbBCwrAZ6qxcCpMmAvvAaP3aIHjgoYxAlPZo9Q0vyllSsvtsvS4AnGnL%2FjiNvJWQSLwcuP5EnlX2C97%2FH4oTwT9vTI9o2xsQKUt9zhzzSWT27pTe6%2BQ8ZJZ%2FZswmkElxPEAC7akTwDv1a5pGKfBd%2F92kPrqklqFjdYfyn3t5bhNILKNIZEWp%2F32YNBIKjB4N0oLtwPaur1wu%2F5S8c2hDRQ%2FHEIFHU5ZA6y%2Fp5DSyHu%2B1ZPc9rPtgLDMCBBrW0VrTG%2FJKpMZoZbiBHrYa9LVXwuoAL23kMp1y68cs%2BsfweyUWQ7doIOQBVhpAtma%2Fj7EkPsq7Hq841QLq%2FsFWK6htk0l%2BU7c8F7hiOXyXXHsWgoewY3qvywORaqn%2BDERSxBgwTFhRQEyvOZzKDldvpIKG7Dp3dg%2B7Lo5Kw3KmWEz2kzDIf6KbgDvVRPOY6akoC4%2BmprPn%2FkWwJCMLGi084GOqUBB%2B%2F3F9i1%2B7J0x3Out2s3pVBWi8QQWUDJwJdAC2PitjAC2gVU98K8VRNzvuvEDaGsyvSkuzDRxPuBUVjfXeiujlV5yfDyeKYXwlbz4mO01tYsfLAEfOnmNVYz%2Bo9MLLJFDu5r%2FkUhbfS5xZwbBj3b8rcMyEMSLJnCiTmEZqCk3G8WCP%2BL29yoceCM938NrW0jbKGSSJIE3cfYp0lq3xVMPmewIi1G&X-Amz-Signature=36a81becc558a0a8a28bdfe68769dd33ab7632126a2fc6b95c2d06adda87a42f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4VE46FZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIHnZ%2BoaZ3%2B6ade5Tv8V9H7%2F8qzo8emZOW%2F9ZCq%2BkyUePAiBzAvhVXreIb0%2F0j%2Fkm%2FhkeLUicUGgGcrfl9GDSwj1IOiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0SqqhZM2fqzpVC7KKtwDawSmsCgrJ3Z1FBojTKzzxqonupYXqRPe%2BH02qJIXSM7EvPOR7j3o4DRn8QPcuaLZmhPnqNVTa4xovG8pMwCd0JJPUdHrWmqKd3Rr3OTSluAYzl8e%2BcrGHAjihSOlwWJxJCBFH2uuKhg6iJ%2Fqzr9%2FLM4cBg4IPJuM99P8ZJ8lu2EVpI7swpj0GTxfh7NL1%2F4V4ZlektnymbSN9Lj4MYBQjdPxPsw9cuW4l4Rp8JPg3S%2BH4MwT4J8HXWnfCylumr94pBdae4DzPKtpC7arQipjJNJ5saEEoAv3Q8pIVsppavvCBje290F241wM3mMKpaGGUwdqcOXzs0AGxGK9Psxa63j0ZnoQF5JuiYbrPyiSl4JjEtx2aYDnGhxz%2BAlMreBGKPBqf0c2dkZRW64rxU6uL79FQrB4UwT6%2B34ORGkUhlbxK5P4wgOJdwoOZsa8rI0cp1SGGkms4QNaMlKn9366%2B61nvzXo7NyfE5W0BSIS6nvRF9cc9g3aFyLYZiKav86lsFoS8lAICYWzxngrSZsDq%2FHAjpE1b4l8nKWA0XzwmPSpJPDjdwBRBgdz%2FbY79g9KY8Tmv2W7egSV6nYu%2BWmZjquqIa8g5kRsdwKtX3pBkZMRi%2FjeeHhpA1VXV7Ywn6HTzgY6pgHJuoXOoyryQhHalVLsTFBcr2YazB9KqRBBVyWIDF%2FSXaro72s%2BW2wEnKZn463qrNsiWFRHaf2dWUEpBkLY6Hjk5f3vK5PNGc%2FQzfzH5Cyh72eH1UNBwknoBlTp6ZoCYqLOV8ncCCHgvUjSHvK3pNV72Ld0ZkGkQgem%2FqrJyYViNx8pOg9BVjdNxiPt%2FjutJwO%2BR4ySEPCtdLi9Oj5czt0Md8%2FF4Mfh&X-Amz-Signature=34b58a4abde754af504a96f6139aee518426f715c3dd4199ec002e4fd5420636&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662M32I5E7%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCz%2FDkkwuZ9JHM4DU15nwxUjy5Xbb5FS2vTEcZNTro94QIhALnK0vBGfEuVvIurGLlNmIP7glHiR77lpklQjR0yJ%2F2eKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwRtFYbRvpXxKoazuMq3ANxk1O8ZF0jftW%2Ba1ErN2ftMM88jztyyscyp%2Fo%2BmTP81bGvvPMbldluHkz90gob9VfPpsFY%2FsmtDFQ%2FjYPmpgD2ZnfvOQ6wOZ0dr%2F1HiPcr33Wk58irAgbEZHrRpDn3UCWvBPgMMjAK6bzFLfB9K6inFVWp7l8bf8PMd57e%2Fgi%2BUv9fYm5qzF0qsDHezUh9iIdTtH%2FtzjZk3m3WLBTsOxi%2BDYIpEnaL6TycIhYZxfUjzdZyBwrcJ0kEqaZOVWvSwXvccML9%2BbeGHcg82KrHjFbsWx61JzO7449kkilzoaWvQpZxPfqRKUGDeQFf2kH4znVP1g36amIMYtR%2FzXcxL6iws0OixJf0Qy4FCvzabT5iNPfMpDlraVsRgAMgocizTwkDXcZDpJDGRmWccuE81GUj7xGspxoasp3RhZ7UoXh73x6WW7USh0OXc0ytMi8ucCulNI%2BJQmlMrnDljWdukj1zsofXxWweEQ5rnaInqaVY%2FPavfO2ccNzyVRizVCyfZMTlnzyYeot9um3uZR0EkIYo%2FTG%2BsYoucIUKjYv1XxPYU0lfHnK1pdaHKehn11REL%2FCgZSVIslGr%2FPaMO%2FhjMIdgxKfeB5yew5DZk6DaPvClKt1CeOupOk5bfhs5zDDTodPOBjqkAS8n836shk%2B6tkuONQlla%2FHY8EpNi0qEIdUDks2Ov5K1B6CaaalNktCoAStScIOAT3XcKJuAbvS3Jmh6I5r%2BKdz%2FhUYYPrEz5nFdDU%2Bgh3TwG1jlzRllKQN3tNWP7JSkLcUZ2BQc%2B2OWLw58v1XTfMFB6a0qSDDeHrmwuj249oWs4o7xJCnJ8htXVa%2Fzfcaa%2F3m4%2FBY5Y8qIIIwqNXB%2B9%2FCnoMPl&X-Amz-Signature=30708053f318bc02f36b961d9961f5788067e533d7c2da513ba5450dfaf34b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662M32I5E7%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQCz%2FDkkwuZ9JHM4DU15nwxUjy5Xbb5FS2vTEcZNTro94QIhALnK0vBGfEuVvIurGLlNmIP7glHiR77lpklQjR0yJ%2F2eKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwRtFYbRvpXxKoazuMq3ANxk1O8ZF0jftW%2Ba1ErN2ftMM88jztyyscyp%2Fo%2BmTP81bGvvPMbldluHkz90gob9VfPpsFY%2FsmtDFQ%2FjYPmpgD2ZnfvOQ6wOZ0dr%2F1HiPcr33Wk58irAgbEZHrRpDn3UCWvBPgMMjAK6bzFLfB9K6inFVWp7l8bf8PMd57e%2Fgi%2BUv9fYm5qzF0qsDHezUh9iIdTtH%2FtzjZk3m3WLBTsOxi%2BDYIpEnaL6TycIhYZxfUjzdZyBwrcJ0kEqaZOVWvSwXvccML9%2BbeGHcg82KrHjFbsWx61JzO7449kkilzoaWvQpZxPfqRKUGDeQFf2kH4znVP1g36amIMYtR%2FzXcxL6iws0OixJf0Qy4FCvzabT5iNPfMpDlraVsRgAMgocizTwkDXcZDpJDGRmWccuE81GUj7xGspxoasp3RhZ7UoXh73x6WW7USh0OXc0ytMi8ucCulNI%2BJQmlMrnDljWdukj1zsofXxWweEQ5rnaInqaVY%2FPavfO2ccNzyVRizVCyfZMTlnzyYeot9um3uZR0EkIYo%2FTG%2BsYoucIUKjYv1XxPYU0lfHnK1pdaHKehn11REL%2FCgZSVIslGr%2FPaMO%2FhjMIdgxKfeB5yew5DZk6DaPvClKt1CeOupOk5bfhs5zDDTodPOBjqkAS8n836shk%2B6tkuONQlla%2FHY8EpNi0qEIdUDks2Ov5K1B6CaaalNktCoAStScIOAT3XcKJuAbvS3Jmh6I5r%2BKdz%2FhUYYPrEz5nFdDU%2Bgh3TwG1jlzRllKQN3tNWP7JSkLcUZ2BQc%2B2OWLw58v1XTfMFB6a0qSDDeHrmwuj249oWs4o7xJCnJ8htXVa%2Fzfcaa%2F3m4%2FBY5Y8qIIIwqNXB%2B9%2FCnoMPl&X-Amz-Signature=30708053f318bc02f36b961d9961f5788067e533d7c2da513ba5450dfaf34b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q727NBYZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T104346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIFP%2FAO9YgM4IV3x0p90Oo4k47RGhRFTGF6D6aGRqd%2B2HAiBGTlYkowvKBypFvIETrH%2BNlQN8fBxXpCV5QkFNsGl9liqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmxj7UUDJZpv6EJL3KtwDHEJ4mioQxiCAGTuQJ1si34z3GycBeUT4KZB6dpBzFQUZFBqXTL3LUUP8Rd5oo21hpIVwYbT63946412Zch4HrttECHanxNB5MLLJbXCvGReZlfN2zZGaY38PT36AaZa6AlZgqc%2FxeRrHQlJKhaHeJlSAJmXLySEJ86MyFmTH5uATqiyRIoiUGEycw1tchGbjphP8X9hrLjNj1YdEI2YFahNosyeClO9kzoT02sQHRn6MRyEUOtIRS1auUriVbVMWZwW13QFyMX7gU0TLKPq5xR%2B%2BHABvValcD%2FkmZidQtEzVAl7MVI6foqW2egeKpLDyPBkB%2BXX3fwfUtPADyiw6Orn5R5zBzTZ6eJnF8cvoB%2Fhl751acbfXkT3kUssNMP78ESq2F5T5XLwx2buk6dvQRau5s6aCxzhYp2tJ%2F7YhJsHMuzRQ0L2LiD9XP3mkl9X%2FmKQlRTKJY3wgVeTjMA0dS4ZQZ3W8%2FJ%2B751QVJib8w4qJuKQ7klJcSIidyrDbbgfGrl1%2FHucc2OQ96GcbL20ovqYxO9TJ5%2B1xZuPsLh4wBpam8SlEb2F7tVOr7dUfTQGdfCl8eXQLVRGUsBvBsCsrLg5KoS0%2FsSg63%2FIA5oZLdxBRmvHbgN0s8XcULtQwsKHTzgY6pgHVfyJPXAEpHRPn2Mts%2BNELMrmiecuGzcLv33KkSW8sE1qpJHYoZTEueksl6Swg7Br%2BLC0J%2Fl9M4JkjPPo3Y8VoZ52EyaFGgfbh148DKShul80kHq0L2qFjjYm4%2BNt5VWjltfloZ4tO45ERmrAaEO85vLwSWn05mYTPKtT730Q5jU4ErUwMJs4%2B%2B%2Fp81rS0lkeKYBwA3rZp4sFdY0xG%2BCEeYtx%2FU17O&X-Amz-Signature=9fae70c059fbbdccb85d0261a251e23c7439dd06188e1928448a7e9fa03787df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

