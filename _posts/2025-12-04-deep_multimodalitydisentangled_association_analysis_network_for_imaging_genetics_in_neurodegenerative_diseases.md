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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I3ZUGHX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3MRbRtoQ1ZumqAwnZWzD2ZYvXi5hEDh%2FLG1dNVGXLbAIhAM8nVzE88StU8F3jqrHDeps4Di9C45rbGiNQp5DI3t92Kv8DCFEQABoMNjM3NDIzMTgzODA1IgxcEzdsqFe8dU2Emt8q3ANbmwIjEfP3FE6PylCgggE9FTLF9p95LyiRqxsftd%2BavxlEcRNi3O8km9rd0MEIvooy7UnOo%2FV4T2TbYiZiRzrtr2B3HUOXNzNj1RIW%2FZMMwNDXqei5KS1x5UV7R31yaN3QnfmbNpLCS%2F9G%2FFoHntW%2BvSj9FWBdhd09I1EQep8%2BpDomZtK%2B%2Bk3koPVR3Fiy%2FBXvFK4CUg29bDyv%2F8n%2BnrcJgJoRwCBKhBGoCEsSzYMdyHZMlSN8QrYWs4SsFKg63BO8Dm7QHYlrldkySbonV346ddrkbDA9QK1V2vkfs9t5zXXD9BURzs%2BiTw1Qr2GFP8uQC1P8keulDizJuwix1TrTAC%2BQhOsmW%2Fe%2B0lp8aoc76pJi718J7qLSGu6JHZ7TUkDOvhNQLJBhOlj%2BkVqeAjd34Yn06qp%2F%2B3C5lSxZ1N%2FSdvjMA3tGRWQeS7vOyy4Xj87feXM2HEcnWqWRknAxzfm82nmyTWjEKzEAi4w4uQ%2Fzu3%2FWq%2FoPggCpyuiN0sNIeWRxiV%2F8Pj4fEBdwRDCEr2KhY7qYQsUo9Ze4c4IuCQWA2Ub1GKSKBT0UGhxS%2Fo53ygND6TFTLL%2BdO6DJTnolY5npntijDub0Tl8sPtDDARFuAyENMLCmhKAndAxw2jCE1sLNBjqkAdRmgdbsJBTOqUagKByOcTTo6XEunoGaeQM1NnYzOGrbKZQMrl3H5uE5UnzLqGRvl9c35%2Boqd3bKRLK%2Fz2Ex6J9MFsBO4PgWG%2FP02yXHnA22SlTMs%2BQX8Cp715F2fl%2FNUqKOsHHGnWhjNzvjz%2BEN03xrbvqdB%2BOAIJQS%2B034boo7FFLqsEiUOMiUek%2BKIKjBvsyWBJNsdIsQuISSo19npVdMymO%2F&X-Amz-Signature=423b1c225b93fa1b02b33eb2c975beda1a4a514324b48cb756f83b0539f2e4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I3ZUGHX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3MRbRtoQ1ZumqAwnZWzD2ZYvXi5hEDh%2FLG1dNVGXLbAIhAM8nVzE88StU8F3jqrHDeps4Di9C45rbGiNQp5DI3t92Kv8DCFEQABoMNjM3NDIzMTgzODA1IgxcEzdsqFe8dU2Emt8q3ANbmwIjEfP3FE6PylCgggE9FTLF9p95LyiRqxsftd%2BavxlEcRNi3O8km9rd0MEIvooy7UnOo%2FV4T2TbYiZiRzrtr2B3HUOXNzNj1RIW%2FZMMwNDXqei5KS1x5UV7R31yaN3QnfmbNpLCS%2F9G%2FFoHntW%2BvSj9FWBdhd09I1EQep8%2BpDomZtK%2B%2Bk3koPVR3Fiy%2FBXvFK4CUg29bDyv%2F8n%2BnrcJgJoRwCBKhBGoCEsSzYMdyHZMlSN8QrYWs4SsFKg63BO8Dm7QHYlrldkySbonV346ddrkbDA9QK1V2vkfs9t5zXXD9BURzs%2BiTw1Qr2GFP8uQC1P8keulDizJuwix1TrTAC%2BQhOsmW%2Fe%2B0lp8aoc76pJi718J7qLSGu6JHZ7TUkDOvhNQLJBhOlj%2BkVqeAjd34Yn06qp%2F%2B3C5lSxZ1N%2FSdvjMA3tGRWQeS7vOyy4Xj87feXM2HEcnWqWRknAxzfm82nmyTWjEKzEAi4w4uQ%2Fzu3%2FWq%2FoPggCpyuiN0sNIeWRxiV%2F8Pj4fEBdwRDCEr2KhY7qYQsUo9Ze4c4IuCQWA2Ub1GKSKBT0UGhxS%2Fo53ygND6TFTLL%2BdO6DJTnolY5npntijDub0Tl8sPtDDARFuAyENMLCmhKAndAxw2jCE1sLNBjqkAdRmgdbsJBTOqUagKByOcTTo6XEunoGaeQM1NnYzOGrbKZQMrl3H5uE5UnzLqGRvl9c35%2Boqd3bKRLK%2Fz2Ex6J9MFsBO4PgWG%2FP02yXHnA22SlTMs%2BQX8Cp715F2fl%2FNUqKOsHHGnWhjNzvjz%2BEN03xrbvqdB%2BOAIJQS%2B034boo7FFLqsEiUOMiUek%2BKIKjBvsyWBJNsdIsQuISSo19npVdMymO%2F&X-Amz-Signature=423b1c225b93fa1b02b33eb2c975beda1a4a514324b48cb756f83b0539f2e4cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S632R2JB%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZpGWKzzYe4ZK4HQktWTS3QIWb8Oy6vZ58V0x4j0ld3QIgYbi8lL7OC%2FxBAjxKplB0fEx6zx5GbKQnftoZIEqybJkq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDCsHAZtRVtLzBe70HyrcA7l39zOuOxX00a0TWx%2FWn3TxLF4yQEUhsWZPuxqlo8uMKv%2BqtriBtDacCB4mwXhypdPt5RNMKR%2BCg1nmDhCD6HEPb3XzshOBCyZW5J0BUsoJb6ILRARXe%2FXMb33zxtCL%2Bb9FEwn30h%2B2lB%2Fh7%2BtpUNAM0tHc3R4c78mmOI%2BrvzqVm9oY%2BhNJ8q1HZ12s9sHRrlPOlo4EMsSKf%2Fj7c%2F%2FzhycIGNHXoe5uohhP5He5QSA89%2B7uHRt8Y06J2D4nEpagWpdBwCsyoz3Fr9vZ23S9L2s7ZBhzjU8T9hpD8sxczB5o6YRQjVlAu8heHJvglB%2FBx%2FvumVQlXse245ZfDMaKwVk%2BaLqj2ZmdDetRa4laVY44wJCLPUok0hUMbZS%2FSaQv7%2FJ1SB4AjoMgnzkhS5%2F2KC%2FfyOr%2BYfnhS0eNWpWw95JpyjFP4tQaVHPZoQXJ3l%2FshrbMBK2ZWVfqZLRIH%2FA7zDUJhmWumCAjjD6aPrOnrALp%2FhkI6Xeyc5BE6T5mHUdZNVCzrc9kPvAtO4KyPeaRdEQWArXZohsYyydcocJOWRtK7ski%2FuKQ0OmcU3JSRNkDtdQ1J24ES3ZtilbxWK6%2F1qYs5dftvnQ2UErvGNF42Szx4JqhfFC0JShmPQXjMOHUws0GOqUBsAk%2BysocFN7Go99WVeKvW7tYXN1lOPL141oeaiW%2FGhtjLb9g0T%2FkNE2jTOqwkI8QxJfyRTMzA2bev3lNfVUU83zs40D5%2F%2B4z8KuQoW5%2BOFycu8rqJP%2BKSEO%2BBCFtnqDitBYc9Pux9HFgVyTnlgjp4gLUf1ChGiaBDb4ZCBNTR1J6r881ViAmhHp%2Fz7TLZOLc8xos7tMscoA%2BrqbCa0OFBD3b4n5T&X-Amz-Signature=800bb89299b22000f53ac0b1f98573c7e238b2f4ce2830dece305a681826b8f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UV6GCWA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEct1WJ8oc1%2BKfHieRYfln%2Fehnhwem%2F10XNaxTvVBxXwAiA3ttRVAiS9R7PqgrelM7KKVHUy%2FHhSDb0U5QfBL38pOSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMYUoH2D4LudAFHp8PKtwDsSrcM6VQL6hvFaoDWnVTjKCpAJI3dWvVcG1%2BMuKiHD7Fp3k8LAqoXw8cCgozkXmQaml7DGMuQui8d0qNHfPXGD6Eu9SFr1FSECe%2Bp71SxctEK0OwzdxD%2FuGvQ0tWqy0IwiUczDyO%2BnDavCQqM9r4SDmzzngzwGjizY7djg3P7ZDc7FIonaT1BOnFhrCtNETLjQc%2FsAAESHVeHdgOLTdrn%2F4AUVrZYLBGDMkfPZZqeYwTKCkhWzm7qqK%2BkdXnQ7MGNy2nT25DbNcaUPjlflZCIIHE4wQfxxXtepYx4N%2FsVNgV8yum1ekzmJ%2Bfqxu3a5cZWojMZt7awApvQVxIRA9tbMh0tv%2Bfma1%2F41F9j7j04BNNPlbAOxj8pbqrNbjvz882yHZ7WIsS9gUyGwKE7ZasJoZtmu24H%2BkNhJ6f76H1spnr9HkD5VvRswLb0tKRWkd%2F3Cr8vrZACQ1PLrLYdFG4BcHFMF3s9o28P8vtzFpyNUEYAbhBsWJz686QQn46c%2F6g%2FQCTf5NGqREC6D9yK7Kzw7%2BbW42PrAb7wepI%2Fc6BO6rNisbHWN7CRO%2BdnvoI7oKGcWHcDYKydI2aJFbe8BQ5k8bke4t1jVwQCgMDyX%2FNQhDV4oz9HC5r0%2Fl24Kkw6%2FPCzQY6pgGUhqIlj45x4CMdIJSSFpbACnjm6F17MKs%2BpwfFkbSx4B4AQC559WWBTFGxhL5rsftWIzHN3qPUsAm0MLSSxSpcERm9bFFjb0TmN9uUWhyRm2eK9I7QUxet9ipTKKKVYPXZ2QAufMKMnSHYxBGbW%2FCnfIUsx%2FP3mGOpgkEaPvoCB9JRRU8IqXpaPItXSzwLkc508bbP%2BCJ5jjGS2F5Ryh2z0pFukIpV&X-Amz-Signature=cb96062587552914312a8f79615c11ee2f99421dc079130ab1b0940e453f4726&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UV6GCWA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEct1WJ8oc1%2BKfHieRYfln%2Fehnhwem%2F10XNaxTvVBxXwAiA3ttRVAiS9R7PqgrelM7KKVHUy%2FHhSDb0U5QfBL38pOSr%2FAwhSEAAaDDYzNzQyMzE4MzgwNSIMYUoH2D4LudAFHp8PKtwDsSrcM6VQL6hvFaoDWnVTjKCpAJI3dWvVcG1%2BMuKiHD7Fp3k8LAqoXw8cCgozkXmQaml7DGMuQui8d0qNHfPXGD6Eu9SFr1FSECe%2Bp71SxctEK0OwzdxD%2FuGvQ0tWqy0IwiUczDyO%2BnDavCQqM9r4SDmzzngzwGjizY7djg3P7ZDc7FIonaT1BOnFhrCtNETLjQc%2FsAAESHVeHdgOLTdrn%2F4AUVrZYLBGDMkfPZZqeYwTKCkhWzm7qqK%2BkdXnQ7MGNy2nT25DbNcaUPjlflZCIIHE4wQfxxXtepYx4N%2FsVNgV8yum1ekzmJ%2Bfqxu3a5cZWojMZt7awApvQVxIRA9tbMh0tv%2Bfma1%2F41F9j7j04BNNPlbAOxj8pbqrNbjvz882yHZ7WIsS9gUyGwKE7ZasJoZtmu24H%2BkNhJ6f76H1spnr9HkD5VvRswLb0tKRWkd%2F3Cr8vrZACQ1PLrLYdFG4BcHFMF3s9o28P8vtzFpyNUEYAbhBsWJz686QQn46c%2F6g%2FQCTf5NGqREC6D9yK7Kzw7%2BbW42PrAb7wepI%2Fc6BO6rNisbHWN7CRO%2BdnvoI7oKGcWHcDYKydI2aJFbe8BQ5k8bke4t1jVwQCgMDyX%2FNQhDV4oz9HC5r0%2Fl24Kkw6%2FPCzQY6pgGUhqIlj45x4CMdIJSSFpbACnjm6F17MKs%2BpwfFkbSx4B4AQC559WWBTFGxhL5rsftWIzHN3qPUsAm0MLSSxSpcERm9bFFjb0TmN9uUWhyRm2eK9I7QUxet9ipTKKKVYPXZ2QAufMKMnSHYxBGbW%2FCnfIUsx%2FP3mGOpgkEaPvoCB9JRRU8IqXpaPItXSzwLkc508bbP%2BCJ5jjGS2F5Ryh2z0pFukIpV&X-Amz-Signature=aeca006b7e322b0726b50cff13af2d38c53e49bce7ad263e35b98f0c3f3a2247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC2D37IE%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLWSXq8JWDI8fbCmeT7XQcwbW1pP74fkzhJa6tcBYkFgIhANwXQGyOB1Z3ID93Pj13a8DoVyUzVIX2DUcl4BwBlMQ0Kv8DCFEQABoMNjM3NDIzMTgzODA1IgzRkPwpt03PyRWf2%2B4q3AM7qe6LaVzUzdyamA8k2vAglyLd7Mw%2BFzZIso7bj2mWnlh9gtSaTHgRAv%2FTqF9vEk8ni5tRGhZV7NLFwaXMVfAubO5G3xjYBCHD%2FyJ8z1h9Y3mh376zhdQfbSwH9h%2B%2FAaf8MU4Tqc2Xbhe5O4ZlAfDp4EcvSYtPxEe2xrnDQYMQfILmnL5PNXTCI%2FycHQ3IQMQ6x19rIvhRqo2n%2BexRC%2FiLe22ruyhTkBohp2RXehCWwbF9jWh%2BqK8mkrrvktSaEipvvHmKsIvxEadOsoCCH1qWqnZgY9A%2FccmUiMM832UnBx4bxSDimUUUVrurDNA%2B1GHXkZIsXo8QKDTG2PH626nTK08zLeKpXltbie%2FRLtLTVjII0f7szg2LWyZ%2BzYJe5qpSbW2%2FKWTX35zd2hkdV5FLI%2BySAeaxxwDBhp%2B8dX0XotBtnARlObleqTopDW5Z8deW9oAEsP0o1rDyD2%2BWVwYAw%2FY38PvUv2Ap1EdHTiuG%2FfkrrYmjafuNQya32JnLhjr6k62k9ckSlzPBdfcNT0uA9zCU6ATFS4D0V9UDwi1eMek0ZNKWLvJ3C%2B4hBSjpVpr7kP8FM4o3GaLKHj4a%2BIv93vvQ33xq97sgjmnzYmYx0koEFJ4Em1jm3VwbJjCp1MLNBjqkAdHM%2Fkz3j4Sylknt7pXU4%2BFQ5A7OSNGV5L8R9RCB8j8STbOjhZTEA%2BCJHVDNhq4DGqV0ObuvJZ3bK9xlY%2F0lxkQCP80IugFCESdMWrrCuwzfxNtPXy%2BApAsmo2hZcrSiRa2G%2BihI%2BCRiPCrTAtUvh9%2FUVx0nftCtGFAsvHPhUjRnQyB4pi8B%2FVVXnilEV9Mw56pn0L9UfC46BJkh17BCNM%2FcJzRV&X-Amz-Signature=66498cee3b8e7f35798d92f6e6831feaa60d96608c2ac1e35c7e584a0b8d85c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN2P3M5F%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDENQdADq%2FVbvrq8yBdj2QJapntStJuGflK5Z%2FL8tKIEgIgWvaXQdJHuiLDtYvbU%2FZmwEdiip%2BmjqKMD7pkRYqkT9oq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDKMQWtj9bk0pvHeJgSrcA73himF84yDW6ChkrDmCClzIc%2BeRVu3upLm6%2BIhE6RH9qJXSnWtLEX9hPZKgYVfBq6i%2B1v5fU3Q4OeGBeUzDy5delq6grt7AqOYZ36%2FrIPBoz23bmb%2B%2BBQ8LeYeWBvL10Son2QtmPidO8DFtop9Z5SpXtSxftWaGjLyu4Zutxz9yR8t75uuYlZ4VzXRK6dPvUqot8MRqHnmlrIY0km2ddfcWIKUsyUxlxSvVXPg%2FPpaSI%2BtCIgUo%2FT%2F9%2FhJbkvDzobDUTylKGV%2BYYwgd85owy2e5PCih3anH5xSSNPRw6gcHR98ER0blIlXW%2BoJd8T0ABp%2BNisr%2F2vqSPi11%2Fx0eLpugnG74pY3QyvfTfM%2FaWgxRozaJAzXYFx0lYcFk7CdhNDRDFZ4%2BO8A0HzMeW3yyQq%2FmelLiJrGMF6n7fM5W6obRZoEcnUv0tx62w45lQkWYigoC1S%2F6GpXXGpEW414aMjXGEf7QL2NbaS1oj85JcjiofSocGDVE2Asvm%2B%2BXfgrHCkQNwZmshbhAeINcvO8lilHmYwicqw96XlJ8vSi5OCWpe%2F%2FYgGwudCKnouaaLljV4PrGWan1qFNZb71uxWezGj3GPJoPCvxHp27UDESzK0pU%2BmtX4%2BE6gzocEW%2BDMO3Uws0GOqUB1CBwnNNibxaszUVSkIA%2BzFof00LCTR42tVn88vX%2BT4Yg%2BQOjJ%2FJSXcnQBTo2lj0stx9fTUjLGr1z80FHEQoM0KDlmkU9dPRGu29d4jChDCwtGA%2FozdtcWPPXXQ22tbKndW5Xc2gEuAVvRmhvJhX%2BZdI6ZoZFO0dsLnmnMQCZYS%2FWAwv%2FK4n5OUVkFeO%2FTh93kI8okCMo43jauhooO8G4y%2FHfO8ov&X-Amz-Signature=28d9d04878d9151b1df8b6a10b8af7425770ed4a3f9ccf2d79c8b97c7714c537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VRJQZLA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDTQNMwenGLMuaCNPoIdU0h14BcU4L0M2wfIyk6y2QDOAiEAzpijdUBjWIyAjNukod4LmdaUzHWUWWYr5K9YqVfMhWcq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDHu6tuauJzxEmb0aHyrcA1VwOOqX1pcs4dTZSbv2Dqzan%2FNEqrnsyUzcY3BCapH2PXHEKdaLL7tOavrxmvrplURJL7bH%2B0JRKZOdl%2BRfuwA%2FcLmk3iFayjKiFaGdiH8DW%2FniZSHnfQET6PvcoQWyINlUfDJ9pOUaMFdlixSHqKIichrg6SMcqVqoyPsW0eA65dfCWaWnOtidCusFG1ebiNTgc1rn%2FNmOcz5rEa%2BJSAoGDH5fMGjljoweFWFMQ%2FK%2B52fmVwqMHmsrZ8qIfGqqLUydz3jNQCQ9yIlZVrtzFpPuiyLk3365BfyQzVPNe9XoqzKd4zIx4gRb0jzDu39yinZ7%2B1wqrxKltDr93l46R88e4gfbulGzeEeFKe1ZYwshk1QgyhfaD36SofuJwTBVwat4yfLkhGMOTr5y58F%2BjoZCGrij9BQtqMOGHaVZEXbQl0d8fkyD1N5QbWB2TLvS89LUS4NJbxM1yj7KmDLX5bO000kzGyKyT9Mr0x551uprvMDocqoOLeGc5qeik9uzQX5AEXdh1ukNRNwtewxZzHN0DeRcHxSFrrs6p9v3Yr1tlQY5fqb2Oh2XwA5O8VAimGEAEpz%2Flt%2BbDq2dzCFJxYO7sKows%2BK2QtmdD%2FnTTE6Aqmd6%2BqUyJ1%2B%2Fp0inMOXUws0GOqUBhguj7%2FJxEuenIK%2BoGuQ4VJKqTfFxg79PRL4lLiNgtVKlMoRw05JdWbZOjqNaIMYoMdn7dUzzPSn49rFx2rtx2dYDARWmrJdJ76wXwR3TgPbirDH4cb5WDvdrD9FlFxY1fT8Mh2QbvlED2jpNmwZYdfhIo1PueGMWyGut4EfWBFJ4s1G1N6dYDsMjuwW6ar132gVY6yrjtphcBnvZ1oW1NsHcjgrN&X-Amz-Signature=2b5db1f647f1e3564683cd5e61acc697c556a1ec855e96f70f2f3ff754f27c8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIOBUM5Y%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH248jHTsKXnZZvcPLd0GRx1%2FuxqxdLfhf3AlfyYCwcZAiBSbtOEjDvxg1yf07NpyoHsEMVtiAToYXOyuSWpxfPpyyr%2FAwhREAAaDDYzNzQyMzE4MzgwNSIMmR4uaVi4veyR%2BxY0KtwD0lGJcGk%2FS10sMok6jF4KabjnsiYpiFcBYFDl2%2BezX7e1aIfkaZ1zV2X4GCPM2NoafcrO8uNmdVBQriJCFk19VEjXmLuLpig25jhHLga67BWcbiuqublnco%2FXyMvZkZv7N03zqUInKEcaV89VeH6UedoQ9hlcroPAFxwX6pK4VNLJFfx3%2BhJXwh%2Bf8OUPUygADiGHUJFajo3z6gKQn6yIt8U%2BwtiF%2B4N3GNQgT273GJ4TYOyFn06XQlw8%2Bzq7ACgj0P%2BRmz%2BN%2Fadrw5oP1SbmSnkkNlGqsmSPt2AzCNHq60oesWwhQQYuDmt4iG%2FhF954TyIFdfO6QiabTB0Iaq9p8PS3WXT0YXSFvLqU0C4dfy0GvNtak7f3Zr7Nn9xEw%2BVHg106g1%2FaZ6wy5bgxW3Dv0rjD8kI2EiEh0Pp1tRaJyN5ybqDck7rpJBpR5IUhys7ASdKj8AgENFftGMpsMz3sfp7ruDpCF6djHO%2F%2BNFkg%2Bj5u1v8HqvfVHqZZnM5YbsoIWIvD57E2Da9jXxt6hyfVXq8mWDnp753ASzaM8JbEPOb43eV5NDQlFeKzXGchGrJS%2FIiML6e4meec9lFV0RPRqjGReQD5Aia%2FukUilSdtE19qBuCrXWbS0boRpGYwsdXCzQY6pgEgwcqnnjGzWmkB6laXVHs9SzaIkZQ33%2BoGdwRWaIIsN7key8qO4e1EEARzTvwdjIHUi2jN5KnQdY%2BBuAxWd7seiNnP1eGrDtO%2By%2BrsboRySLwBNhLK%2F9B2vjzBO%2FmEi5XSWjcxKd6%2B1%2Bc8I8%2Fn%2FP88wvwuu2oWGHyx1z3OoWjz6GP3l10gW8LkH3ZdOCs9YkT7CVl26CtPUFRV7V9FrAh5I0okvw7e&X-Amz-Signature=3ecd813d14cd6ea7588a68d173fbaff9a4e30dfe9d5886444c91d7f39c773552&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIOBUM5Y%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH248jHTsKXnZZvcPLd0GRx1%2FuxqxdLfhf3AlfyYCwcZAiBSbtOEjDvxg1yf07NpyoHsEMVtiAToYXOyuSWpxfPpyyr%2FAwhREAAaDDYzNzQyMzE4MzgwNSIMmR4uaVi4veyR%2BxY0KtwD0lGJcGk%2FS10sMok6jF4KabjnsiYpiFcBYFDl2%2BezX7e1aIfkaZ1zV2X4GCPM2NoafcrO8uNmdVBQriJCFk19VEjXmLuLpig25jhHLga67BWcbiuqublnco%2FXyMvZkZv7N03zqUInKEcaV89VeH6UedoQ9hlcroPAFxwX6pK4VNLJFfx3%2BhJXwh%2Bf8OUPUygADiGHUJFajo3z6gKQn6yIt8U%2BwtiF%2B4N3GNQgT273GJ4TYOyFn06XQlw8%2Bzq7ACgj0P%2BRmz%2BN%2Fadrw5oP1SbmSnkkNlGqsmSPt2AzCNHq60oesWwhQQYuDmt4iG%2FhF954TyIFdfO6QiabTB0Iaq9p8PS3WXT0YXSFvLqU0C4dfy0GvNtak7f3Zr7Nn9xEw%2BVHg106g1%2FaZ6wy5bgxW3Dv0rjD8kI2EiEh0Pp1tRaJyN5ybqDck7rpJBpR5IUhys7ASdKj8AgENFftGMpsMz3sfp7ruDpCF6djHO%2F%2BNFkg%2Bj5u1v8HqvfVHqZZnM5YbsoIWIvD57E2Da9jXxt6hyfVXq8mWDnp753ASzaM8JbEPOb43eV5NDQlFeKzXGchGrJS%2FIiML6e4meec9lFV0RPRqjGReQD5Aia%2FukUilSdtE19qBuCrXWbS0boRpGYwsdXCzQY6pgEgwcqnnjGzWmkB6laXVHs9SzaIkZQ33%2BoGdwRWaIIsN7key8qO4e1EEARzTvwdjIHUi2jN5KnQdY%2BBuAxWd7seiNnP1eGrDtO%2By%2BrsboRySLwBNhLK%2F9B2vjzBO%2FmEi5XSWjcxKd6%2B1%2Bc8I8%2Fn%2FP88wvwuu2oWGHyx1z3OoWjz6GP3l10gW8LkH3ZdOCs9YkT7CVl26CtPUFRV7V9FrAh5I0okvw7e&X-Amz-Signature=08d29cb1a0bcd651b6169e26cd5f30419619a36f03adca8b6645bf261e818fea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEGUD66C%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID35Yyqs7rYXqHPPFl%2FiczPvHbvIQFRcwpksMzIUYWGWAiEAkxRHVZzlyHWrxZ%2FcPk%2BvBXyK2pxR7MHAYOZ1%2BEfbKYYq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDPLzGoruHAfzaRVqICrcAwnlVhE3Da%2FfBcijpGqk818Kq%2BaUj8KBws1bR8KD7rz%2F4U4qwkgCj7IPDy98vfgliuCXqDuWqOp2FWkuPRvnT72%2FBc9e15QZ%2FV5oxfuO8WMVGfn2oC%2FYF3M4kFdfKOUA2X1UHf4ITKs8AK5mGUTCC1ck4M1YeQwZXJshh0G3FLZiWCg7wFC4YXHoh%2FG9L%2F9Gmj%2BVsBhtcoiGut2IAjpP4IvuG4hasn52w9OBZcZ73wP%2BVZOLWGk9YAAYPcWGuCjg2Omjy7z73M2K8Q9ZqsPKK02uYKLhIJvqy3wmT7KKjq%2Bj%2FASbb4JQUdVdd40%2F7dJLigOwHj4vS85xETL5gWj1clNRaYtdMUjAeR3qaxUco4dkuzbQIEMpr5xSfFsMYm5Az4DUQCqQAIa2A3r%2FtFKBPRjfUupIiouhXur9%2B7ipCkQBJTjx1kVpr9G90AIT%2BLsVs83oGWqkQTwNcmXOOZUpFqKeah616a3%2BNhPWvJxm2Y6rICy4qttLjCkxcGA2qCO2VcZyJY10A6QIZ5yddX6UyQBRpvOLJnRQlkXwqn2jlG5erilnn1HyNGCxRklBgyxlW4Ouc5ITdul0VUqVhRajfxIkEeIUKOSYs8m6mWbVjYLEPzsyXRHtT1CJlslNMO3Uws0GOqUB6wvBjTuLDu8aJS%2FT0OgWjcxiia7YUlI%2FYHNJF%2BgWxgFbqPB%2FbBPcNqlq1MVxzSaxpz2IXyHBwgHDh6ScNcl90O%2B2QsGiwqZLtNNfy3JrPF0XpqPDCctpHwQHqJ1G5nL75LQFJF2NRZnDd8gM0cel0UzBiMNKRZPqIvJFoyrZzLrGfIEmLfWCIFPVj5ijzKPa4uSQS2cq4TvXbKranNNvNd3ssaHT&X-Amz-Signature=6f23216850ee7727b4e14ffbcf481469ae6365476088efb1ee55db177559da4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636X43BL4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDpApyuA04BrFgzPhFz8GqpfnNHslVHIJ8D3z%2Fvfr1CYAIgb%2FpHNIqD6Jmq3nocGjnH2N%2FS6v0S4TlDHrPkoje6u4kq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDGypzfuS5IP9B3p0DyrcA1LbvyDVJVkU2Qon6ziLWKo53%2BKo5K8HiqH9MGetH8O78T3pxfs2rR2UJxrXP2KHMhnpFMCpxXMsR2QaYtvR1KKAiMHm9uZoek7UTBdJyhp%2BnH0PMsBRUmSfj6u8s%2BD0bYKAmo35OJ7M5K6tZjhQ8zaErJOH5PIXN8KsWVSyVuJ%2F5JiU5sB75L3h9ldrGD2qXhTUGnmYlNRWjPsgZxzvT1kCfMv2fo1s7NXuARKpTKYpo9Km3UOpyE3sp58tYleYUtdwja1mSFdBgOUOOAOPXC9xER%2FaTbooJ%2FAtLDg4wXQIAR6EI7XNu%2FRdhvzNXcLK5FXxkAbE3qnf6o%2BhHC7RBe7m9fMQeMopyZspKkLK8%2FQrkKlyHgfzu2mj3PYmBBMjC5ut%2Fu4Fa3x5XHhew81KXz7Maq7AZzLSAZvuvIc0OOglpG6gnE8PEQep9DlOMDVhYBs21ppyXnpQ8NclBRZWuZsFUEvAB2cx9wePeEn%2FqCbgyFc3uDiBWB0BNZxoyCRBiKRctjJVW1gTU4SOEsG9ajOUT%2FYaTVjFBPGOMnlUBiYbvmmFdyxmuKTMKGX6YIyhDJMAy9j1DGUxA%2FhTLF9mAGi7kcEtuQNnq6wTOOz%2FiSItUSBo0YjR6XQLM75VMOrUws0GOqUB8M2%2FjXiEmBZ0O%2BsvSiXOVGPQZ7sMeZTUJPnao7CO8wITqnGgm1j3c7v6t9Ff2IEzchKmbI9CQZL3exoU0bAGxkjOU4jdwkIrSNlq%2FjkllOsgpVGSBGMmFEqXrcQexGazBtrrhcd%2BFMUCO1zZfOI7puiBxMTvDoXDXPwlqHlSZCqlonRl1EoxdcATQIZbw4ysHBk7zxs5nP80jQrfwykhJhSxLP%2B%2B&X-Amz-Signature=3c18ba8d6a366f509b00ff68ae76fdfaae4a2d4b5125b2fc08573de7b7bd06b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636X43BL4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDpApyuA04BrFgzPhFz8GqpfnNHslVHIJ8D3z%2Fvfr1CYAIgb%2FpHNIqD6Jmq3nocGjnH2N%2FS6v0S4TlDHrPkoje6u4kq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDGypzfuS5IP9B3p0DyrcA1LbvyDVJVkU2Qon6ziLWKo53%2BKo5K8HiqH9MGetH8O78T3pxfs2rR2UJxrXP2KHMhnpFMCpxXMsR2QaYtvR1KKAiMHm9uZoek7UTBdJyhp%2BnH0PMsBRUmSfj6u8s%2BD0bYKAmo35OJ7M5K6tZjhQ8zaErJOH5PIXN8KsWVSyVuJ%2F5JiU5sB75L3h9ldrGD2qXhTUGnmYlNRWjPsgZxzvT1kCfMv2fo1s7NXuARKpTKYpo9Km3UOpyE3sp58tYleYUtdwja1mSFdBgOUOOAOPXC9xER%2FaTbooJ%2FAtLDg4wXQIAR6EI7XNu%2FRdhvzNXcLK5FXxkAbE3qnf6o%2BhHC7RBe7m9fMQeMopyZspKkLK8%2FQrkKlyHgfzu2mj3PYmBBMjC5ut%2Fu4Fa3x5XHhew81KXz7Maq7AZzLSAZvuvIc0OOglpG6gnE8PEQep9DlOMDVhYBs21ppyXnpQ8NclBRZWuZsFUEvAB2cx9wePeEn%2FqCbgyFc3uDiBWB0BNZxoyCRBiKRctjJVW1gTU4SOEsG9ajOUT%2FYaTVjFBPGOMnlUBiYbvmmFdyxmuKTMKGX6YIyhDJMAy9j1DGUxA%2FhTLF9mAGi7kcEtuQNnq6wTOOz%2FiSItUSBo0YjR6XQLM75VMOrUws0GOqUB8M2%2FjXiEmBZ0O%2BsvSiXOVGPQZ7sMeZTUJPnao7CO8wITqnGgm1j3c7v6t9Ff2IEzchKmbI9CQZL3exoU0bAGxkjOU4jdwkIrSNlq%2FjkllOsgpVGSBGMmFEqXrcQexGazBtrrhcd%2BFMUCO1zZfOI7puiBxMTvDoXDXPwlqHlSZCqlonRl1EoxdcATQIZbw4ysHBk7zxs5nP80jQrfwykhJhSxLP%2B%2B&X-Amz-Signature=3c18ba8d6a366f509b00ff68ae76fdfaae4a2d4b5125b2fc08573de7b7bd06b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBMMT5ZY%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T005303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD4h0tbq8u3VRcjPqWbU%2BTtMvzzD9OS87upheIZ67wnBQIhAIm0qvBZ0dQ8wOjpedmVcw%2FkYsv6j7Dsl0zyxXr0SghzKv8DCFEQABoMNjM3NDIzMTgzODA1IgxjzmH2Tgb%2BB5hIeygq3AONRtH5j%2B0aUQl2BsNxQ5ysjnyC9QLEDtwhvx2AxBJu%2BC6%2B3CqxRnY9ajSUywHldULPzGhK4hFopkZgzHyGb9fYgeqFVxXkMds%2FGKR0eSz%2F4EYfWTR82QTxdXp4HE%2BLAbdmcUZmJNTlVUH1YFmSC13ssi9WK1PsnyykO0O7QB2Q8pbyFwSGTV6nG2hHvhCoJV61pPWHuqOs%2F91h4yRVOaqz9IjMVnF%2FiBHsY1%2FF8hDsAMbEX3ku1ZHYM7qm209TiKHi4LfeljOQPJh8S%2FVoTSrVw%2B68RCKOBDNq%2FhpWRLzYYxUaK7jYC3fldDJrc8UpxJQB%2Fiqvrl1gPOhFKpHZhdL2SnNz%2BFJo%2BFK0oBvTEFdORHy5BVALvAca9aU9o0hXa6mYK5FYwi1HJfTAyaRL3sabAtkwjSKmyY2eKO1V%2F5FYwWJQZgMsNZxuy3k%2Fns9lXFwF9aUCVO8ZrP74tf3FwjQqM09%2B%2ByOTZUwoSLWIvQ1kGZED9xKHl%2BFKu1ft1OK9xSdua5qPcHAYCWWGAa1CAI1MLnz5YqVo7rWksIMiZZA%2B76Ly81P8dbdlZ%2Fk%2BhXBs%2FZGx%2BRd0i7%2FkTrt3ZUlvX%2Bcqkvd4SWg8t84YdfK7LXMyHVYXg795D9erbonPMTD%2F1MLNBjqkAQwavuTXLYT058HyVcdxenbnWo9FhXfNxs97n1M9472aOlLVqgGQzl7atjMv%2BWUytQ7r5MFIahmDk4Iz1TAqS%2FHWrhwqqgqnluMRzt91L5z30s1XZm0Xi9qPDM%2B%2Bs0vm7Qxa2CDi2fLmxsci8u%2Fw9jlYwZ1x0VpvFtCKo%2BZrSdJ568umFAeX4ah%2BdubFOQlAROByVfx9NziznGQ4wOhVGYJVfrV0&X-Amz-Signature=a2a0acb32d22dae8410341859228b190d9e6a5231701ba61aff326f51a0940cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

