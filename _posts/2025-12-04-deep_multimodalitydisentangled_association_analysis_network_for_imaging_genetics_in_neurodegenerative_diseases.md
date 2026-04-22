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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK4KB7QP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKo7lQJKZN5z84AqPFgaB%2BkMmws8DtWNzGYUX%2Fv1qr9QIhAKGh8oFUBK%2F2s%2BcggfOc5uE%2BcHBt8ECGCA6w4CfgFEx7Kv8DCFAQABoMNjM3NDIzMTgzODA1IgyMoJyBcjkkS7twP98q3AMH%2BoEL4VrRKqLFd9WqDlWRdgg391x5v8Sz7ua37OjGhubGXW8eh8u6Cm7nG3G1grzRgPXoEk839Ubz2erCEEHyMnEG7P0KvrOAf0pPZVJMGWLhrXYLJ9vrbWcOH%2F%2BLwYp5m%2Fton70sYQhIgKVSDVg3f9wIebdfKqHZFaJGQKrdwjC%2Fo4KLpKt%2B7ALr4MVbs713JvmmgG%2BZ0vaGszT3lzupBaVq6GkV63Fqr3IXDogpmFSNGgLryXRii57aHoDs%2F1J1t0WTHq5Zm2tyXq7%2BizVtGExVh6%2B%2Fr1ueWzt0XT9dJ1hKk1CN%2FVB77clWTt7KMM1jiawsHqObPfYGa5EAohZVcGTZGvY2yHe7VePwin7fdNrhuilZ0p3aPBq9wFNKu%2BTPyoS1wWDCtnjzy7R2KqZQEpRhOooizvsLPoS5DY%2FNOnLehkcAuqodN%2FPl9%2F1n513HxteJ3bCYVt5tMvZDSdq87YHQUNOZqwVYScKwem0KEe9ruG4ImXxcHQCXYyqvxPGsPW1eW53Ovuou%2FGbUYxgtUU21Dcz9vgA6bI6oNYuTfYF%2F4c4GwUiHPlCLI836igKcFo0uuHBFLJSJwMe3AmkzzZcs3TL8V%2FFR0YQzogMJNgbHmSf8gEyarC2XyjCWtqPPBjqkAYZJnNsxSoZWPcPtLJx97xyZDkRLqoVTUHVG38ZeSXykwBmTKvfgplbzth%2FYPK2ASf8%2F%2F%2BkEHccEbRd0u7qrvv9uOZAjSY7dmrZNIIUBvSPhGG2k%2FzOb5%2Bj16C4%2BCc4ArkUJsEp9pPDj8kLsy7PqXe%2B3DRZL5YhXbbY3WD55Y5gm3hbFdLYtESpSK6w5Bns8w9xSa6oKwbV9oR%2FQnUCJBxKmeWPX&X-Amz-Signature=6ca1d29da14a61f310ebb4baa4a53f1a3cc6be4f71f60bff18b015ba9d413394&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK4KB7QP%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKo7lQJKZN5z84AqPFgaB%2BkMmws8DtWNzGYUX%2Fv1qr9QIhAKGh8oFUBK%2F2s%2BcggfOc5uE%2BcHBt8ECGCA6w4CfgFEx7Kv8DCFAQABoMNjM3NDIzMTgzODA1IgyMoJyBcjkkS7twP98q3AMH%2BoEL4VrRKqLFd9WqDlWRdgg391x5v8Sz7ua37OjGhubGXW8eh8u6Cm7nG3G1grzRgPXoEk839Ubz2erCEEHyMnEG7P0KvrOAf0pPZVJMGWLhrXYLJ9vrbWcOH%2F%2BLwYp5m%2Fton70sYQhIgKVSDVg3f9wIebdfKqHZFaJGQKrdwjC%2Fo4KLpKt%2B7ALr4MVbs713JvmmgG%2BZ0vaGszT3lzupBaVq6GkV63Fqr3IXDogpmFSNGgLryXRii57aHoDs%2F1J1t0WTHq5Zm2tyXq7%2BizVtGExVh6%2B%2Fr1ueWzt0XT9dJ1hKk1CN%2FVB77clWTt7KMM1jiawsHqObPfYGa5EAohZVcGTZGvY2yHe7VePwin7fdNrhuilZ0p3aPBq9wFNKu%2BTPyoS1wWDCtnjzy7R2KqZQEpRhOooizvsLPoS5DY%2FNOnLehkcAuqodN%2FPl9%2F1n513HxteJ3bCYVt5tMvZDSdq87YHQUNOZqwVYScKwem0KEe9ruG4ImXxcHQCXYyqvxPGsPW1eW53Ovuou%2FGbUYxgtUU21Dcz9vgA6bI6oNYuTfYF%2F4c4GwUiHPlCLI836igKcFo0uuHBFLJSJwMe3AmkzzZcs3TL8V%2FFR0YQzogMJNgbHmSf8gEyarC2XyjCWtqPPBjqkAYZJnNsxSoZWPcPtLJx97xyZDkRLqoVTUHVG38ZeSXykwBmTKvfgplbzth%2FYPK2ASf8%2F%2F%2BkEHccEbRd0u7qrvv9uOZAjSY7dmrZNIIUBvSPhGG2k%2FzOb5%2Bj16C4%2BCc4ArkUJsEp9pPDj8kLsy7PqXe%2B3DRZL5YhXbbY3WD55Y5gm3hbFdLYtESpSK6w5Bns8w9xSa6oKwbV9oR%2FQnUCJBxKmeWPX&X-Amz-Signature=6ca1d29da14a61f310ebb4baa4a53f1a3cc6be4f71f60bff18b015ba9d413394&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJLQCSK7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE9%2FAuEIHzQLKVC4jvvHzeuo5JwHndQVxQKV1jvKngjLAiAlG%2Fw5FKSXkbIm4fswWpNIcCbOFV4GqNkWmvUPCFzyASr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMymaDhbfurOzWtFMGKtwDma%2F2%2B35N1lk0MHHwA3ZsREimHUgJ9Nn0hV114Key4QOUtWx2w2ORa2DCrI4tnfXvlQdjFMrxJPfI4ZytPRhzObGdQPXhGYxsezKsWZUwSenNPaFYmaJshUejOhCOVhb2nik6ZcETjqSfOL5ziNfG3Ptc0kXIFl%2BU4pEaC2te2Jn2RdOv9rWybLV9Vd6fVyauz4%2BTe%2FFj6%2BhQt3CkF2BKlPXtvipENtmA1pj89ZJ%2Fr6JAzIRsgtFJMUF0sWL0PpNMt4mzatTgiOx%2B6v8AaONBBEOBz6l1Rhxy3k2IX5KeaROVt09FT3x0Q7Kclex92aQ7YGQI8uDuNlw09oR%2BvLAMWWz%2BIGxjpLBSI0wIF7dTbVSkc%2F2OgbKjsbWKX88lMtmhrFdrcxzrw1bV38yW722%2BhvCkYO27z5n1z2fBYqq28klGFe%2F06GMCAIbUj6YEJBZSDPcNDPwkjSAkAxc%2FFCttn2Qfa%2BWi9xDoKgGsiaj0EV0%2BE9zTXdNRSPezqirDMXzAgOOG3Cc4Kain0vS4F6g6dZEb5stodgyhdsho9a8K7%2F2YZGiLBrDaQQDzEa36Irimip21MsvUy%2Bcbl1QUVn9WuYZHvjM4zeK1nKxNiuDAw4FYLbLkEJ58bTkxteMwgLWjzwY6pgGdc5FgymnFSl4MyYt1OZ2ZfpO2fRhraA%2FIGZQbJm7wrBgkqjzuKPbEEXFr4i1s5bEAXR7cWLobVlmVC4fBFT3Yv44cJ%2FA0ncOOuwSlGsRD20n%2FnimUY5QSxh6JPkolrpgAtEw2hs42%2FTR%2BB5W37%2BZ3tgWAXvRfqCpZdyykYdu9kShc7rSAKUbg1ylGJ%2FujE02Rx2yI9JuOazBT%2FdpI5m2Rdyv%2F%2BRXR&X-Amz-Signature=ff342f4c28fb782bfd13eda3a420cb9bf9ef165b53d5fd4cfcf0ed380748f54c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LLWQVH2%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBaMOuKTasKGT%2F2zdI74LEXnwjFOre%2F6kNTChgHEJJf%2FAiEApn2v7zJUgKsDPPR%2FNnJQWLt9qYUq5%2Ff7zI5LsHNMikkq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDBfN0r0AoYbDDM82GyrcA3StQiepZceWiv3Syx8uK5AwZHkKPOioOKSqdH3e%2BsgOcii8gR0UH94%2FIPxtkGXC%2FmhZAk%2F98LV0eTzS7JtJHq8MtjNJYI93gRQsb9iOLqoQ0qk5vCHWP49jeRnPwo7zYCX%2BX2WpyZW4DVfsC0u%2FKYJg3XVIo0CPrFyLyGWPf123ivxIGYWegXLQRUy%2Fmc8FDD%2FpBtoR1KTFj3V%2ByaJVeTd2QrH%2FeiJ9qBq8sYc85JNJuohH8W3b77YnfDDN9kbTsvpsDl7L%2BNTPbZnpEt8zx%2BXeVgo2OgkUJR%2BZNcMoMcTkgd8tJv6uZ%2BhZe8hvujoG22QhRMlc1pSXnj8LPzMSNJyy0L%2BAC%2FjDH3NjtELsUcMVh%2BQ7lxxpcHrJtK56qKDn8Gb%2FG8hlpZ9DeUJ%2F1sRXPgH9z9orif4fbXCji7XAWJ6AMgY59i7S5Lgm8Xh9uvNPHk6nDDWFpHZhjqds5TSNPj5Lq39OFqZ8ju03slaPuGa25FwjkhldQuFb2GJqFB0K0jAnFY3IR3hiO%2BnqHL5EKjjjFmifjarFOtwJl6Un3UjNmSRn4eeW%2F3aFnFJixXdp%2B5tROEZ1UHipDTGBBf8gLPZCt0ZzoWMJzaWbeMHojUX3bZ7Om43k2cARu5ddMJizo88GOqUBJYfJoS8hMglQ2r2FtRdqr5i0rgshhicPKMgu9QZugAlT77b5xC6%2BCkRKk9VukhZq%2B0JP7rz71KxSA%2Fgg05UqvW%2FIYLjZU7TGNbVVb7C8OhXmt7llxqtiyXBwch8F5t5lhNCM48g1cCfD1MiN4l2U1xQk0JBc1TcvL09qfuhSkN0037Bf3GSOk5sI%2BJv0g1PXCCjyWJwzVADuTOrJDD6xN43Exsjw&X-Amz-Signature=913ca461c9098d6297d6a96aa2346ace21607294f19a539def02c8cf1530ad49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LLWQVH2%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBaMOuKTasKGT%2F2zdI74LEXnwjFOre%2F6kNTChgHEJJf%2FAiEApn2v7zJUgKsDPPR%2FNnJQWLt9qYUq5%2Ff7zI5LsHNMikkq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDBfN0r0AoYbDDM82GyrcA3StQiepZceWiv3Syx8uK5AwZHkKPOioOKSqdH3e%2BsgOcii8gR0UH94%2FIPxtkGXC%2FmhZAk%2F98LV0eTzS7JtJHq8MtjNJYI93gRQsb9iOLqoQ0qk5vCHWP49jeRnPwo7zYCX%2BX2WpyZW4DVfsC0u%2FKYJg3XVIo0CPrFyLyGWPf123ivxIGYWegXLQRUy%2Fmc8FDD%2FpBtoR1KTFj3V%2ByaJVeTd2QrH%2FeiJ9qBq8sYc85JNJuohH8W3b77YnfDDN9kbTsvpsDl7L%2BNTPbZnpEt8zx%2BXeVgo2OgkUJR%2BZNcMoMcTkgd8tJv6uZ%2BhZe8hvujoG22QhRMlc1pSXnj8LPzMSNJyy0L%2BAC%2FjDH3NjtELsUcMVh%2BQ7lxxpcHrJtK56qKDn8Gb%2FG8hlpZ9DeUJ%2F1sRXPgH9z9orif4fbXCji7XAWJ6AMgY59i7S5Lgm8Xh9uvNPHk6nDDWFpHZhjqds5TSNPj5Lq39OFqZ8ju03slaPuGa25FwjkhldQuFb2GJqFB0K0jAnFY3IR3hiO%2BnqHL5EKjjjFmifjarFOtwJl6Un3UjNmSRn4eeW%2F3aFnFJixXdp%2B5tROEZ1UHipDTGBBf8gLPZCt0ZzoWMJzaWbeMHojUX3bZ7Om43k2cARu5ddMJizo88GOqUBJYfJoS8hMglQ2r2FtRdqr5i0rgshhicPKMgu9QZugAlT77b5xC6%2BCkRKk9VukhZq%2B0JP7rz71KxSA%2Fgg05UqvW%2FIYLjZU7TGNbVVb7C8OhXmt7llxqtiyXBwch8F5t5lhNCM48g1cCfD1MiN4l2U1xQk0JBc1TcvL09qfuhSkN0037Bf3GSOk5sI%2BJv0g1PXCCjyWJwzVADuTOrJDD6xN43Exsjw&X-Amz-Signature=940e128ff0acc2815ef5fda727d9e068e9abfb296ae37e9af6998bdc98550be7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNGIDHCG%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD8DhdjszflHmtE3fI6WwiWRlXSdpIXMs3j4sYNMJA6cAIhAO2YGI6nATvd18l5bKSH1u0l6HIid9SyNDhLHK0F8oy4Kv8DCFEQABoMNjM3NDIzMTgzODA1IgzVK4v6ta0KJALRAQQq3AOLrWKY%2FhZPdZwRzEFoq6EhjNNXMzGfDROgjJckI6aZr5tt9NwEMk2pO75qPIW8K2ZHqkuOXkTxBYpfWMmLuUfEgoohB50ZvZ1rDHwKocTk0DtA8%2BJOtlfWyv47nT1yy93ynqrD3a%2BOsR%2BAv8xk2d%2BL9Y3XUCmljH56lPIvx8Iv0rOew7l%2F3BopUDTrAZV6sJSxV4%2F%2BLHUpZF%2BxvpUKnAKvxXK0k6GSUb26dHz2j%2F4wypx3T%2BT2wXp6t5XcU5FDMm0zAqB9BLicXWoPguNn%2BMbF%2BHyEV1WPhHPQZ6X1e%2F6J4UktFOm05zhblG5L2e1bDT7VYdMf5zoUhsbrY1n4MAGCUdKzUWlyJoQ71MJgDPAyT6njiD9z2tJXcszFHOrlKqhLLUOuEmmX45Zwr1zVRO0nRisnEmpUDNyXt5e0s%2B14CmXh%2B%2FA%2B8fff037QfAoq%2BeKz0kua2Kx0W8TnbNfjhH6oI%2BZAZgvGqrAliCxuGuZ3v%2FRQge4QffUCXoI9dQ4snAc4NgdfNNjLi0edvROd5znax%2Fs%2B5b8NA4Rmhxp%2BkvoZogEEkryoVJECG1MooovlhC48tVYfaRg4Flk7PzDCbSNCBZL696YrgWTF%2BzmLPdO3JPTWF3P3pnWbeiK%2FkDCa2qPPBjqkAT52OMaKBdbDQ%2FlIjjqY3T0hOHGVRj65q6IIHN7oCzx29HM49OV%2FVmuBvleHrEEYk7q9Cu%2BG98xA0E7VK9q8la%2FLqxn1qVeDFAndAhiLisebP4PisXLLpjn1yRWFEy9T1RCSTMApdhTKzFNXnhu7sz1UDBTJ%2FvuGkMiE7KQYVqU2S8MIp5rBa1VAdzOVyAR1MMwAHRkQtXfOmhp0G7r%2FJu1dO7%2Bg&X-Amz-Signature=d165be72033c849cc8b6418c7d9b672886a4f01c3733f96c821ab9b15b3d6c0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCR3FSE6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9%2FHVmZ7yMpyHrlO46FCwcrlcAC0Mrx8Ah6yaLeQtzWwIgObCzc4D1EMDCB1hGSIanXYT1LxJ3plaJL5rAW07nxwUq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDNMJBXDbCJbguf0mSircA29iYKPwvw0a2ezOu3AF03XRoDU%2BoKIGMa%2BffPZmlyLSTC9LMVpaNPPkN166NoTB9OsdEiml8jnMLddRY9fx5wro%2B3n9Ix5%2FFQh6M6%2Fk4VatS%2BEy%2FiDZWsuqcoyp6vwcIjhNygPI6FvRnpPHwotNHtSrARcSKNTEfgYh1AQkn1eBpNUElMln0dV70fG4IoRMr1axGHEnwByS7eaqNmEMGN4xMp2HEvaxoyJjn2c9bx%2F6Z8dydnYSGQL4KVtXmbslCLzZ3m1A3VYF1AsbbYbE80v6SWAPgqW6QQ0v5PGplYqEmwRyMeL1rUUc3kNI72ar4Z%2BcYZonRk5UXlxYw%2FYGsabv4loWUcXhE9t9kQE70Ngjt%2FeDiW%2Bpo1%2FPrTsWof8bDSg2GRd2%2FSPZRM%2BwWjfn1GjbViBMu%2BlmPmTfqkpQfCLKhKPo7HMb6xGW6UpsICXNM5ASu4tdbIn1KNl%2FtlrJ6zflqpwxSyJ7YBM%2Fyuasg2GF1Jr04HVCp2J%2Fp0AP5iLMIw8G2CyYWBeGYfVlq%2Bp0GGttHP8ZTJ9AKYnhw8MZYIgl6h46dpHBZpo65bmUVeOxNmYECVddhmqqh8JTa%2F2ZyIYYZaJG2gwkJyNJ%2F49LDu404AV4Y%2BgnENGa8T2xMJuzo88GOqUB94eiKGqnyAQUddPDhjMLvOUjBD6ajS47UBNTA6p9%2FZefaZsIe2N3El9VTxJUvNk2a7mdXZq0qRYlSpf2ezxlDTf0qekbRnAUlRtFeCkMIAh6moPBUnXBiyLSVw%2B0wuVUjXWC99q9jvZCE1vGtLvgvysHhXfZKm%2BI%2FJWzFYWU1VoJJwyQdXMcejUeq3ZgGLqmJoQQ82vpZ8J4eUWTj%2B1VT4yYG2TN&X-Amz-Signature=b4695ee24bdb501473d92cd42969a2cb7bef52b2446425f768ef9a71ce05cbc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GZ7IEVM%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhk7tqZNh0zliNmELkqrEpu%2FuYsTUSIM7GYj5WVuKA9AIhAMgeUoS4Wm4iefg0uYJSg8%2F0We8emGUcJVkEnfqwUh8dKv8DCFEQABoMNjM3NDIzMTgzODA1IgyNIFou17k%2BuAP8JYMq3AMTMtOyL4wO%2FAXT86SkjeivRUdqT3bC%2FxsaqHUwCdqmW370H%2BSKAqVqPE14oIHXX%2Ff%2FU7IAzdE69qjrGrW1TztWgPopa%2FLCGkgUHTP%2BI7RAD2kOcCU2uKrVUByRly1mdLNDriHksXMIPHC%2FKwjRpBYSxavHGzC7vr5q35PpfBtDYxY7pnV26dULgspF5SdSSJ7%2FyUrqPv0UpydK4Nk5OZBjP6PPYAzwDJGtabVUUH7kXvP117Im8O8YRSekbGq1ztyw96umUii9S0C%2FzWTbi27cYs3F1aFAriUv6JPnfdv5g68ZgTWioaeXCzsE%2BY3%2FFbzVs6jQrtfK9hZCXYghb8Iu5MXqUWhV5vmY3PNsP1EKvcFwPl%2Bh5IxlwLlTtQviXAx0yftmhXWkP9oCV1JIA7uZR0Gy4mcPQWaG9bID2SlDrdSF5KU%2FDwo1j8AHKHsg3yOCJXGI3ClWEWN5JBc9WZb2dUv7siaZa%2B%2BdlYt0uAJCMuGKUVQtNC6Y5OW1wyxdOjg7WdhdCnz6RMGdNvo7Jgf2R00iaWyrSK9a4%2FjX%2B9sqOl%2BPvVAI%2BeAXKX5E1tQcXbPhqmnNynoab8K9rm0QUs6yBG46bXl82hRWmpEjQNatqoXR11Ldtj0%2FCxjGrDDx3qPPBjqkAY102KwXWqlxRfhdkQEd5fL6PcVShst08sCfu%2FiB0XBbXhzZ3Xq9uEVcF0RjsVa%2BiezEGLdbK9jnmGZLYBqTOrqjCV6ZcYz7HjNvzF0YsNWjGg04bRGcPBjb2RH3yWHLXsOfVaoSKkKnpbhLXc%2FlsvFj92N3wu3RFzwDtCc81yd7Bn7m%2BfCtaIab9z08jxkxgLqLe0cqDvLgfuCtkNB5NSN3dGOt&X-Amz-Signature=3662b04bd5f17972fbe12fca2e9b8500f9b871dde1ec33cdc92b0a79b8194ea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VO7EFLU6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDG0DYglC3qG1BtC9qRDEFO4oyFVrlwBJF83e7xPj1VEQIgXUyGNXwYX1vAvsugEStC4an%2FXBwO4Momd8SI%2BtnI8yoq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDL17G2CN%2BtgWmxLf9SrcAxsSzPTB%2FildO5ivGBkYzdnArK%2BS1dfHN9jQEuhUsP0WDRCyKXe8w7gt1o5K97u8C63dyVKSpRa6aZtOTnQ7TbmgtFcwerlSSzbctPuIchXH%2BFzc%2BO6It%2Fth3LBcJbj1S9x865m9S%2FZjbqZ9qoV4VeK19Ije%2FjWalIjcdWq2%2BK%2B2UdUpOcrsgJc0MIgZqf5PLL9vh3dQzYTUVXROtQz8No4nYnIEeMkxute9%2FHS%2BRIuWeMd74yCUDVkAfOxfz7mgJL4K5NFhOdZhbP1QVkm6D4J6aokWyXbWeECfGCFxm7%2FlTs3NjXu4mvbNMvZ9Tv8Nod%2B8qyjk%2B4Azf%2FIoZeo7IJrVbaVnMdp02qOJlcFfTl56zwDl3MLr98xPxCtDHOv4U8Uv9Pa9jDWPb2GtlrEsqHpnabqVGnztSjFsWA8gQEXXX4uzaOOFjM2tNTEyVlhKJMEW%2BmcoA8ZHZJVNdwPiLMFTQqsBqBJWiyzcZzgB2fpStEgmFPAmwLGgHX0WdENCh53Ff8eISkki67ywYYK1Q4Gi16CYv%2FXLP81tnamA869DZp9DdSAVdB4jEn65dGQQr05Ua9IU9jV0FiuD18FSvc8TajWUoO8F9tJW2hoNmjl7A%2B5B%2Bl4Usxpix5esMLPSo88GOqUBNebuxRYEhkGPDsKjN5eQCy8Kd8ldcD96StNgja5UAOx3aj78BnIHtEG7aPvMvDgqaplzimcaKoK%2F6f%2FQG2J3Am30yihLjKa%2Ftc7JeOAzO2cAhZs11aUOy01mmtmAftoo2B6uY99cpblszytuHZdTa8nkoyLjNQAhjJGJ2yDTBs42n3joSawMeonQfG3AwoR0sCvxFiEbq4kCUB%2Fjfp0nThxWJ%2BcQ&X-Amz-Signature=071b8a36cd60357649187a116f4b8d6b01e624c5243438edc1469a8cb863b10f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VO7EFLU6%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDG0DYglC3qG1BtC9qRDEFO4oyFVrlwBJF83e7xPj1VEQIgXUyGNXwYX1vAvsugEStC4an%2FXBwO4Momd8SI%2BtnI8yoq%2FwMIURAAGgw2Mzc0MjMxODM4MDUiDL17G2CN%2BtgWmxLf9SrcAxsSzPTB%2FildO5ivGBkYzdnArK%2BS1dfHN9jQEuhUsP0WDRCyKXe8w7gt1o5K97u8C63dyVKSpRa6aZtOTnQ7TbmgtFcwerlSSzbctPuIchXH%2BFzc%2BO6It%2Fth3LBcJbj1S9x865m9S%2FZjbqZ9qoV4VeK19Ije%2FjWalIjcdWq2%2BK%2B2UdUpOcrsgJc0MIgZqf5PLL9vh3dQzYTUVXROtQz8No4nYnIEeMkxute9%2FHS%2BRIuWeMd74yCUDVkAfOxfz7mgJL4K5NFhOdZhbP1QVkm6D4J6aokWyXbWeECfGCFxm7%2FlTs3NjXu4mvbNMvZ9Tv8Nod%2B8qyjk%2B4Azf%2FIoZeo7IJrVbaVnMdp02qOJlcFfTl56zwDl3MLr98xPxCtDHOv4U8Uv9Pa9jDWPb2GtlrEsqHpnabqVGnztSjFsWA8gQEXXX4uzaOOFjM2tNTEyVlhKJMEW%2BmcoA8ZHZJVNdwPiLMFTQqsBqBJWiyzcZzgB2fpStEgmFPAmwLGgHX0WdENCh53Ff8eISkki67ywYYK1Q4Gi16CYv%2FXLP81tnamA869DZp9DdSAVdB4jEn65dGQQr05Ua9IU9jV0FiuD18FSvc8TajWUoO8F9tJW2hoNmjl7A%2B5B%2Bl4Usxpix5esMLPSo88GOqUBNebuxRYEhkGPDsKjN5eQCy8Kd8ldcD96StNgja5UAOx3aj78BnIHtEG7aPvMvDgqaplzimcaKoK%2F6f%2FQG2J3Am30yihLjKa%2Ftc7JeOAzO2cAhZs11aUOy01mmtmAftoo2B6uY99cpblszytuHZdTa8nkoyLjNQAhjJGJ2yDTBs42n3joSawMeonQfG3AwoR0sCvxFiEbq4kCUB%2Fjfp0nThxWJ%2BcQ&X-Amz-Signature=5c04b675f29518f66d4ae2f32a12d4b9e62628091b7ffc58605d73f682953b40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PXKPJTF%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICgOIui6jcAtHBegVCaoLsZVARS5aqSFxEVCLlnY9EgRAiBUA%2BBzsgPKdd7V3N3fZsGRs4a25oIN6lBsJu6ZIe6rdyr%2FAwhPEAAaDDYzNzQyMzE4MzgwNSIMQ4sWHf%2FNPqkx7uMqKtwDkVLZRU0D58V3gplzj%2BZMLw0bvQPBvZ%2FBZuss1CfSa2E68X7NkHM0l5YLgODZOsPs1l0JpqJ6ovXSTG6qKJPA1JybMU%2B%2BirZ4NDRZQLQ%2FvxrDcgx4nL7yWCwbiAhsoGqxdyp8SKxEAo9fsOzc932Zf6r44aPnBqlu3Sxr5d5jtapi0zxRQlzB8W9dz5jwWEe9Hn9wxHeel53vgRSasev2dV%2B6wWJxYwwzy0zsnKZ1%2BC7dFVzmmR%2FFz0Gtkq%2F2pScStZQdi4wtiYcqSirB9qpL35mvu9Cp5lNfVuYkAk5iPXEc3hIUgJ16lXv8oS456M4Oui%2BfjJybRrohhGMtCHNqG6du4f6fw3dhBXnrhAO%2BLJUYNJKIfsWsju6JRQuSYc1Niz1KeFeJ4iLo2rWKwyHPsWCdrGg3RrCJNz9XJ96wL5SFsQ0idYStQbY36UflT1%2FOCxhs4Aa64O9lgcMQRMKbQb5H5aAC6h2AN%2F%2FJQlVxUT7HqUKX0vGjnvx4uRaFRk5pctFNq5TYhqtpOq8ffSYIwZ5ZbCpJJ7LnKHn0Wyr0SAPYyTAZc25PKU2hNdQ5ylKpltb%2FCCVJxKe6ryeYFE1ZbcUHSk5yIO2UcSYpGSyVYlDt09%2B1M%2BaPDO3jKikwmLOjzwY6pgHjrOBv0rFiR8VxHAy9Fw1n9v2F%2F%2FaNtJQm3rYkWtdibgCkYQsHNXFiPO8bkGKBAOR54zAjs5n6z2zhniecfVj1wslMY4hoqCegQ3f7EFwrOyQFgbBf%2FeeY%2FAE7dsBCzEtFvmbL3%2FglPf9dFW%2FI93trrthsdmQfq9zOjrNwNwi4VxIVs0%2B7lxYzYFtELmymHKD4hyGwh1IV85F5Q73WExuXQXaB3dit&X-Amz-Signature=2a88e817fb35e564f67881889ff893646138bd91667965818c1405ed07de0aec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLANKZ76%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF7Snyl6G5wra8R5LgDISo3pWUqc%2B49WDoVHtxZfcqbtAiEA05c6cUz7wdwW0OZDGQ5Ir1Qx6IlLV3SMMoLZ59B0bcYq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDPAo80pJ2GmLf32fGSrcA%2B3VvIIfNns4J1voF0domfS4zkL8jwd1IH2s9ytluuZoZvhaivpv6nSv1B88a1FniKUgPSi147XwRo3S58NrcwX%2BQ%2Fd49fUGjm32SIfJS4FsGI%2FffjKYdKVkhDnLg8dtFPzi64DvzAIvxSjFXcGA7p7h%2F%2FrDcRfO7djyvROPy2D5FuaTJOkYO1sO1D5LBg%2Fsl6mI8T5J95CzxDkjEGkdgEJCIvet1ZdKPnA4iniiR8%2F5%2BNc%2FoO4%2FLgDMb3NltgNfccaffbk1qUGVazkwIDSF9ODTveDxCkMSCY5scVO5Kz4YQSNGogfk9WRhc1JUtty3KAXXHyPREfmgeghqSE19J334WRSHBLAvWZsmcDKBGl28wVV2yZ3MJXUlD0sYlQEqn%2ByyOPlBmdoaMSZXhD3Yx84o3ykPYOyMpkMOcv%2BEVgh6NBmGBXsEeyjCXxPWcwzPDqBrTl24Utufyj0uyT8F2qM5R0drVnyV1kKwqaTgPFn3BfsU5ZDFLSVrQ4%2Ft1Np%2F0Ek1uWk8Ne3Xaio8tP%2B4yoK5Drzy1eE2e4zjx%2BANBodQMBX0YqzvfahmlHO6bWyHha69PhwC%2B7vWEgCbaITPaForMnYzOB6wTNXOc1UiZ7gPh6M8n1%2FJLN93rTT0MI%2Bzo88GOqUBbDbYgdX7RVRq7mZXobgJ6WXt4lzdmrr7wQqYdfm%2BLWjUczdqIhFdWnjYw%2Bal4SoAEmOU1%2FzxHBVV3WKopBTB%2FakyWWYpkUtHHVvS3%2FYLEHp%2Beks3bA9jnh10N%2BtZ0PKyFA9bhEkoK2F9Oc6bhJkOqpJNhukRMemuXTDCYGbP54eA5ZbcSyMu%2Bvxo88DRRkdzV59QFIr5bam8HlgiKuh%2Bg%2FjrRwqM&X-Amz-Signature=ac70b6ff204dc5aeece459ca07caf43752d01bbd71b540373d7435e2449834d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLANKZ76%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF7Snyl6G5wra8R5LgDISo3pWUqc%2B49WDoVHtxZfcqbtAiEA05c6cUz7wdwW0OZDGQ5Ir1Qx6IlLV3SMMoLZ59B0bcYq%2FwMITxAAGgw2Mzc0MjMxODM4MDUiDPAo80pJ2GmLf32fGSrcA%2B3VvIIfNns4J1voF0domfS4zkL8jwd1IH2s9ytluuZoZvhaivpv6nSv1B88a1FniKUgPSi147XwRo3S58NrcwX%2BQ%2Fd49fUGjm32SIfJS4FsGI%2FffjKYdKVkhDnLg8dtFPzi64DvzAIvxSjFXcGA7p7h%2F%2FrDcRfO7djyvROPy2D5FuaTJOkYO1sO1D5LBg%2Fsl6mI8T5J95CzxDkjEGkdgEJCIvet1ZdKPnA4iniiR8%2F5%2BNc%2FoO4%2FLgDMb3NltgNfccaffbk1qUGVazkwIDSF9ODTveDxCkMSCY5scVO5Kz4YQSNGogfk9WRhc1JUtty3KAXXHyPREfmgeghqSE19J334WRSHBLAvWZsmcDKBGl28wVV2yZ3MJXUlD0sYlQEqn%2ByyOPlBmdoaMSZXhD3Yx84o3ykPYOyMpkMOcv%2BEVgh6NBmGBXsEeyjCXxPWcwzPDqBrTl24Utufyj0uyT8F2qM5R0drVnyV1kKwqaTgPFn3BfsU5ZDFLSVrQ4%2Ft1Np%2F0Ek1uWk8Ne3Xaio8tP%2B4yoK5Drzy1eE2e4zjx%2BANBodQMBX0YqzvfahmlHO6bWyHha69PhwC%2B7vWEgCbaITPaForMnYzOB6wTNXOc1UiZ7gPh6M8n1%2FJLN93rTT0MI%2Bzo88GOqUBbDbYgdX7RVRq7mZXobgJ6WXt4lzdmrr7wQqYdfm%2BLWjUczdqIhFdWnjYw%2Bal4SoAEmOU1%2FzxHBVV3WKopBTB%2FakyWWYpkUtHHVvS3%2FYLEHp%2Beks3bA9jnh10N%2BtZ0PKyFA9bhEkoK2F9Oc6bhJkOqpJNhukRMemuXTDCYGbP54eA5ZbcSyMu%2Bvxo88DRRkdzV59QFIr5bam8HlgiKuh%2Bg%2FjrRwqM&X-Amz-Signature=ac70b6ff204dc5aeece459ca07caf43752d01bbd71b540373d7435e2449834d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YYWH6NU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T155911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEtuUslI%2BbqB6bvs2ficTUpid%2FUdt%2BfvnpezH1rV7FdWAiBxiV4VUFOVY3tq8%2BEyO9zpnHn0LWX30eO94X1coNaNvir%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIM9%2Frg9mJ5Qr2xvPMhKtwDwFyus2cggLTa1Ncuo%2BHqwKYUNL11mvlhHLUeMIzxjB%2BpwEGGLGKjvbIcG7y4R8yr3Otd8wE5qSbDCmaS31EK8qCSZI3rNnYEoU2otnRwTHY5Dck8cyEMzLSh%2Fw6puKfQt7ScHQ6pCPQP3atTJAfAUIXtHkcOqMI3ytizLJWHJ7Ph4em86W6mLXvV%2F%2Byy6RK5IXL0QydjwHrWoOK8le5NEGAz7l9ZvtHQj9ibBdTiCEf%2BuyyqdAReLOaPgxdE%2B%2BfL3r%2BdIqf%2FVu8u%2Fn82MdtTgCAFbGCUpgL%2BAXDLTCBcmUTrHJTJRFynhLJAAZJd40%2BTRqUsxnSiqOtjjLBvBTRBIEPlV3ZntykqbgqDb3K%2FJpSuthv9N9rDqRrlHUlvHmv9uxQlSnKDG%2B7LsE1o0mdpBY0fH7oPhxtOxCSFxhIC2yYWy6CwOPYzEdQwdUj14l34WbAUrvTkjWbNhzA0DkDVchbLiYiiZiaBPDuMZAlb4EAEHQCh53YRVZoGyI7BqKuxV1YILonThnf%2FWAPLRkiCjDXFgJpD4FdwFgT9GfICJiy0nrx0XM5rj9jHYIZo%2FWVhjEVDjwj4iryfi1bESX9mT7wcu%2Fp0BvQaP8pYNCyxOi0mzEWhxSeJPss20LQwvrWjzwY6pgFIVIRXOCPlp6mJo%2FwvqOUaqxYo5zObK95h7VjBXyxnB89Dminawhfm7U7HHpVO0D0lqqwki7oevQr3Ri7%2FCMHY7fXOKjxKjSuZC5fM3Oo1XgWwGxiloxGp9tAJcdYXgCF4VLf06Ur3%2FhWy2pTWzOS%2BdiVswIT%2BB5t4qFqgQw8VIoQHeaR6Kkhs7TSyhy2pJj6MKyEb1FCB7ob5BxngDf6gv2SzNmpc&X-Amz-Signature=f116992c549a23200b3fe4fb1c1e0911bd644a8494962a59041c0846cff71934&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

