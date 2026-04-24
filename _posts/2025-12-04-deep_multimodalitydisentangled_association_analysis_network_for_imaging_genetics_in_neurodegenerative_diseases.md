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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM7XIICT%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxkWIXPLJ%2BIJKPJEXQxr5u6tMojx9URESpa0QnGZZpiAiA8fO5BoIt9Hgkm8mNt939pSJ6K1Be4JMF6AsSPMwBGUiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvsUd9e1SCulKocmWKtwDLWchgeHh06WJBfmAbDA7fE%2BxwVoMJrTmRtYGyoCtiJjLeZ8DSlmrvtRdN1aKUEnbJvE0O0U2IHZto%2FxV1Vsze%2BJ97yT1y1s8CsNEb%2Bass7GULu00PYXwUDXLDVeY2LBLdG9wswu%2F6BSiH1q1o%2FoDDMNg01Cv%2BEtZXKY0UlSgsEz%2B3lU4epQbJY5t92UE68AH0I2pVYeGGzP6vKiNkX19yhX5CXnfSXoEkVQTlemgvZu9eQolAMZFImYt2NO2yg6bDd%2FQe0ktDCmTfs2TiUqBOxo4pwyA17qzqTzFV6scUysDXkemgZof1klK5cvieE8BP1Y2TG4a8QZ%2B8H8fSmauT3dcsTf8RaPF8xQNZDAmXd4nmV0s5B4zTdCyL8IJYfrzpa22UPn0DRVG%2BgSka3b5KPiAMeos7mDA1RZI7MCum4Ti8HMfhoSLfqNQBQP3k3xCXQJ3RbcS2MeV8fbBxIByvfxQ%2Ba1ac4MHmqJ8e6vQQvtCqK6lNxKD0ZCkT1fcZoyYl8acXhQuq8J%2BHAO%2BeIRBHzBDYoAF65orJzmAFmblcoX1FUmnqMr%2Bn3WYQBdSEQJEjvjttaUM1itHp97xV9LMjZx4UI06XkytNo3hRI68oalPAozW1U38mQYOU3owgY2uzwY6pgGkKUfu8zRgOwzMVjHKtKCQ3L%2FAbsC76%2FuJRJr4njs9R5b5%2FVXTP89ns9r3h%2B3X3KfIWpoRpypQaNbpS0sV0tf0Tr2bDYOl42XSqpDYSOswQ3bPXVxfB7g7yNivjuyIMDpxV3kRqO%2FV3QKrX0vXJ0LScYKD7%2BtBTftIdTZQwGZ4Sd5pvhMHBblb3%2FByIfeHPQTNcwQg67pukOYCVW00AZ8yEbIVzMxU&X-Amz-Signature=fb0a02bb55a64220014b010023eb77df560ebf368c04dd9af4eae9e486329bd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM7XIICT%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155504Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxkWIXPLJ%2BIJKPJEXQxr5u6tMojx9URESpa0QnGZZpiAiA8fO5BoIt9Hgkm8mNt939pSJ6K1Be4JMF6AsSPMwBGUiqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvsUd9e1SCulKocmWKtwDLWchgeHh06WJBfmAbDA7fE%2BxwVoMJrTmRtYGyoCtiJjLeZ8DSlmrvtRdN1aKUEnbJvE0O0U2IHZto%2FxV1Vsze%2BJ97yT1y1s8CsNEb%2Bass7GULu00PYXwUDXLDVeY2LBLdG9wswu%2F6BSiH1q1o%2FoDDMNg01Cv%2BEtZXKY0UlSgsEz%2B3lU4epQbJY5t92UE68AH0I2pVYeGGzP6vKiNkX19yhX5CXnfSXoEkVQTlemgvZu9eQolAMZFImYt2NO2yg6bDd%2FQe0ktDCmTfs2TiUqBOxo4pwyA17qzqTzFV6scUysDXkemgZof1klK5cvieE8BP1Y2TG4a8QZ%2B8H8fSmauT3dcsTf8RaPF8xQNZDAmXd4nmV0s5B4zTdCyL8IJYfrzpa22UPn0DRVG%2BgSka3b5KPiAMeos7mDA1RZI7MCum4Ti8HMfhoSLfqNQBQP3k3xCXQJ3RbcS2MeV8fbBxIByvfxQ%2Ba1ac4MHmqJ8e6vQQvtCqK6lNxKD0ZCkT1fcZoyYl8acXhQuq8J%2BHAO%2BeIRBHzBDYoAF65orJzmAFmblcoX1FUmnqMr%2Bn3WYQBdSEQJEjvjttaUM1itHp97xV9LMjZx4UI06XkytNo3hRI68oalPAozW1U38mQYOU3owgY2uzwY6pgGkKUfu8zRgOwzMVjHKtKCQ3L%2FAbsC76%2FuJRJr4njs9R5b5%2FVXTP89ns9r3h%2B3X3KfIWpoRpypQaNbpS0sV0tf0Tr2bDYOl42XSqpDYSOswQ3bPXVxfB7g7yNivjuyIMDpxV3kRqO%2FV3QKrX0vXJ0LScYKD7%2BtBTftIdTZQwGZ4Sd5pvhMHBblb3%2FByIfeHPQTNcwQg67pukOYCVW00AZ8yEbIVzMxU&X-Amz-Signature=fb0a02bb55a64220014b010023eb77df560ebf368c04dd9af4eae9e486329bd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMFZNR5N%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGwy1nW2Jqd9bsCiBqUuqmsuuaq5XkrlEgMsZ93YlhIuAiAX%2Bt4k9RKnGEMfpguvd5%2FW4p9A%2BSePU161bEcBKF9s6yqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMY8cHEKbyd4zl%2FUptKtwD3c3I8jdFndubzZ%2B9WjmDcWuVnC1BJ7G9JKG1WH71MWH2VkqWzfOLmleBd5vtKgWiqtpPBi6G%2FkdqpVK4Gay7ZqC7nYcyJDdjHZBU2CTjpcoKxzWqg42VB4FjNuLggV5JeDmkC%2FU3cwtqdBblKmE%2Fe19qPPbB5XbjKZ3Iau51btqLXkzynuJs0pY%2FUfpeZlAAB8CxuDF7wNXCjzp2YKKMqaSw7poy9cEPxPL1U%2BKEG9EF5nk9mzZj5TVG%2F3tSTU1rifw%2BEazKTHvFbpG6ZPM%2BNXqxuNuhpemmLWVu0XIKQazMw4XPMAF2ovMOcjRwohSIb6ahgvWWLK1f5o24z9%2BDS2WOG82mTeAPSO5Qjiud3Uy8eK3FYD0VhmnL12eo4zEO8k13Q0teec8agTwcyWR1gKUWG96f8w%2F6FmlVScnpiQk7Kzxgk6t8V%2BQktrNbep2HDY1gAU0%2Bm1Q0u3uULQx3EFN4%2FS2dACxW9KFRVvh7aTjwOWHm%2FMezqrPilRoPsREmkgKY00hBj6MxqG1RcH830QTUxK%2F%2F7R%2BeMoSGvX4n4mPaPgOk99BAbLdeWm2iHBXxEUJknkQVMH3zv3njWr%2BIRGlXNdBUB9QOxKhukaxL9pruo%2BdLM2uCRcFb4UIwhI6uzwY6pgEhVVB8%2BSmdIO9g7ZETGZ2KTvtfh0YD8YN23RI3Sax2Xmvgp%2FtSP3YZVJBFBPm8mzZmdMfD9i2NURFPKYXLS88hIPhDCgn51Np81DaT0HLY0a2ibmEjpWmVxs8uqs1Dkd4LCe%2FA1Phcj6mX6M1q58Cka3WWQ4w%2Fa3h7vv2E64pvhImqjnx9VhmmGU%2BSbcDFo3b%2BdpMqqW2Ai7hEJAkRlqrM0O1%2BMs4b&X-Amz-Signature=b6dced34a78994054bef8e397f6c1e438008605d1435a990c7f267c660abd73e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Q2MECYZ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAyQ8EFfN77lmXrQTJ5r0P0pdAkwbTb6IHbXeLaajtaRAiBr9A1YMqFYoRFVjX6NBSXV0LWu0750B2MCgvcp%2F%2FSplyqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9vntZoPrGSRIxPAjKtwDx5pJqKWIrBZtKwRqM7P2%2FQxVHy5egeD%2FcJTbE0Xqb2uRGBCRr4KSQVO5pyhFIEoaCr9ThouC8K%2FIF30MHTPdMcIfgYCNhAXx3LSzI4XwN%2BJxpCaa6yZ1UgPBWJmZ%2FCgaCTiTd0diNyevU084eUMlqSDWlrC5Ybla8%2FXAiA9mnZKSg5qFGNolNl1fRB9hy6OSQq7P%2FvF2iq1csF1ffz%2BLQzrOqGXsa5RJAu6c21ngVyeLPnxn6Ur%2Bn9YSLKnqF0HbbPI0%2BIZJ3Q%2FNp2NRb3VbIP0VCKLOkecO1ZjdeQjYpH6ckB13FS%2Bt8VYYnbBPDASnRoL4j65nKh6kXpUGAGUMfkYOvea%2FD9aWOvkrGoaTb%2FRARASV%2FZ7%2FXns43v5LqTE5VsUVW%2FgA12Vjee5FmYS3sd0iOgs2lxKgIU7XspIq0LmQhPM3YEkbPaFOZm7mL8DDurrxowB86qiwJbPDHHqP%2FHrFX%2BBvG%2FuNrTulrBrxPWb88Cc6xSZeeAaTJO7egsGJswq1YMowKVbJnyC69Ni6%2F%2BdqhNqHuKJ7GLpss1HvTqyIAHMwK4pmUejtS31wi5j5pxDuaYhrHGReZOX6SlVGZeRBW3a5J%2BMlZEb7xiUm0Et99yJTmrqr8Rhn5gQwkI2uzwY6pgE1nhNxZPvZV5nA7v55eQC%2BeYyguEBnaKcCqH4MRvxB58fHXpqzAHN38UCiYjmJitPS0kBs0uHLmtNmwKU%2BNR%2Bn2eJabPF%2F%2FObZaZgmozGzCbtRtp9UzEY%2BOK3YPszR7rz4clK0%2FIKFLeqsXrmeSlNCKL2OFZjid9jxmMnkNDchLv%2FYTWSE5nFbpdBIHws9TWvn16kAX9%2BYpF4Rb9DO171UGTmFBJkf&X-Amz-Signature=570674d14473177c424c56f9399b8c3e379c5d3584a95c4ff9542d6e02e66792&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Q2MECYZ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAyQ8EFfN77lmXrQTJ5r0P0pdAkwbTb6IHbXeLaajtaRAiBr9A1YMqFYoRFVjX6NBSXV0LWu0750B2MCgvcp%2F%2FSplyqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9vntZoPrGSRIxPAjKtwDx5pJqKWIrBZtKwRqM7P2%2FQxVHy5egeD%2FcJTbE0Xqb2uRGBCRr4KSQVO5pyhFIEoaCr9ThouC8K%2FIF30MHTPdMcIfgYCNhAXx3LSzI4XwN%2BJxpCaa6yZ1UgPBWJmZ%2FCgaCTiTd0diNyevU084eUMlqSDWlrC5Ybla8%2FXAiA9mnZKSg5qFGNolNl1fRB9hy6OSQq7P%2FvF2iq1csF1ffz%2BLQzrOqGXsa5RJAu6c21ngVyeLPnxn6Ur%2Bn9YSLKnqF0HbbPI0%2BIZJ3Q%2FNp2NRb3VbIP0VCKLOkecO1ZjdeQjYpH6ckB13FS%2Bt8VYYnbBPDASnRoL4j65nKh6kXpUGAGUMfkYOvea%2FD9aWOvkrGoaTb%2FRARASV%2FZ7%2FXns43v5LqTE5VsUVW%2FgA12Vjee5FmYS3sd0iOgs2lxKgIU7XspIq0LmQhPM3YEkbPaFOZm7mL8DDurrxowB86qiwJbPDHHqP%2FHrFX%2BBvG%2FuNrTulrBrxPWb88Cc6xSZeeAaTJO7egsGJswq1YMowKVbJnyC69Ni6%2F%2BdqhNqHuKJ7GLpss1HvTqyIAHMwK4pmUejtS31wi5j5pxDuaYhrHGReZOX6SlVGZeRBW3a5J%2BMlZEb7xiUm0Et99yJTmrqr8Rhn5gQwkI2uzwY6pgE1nhNxZPvZV5nA7v55eQC%2BeYyguEBnaKcCqH4MRvxB58fHXpqzAHN38UCiYjmJitPS0kBs0uHLmtNmwKU%2BNR%2Bn2eJabPF%2F%2FObZaZgmozGzCbtRtp9UzEY%2BOK3YPszR7rz4clK0%2FIKFLeqsXrmeSlNCKL2OFZjid9jxmMnkNDchLv%2FYTWSE5nFbpdBIHws9TWvn16kAX9%2BYpF4Rb9DO171UGTmFBJkf&X-Amz-Signature=9253e5ca68b163ed7c6e65b8351f939433aaeae16704a6b538d65ebc0bbbb884&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLUISZJ7%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9a%2F9hxK0qDMJJ7C%2Fteyu%2F3vaDN%2Fr%2Bb%2FIBoEwHnRDMhgIgOEhSnB8lghOLjWTwcpENhv4L57id%2FdI%2BzEo3GAQ37UsqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKme70fuKzFVYddNBSrcA18qE2gT2LMNY%2BBIqfvecx%2FbD%2FmczJCHOGTKKMfmMs%2FdhTzZiGYQ%2B6Em60LmXeXMKJx5A%2B4%2FYnZwoYACLsDTqhS7vEi74cXgRioLLBpWso%2FL0cfC5otmr6nPIenA8iKceqCGCl2X8Kb%2FYGwnGPO6KJCbuLfezNd9EJ%2BJ1ClTWk6kgXf0U4W1NoPe%2F0ukqquezXIRTzT9bsZCzluYpuTf2uiWBzepxejI8DWF0vL7sIQZDh%2FoKjI0iq%2BNJEtV9hXCKk7fU8cohcxzspTbL%2BvngBq0Ahl47zG08qClAoMDVHTQbc1yTFYYpK7Kt8AQ9zyXKT9sEMunJIQ5J8UN9i931kENhFl1bCuuBG1iOgTKJ1H4mvwiqkACpLmJqH3nfGf4EVVKAHydGXh3xvX57wXGm%2Bl4lYW%2BtQHFwM7hQA2qXQcx5lB0o50dhqzADRVHgU45y53Wsj0YPwtt8SwM%2BRFOTXQQ91mtDERPz6hUlS%2BFU91Ko9nleUuw0xzJeke8eeHW9kcX4evhh%2BajF%2FajKZbzOn1bq61ezInGWkGbQdzvTe3DyTMOQe4XYJ6PL%2BfGz0%2FBvaucMInZhzJ0AwPxB579oVtGe0mMNlKXFZFXoOUbRaw2sJSrzixYc2Pirr61MNuOrs8GOqUBKMKlD2HYX6eOWLdS2DNuro6fSDFEi%2FKPI8iHKk8wK3iwLbmq7xuVDWq7jtS%2FH1xUptac3hGQmQyS5HVp4YQiwIv0J8R7lQcP84O4E587oHOdNFTQuGLnzbea%2Frt8NPzeR8xGAWXTWDjKcNW8SIFlaBQfb5jqn650VFGK8fohVpC%2FrueQj8bePU37FL3FkIRUYuY%2B4ePS77bnYGIdv80OXLYEaFrj&X-Amz-Signature=ba9009eb87ab5caa786b79f34c10ff2cc0dbfd732bf6a383fc3edf959ab78718&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJQS7KN3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqRdXAcDKnFBO6ouEJ7BlB%2Bk8nCO40shmGdr2V%2BVoRCgIgJswTzY7wQ3BAbB6N6wFvpJZFUaQgjEa5iMA46DUKmHAqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNURri2x7T7ZE6kEJircAxxsAlmyPoGXupgiuLa7tzMrOttauer9NnI1wirQ9b%2BIgaOZvZzsuWo6pBqTu3jUkPqRGUBK1wvg6pwjM4eDWMJRa6Glc9GdJWNe6VM6C6bw1CxL7ogQb4gMzV29MrchN%2BZjFKzPsXwd%2BANKHZPhfM7NQG7sVvPC0TQUm5ZMVM%2BLDkDgI7T94%2FrUcxzVSLeUgLoVF4MphJrpz%2BsF6F4IOjWdT954CXX76C1e34IllG%2BhgfK0mDIXty%2Bhl65tg2NtORqNQhJiiCtrUYPm%2BZtk1ZbeDIKqNhcqvoHcA1ol%2F6KC0uvDNQP1WPLZrtvi3Tcaqej5AVvlkXsjHWHUplZE5mx6rs6ianslKgLOrDVBNwaF6h1Cy1C7oxu3YY3gF7X15CsCnRyo9XwskbF3FHkkZ3EmCHU0rIlcCzwc2waWdzrsC8D9QMGCPmuCYke2OhP5IqmCAwGhP6UFRJ2NlyAgQE1yzD%2B6Kdk8v3Kou736dqjDnDlyQ6ZNtXd3eW2ImOlNggIPY272pPv1kBfF6du%2BCBJlsmIQL4Xq88%2BTbc5JNwyYWr%2BSbSaWKJ%2BTcpisuzTo1%2F%2FMctFSsCeYCH0dNPx8crsn19orpAl0dorpI6L4iUVcHq42bpR4mSfOrwllMK%2BOrs8GOqUBtgzE5b7zt4Xq10qO%2FzHyfjpRtbitbszCvxYwSTP%2FsI3Wlxjiw9KzH8I6jXZz2gLcrO5CRA%2FB0saWJA8m3G6vI6%2BMHqECpdarxejMBHslj3HioozLIg8wkL8HYiprAM3Y6vfauC%2BLkj7DQyNhpodsxLjLaj7DMvxFrrUZgUqQr24Yzugd80moeSi7LhWF4BkbbPBUXoYiXkiLP%2BEmYxhYl1mlAaF2&X-Amz-Signature=88c226732ebfbd73191641b47efb3c6e9811336a1cbffb582c168a50ad587f15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTNVJ24U%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAQiaOrDXDScolN0laVb7DqNebs9pawnzfBWKdaui3bFAiAK7w2DzcvqrsrJMXDqGHzqAY%2BuLvALO7fz6P7OUk8H7SqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F%2FLLhYada5Z91tdWKtwDPzUPIKCBMst8MMTMkgKb6DqAXcOfakmc2M8BVY15sIK2JuGV%2BGoM7z4Ic6BE7To5bgJn1117KbnnqqHPmaabEOKlnVYpcF0i0BVVEyswPgQmaK5XbM%2BEqjN%2BvRm6w9dW%2FLa06QkM04z46nDNQZ8JOP9IyklXmu7RooaXtmZXc39yP24AJW4%2Bu4pDhDPJ8sXlBu6YubELzvhxjtTVtBtaJP593tKNBTvYDzYd%2BVDQoynQzYeSgtn2AwvsndQ%2BnrNHokXKpc3ymm%2BKO1rV5d9JDMBTHtLmNRdzSkNcdulqDsqeNmasQoR0PSbhbtR27ZTQPGOSFJ9Pj41%2F6tutQA01JbFvBXtLWkN1JQJaXAuQMcApC6CYulNaq5GINCOq3wQ4XDg7GUwJrAE%2FpwOUjlAUQXGiyVQISaDw8Qc9NfaQ3lX53BcVc5Z%2BwnPv9rP38TaWgnsM4REujHw0LAC1HFmNyrFxnU78MCDUPML6YSozol8KXydSSCsjOWHe5nnPh2ikWXYSPHcBIK7ZvMcqO4oiG07vWB4%2BYPV%2FNqsWj6wUFdvEiAD1M7r9vtcvJWls9CnS2NilB4UvBAOCkWkJwoAZSF1Z7uz1jjHMNcw3mSly%2FN4kgMZqEz6lkwDsAbAw946uzwY6pgGJ3KMom4S9uQTiF1IjZynXYOW1D6Srn0UNkQ5r6ZniT789ga4LIueuGwOBpZdETz4UabKg%2B76YSQIdEBEFBiQls7%2B7Adhkor3BsJGftNGVwGbbuKbSe5AzB%2FuKP88I60aklqvgWhZp6vWLKjqTkCt%2FK%2Fx6rREYaBVZatuDvpQ0du6eMOQcXHS9J9O4VYz1mOWN9uJWd90x1jp7EBLCuZmnINZC8jnB&X-Amz-Signature=954943ec606b7b0ab849cadb592b648abc03ce2e77b964c6713aec829ad53a61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGVDFA6Z%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2BKqOHEp8OLgBUn5mJbNLtLYU1u0QBuxJwxVLBcXgWZAiEA%2B%2FZYjetHO5zHTjUjP4c1qPZd5EowqqG%2F4Q4SgOr8wkAqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCnJr%2FKEVlf4qUJjPSrcA4DhiRB5q4d3gbhT%2Bn1KoD2is1CH%2F43KYdtC%2B4qEYYbDcjGeMxhTRLraW8X4%2FBg%2Fm5AT53aHGLuwds0djuMb%2BpzhEhER2%2BFchM1gMG3VHXsKw%2BWjThfe9%2F1U21o%2BbLeaCspWxuPxgqMR6faUz3YTqUnmIckmtf6Pp45eUjD9UMNc%2FPEM7T11%2B%2FUeoJq46OtMiY3JuQ4i4QNzyb5wEfSx%2BiNiP91SIBFSLxs%2B%2BTSpSHhZwhv5rUvt2UXcvzkysuVVG7u5KWYcgoJTgI2BVJ8Vswn8uYG8DfTE4ZY0akzxQ2g90ckZX81LnWIXinDRpYmn8lHtLQxpGIkdGlPC9%2FXMRC8zC7%2BW0B3pE25Guw%2BuIs52qknDwcj7eEdo9CUxWvqZDYkt3BtrYSHkYGkFar5Mp54AJVhg9OP6CNE5e2WyO8c%2BTaaY7l%2B7AGa61jd%2FSviyevQ%2FU2NzxQXXo%2B%2FzdW%2F9ZTs3Oyauwhce5PNT%2BVdsc1XBkqFZho3p15Iei4Z4xSwRCxxYbDVi0AvYW3MVNlvVDqsYqIgWVlBpkbqx3upv8SBC6AUh7BZiF%2B6%2BvDCUyvBurFu3ENjxB0zKNaBES1QgU5CtYGZ%2F0yVUbdkmZkDBqCoL41eF4fQWvvVuTgKnMJmNrs8GOqUBalhfng1DhGox%2FKOgm0hHlWmWJUT65VBdxUI%2FbKXqNATrv5goJoIeO9%2BlSbtZ%2BoBLlVhw6r0sXUARkAKIuPjDqMBJHhGeF%2FJ%2Bwg%2Fa2cMathxlkI2W9DY1KN2TkydFxoa9UYMPGjq4dOX8F1Wxsn1b%2FjZEn0RV%2FnlCSEtVQnXVWw136VeeE%2FMw1otuTVyIp2dsycTcd%2Bsr6LhJhSdufiISrBISHbH%2B&X-Amz-Signature=618dd0361bfe7cef58a097d6bbc8eeaa2be41a69a2d7208f779c0b7f5e519881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGVDFA6Z%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE%2BKqOHEp8OLgBUn5mJbNLtLYU1u0QBuxJwxVLBcXgWZAiEA%2B%2FZYjetHO5zHTjUjP4c1qPZd5EowqqG%2F4Q4SgOr8wkAqiAQIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCnJr%2FKEVlf4qUJjPSrcA4DhiRB5q4d3gbhT%2Bn1KoD2is1CH%2F43KYdtC%2B4qEYYbDcjGeMxhTRLraW8X4%2FBg%2Fm5AT53aHGLuwds0djuMb%2BpzhEhER2%2BFchM1gMG3VHXsKw%2BWjThfe9%2F1U21o%2BbLeaCspWxuPxgqMR6faUz3YTqUnmIckmtf6Pp45eUjD9UMNc%2FPEM7T11%2B%2FUeoJq46OtMiY3JuQ4i4QNzyb5wEfSx%2BiNiP91SIBFSLxs%2B%2BTSpSHhZwhv5rUvt2UXcvzkysuVVG7u5KWYcgoJTgI2BVJ8Vswn8uYG8DfTE4ZY0akzxQ2g90ckZX81LnWIXinDRpYmn8lHtLQxpGIkdGlPC9%2FXMRC8zC7%2BW0B3pE25Guw%2BuIs52qknDwcj7eEdo9CUxWvqZDYkt3BtrYSHkYGkFar5Mp54AJVhg9OP6CNE5e2WyO8c%2BTaaY7l%2B7AGa61jd%2FSviyevQ%2FU2NzxQXXo%2B%2FzdW%2F9ZTs3Oyauwhce5PNT%2BVdsc1XBkqFZho3p15Iei4Z4xSwRCxxYbDVi0AvYW3MVNlvVDqsYqIgWVlBpkbqx3upv8SBC6AUh7BZiF%2B6%2BvDCUyvBurFu3ENjxB0zKNaBES1QgU5CtYGZ%2F0yVUbdkmZkDBqCoL41eF4fQWvvVuTgKnMJmNrs8GOqUBalhfng1DhGox%2FKOgm0hHlWmWJUT65VBdxUI%2FbKXqNATrv5goJoIeO9%2BlSbtZ%2BoBLlVhw6r0sXUARkAKIuPjDqMBJHhGeF%2FJ%2Bwg%2Fa2cMathxlkI2W9DY1KN2TkydFxoa9UYMPGjq4dOX8F1Wxsn1b%2FjZEn0RV%2FnlCSEtVQnXVWw136VeeE%2FMw1otuTVyIp2dsycTcd%2Bsr6LhJhSdufiISrBISHbH%2B&X-Amz-Signature=217dbce825ed3159f60bc5ebaf4fac1408bb32559bce4d22d21b475046ca733a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VM3LHN5P%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEYoT7KOKqj1QS%2BJIf4B9DrtTyam9pwkE0K04B%2FX%2FKfeAiBWVzQoIQsUhnkTn5mFzUBx03dMmiQOsZmjyTQjlhhrYSqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzGkYPGcPSVrMf%2BRZKtwDceqP5poOU5%2BBl0dHuNrfKh89i4CgKceZ3z6FkrkTMauqFZ7AGMPSnfQ0caTmGlRriydqbr3DfAyRfcEj%2Fbt%2F2wcRD6uaHdpB2fswDpwnIt4DLBGJnpDaIi8hwbL8tmEaaaMYIu6ZGV%2FNX%2FFA%2BGWxirO6k4ngP8JIFMME0OnriQVKeSgZkPaKd%2FKtzmAi2ZR89%2F2NnenpVXuFUAV4gKuhCeJlIgoBmOy40qEofFImFcrggfC9euJ9pVQocWcIxVtohrVwAdlquQbmXlxRKC0VB94TTi8jbPdLLLDAu%2FT7jj0Om%2BkiPnZ3fWKIgDnVXTUqbgmUu3%2FrMRa5kB3jPsBZi%2FQWgIma7ARIBqoIUAG3ohPlFZZNJR%2BcqNU3s5PNrUyLp27gUwkNfMy9wuGUGiCiBcnxYjm%2BCR1rrSZ%2BUqRymtEh46Vf0Hgd%2FA45gfcIM9TqwTIyMof0UWFHMjoNC9FpytbelYkhs9t8EIA93zCUgX0Ad8X2DJBgVMOADrsNpaeL9GpXQw0m5mQnq88muPogvkD8c7GDrW2ygJS%2F9rm5vpUmZk%2BF93QIfQ3ZsDFUz4SaVx7r4XGYtyqw10MUzo5w9inQQuUXeskAOmVvDGuii7x3aAU0t9wlkUGMX7IwgY2uzwY6pgE3Ivxs54SpCna%2FRIUl%2BIHbIeisPPsxCoup%2FJk3lRiPNfIf0DfKuAAR7FFWz8lwLAgx%2FvPTOs2flgX4gKQuE%2Bgw6afFw0jGoufO%2B72YH%2FYoUine4VAJiT8gO4vCLGF9l2qdLh5NRAxnsSWjIZR1eldYI2%2B4pTcv5NlbXmp2g9UjXHhQoiwZnGlHPizh3b92I5w0jfqVaG9f%2Bgzl%2B3ZOMOqg0qrhTWAA&X-Amz-Signature=e0ae5d6cc317d331be5534ee864c2d6e9a79ff97ec6ae10affed71f480c50aeb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665O5UCQ6L%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeVqjAeOSjIICAiPT%2FwipxI2E57BQflz1ecfzofQmtBwIhAN0BHOMeMmrfWfYZLuXSZjQsSywXf97g0uswM%2BoirwQzKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxrXLbuhek2fgtuo3oq3APHCkZftCuy70AO90zCwJKP9tlpyesFSYuJqxMyQ0mLVGmX5PgLpbu3mhifB9N51axkWZD0ZsfoOIEwi%2BFfgBiWlfWdrPzRvXUzngE2j5%2Bxva%2FPzu3hhVolIMfL5zxWtqDJOuBs6%2Flnd4sJlq4uwQWPyN8whDSSP6DQBCLAE79yaptjn5O3zAy3g1oxMszjS4gqoCKnTBDMuXMIqqmGeeMowfyfTg1P5T8ZFJWBgVj7OF1WTl3wLRrFIB%2FTuRhA6McF8%2BQLqL6UUHybtfdGf%2Fjnoix0YFBQYP83tvyQdQByWCfcRyk%2Bk2fgSesbwXMTULZWCHDQ6BnkfuCYJ2mnYYjIh6V3mgXp1pWlSREXUUOJJb5IFBCzkOyeopeDHlWnRMpqVJe73EYPVgSswioqu614r%2F5LJqQUcw16HpUpvQ8TFtzbMukGS70T3SZbJ7VUHH65uWd8G%2FB9xx7Usz0XqwKJK4ZMfZYv7XshxyoRsVMTcGmhdmg7kfb6t5VryRXg7Lv92W9MzUaDB97to74e9oO3eg7YedSkmAsc9QFSEUEbAeev6JZKzwk98lk4pUKlJ9oCyVnBMLjivdbXmr2%2FtWW0tham09%2FzTR5n8tPRUO%2B8hT1k5IAkCSOQUWlJNTCuja7PBjqkAfaDhiqJdaQEDWLAaUhF1%2FFh%2By7C04rmXU%2FpsZIHWZDVtpUywmsYRLAEEQjbvCjJGYKop2uS0tWWS35dKxpqX7pOQavQ4nAAAr6MxwJhHZNkT5DgIV0OvdTEOYsah8Wg9iGFzHf1GEmGX78r6G0514702Jlgq2GSKLO7NoyfEZ305YbxUmsrOZ%2FmUwq%2B%2BSJNMpGU2VUl59P4vZ4uriZp%2Fk9DPU%2BX&X-Amz-Signature=c4dfe62533bae6922e268b2d50a0b3427b5b62d6cf1cf6930e7f7f431854fc7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665O5UCQ6L%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeVqjAeOSjIICAiPT%2FwipxI2E57BQflz1ecfzofQmtBwIhAN0BHOMeMmrfWfYZLuXSZjQsSywXf97g0uswM%2BoirwQzKogECID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxrXLbuhek2fgtuo3oq3APHCkZftCuy70AO90zCwJKP9tlpyesFSYuJqxMyQ0mLVGmX5PgLpbu3mhifB9N51axkWZD0ZsfoOIEwi%2BFfgBiWlfWdrPzRvXUzngE2j5%2Bxva%2FPzu3hhVolIMfL5zxWtqDJOuBs6%2Flnd4sJlq4uwQWPyN8whDSSP6DQBCLAE79yaptjn5O3zAy3g1oxMszjS4gqoCKnTBDMuXMIqqmGeeMowfyfTg1P5T8ZFJWBgVj7OF1WTl3wLRrFIB%2FTuRhA6McF8%2BQLqL6UUHybtfdGf%2Fjnoix0YFBQYP83tvyQdQByWCfcRyk%2Bk2fgSesbwXMTULZWCHDQ6BnkfuCYJ2mnYYjIh6V3mgXp1pWlSREXUUOJJb5IFBCzkOyeopeDHlWnRMpqVJe73EYPVgSswioqu614r%2F5LJqQUcw16HpUpvQ8TFtzbMukGS70T3SZbJ7VUHH65uWd8G%2FB9xx7Usz0XqwKJK4ZMfZYv7XshxyoRsVMTcGmhdmg7kfb6t5VryRXg7Lv92W9MzUaDB97to74e9oO3eg7YedSkmAsc9QFSEUEbAeev6JZKzwk98lk4pUKlJ9oCyVnBMLjivdbXmr2%2FtWW0tham09%2FzTR5n8tPRUO%2B8hT1k5IAkCSOQUWlJNTCuja7PBjqkAfaDhiqJdaQEDWLAaUhF1%2FFh%2By7C04rmXU%2FpsZIHWZDVtpUywmsYRLAEEQjbvCjJGYKop2uS0tWWS35dKxpqX7pOQavQ4nAAAr6MxwJhHZNkT5DgIV0OvdTEOYsah8Wg9iGFzHf1GEmGX78r6G0514702Jlgq2GSKLO7NoyfEZ305YbxUmsrOZ%2FmUwq%2B%2BSJNMpGU2VUl59P4vZ4uriZp%2Fk9DPU%2BX&X-Amz-Signature=c4dfe62533bae6922e268b2d50a0b3427b5b62d6cf1cf6930e7f7f431854fc7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QDTEAPS%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T155516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHg97TJ9vKqZg0zZJzykLQ3bpZo6y5nUl6jREruOu8J4AiAyFrjTYwIrg6F6kMp1QoykJW9wGopzUR3YUZQkN3gYISqIBAiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9PZkJ2EE2dGuZK%2BgKtwDJZfLlKXkSHfVVLuwnC7zJ5wrvVKBc7RhpndJKaP5xQKmrenca8sjP6kK4yw9LtVd0q86S1wnIKiTiavZb6C63qeUIMyM8t3UJmt0RnJGv796AvdxyW16yEM3TJUR8KdYm9lwnCHm1uuwT6xOVDAYEy6rE2PULJPJ6qL5AsKLnWH5FYzOxb05OXTFoaccE6pe%2BfvYDcD8YLtlHUkD8FRXa2jJWZ6vNRLRHfLlT4Bl%2BTC4Jx%2F9xS6d5UBPQEGNHhm%2BRmlsMJ7BTIbgA%2FQ4GLS%2FALlyqOHAb4M8mVrqQ1hahR2IrUg%2FLsvVlRUomXeNu4PYJwW4yTS%2FH%2BsxEvcaSUkfPD12d9swtGWGCMoqSC7RGXoisZTRoYl21%2Fh1QG5FZdTO4qdDckpUXNSvCqQmpqmzG%2FjOoh4WNL4SxGPGmnFbYGwsSebMMuXvWEfvbJbDfmE0YWiRKm4Cj3zylWFJU2a21s69QfayCUBuhgAZGL7rCijdHSNkT1MPzR3eNz18NnmbKei1bnu4OFOOqufdCCVP4BqiAX27xDtNwkWRUgqbqqs3RPB1jDzRN8R3OAoTMHPXywi1acTnDT%2F821cOzLPRdfZDf4dHJHknuumy7GBT3PbeK5h3xdcu2Vix8gwwyo6uzwY6pgEpNoPLQAieNlVgcodqyR3UmFl0gL%2FjjDsfgNORGluTtIFcvkYqcvKX6vr7b7y1Sc5bmj5XlbSyxjUzIxE0ob7ShZthfl4ph0M0YWxKOI89IceJUnaEw%2FQcWn0a1UF6ec6TDeZV9W5mKBzu3t4AazbnwIA02Ra83Z%2Fwou7uH4XdBnqnqEp%2BoztuSGzN8S8O8DHuj3S01q8R%2BEZAwPjej64LkxBUSolM&X-Amz-Signature=a19917ccdc22337813225b25d113563b40bddbbab0cfce4f6065d6eb68cd3c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

