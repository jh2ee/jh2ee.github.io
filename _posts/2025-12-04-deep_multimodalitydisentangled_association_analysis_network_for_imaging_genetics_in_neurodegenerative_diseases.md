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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6773YZP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCCwasnQURob7hQACB%2FHfgnMVwIHdg48z8aR5Dl52VNDgIgEy62sHV1z9hjVZF7lIyClrQ94TcSrqz5XMRGVOtrGV8qiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJfdUUVp4Kam3Y3BmSrcAyH4%2FUSaphc8XyFt9CsWDCzQ5zmTqLI2g9dEjkLikgi1NMzCgdWlLvbJnQDgwgSxIsWY3OwMYT%2F3L8SrcfFIfOju423P0mR4VikBDsNaDbFC83CdzX5nJJ%2Barrb%2BPm%2FncPMSF1ozaeox9%2Frvn9eBj67opjAAp8WAEbdoM6R4RzVTXTi7fozC9fAJ2vZacJXgwBysT3eyIbtuk%2FFRkc2ll342j26RV2pbD7nLeLGE8Ph9wTR78H3mxr7gjvVJS15Iu0q%2BDS2a3ztp06HJOGfR6LwncI%2BjpSZi7VTnRU3A5qI8iP3EFsNw%2BM9Fx9CX%2Bi9sJUzbo6yF8la3A8Y2PYeA%2BrFwgdL9oykbHgByEGjZn0Arf5OnOXTRa7XTP372c%2FTuRO9HeEfqhaZHnAn%2FILgrronXQ1C3aKqjJK21IknM8beptmjBV1ttdiq3nSWIuvcRzAJ0aH%2FePBU1g6ShR3i3%2BITaHzvSvTdFEu7tENQDn65Y0Yw9iqGWijrEiTcioonN2baQEDl59ngGNW3pfQxE84%2B59%2BseC1FSOZ7XXEaS3IEwusvYooYBPhw9aLUxgdgzzJN6lArzNf5t3RumhgRurB5FfXDdUywijoD34GaoB%2BJISyVynQ0TeU2V5zweMMn80M4GOqUBDJeSDYYxSEFOJxOo8DlASlZYZO%2B9intH%2BlKG24pf5jeerEM6f%2Bj9PalMhIOTKN6wZvI9YSdj0h9wIWP1m4hiKFnL7zfS4BnzyuMqpjZuj50%2BLXVDZGkO2XyrD3pa0toBOrRnDLIPLCl7KJ9464R%2FG9fq0X6uisBTZKIE%2BLzUxGjUNh3W9xIZcyFoes%2BOMUVYdcPep02TJKqXgeqpik%2FBd35701DC&X-Amz-Signature=2ca91848123723671a7219e43e416f6b8aa169204d356fb388dd8158f8f6a679&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6773YZP%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCCwasnQURob7hQACB%2FHfgnMVwIHdg48z8aR5Dl52VNDgIgEy62sHV1z9hjVZF7lIyClrQ94TcSrqz5XMRGVOtrGV8qiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJfdUUVp4Kam3Y3BmSrcAyH4%2FUSaphc8XyFt9CsWDCzQ5zmTqLI2g9dEjkLikgi1NMzCgdWlLvbJnQDgwgSxIsWY3OwMYT%2F3L8SrcfFIfOju423P0mR4VikBDsNaDbFC83CdzX5nJJ%2Barrb%2BPm%2FncPMSF1ozaeox9%2Frvn9eBj67opjAAp8WAEbdoM6R4RzVTXTi7fozC9fAJ2vZacJXgwBysT3eyIbtuk%2FFRkc2ll342j26RV2pbD7nLeLGE8Ph9wTR78H3mxr7gjvVJS15Iu0q%2BDS2a3ztp06HJOGfR6LwncI%2BjpSZi7VTnRU3A5qI8iP3EFsNw%2BM9Fx9CX%2Bi9sJUzbo6yF8la3A8Y2PYeA%2BrFwgdL9oykbHgByEGjZn0Arf5OnOXTRa7XTP372c%2FTuRO9HeEfqhaZHnAn%2FILgrronXQ1C3aKqjJK21IknM8beptmjBV1ttdiq3nSWIuvcRzAJ0aH%2FePBU1g6ShR3i3%2BITaHzvSvTdFEu7tENQDn65Y0Yw9iqGWijrEiTcioonN2baQEDl59ngGNW3pfQxE84%2B59%2BseC1FSOZ7XXEaS3IEwusvYooYBPhw9aLUxgdgzzJN6lArzNf5t3RumhgRurB5FfXDdUywijoD34GaoB%2BJISyVynQ0TeU2V5zweMMn80M4GOqUBDJeSDYYxSEFOJxOo8DlASlZYZO%2B9intH%2BlKG24pf5jeerEM6f%2Bj9PalMhIOTKN6wZvI9YSdj0h9wIWP1m4hiKFnL7zfS4BnzyuMqpjZuj50%2BLXVDZGkO2XyrD3pa0toBOrRnDLIPLCl7KJ9464R%2FG9fq0X6uisBTZKIE%2BLzUxGjUNh3W9xIZcyFoes%2BOMUVYdcPep02TJKqXgeqpik%2FBd35701DC&X-Amz-Signature=2ca91848123723671a7219e43e416f6b8aa169204d356fb388dd8158f8f6a679&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6GFEINI%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIGAVpsU48vzMfOctYbgfSMrM2Z2ZKsJLgJVAu%2BpTyw3%2FAiA9g6%2B4cLhKw79zLsNOdjH%2BzOy%2BY0WshrhD6Md1yZhoGiqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvah6NVSkyeIU6RHtKtwDp3YG8Ue7XEEnaqdkSjGbtzD%2BuoV7f%2BDsUIxLxnyohMNa7ySRQsTeKTBaVtaWEPOS7Uw8LU%2BQOBV%2BXTZAXqcleiMXbY3G5Nt6gsGaBexIV1ZWrCtDaqyQ5gK8uK5WSBIKsemQbZi5nQOcOhdIqr8%2BpJGfY%2F1Z2UH0CvrLgtSB0COcQ6OeHib1A8STH0TOF9pUCYtdpvxqDget0SXjABCXXJBVjV42hW4opvA7fsUni2bGvfCKU7kzsAwFmdDkJsx8wnoQVo45sVTXpeZIuKLQ7%2FB1BYEhi034LgQb%2BqVM2kaQi5mIhzNQDyZOo0%2Ffxo5aoVmhKLyVJC8%2BwzS%2FgcKrHL0Ozcz3WJW73wHvIS%2BAg0rTc%2BKnuJ7%2FiyJGAEhcrDRWMWhzIKY6huqReBywUaUljrCpdm%2FqGdtMprDUR5ve122FNM9cdkECvIwfRvdfHB1BmZ1TUjZp9r2V3s4zD71BP4sUTf%2F7G8W2X5l%2FBOVCkE%2BIg4dkWG80zW42hnzj4xPsAP6xU4J8MPk1yi12VlbybtTaZszcI7lxVztAGq7Y1Id6jqJeNgaJ4ls0xa76dn%2Fo4zbFCOnsnMGo3Q5QgZjvPkhJp6WivZpXqk9FsU5ECQavf4YvTHYcfjZsG7swvPrQzgY6pgHL4j0CXkDjlZ6LXvRICQD5kj9AgNKLg%2BUGM4J%2Bp9%2Bv3HEbY9DPS8wecE0WzfhomI8Luqr4mlvP%2BedzYyblxVoSBgJGY26rg4iExzqe%2Fq%2FKF4JLIDMMaRYDl3MpdgDmu63iN19S8Xn5Z5cmtiaWAmr5RjVoYcTnjTAa8JSwfqfc8%2Bz49qmjgrCvnGZfOdIgL2znkBOInbIOJsILd6n5b73E05sHfW6f&X-Amz-Signature=60e40c9477c757923a22a1ec4406e0f5c167bb8469c5f76a43df5bd2df8ae9ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UYYRDPU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCeKl1unuhhWxvfFe%2BqdAU7S6wcDgkQzCBy6JgbBK%2B8sQIhANQ9Xh%2FtjMM%2FIwxSBo3ZNws%2Fkea6lV4QYJdwVL4Ie9XxKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5IUEeoWLiAcYCE7sq3APhhGjgVOTacpl8iAr2QRLcCLlMKH82KrKCaUABkdLopAuHXkgXPXYQcPvaztrTRWQBRRaxtE7m6cIzYeL6Q3AhNdZZkGwdG4a5NKk4zrunXYP7vZxST%2Fi6rZp%2BuPR5KLkyPfhv3d4SHliFLqvHQrWhraHf2nVdqvp%2FUGLlqRZwYRj2m4U92KZoqh2hSYuKd8DbTPd6TDBQbzJwDjQt%2BqukUnCL2KN7xde1llWiG8y5Ars6nWqZPUUPZI%2BUR37mKDqTAPCvtqUcgFR8iQ9MzRJdMgjenlWT8BTCKUbLro4YIkydFa8GZ5%2FggqaJPBLOFnoG8afixBuUyMD2Tro0hl7%2FrOml7Voy8tJf05g0rF59E6STjWel9kxFDnvWs%2BLL7XE1W6xBsu9%2FdRX%2FxyN9qQgahixViXL2IwbieK7SwR2p0m9W5az1FT3SqbNkwQaZs0af4n9CcSbbpYHMwS7YA4syw8QIVD9HGkj7lyXUDn7IhFB4rNM3blsaMTIdG2Oesw6YZc7zCh8z0Ntytpbc8XJiI7I8cItxnmFcAFYjqimQFHe0QSp03tF0aQoAmArfXq6%2BZ0h3L83pNkq1ooOkKFPhx6DY11lHyZPSUIJsOTQnntkCJOl5Htr4GFyokjD%2F%2FNDOBjqkAVUarhySG8hWHx5FBg9dtUoIIKFivtWIyEWdeRvQSosFklHpKa%2BxfIGNaNAJT3ctGEXHAdFgQzyn9pzmLqoc4MIhJBsToNGTMiaSoDhtS9LzmlckYHUXKjoxycuzHMS%2BV41CZpHBRUFHXu1zX5a6eCnAx%2B%2BBaqMnJKTo9H6JyYNcttcBOZqj2Ns6fHLOCxba4ZYgb4K%2F1JGRg1vfSKTcWW7bHJY9&X-Amz-Signature=f3205ad58ae08aced6bf8912620b3ccdbbf39d2853e5de073fa4e2d6a0bde7de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UYYRDPU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQCeKl1unuhhWxvfFe%2BqdAU7S6wcDgkQzCBy6JgbBK%2B8sQIhANQ9Xh%2FtjMM%2FIwxSBo3ZNws%2Fkea6lV4QYJdwVL4Ie9XxKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5IUEeoWLiAcYCE7sq3APhhGjgVOTacpl8iAr2QRLcCLlMKH82KrKCaUABkdLopAuHXkgXPXYQcPvaztrTRWQBRRaxtE7m6cIzYeL6Q3AhNdZZkGwdG4a5NKk4zrunXYP7vZxST%2Fi6rZp%2BuPR5KLkyPfhv3d4SHliFLqvHQrWhraHf2nVdqvp%2FUGLlqRZwYRj2m4U92KZoqh2hSYuKd8DbTPd6TDBQbzJwDjQt%2BqukUnCL2KN7xde1llWiG8y5Ars6nWqZPUUPZI%2BUR37mKDqTAPCvtqUcgFR8iQ9MzRJdMgjenlWT8BTCKUbLro4YIkydFa8GZ5%2FggqaJPBLOFnoG8afixBuUyMD2Tro0hl7%2FrOml7Voy8tJf05g0rF59E6STjWel9kxFDnvWs%2BLL7XE1W6xBsu9%2FdRX%2FxyN9qQgahixViXL2IwbieK7SwR2p0m9W5az1FT3SqbNkwQaZs0af4n9CcSbbpYHMwS7YA4syw8QIVD9HGkj7lyXUDn7IhFB4rNM3blsaMTIdG2Oesw6YZc7zCh8z0Ntytpbc8XJiI7I8cItxnmFcAFYjqimQFHe0QSp03tF0aQoAmArfXq6%2BZ0h3L83pNkq1ooOkKFPhx6DY11lHyZPSUIJsOTQnntkCJOl5Htr4GFyokjD%2F%2FNDOBjqkAVUarhySG8hWHx5FBg9dtUoIIKFivtWIyEWdeRvQSosFklHpKa%2BxfIGNaNAJT3ctGEXHAdFgQzyn9pzmLqoc4MIhJBsToNGTMiaSoDhtS9LzmlckYHUXKjoxycuzHMS%2BV41CZpHBRUFHXu1zX5a6eCnAx%2B%2BBaqMnJKTo9H6JyYNcttcBOZqj2Ns6fHLOCxba4ZYgb4K%2F1JGRg1vfSKTcWW7bHJY9&X-Amz-Signature=05c818a58a1a71164d471092ad711acecbec6e8efdadadb89165ead2a3df6486&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUIUCQMY%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIF8HJ4yZ7PnFXEVlQ67EmOXESDzIOdyTxqYt7fQ9YiwZAiEApKBAAfrM%2BfhIIN%2FtnMUxcdhzc1%2BkhyQAosaDM0b3xkAqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOQv4WUg7FphYWQD9SrcA5TORZ6aDfWk4GqFtb5Rg%2F4DCkmb67hdIWDcH2PSxc%2Fie%2FCOpivaM1f3zv%2BEBcH9tSO1J1axFEHc6s9gPwPJN0t2MbhlfVgQQI7HhR33pEMy17wZ5hlxNcTgT%2FXbvL%2FrvbMW0fZcMnbGmfyl2B4VzAa2snmaB8xuHxVhebBmNxVt9b2S3hhIItIK8E1keKxNlkWYrgze7t%2BjgEPXTRJwfWY15SkGoHWE6k1wqh8pIk4h07qKnn%2FxlML%2FtwqIfSZp8qlEADHdbBpLHU7MXIPwHOHE8%2FFg6AcEAbuNy3H7cxh%2Bdd%2BXNbTkZzeg52sYJLdd5JXQVEbmGlTYLYgXt81%2BPwmFUMAZ9wK35hIwJJ7wSY%2BYeFP4jl7H4QMnAP6SP9vMjMI17ALEbafgE%2BOBx6uvTk6KLXsV5DmlKjtcL9ry7k%2FpXfDRV1RWCn6mvtihErPzAALlBXX745KysfoQUQoCjPbaaGrZ0fCQgH2%2FUmhOmesFW%2B55Piy74y1czqMK%2Fegya5UPO4iMavLoTFrzMHP36DnRLgzILnkKMWDR0z88WJOaba62uHCtYfmqb%2FBxCDzq4T3pnDhq6jlMrixTQcV84g1dY%2FrrZTnXnSeyRWv2%2BChxkXtoeqWpSNxWLY4iMKj60M4GOqUBxXbBrFeNegznBbesBMDvSE5P1pl0ZyYuljliqqJjW%2BdFaAwc1ILyJe4iUou44UaD30pd2O%2B2iJFRnO9EG8ZUUqmh5CAQGbxGOQZIaIeLOaVpAciXg05Z66Ir6IFzM0DLo%2FaTSW0C8be4fsbl%2FQyrGaky1KI1HMQgtlnWr8DYFNhDJIttis1al9OzgN11kTjCTnqXgIsSTra0jKGp6C9ngXfbex%2FX&X-Amz-Signature=b5629be8d748952b7a78115380637b308394dafc32e6a5a12629cfc6c83b7cc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PA5VLRZ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCA8ezxfD4Q6UTXOr1h2ilkJqOkgWZ1mjqBu%2BWwQyUb%2FwIgGgoD35Dc6C1NAXKbxoyV68HmyyExzA8Ux54fKvCUiscqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL0RvIL3oShbVWwoRyrcA8os2Ybz5TLJQHXBv53E6JMOvT5p%2B5A92OM4UKH8iy0rnBj8efccfwb74loVuJ3AG%2FGYqBYVAy%2BqSnJjVYX98L9pKuUR4HgtRyrroFUaawfkjReIJJ%2BvWoMYGWeN1L7KvC9Q151DDNK8dBkqDDCX35hqNenoJjMVMUOj9bg9%2FEeinSWnL0%2BEx1qY9rhheVSX2WPRPlCFkJRhcPoXjG5sXR%2FZJXRAyLcQv3ohII8rZTb1oTgfA%2BmWgYTM%2FbE%2FOuSspvNiRcVTGu3mmL04AXcWpED%2F2XTI6O5ne3qSyFhyl%2BKHP1Dy02eb51SNTEFTBlOuhcAFHrdCShsnn6su21ZisEG%2F3k3PTuXx%2BED590RGJG3E%2B9sndnIwPhv7zDMVSiOUtfMDqE9Fe2x4yXMT%2FWMmThuAXcSETftAsG6gsotKX8LiXDO83dbbbQc04X9ILRR8s5x8AdMlJbh1sj%2BvUKCxb0ipDTRZ8IceEooF0La%2FPfR1HNLB9hsxb3XzMWB6pjFHJtnypEfBGxkM%2BX3BCtZs%2Bg%2Fm%2BxVaW5Wq5T89LyyVvu1WsTMI7J4TJf0%2B0CoRdFxw%2B0xD7NE4E7mfM3gSie0sU%2BNLoVyKsHBLt397DO5%2Bh%2FIN3W%2BU2qHupMGD1ijwMOD60M4GOqUBZvufgYIr4BulfX5APtZtO1jWwjjqY93TBIcj37jxuqhiXIcLexmWqGDfY6TP15ivtGZIB9hiEYZkI3u3aohTEFfx9NXE5BcxgL9SbRXMsfy%2FIWPNhb6ozIfn3uXTRacN9sJ9pkyQL6EMzCniEp7iBGWIj57BxhH9Npj8N421bDEDT07njUR%2F4BW1wl%2B%2B2SlxS12K2OIDWmGn%2Bvpp%2BSywTHTnXBms&X-Amz-Signature=8464976869b1a2562d84e62c2c03fed5cc3d02fb61867ef8c5e309e2d77fce5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZH6FEBSL%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJIMEYCIQD5eeQquhSUf6ZBcWBAJ%2BvWatJSykgayi04FRTZS3Z9OQIhAM3J%2FlkbQ6WgPmid%2BO4hH8hKMcMBya0IpV55GFgnqPDaKogECNj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwv%2BsFK7BC3i03F8bMq3AOU3TCE6EOQTcY4DiOReFNHhnQEZ6raHIXjy6chbE0hXrO6TfQmsuY7oQz3WKEC%2F9AlG1vVFL4Mh9z4LdfCqOSkq8qLyXDse7qsxm667CTfzlx8HL63mAe0X1EOAqJASTOQKKtQyLy%2BfhQpzML0ehJnQW5FYYLz4RCR9MLemscxX35CgIlyBP5GwzgoD00SjPECHCb62Sqpx7I5hIuqoUoUmzmM6MAs5BOObw9GhvhcBCTbazk9I754rT2CHf8eLCQjA%2BK8vZy4uSVXoKfSu%2BjwbsFjAMPipjuvHSZSYgBbChaEFXNrkP6e9aV5b0gwL5sSvkh%2Buc6EEGykTXV%2B3%2BR8v13xFSNVw78hp9YBEA6%2FzDfDCaUWYoV%2B8vbf6mUQdqMg9X2rVL39syqo%2BSBYE57lhTYn%2Bn4STKik4X8zY6xHiwIc8w%2Fil2Va%2BZFxFSw%2FQ%2FmLZUzLAHoCcojYlzOmn%2BKiu%2B%2FwrEqmLo0MU5rGnRnqbht2u%2F37XYcBdhk2DsfRylF%2BVtpi857vREuk4U7rItIpReb0mhGzOaf6wWXEg9nt4NKecfu7kN6oe9%2FEn04Nq%2BdPsi2MlDHcr%2F%2FJE0pZAABA%2Bc3sCnZJc%2BaAsv3LO6mWm4BU9U%2BAe4onJLRXUTCR%2FdDOBjqkAfRLwCnJEwYcbPJbKSLIl4cZ0j1cUqZRLu2XrGAfyUMwiEiQ3RF678FAU6GQRwUMHZbaKL9e7cR2i4OqMDYJik4Ejr1bdlWTRZvq9cM6k7l4iTfxNxm4wCY0BVKT5xGaZ8WrtmciyO%2Bj2xddruwQxs0BkwBshUkCJZtcrwroJcVfMpSQ%2Fvi355HkX7DUTtch9kpAhofNadgLSUOrCnRjWPpT3MkM&X-Amz-Signature=96a056837f629cf187dd80f60689b09f1c04f97b91453198eda3a1820c3140b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O6OK4KV%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIB4%2BbOPDfCu4Z9EP32N0tnE5osjF%2BiWD2Fy0HwI%2Fd%2BqLAiEA6ca1a2p0HSo%2FFhYyn39KsoNocJSp5iugLsPv%2FQYGTOoqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAcw9YT4ZJ4I3Q2VpSrcA2INNSFWRo%2B7EasEz19BscQnuRe99ymG%2B8FTSh7KE7SMJG%2BjHGOEUnVG%2BebvBtvypi235T3ii%2FfayXT8M7GtpL%2BIAha%2BvLVxSjKzeZy9LKc5GYO%2F8vHGKn3k5gnGbjpNItAzqA6ZD3jrxWzgwkfm%2FjndEDIv7GqrbBjZDj5wMjn2fSLIos474qTC3TG7R989DKNGHeS3bHSnReNeBfYhyTLgSPKVW2M8s4oH986bpEnkoJK%2B0L%2F7N4bqwrH6APtamFO9ExgDh3SNemumiIG8OGyeSwfJJAVnYXhoVTx53ie2hqP7GoE%2FYibmz8IVjKBBkmISd0BDq%2FQGB25DwqPKYpxJYD45yCR36szYTTEev0wyll1q85oMlGd47hM8j9cXUH6He7QaVPmi3DL2VKepP3cvZWLdbwu4n7OSOM1JmdhThl4J7uwUL3IjviMGEvTDHfSM47JDMYuKhaB%2B2fcfdV%2BBMKsrCpt0aQI3LMrrBSl79J8GXruxPvbUmrY1ucSYRpWQs%2FLJTejT6ryN0%2FnbTwWSGBIJQVKrIeNXv5Y%2BjQJN89aYFBF73DXN5x5gLsSj6lXDVd7CPqDSUWcoWpcyEDBpRMK8Jn30uZ%2B5kbvq1nbc2Oxjwuo6Li6R3SkcMP770M4GOqUBWffXQXE6OM1OI10ZaTTs99W%2BBXvdhy%2FrS0VywG6RRHGYopIlXNKmyLQwP7btLxhAF6wHqlMC50XHsj%2F1zApy67xIsTdjmBcum2u45T1mXCSFy4JIxVXxOwK7T3lIn0HkVTxLkCNxZNfmIDICNLSCgT5E4%2BLJ2G%2B02nB2BNgQ1vSkrp812J3cEubrgHldJU1MIxaJL2zc14lxw4kUPX%2BxHFKKjpqr&X-Amz-Signature=18a0f5277cabc3ec8fd2f68ab0035389be154b46c31341836d5ce2fed17aca18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O6OK4KV%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIB4%2BbOPDfCu4Z9EP32N0tnE5osjF%2BiWD2Fy0HwI%2Fd%2BqLAiEA6ca1a2p0HSo%2FFhYyn39KsoNocJSp5iugLsPv%2FQYGTOoqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAcw9YT4ZJ4I3Q2VpSrcA2INNSFWRo%2B7EasEz19BscQnuRe99ymG%2B8FTSh7KE7SMJG%2BjHGOEUnVG%2BebvBtvypi235T3ii%2FfayXT8M7GtpL%2BIAha%2BvLVxSjKzeZy9LKc5GYO%2F8vHGKn3k5gnGbjpNItAzqA6ZD3jrxWzgwkfm%2FjndEDIv7GqrbBjZDj5wMjn2fSLIos474qTC3TG7R989DKNGHeS3bHSnReNeBfYhyTLgSPKVW2M8s4oH986bpEnkoJK%2B0L%2F7N4bqwrH6APtamFO9ExgDh3SNemumiIG8OGyeSwfJJAVnYXhoVTx53ie2hqP7GoE%2FYibmz8IVjKBBkmISd0BDq%2FQGB25DwqPKYpxJYD45yCR36szYTTEev0wyll1q85oMlGd47hM8j9cXUH6He7QaVPmi3DL2VKepP3cvZWLdbwu4n7OSOM1JmdhThl4J7uwUL3IjviMGEvTDHfSM47JDMYuKhaB%2B2fcfdV%2BBMKsrCpt0aQI3LMrrBSl79J8GXruxPvbUmrY1ucSYRpWQs%2FLJTejT6ryN0%2FnbTwWSGBIJQVKrIeNXv5Y%2BjQJN89aYFBF73DXN5x5gLsSj6lXDVd7CPqDSUWcoWpcyEDBpRMK8Jn30uZ%2B5kbvq1nbc2Oxjwuo6Li6R3SkcMP770M4GOqUBWffXQXE6OM1OI10ZaTTs99W%2BBXvdhy%2FrS0VywG6RRHGYopIlXNKmyLQwP7btLxhAF6wHqlMC50XHsj%2F1zApy67xIsTdjmBcum2u45T1mXCSFy4JIxVXxOwK7T3lIn0HkVTxLkCNxZNfmIDICNLSCgT5E4%2BLJ2G%2B02nB2BNgQ1vSkrp812J3cEubrgHldJU1MIxaJL2zc14lxw4kUPX%2BxHFKKjpqr&X-Amz-Signature=08bf4557936996b8ae60fd4b5789ab930d1e84c012ae5c3d2f5d6d304e327833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJV555BR%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCICDvO0K4ODWBlKGzZl00TRzaw2qtkcdKk6PmNC4QSlo1AiA3XCMdnWa8CF5fbXrJD8byAqbFfb5EP6ALcCitlRWpUCqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOsh7JTyXPLCGIsuFKtwDdBahC4z95fN4Jni32YYdKW1ALPGQ53%2BHis2Hc4ak9nA%2BN2JZulT92c98EK%2FRzXr6qPuZi%2F5AU6htpP%2By58oZC3ZVYLsBtR2J8b7RtnWRwDKxFNbFkXKAejE5%2F%2FfZUEEvdBXN6FlNZAhVKvxPUVExypX%2FKsYrB0bHVm9%2B1ukxvaKmrMzV7rBu2efG4wFAispeqMHhzH8rMRD0ttbnch7w2Rt7LuZdnrdmhYDZ%2FKL7pn%2BvnihKzV%2FdzQoNCWjZPGxk4tLgyi9HQlRheUEpI0jmrhRQzAHzZnbhTnkTfyouw3EM721rOE34KhPyE%2BTtCEbcWV3nhfcbnlkV8VBlxI%2BsTFqqFv6D6lhRUlfi1oF%2FlEuB5eD5CSCj89GQwYZ11CGq0M3tLElQE4OlcaoTJP3OTZz%2FLMwuW64ywaR%2BzpWNU9YnPbwqM6ptb4mgu2NNtuoqzOhoMFDv1d7xUR9A6quFLhxqFr30xruHzeFrriSLCm9MyxFXoeZ%2F%2BdkoY7lZjkIWqvwMrzJTUscIve53ZQJcB%2BfwrwCzqIcZpQdaAapjzU5XpXEuZ3VpZ%2BqexfAzJ1GWthzdj9nffBq9jEWbg2rWjHmxXpA1M1LmgFHwGYQEfe9d6Ory6%2FVxH6ImqYIw%2F%2FnQzgY6pgF0lF%2F8CUcYKxXErUAm%2FG4P6BcySmW3kUiK1STYRXl%2F1tosr6t6jjwatJ5J6nVbx9e%2FMlcsEr7B7WVz6Eg%2Fissqv7RB5%2Fg%2BuRJFm%2BADnJTk3eU0FHDLHAYZ8d%2Fl6PGGO%2BLLzGWa03jnRgajl6%2FkhnMBXyqnBHMTPidQk8y7gQR2y4GzPdz7L2eH9FirI7cC7CYyDKcRHpZ7THrteVZbIkN4F8tTAtas&X-Amz-Signature=a117b2a8eec3f8bd2af9bca20b7a57c6c9d2eb7cbc2c88414013d202d7d86f07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JIR4PO5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCGHqBt%2FQULBd1%2B3UVOm6LSTe2mWXkz81rSWSKXN3ZkFwIgE4%2F%2BvLL6fSybA7YgxVRNtylc1srhrChEkxlZcmyPXtsqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCg1LqzaNyngEXN%2FYCrcA%2ByF%2B8%2FPpEvSjDFKnbVbzaY2XLA4dFawDRrm2L13IX3yyoqwtOw%2F530gSXZMHwhH2DoSWlKtRn6s%2FxuDXx%2B6QiiX9PnUOxvbGQW66Njk75m1u%2BGdBUDDK1gEK8Pl6zigUvokbfBskARA58LGKtKjA4oVf8qUZhxgSabDIB8Kxz8m98VJUj1eCEOQskHK6tcN1%2BqpL5JV3VIoXsMqRrauNBL57qDA4iiBSk%2Fs0eKotxA%2FAuo9jwe5njuODK6g8Kv%2BRDmB3mFmLniKtZJ9mkFrLHCYRCrw1%2FzTK%2FSr7VWMh0A7c3pOoc%2BRyeGXTIa7JVXJV9h1c0OXJYl%2BFfHl1W3x%2B%2Bq5TqxgY3g0hR7uOTjV1JO44t2FeSgGpnuXro3cT%2B2XDW4OzTwEnMSGrPWtSTORI5TJtDwi%2FGJvnycZWjfqDMTQkIXL2d1m4f91w26apYEczEt75otOaK3oxIxNXS2nqQQBkqpoP4VSgmILH3sEPaNxRe0TcNeWuG8qreWe1PRVr0sE%2Fko7lAkAoc8d%2FG8DdMz9mYUvS%2BhRRKClaWfsbSL9RwFIEzUw3siHUtSB9I0YW0eGa8CA4etWe%2BVudYJlleigtFpnCAW6PJpUTqaJ3hdeSxQ7PtB5WLleEYCiMJn80M4GOqUB%2Bjx5C66jxqURQzvAZhFqK0X104opmEhRzgoD63J%2BEQI5i9It23QgKm4%2Bxyxa8DQgv9PJBTwbuAauwkKfKJOqlEL%2FNzZFw%2B%2B%2F%2Fd48mSaZsTS8UrM9uvsU8q4KIL7L6byQxIfJFTel%2Bc41G9jZqNiVKZKaC46li3tjtC4MPFWC%2BVukW9uWJnrVZu6QLIMrhydVTKtHVHBGlKkyesvyqLd%2BfaZEpXNn&X-Amz-Signature=ec8e317f283ea0d08b242924e81b138410408e17d5ca8e5d136f21dbc330e8bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JIR4PO5%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQCGHqBt%2FQULBd1%2B3UVOm6LSTe2mWXkz81rSWSKXN3ZkFwIgE4%2F%2BvLL6fSybA7YgxVRNtylc1srhrChEkxlZcmyPXtsqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCg1LqzaNyngEXN%2FYCrcA%2ByF%2B8%2FPpEvSjDFKnbVbzaY2XLA4dFawDRrm2L13IX3yyoqwtOw%2F530gSXZMHwhH2DoSWlKtRn6s%2FxuDXx%2B6QiiX9PnUOxvbGQW66Njk75m1u%2BGdBUDDK1gEK8Pl6zigUvokbfBskARA58LGKtKjA4oVf8qUZhxgSabDIB8Kxz8m98VJUj1eCEOQskHK6tcN1%2BqpL5JV3VIoXsMqRrauNBL57qDA4iiBSk%2Fs0eKotxA%2FAuo9jwe5njuODK6g8Kv%2BRDmB3mFmLniKtZJ9mkFrLHCYRCrw1%2FzTK%2FSr7VWMh0A7c3pOoc%2BRyeGXTIa7JVXJV9h1c0OXJYl%2BFfHl1W3x%2B%2Bq5TqxgY3g0hR7uOTjV1JO44t2FeSgGpnuXro3cT%2B2XDW4OzTwEnMSGrPWtSTORI5TJtDwi%2FGJvnycZWjfqDMTQkIXL2d1m4f91w26apYEczEt75otOaK3oxIxNXS2nqQQBkqpoP4VSgmILH3sEPaNxRe0TcNeWuG8qreWe1PRVr0sE%2Fko7lAkAoc8d%2FG8DdMz9mYUvS%2BhRRKClaWfsbSL9RwFIEzUw3siHUtSB9I0YW0eGa8CA4etWe%2BVudYJlleigtFpnCAW6PJpUTqaJ3hdeSxQ7PtB5WLleEYCiMJn80M4GOqUB%2Bjx5C66jxqURQzvAZhFqK0X104opmEhRzgoD63J%2BEQI5i9It23QgKm4%2Bxyxa8DQgv9PJBTwbuAauwkKfKJOqlEL%2FNzZFw%2B%2B%2F%2Fd48mSaZsTS8UrM9uvsU8q4KIL7L6byQxIfJFTel%2Bc41G9jZqNiVKZKaC46li3tjtC4MPFWC%2BVukW9uWJnrVZu6QLIMrhydVTKtHVHBGlKkyesvyqLd%2BfaZEpXNn&X-Amz-Signature=ec8e317f283ea0d08b242924e81b138410408e17d5ca8e5d136f21dbc330e8bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW3J3GID%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T232331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIQDttZknBHKaeS3QsoEqELGdz8%2Bh%2F1xu%2F7rtsw0TBc36UwIgJMPSL87DsYJTHvFOb3lVuoJxZYKVZhzHUgAe6YMOzNYqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEPIEhpJpOcs1kDknSrcA8FCX0N8LtmUnsJJJd58MGGMzf0K9osAjrlYNRme2kDBscxmgBLjoibdYDrFNaIWgXgWdCfo3MPrKJcgjNgYnUp6DFAE3ZCJ%2FblNuqpxMdtr4XYbgCPH9YopAHsJVTt%2Bb4jqcoxcUbmypziO9ND8938jxBvfqe2uG9y390nLTjj94%2BPH2YbrP3diJetPsI%2BxbWBOKr6oe2qMAdnVZFM%2FHQZDaxFh7OO1GVR3q%2BAWZAX4%2By3VVU93OOJ5X22LG3AKqibFgxdzFfxM5zh71kJ5WKrYK%2BEMvvaLWAVNYbfZAnXP%2BYPExDbv56PGam6OdxIoLxHNMSWkvM27g3RCqbwmH7%2BGbV0BRY9UZJV63iJgqxSvWPP6JC6TBN575Craf8Cf9d%2B6gtkmGQTAYWua3YoD%2FzkMN6DrooDaBKwFrzHUs6xR7PoQYA3Kf8piSuNnLHqBetIkr%2FWisgG2HDGKllSE1qm3OO0w%2FVZRytoeyxf2yHqgTmOY7fi55VRYNpmg9URAsXecepanB11mIaTag7SB%2BYQB5Qv02nO00M7qTRZuoq0ErI0EFr%2BPawFU5x9OPx8DQtHjjkODCDWGEifaacgXtC3TqEOnzoIS6ciGTCiUXjSCMmK1qaAZM96RiiinMJL90M4GOqUBlT5Hw9dg4nH10fupAhYijT%2F4S23pjDllR4dneeRouWR5t9G2jA6tYKZUQZURnkX3ft22FRXt4m%2B65CDAi2fwEw0lav8vGffDDSjAgi7I%2B0NMPOJp08K84sefM1Zk8aErpmf1zYf67pmPNDC1VeIuA8dh7Zvse%2FhLZKT8%2FxTccyZ8KYdZ31SzGE3LKdrPhRiK7gZNJPOSBMtRvOUMpMvY05ULTDHw&X-Amz-Signature=144b7779807434e9269ab96b0b94c4acbe378c427d2b255861b9ea6c34c0cf38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

