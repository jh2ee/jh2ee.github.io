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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYMFPUUK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDHoaCyh85COKbgQDKFPErx4dlWP9CRRKu%2BvjY%2Fm8Yi0gIgAzi5E%2BQrcYfOvcbB71cCuQr%2FtsxECZ32Sp0EUkZkSHkq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFSB9HFqkIDXh2H1cSrcA%2FxifVXeVqgoCESfDGcJzLGH7bXp5mfVqELZIdu1vY9%2B33w1PsQSvaH8mx169pOnIpinhCLl5xoHuzxF9s4E2hW5Bzs17KdGdy95V6nOkw8TS6OF%2BKH%2FC3LPra6yeOj2KnkXQPY0v3Q1EeqWRITSGWrKRwOh1zbPn4sJBGnZ%2Bt7W8F0TNV5Sx0PmBbvG1DGVUr1fMBUwOjZvJkqXlW3vUx2dC%2FLoxuB1Z0YeJSwBS4cyUytxRYM4Gt%2FSxGJie%2BFLafpejc3Ay7jd2idFZVAZy32FlAiwwnZiTDj4hEgOHJ9ZZ8%2FfR1o0I7nDLbBGFIht7xN%2Fydyt24S3w30UKBI%2BnTVcrkqmHjz4kzNv5oRMjcFqnXKmDka4y%2FZ55Zi8FM40UmbZOJzh3lRg7LHUyaQnyP1l18cSk%2BWrPbvk5%2BXhw6PsFtstcoLwnW%2BKOF%2BfsVzkbp%2FzkAr341989iBQehJBYOIDCo4A2VDxwp1aqQUqutXFAqb8En19XQ9UufpmNLaPULRA9xeFb8YNESCZ7JqM3pix%2FmvC6LKmTQ5zsMtm8gVQVUmap%2Fk6Om%2FqxoKQUCh6e7vK2kwYDgQn7Tf6ydygB2kTkc5UiUPQH98cUWW5oVh27dVX4pNmEJfLQSI3MImg2ssGOqUBZdeI%2FFrFKeRTW1wYc92Bb1fjRMUSS8UTifdkxvdGGTCtaZw4aHdH2NxF2HT7Mq8uycsj8lMz4%2B71w0L%2BgV93qIuDjep8PVF%2BcxL8r9tlZNTd8Y%2FWmwy1%2FhF2HyYJZrJkpgbVN1xY9QjXPWZHw206TxfQ650DkNftRsSPnkjozDxILnGM7yWA44p24oG%2BXgmE4pDPW25Gv5Wnt%2FvOjTItMRDtzFV6&X-Amz-Signature=b699670f56376a945c11ca272b3ed6b1b0f206af7c9f364addcbb138f732f60b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYMFPUUK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDHoaCyh85COKbgQDKFPErx4dlWP9CRRKu%2BvjY%2Fm8Yi0gIgAzi5E%2BQrcYfOvcbB71cCuQr%2FtsxECZ32Sp0EUkZkSHkq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFSB9HFqkIDXh2H1cSrcA%2FxifVXeVqgoCESfDGcJzLGH7bXp5mfVqELZIdu1vY9%2B33w1PsQSvaH8mx169pOnIpinhCLl5xoHuzxF9s4E2hW5Bzs17KdGdy95V6nOkw8TS6OF%2BKH%2FC3LPra6yeOj2KnkXQPY0v3Q1EeqWRITSGWrKRwOh1zbPn4sJBGnZ%2Bt7W8F0TNV5Sx0PmBbvG1DGVUr1fMBUwOjZvJkqXlW3vUx2dC%2FLoxuB1Z0YeJSwBS4cyUytxRYM4Gt%2FSxGJie%2BFLafpejc3Ay7jd2idFZVAZy32FlAiwwnZiTDj4hEgOHJ9ZZ8%2FfR1o0I7nDLbBGFIht7xN%2Fydyt24S3w30UKBI%2BnTVcrkqmHjz4kzNv5oRMjcFqnXKmDka4y%2FZ55Zi8FM40UmbZOJzh3lRg7LHUyaQnyP1l18cSk%2BWrPbvk5%2BXhw6PsFtstcoLwnW%2BKOF%2BfsVzkbp%2FzkAr341989iBQehJBYOIDCo4A2VDxwp1aqQUqutXFAqb8En19XQ9UufpmNLaPULRA9xeFb8YNESCZ7JqM3pix%2FmvC6LKmTQ5zsMtm8gVQVUmap%2Fk6Om%2FqxoKQUCh6e7vK2kwYDgQn7Tf6ydygB2kTkc5UiUPQH98cUWW5oVh27dVX4pNmEJfLQSI3MImg2ssGOqUBZdeI%2FFrFKeRTW1wYc92Bb1fjRMUSS8UTifdkxvdGGTCtaZw4aHdH2NxF2HT7Mq8uycsj8lMz4%2B71w0L%2BgV93qIuDjep8PVF%2BcxL8r9tlZNTd8Y%2FWmwy1%2FhF2HyYJZrJkpgbVN1xY9QjXPWZHw206TxfQ650DkNftRsSPnkjozDxILnGM7yWA44p24oG%2BXgmE4pDPW25Gv5Wnt%2FvOjTItMRDtzFV6&X-Amz-Signature=b699670f56376a945c11ca272b3ed6b1b0f206af7c9f364addcbb138f732f60b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XATRH3UR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIEwJjdt1SB6gS7dyhPm%2FjFEvlBMDEa5fUv%2BN9uaEYckBAiBPh8Zpv7C0BC8h8C3sLQ3RIegoggezO5NxDrBKzrz5lCr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMCH4zFKM8JdkE46VmKtwDURT0g3u2aZ45ru4ecnj0i9MIAQ0q88rhMEuEugDf2FyO1lEAEeEOKuL%2BoCFe03yGtsFscBPIjnwV%2FKvGUAi7H%2F2lPnmPQgLA6A3Whzze63s9bzHllq2ugeLX4bxe8nI2ggTuvhK1CrSYhpSHM46KT%2FNAglWv3e9mDuM0FTOi8OgLIPWl7dwmBxqvGXYshM%2BzcXWzFMd9Ulx6B%2FR6hF0AHgFz%2FqkUHJU6sKrmSdfGNwcUomW9Au1MQJOF8Tp0GPHcsrDbbuMGSQiZSYOFsmFlGQ7Zzo4cuKMeiLUHKFSc4cDdTng7QnxTCDW4or9AMrR6npzDYDoS8En5kDLeHtDO%2BCXfQHKIOf9IOBs2n0Jn9YjZH%2Fqh0cOFVSbQPkDeorDwq525bpPqBJxB4BUG8DH0i0oBL6BNNT16c%2FdLpS1LROJN69%2FvbUk%2BPplvBDWPZhpWTEvEwUWNfHwVtYLsoUE0o9QnGQKM6PCjpaGoYfqWGeTITaMgfVKesfFQUIx8YYyJcMPAiOeCd5yXTk97oytaGeyna2OZyJMcWqJdPr14Ykc6Qab2IAl7icpdnzige3wWDm%2Bfw9IQgwsBSFjStDUJdw8XQO0hddlIDtxdG0N41W7oOShky1Fg1AKc5BswsqDaywY6pgHM9VMPgKbg116vKuj%2FDFtSXekcKkBUmQcD8Rx9RvXfW4sE%2BR7DaBIAZwOesf1S%2BeGfUOlc5JXUOfeR6xCrW%2Fc7W3vj5YIuhV%2FjgLVwur2yT8pN98zeECKZUm3hyGMjSOr9wZuK9lIQSxDNCgeucYVJ%2FTxUNs0tV4ZcdeG3nYui26zGQ0%2Fya1%2B8WMPySihzPXOCZzF1%2FS68e5cMvVytNxeC5y7JAFDy&X-Amz-Signature=836dcfcad78b0ee5d40ca313252af9103b674577f3f9f90a2cdef1e4cf0e271d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFYIQR47%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBe3n56HRwtfZXSVR0ZTbeGdzFRI3aVt5c0FvYLBzVsKAiEAkrEX5qEDoPZFH7N0jsZb4fbJ3k4Dc%2BvOG1dxoKQ4u%2FIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFsyttqKXpx545WTFSrcA8y1JAjcSCTqaiL1qQ4FZRbkYriD5N2%2BMlso6vKc09DbrTGQXrUjzmaaqPQVi17eKwBxYK4ftBrWscj060QMNpNTCKfo38fYax%2BtXo%2BmLPfOcjuCjUW3CH3uI2Q8NIWaj7Xoau3Eyg2OvU7Cxk7tbnCa%2BDCxH1%2FNCY4vyHM7bOctJHbI%2FaH8iVUt2YQuvHtJXvVQVyDL6jUtFarWiQ8PYc6ebeuozOeOQNUeMbchI8zL2HmFH%2Flp8XVuRHsgcfKdH%2FgB%2FqGXkpookLJekdK%2F8yPqjt0wyR6lNZq8VIL7RtEAhlhmIkjvRCNBhmxBIGVT%2Ffpnlf8ojHH1BTeEtdRcaW8WnIWcm4vvPSdBqdKb32wIQYuG3mWE8nVjTJEym4jc7NTe6pcypmywbxTWAA%2BJw3joxCDd577%2Bgnn9jY6SFd3Ray%2FMfZwzRlZxOPp7lJFxqHHkX%2Fc3I5KvjmxXa8tVwBeN2CwkR7Er7urznPa%2Btthe9w5K7qHlXQtTs%2FsRht0ryMfZ19R3xkpgkk5z9FW%2BRzqbJpGyrTLU7icu1iwDstk2Wx%2BBFi%2B0wIZ6lxOjbitrEcXonqAet49aEDzIZsQg3VWPhlJU5v2b%2Fg3DHlzg8uPQWseRlg0%2BHiDzA5c6MI%2Bg2ssGOqUBIlePDHsMVQcWqMqtqXPhS9subgTEHwuqLpcN%2Fh9zjo7UeoRNsBrYoilCsOdH0Bf%2F%2FaFgSMVnQy3FIB%2BGElFMRlauTo0syfx9hb2PEmvwJGA90Qkb33kcBeGXVYa8HaegevNw1GNc57zF4y4CIH6IoIn3jUZ1ycT1j4byIXHFTFUdbG3ecJimdF0m0mIikSHI0pSe%2FGU3Q7yZtyXZQn6e7ps8xBRB&X-Amz-Signature=67df886c5eebfedf361d2c54f1e9d28f391567776866a61d0ff5594bd6d4bb83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFYIQR47%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBe3n56HRwtfZXSVR0ZTbeGdzFRI3aVt5c0FvYLBzVsKAiEAkrEX5qEDoPZFH7N0jsZb4fbJ3k4Dc%2BvOG1dxoKQ4u%2FIq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFsyttqKXpx545WTFSrcA8y1JAjcSCTqaiL1qQ4FZRbkYriD5N2%2BMlso6vKc09DbrTGQXrUjzmaaqPQVi17eKwBxYK4ftBrWscj060QMNpNTCKfo38fYax%2BtXo%2BmLPfOcjuCjUW3CH3uI2Q8NIWaj7Xoau3Eyg2OvU7Cxk7tbnCa%2BDCxH1%2FNCY4vyHM7bOctJHbI%2FaH8iVUt2YQuvHtJXvVQVyDL6jUtFarWiQ8PYc6ebeuozOeOQNUeMbchI8zL2HmFH%2Flp8XVuRHsgcfKdH%2FgB%2FqGXkpookLJekdK%2F8yPqjt0wyR6lNZq8VIL7RtEAhlhmIkjvRCNBhmxBIGVT%2Ffpnlf8ojHH1BTeEtdRcaW8WnIWcm4vvPSdBqdKb32wIQYuG3mWE8nVjTJEym4jc7NTe6pcypmywbxTWAA%2BJw3joxCDd577%2Bgnn9jY6SFd3Ray%2FMfZwzRlZxOPp7lJFxqHHkX%2Fc3I5KvjmxXa8tVwBeN2CwkR7Er7urznPa%2Btthe9w5K7qHlXQtTs%2FsRht0ryMfZ19R3xkpgkk5z9FW%2BRzqbJpGyrTLU7icu1iwDstk2Wx%2BBFi%2B0wIZ6lxOjbitrEcXonqAet49aEDzIZsQg3VWPhlJU5v2b%2Fg3DHlzg8uPQWseRlg0%2BHiDzA5c6MI%2Bg2ssGOqUBIlePDHsMVQcWqMqtqXPhS9subgTEHwuqLpcN%2Fh9zjo7UeoRNsBrYoilCsOdH0Bf%2F%2FaFgSMVnQy3FIB%2BGElFMRlauTo0syfx9hb2PEmvwJGA90Qkb33kcBeGXVYa8HaegevNw1GNc57zF4y4CIH6IoIn3jUZ1ycT1j4byIXHFTFUdbG3ecJimdF0m0mIikSHI0pSe%2FGU3Q7yZtyXZQn6e7ps8xBRB&X-Amz-Signature=5248b45dfdd898081e4d0b09c5f909c695f85c92afe9f36ab939c0b96d8e60f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4GX2CYS%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDv%2BeWSf8WvwW%2BGVTzjUIzYimnbmQiwE8jYnIfAFx8CMQIhAMMXcz2TEMrB5v7evsSQc97E2YyTUJQmzjbmZHXVp%2Fi9Kv8DCC8QABoMNjM3NDIzMTgzODA1IgxtSPDTqYvckptQPWAq3APq4T0Z7LwrCg7J3ZovSfIxr0PGNxSGFDwctxciWuqY4gzEZJLJVHGWgfcdPWngTs4luUd192BFdinJtt9PT6cGciSlCzZUpol%2FEEMq65EhjYwArjn4B3hPz9Xi2GQ3VkG8L7WTrVnry3YT5PrutoYKHM8q7rQO7%2FVYFVKSovfXuxNBEOzD%2BazoIrzWe96lIq3LYQDA4Ulgi8CMR1HxCcOph51JGOzShyxruqzQELQtFYoG6GPykAcrV2%2BTpqaghTTI5xt5LBUcEnGS6pSigL3nIQhTzzXJO8lAhZ4yUDemr0W7faX8ckMv1%2FWPr2fPxE0VsntHaeqJMty%2BBUmuai8v0BM3Pn8XqcFF0vwdnXkXgJ0Lk55hjGgp5NjOAZizS8zdNpOT9EaRCIWKgayLxOFWB4tnTgSAZP9xgyOqewFmD2Bo5HxpyIcco8vf9y5sIQV%2FcFe6ehYX%2Bi2QCg9Cev4SfxZWRDLyLTUz8kDzsPmnb1oR3f5N%2BHzIKzrql8NmCGTNEoR76Dml2VuwFnZLCfbkRsBVKo4IUXRb4C7MTUw5Um%2BkPkv5gfIVRs%2FU9QGgNfNr6JHM2leOADNvWbVKge1ujQIby%2BkqvOzeRQuSkrglQHb2A5CsKMJXGkmwhjCwn9rLBjqkAcs6AaP83kIEr8NuL8UiGQEvRSMs3XaOg8Wwb0iqFDLEHwB0%2F9pEtzn5MSg%2B8L3ETA4axs2j0pITZEl%2BUI6Jp6lQ5LgXExGvH%2B4F6uS8lCeqkkUHu%2FDZvLy%2BG%2FNMezdT29vJhACxM1lfyU5pxTaoK%2FeTtQit83yBlfuXXXP2UCg5tFrRHWWeejbZXlqevCioB60ImgAzeJzGJc1tqEHTf1CEMU58&X-Amz-Signature=b137352cb8db33ef4fd060d8395cc52843bb019731a20d6452e8bb5f0911bdaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWBC4J4Q%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDeG4sBWDdYLyMg2rmXEyICNBvSYFhame2%2BQekJ8%2FJRDgIhAM0OckiYQNhBfYYNCFQMSKnqsavY5%2FiecHHJm%2B8XVR4pKv8DCC8QABoMNjM3NDIzMTgzODA1Igz7cF5LFh5MKhip8zkq3APOVFpGRiohV1uqMczx2pbUnaVTvc8V6v6dwb6XfT0rOKKRap2QwBvcjk0OAm8lxLUUsmMcvZs65rcJGxSmXHKAjpb1R3JZ6ibNXVP92mI%2F%2Fk2e0RIlCSCpq9%2FkLhz7loerXJXgXmKZHrQC3Fi8WjvuJlANlZ6Cpx%2F6uhkY8QspXmU9Q5dVoWkbxFJqYD6Rde7c7f3fASGTaKvSr%2BP9nlIrvDf7VImnaQevfAvQWmTVSzc%2BHupO3w6eO8MHhf1Hwih1V5NEivBVGcIU79O17JxFqXzua7CCDOKt3MHtBNsOXxvPl2Of6qIQ5OskuDv7rn8pn3c1NAOQRIcLYPtUqyekaw%2FadHN%2BEHW0mv0vE221tGZfONpBfJS4u45w8qUqHq5lGw%2F9WuCimQTqyfTf8gCeMZ%2BXurW4Yv9xkzDk%2FSwZrzYG%2BjJBPlXp3y%2F75YZRIzItA8ms0UuDaLa39LNmB98hh9ABGWnHA9xJHXOAe7bHXqEPaWyJqcilZcB8ZjLzUBzGvMfLgDxnPjPSYunM4RG5bp9EXU5j3naibgbsM9TAxkw8CAlsUFiiZwcFlgYwrpNZ8byrzFVLOxOXxovJxjaJ5E1dPRemNW9BwhV6SiYMnX36yzoe6xea8tyzETCToNrLBjqkAc9KSyUvp%2BGnrC3sPEtm2q5h8nTTugJinPx6mOlbmDmY%2Bn5Mo2dJfIfT90kVY5b%2BzlOzTjoPkuPx8FbWK0rteBpmklqxt94%2BaB2uXuAUCMt1gNWm4iBa%2FiXqkj7PdPqxa8TZn0v3iMZz7gWAYs7E0dpDu3BXD8tzEpgdAnQ2oh9KeBmFqKVJjcKA6wfX5Ed%2FKYYvNogYFy%2FskLEulS0q1VlUKOhN&X-Amz-Signature=c7ff6d4b1c06e025ec82538a2d4e7896390c65961b1b77293b75a433d254494c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ELI5ZHN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGyc57dc21Yn9KdVIZMzCQWF%2FE29N2bn05LTFm9BEUOYAiBfA7OH5vZdiLquggzgkCaA22%2BTEKgKhEYu7r1jRIYYdSr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMbc3MN4%2BfoZsPlI%2FnKtwDjPsLFm4Kqh4qGIXMcOz7vyVKexmAET8Gv2CctfhCs1adiQcvInOgOjIJUfpNUq8U3McB9DOs4nVimtrX511dDUrkGHEbjIJff1R3Cd73NdlkwdLYV%2Fr2KZwdvMXYUBO8YEI6mBD89QgvE8xcu1zN1g7skrvIegyVB0mRmezVUVdhwdyLIU6%2BdqCviqw8fxhk18F3la2LzzIJyyw%2FLCdz6ktSP%2B62%2BcpkEN36iXEejJjJX2Wunq6CcQNIekphnXo9z6KrG0F1Kjowq9EcOMFo4H7c0t4y2x0iu1woKV4dKhGXS5D6wu4ak3hz%2BqRDHE9b5Nf8EEPzwFsUyAkI56ElcYLf7i%2Brj%2BbFzyzt%2Bba4BHIbVxMEk0PRV4ArwbvQ5riy%2BRUxnUYpm0me0WJvzCw%2FoJM%2FlpE4%2BAzCPNnmCsIsDQARx4jESUavk5h%2B6akGH96lGol%2FerWaBfHdRRKKjQSUx9ElFLwA1MG721hHcDwlzeEUX2QaUGZ1dJwFAqvvKmLLm1KfEle%2Fm7ah7VogUNB56OWBhojnchwceYchQ%2B85JvDEDMWiOTZdX4JII3MbhkiAj27yzKSxmirre0Os0lJWcgm1RlezXvxg3HcTIvLoFNlffQnigPs2IzwGHlUw%2Fp%2FaywY6pgHJrYr2uTZmYFdf8e0sOLmt3TXMVKyW1NW%2FLFQaZRRrFxX3AAX9RrVQfMQ8DE2xhix%2BmfjtmhKDzAaJXLII0M2QI7XaqWbknBI6sPl%2BUwVrizTUxms1NvScOKj0l7mPWtKvKWi7SXNDzR5DgQHaoLyN7JQK3dqLuvuOjEzdMY5iSJxgXfYU8B8OGRTyXlS9kA70Pi%2BLZsQ9ZfWqR%2FuFsqPNJXoL3NQl&X-Amz-Signature=280318de734ea3ec6a6a28bf137a5ac79989112c6aa90023f12e2b2757450f46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7IC2NYR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCAwRFeAxLuRT6uGoXZuUuV3g0pfBja8qJ26LT46BZ5IgIhAL84jlqjPrxa1BoXmhJxM0NVXpFrdYE5vxM6%2BP15k9EuKv8DCC8QABoMNjM3NDIzMTgzODA1IgwE4B9OfSNQVgbNqqoq3APUJhx5H028Z2bBxE7A1Lg0nFE24GbLpBUcXOrd%2BTP4zPjq3B5qJKgmeo%2FF%2FRYM223vTs4cg26YwsgHKzRfzQl2jQC%2FTUF%2FcLkh%2F1109ixJ0yJLdmt%2BRPKDKHrLDIUyjcH9EtFC29rkRe3FR%2FHVK%2BsuJWh16f9Yjx1RUp2BknYIejK0mOwVAtbkImERJKSIzHPk%2BFb28cW6e6puKtJgyW56HsQhbi1tl199yy6wTu2h%2BZmYOoeNHatMoU78rEAklghjR92ooXZvaJ8TXwp9Z6Ci6rVANu%2BoPBigtCdpJXmxCggKVxVGAZ%2B1rA2EKdmTYW6Oree9z92qn0q%2FpHREbVRm1HqAJbF6HnjrjWj6liHZ2qG%2BAV8TEk4inUmClbCoy1vNYB58Z70qIv5qdZ1FghpX0gjOa66fkWfDktA9RZ8vVVkGs3DyWdWnBMGGAguaOU9PPTUoXEYI%2BRq7UyOqwUjw%2FLH5LgndJMYmSDHaFJTn6RAtEKLF9Fj1NIcFb6rKQdW2Xn94lI6xX8HjWlTt1Zsd3k%2FNKXuW9RC2polx4x85WkjVJVyXvT6KcMlzBfcSod87kK%2F%2FIdneqYZPoXbcrnpcbpGnc8ID5Ec2ElUMPMPMxWTAVLrVKHZvieRhazDEoNrLBjqkASziSPAOfriXANp7XgQNvwRzMAnJT%2FkX7ZTapi9Br8G9sulleXXfHaLiiZppyP4su8EqkjfElBZz5okI%2Fhys36eHf0CWLrncXckMg89Z109iAwGApVo91ekrCffsPIjiapCMMUcHxgscBtDXWzVl62VjapGOEQAFh1p309YDp%2FfDRnPk166Ax9QFSuRn0XcGf3m0FvrnFUdplP8eYi1M8DacVFV9&X-Amz-Signature=bde43cf8f4c42adef337c289305144d3a6ca07164ebefe4eddf243c746a7ee80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7IC2NYR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCAwRFeAxLuRT6uGoXZuUuV3g0pfBja8qJ26LT46BZ5IgIhAL84jlqjPrxa1BoXmhJxM0NVXpFrdYE5vxM6%2BP15k9EuKv8DCC8QABoMNjM3NDIzMTgzODA1IgwE4B9OfSNQVgbNqqoq3APUJhx5H028Z2bBxE7A1Lg0nFE24GbLpBUcXOrd%2BTP4zPjq3B5qJKgmeo%2FF%2FRYM223vTs4cg26YwsgHKzRfzQl2jQC%2FTUF%2FcLkh%2F1109ixJ0yJLdmt%2BRPKDKHrLDIUyjcH9EtFC29rkRe3FR%2FHVK%2BsuJWh16f9Yjx1RUp2BknYIejK0mOwVAtbkImERJKSIzHPk%2BFb28cW6e6puKtJgyW56HsQhbi1tl199yy6wTu2h%2BZmYOoeNHatMoU78rEAklghjR92ooXZvaJ8TXwp9Z6Ci6rVANu%2BoPBigtCdpJXmxCggKVxVGAZ%2B1rA2EKdmTYW6Oree9z92qn0q%2FpHREbVRm1HqAJbF6HnjrjWj6liHZ2qG%2BAV8TEk4inUmClbCoy1vNYB58Z70qIv5qdZ1FghpX0gjOa66fkWfDktA9RZ8vVVkGs3DyWdWnBMGGAguaOU9PPTUoXEYI%2BRq7UyOqwUjw%2FLH5LgndJMYmSDHaFJTn6RAtEKLF9Fj1NIcFb6rKQdW2Xn94lI6xX8HjWlTt1Zsd3k%2FNKXuW9RC2polx4x85WkjVJVyXvT6KcMlzBfcSod87kK%2F%2FIdneqYZPoXbcrnpcbpGnc8ID5Ec2ElUMPMPMxWTAVLrVKHZvieRhazDEoNrLBjqkASziSPAOfriXANp7XgQNvwRzMAnJT%2FkX7ZTapi9Br8G9sulleXXfHaLiiZppyP4su8EqkjfElBZz5okI%2Fhys36eHf0CWLrncXckMg89Z109iAwGApVo91ekrCffsPIjiapCMMUcHxgscBtDXWzVl62VjapGOEQAFh1p309YDp%2FfDRnPk166Ax9QFSuRn0XcGf3m0FvrnFUdplP8eYi1M8DacVFV9&X-Amz-Signature=9a1de3fc692882b3fac3dfa399bacb1723559899432fcc87fb8279498abfe2de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ET7ASBZ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIFUspOxOX7OqEY0bZEUbjM5OO%2BZbOrUwi6o3MehTsh1TAiEAyD3IX%2Bj7YXY9yeHL32oC7tXYPlKU8bpriYFL7zAYiJ4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDHftPm9iRF%2BbkjwyeCrcA3UNgE0%2B3UwzTcDp5jhnf0K1AfHM6Gu%2BOrP0%2BqfitcpX5ybyBoE2GcIx7d%2BK6L5F%2Fz3aP2yBnyEdvCXx9qkTKBYlMMT3rn2Cvxeq8W1L3tPcwPX2me7HYeahGTe27ezxJvrtk00Ldb%2BWJuSRSZ3E9flJaohvZAkPcVVSH7VlUKoZBk9lkjiGS29%2BSWKUJIw%2BHMmxWMp9ghjIIbJUtkuie%2BII4tovf37jt1uD5OqgKCk%2FeVme250ouJDl6Bkn%2FD6D5TBD1cGxoxyi2AM1UuIbtmLxviUEPPSl2mqcZwNft%2FGWn%2FeH9txExvUamkXnU9%2Bj1t0UfU1aESIM4DscJXz9sllc5a1qCum2%2BAvxvyxPygRP18BUYr5Ms%2B1UgnitIJxa3cgAkwr%2BcpZw9rDHdtmaCptrEYmBIPSCDNYOSSj8rXSmzPtFul4hFEGm%2FQNEuiZrVW8yZTI8JQO81JgDJhWNuS5GAC0hEbM4jgWvyT923yxn0ru2dGONcM4rFYlzO1mKxfUQSuSnY5jhOBU8gX1kgd4QeiMXgW9XRqs2cEgXlMXPCd2EnyqmJgXtFceyQFo%2B45xWQ6dzNUABOgsBBhUYB9riS7gTRHBNkDm9IHIJY90ZF%2BWAaKN6zUNDRjS7MJef2ssGOqUBLWFTPkyFaFH3SyhlZ18VxvBUFlydSohPRFWmI1TlMMlhBxzpnXqo1qxSlTISeuSKxGGRXzN87fIGQgMu8Tc%2FTsh7%2B6qkWWbdiu1ghFRV%2BY6qKeOTYVmdcnBVHXtSLW0rPTOX4ZMwrhe%2FaBy4XU7nEy2PwJb3w9jiBfDSv%2FJFvXLBnmihUz4djKWb%2FPNuZKsTkYnSAe21Z5OMy4AgEyxQwXHQXxr6&X-Amz-Signature=cb9bfca4b8ea29da20f979b8e70cbb262485ed21594a8f73efb58cd7dd7d9d26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6FVNG3J%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQD0CJwQlRfmv1H%2FYBN5ATekSvgDss9RSqgKIlHOYPYLhAIhAN9Bc7MeisHjCLeqcOP2gsbb%2FroDfRT2lVyRaAxCFYR0Kv8DCC8QABoMNjM3NDIzMTgzODA1IgwZsam3YkhiL97p91Yq3AMEksowZ8tnzIkuymXjm8SZELxdAjjFyD%2Bt06oU6DA3gcfEpjbr3f453mMnMDg9o73lg4AghoiR%2FJPnVDrc4pvt3sTbEc2rTNnbrByI%2FN1FmYjvUVnlz%2BueGL8%2FxtXr3dEl%2BFYU09l6AL78sy9H%2BcguKQ7FCRKoG5URPUE5WozioGHzmIKiMtWrVxEasy88xqinZcIWoR6CgzzcUAUuMnKCzz%2FXO3heJtn%2BD27YEnRUIuznScd4z5W2ocfgvtZeLAxM2L%2BS274kHZT4yO%2FUuWUR7nPE%2Bo37GRnov%2FwuZKSlhDZ2oM%2FTcUVgYwzcfqb%2BNwSdN87lFmky57QKTPKmIrFazyWckb8kQcc67JKA25HNGPYS6NE%2Bp6CaPoM6imWOWhhf54aQdU8aLihnbZINkMTHnNBhcxYXxv3hRlh%2FeflHGoA2nHypk%2FtpePp9FVQNE6h8%2B%2BrI8QAoF6OvSU84Zp5%2F3Qd5d8K1IW5bEDOAbPKgfVdDJEINk20VtaDVows1Ua54WA%2BQUOUWZUT2xl8FjzblDAPqHev8iW0qyN4uDOlEjsxpfW8buvLUt7COX%2BxiOeTkNOmiBek5RjKW%2BoJDebPK4i2N%2Bkh0Jfnk1%2BDGcITY3waYKEYzKhlR1Pc%2FPDD0n9rLBjqkAd8j2BO6AwWc1dCvyqHHKh9UYU8jZmkuIJeOyOd8PiRGsrFck8d%2FqlVm8anMq1yxAQ2s2E9O8qOA6e5tU%2F6uF4Oqg71pSAC%2Bfbti6zcPnU6RX6rsSW4dQON0HLzy7oi2tZRZPeEig%2FCF9pcauvhviJ0rUDdX7xOg64h6on8z%2Fwk5MVze9OQOnObXPuvIbOZX7pUCyJjyOmKeZUD%2BbYepPEn6BACh&X-Amz-Signature=5b8c788bda83441f016fa2efe733dc8e05c01091fa0d32ffb5afb70b3615810d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6FVNG3J%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQD0CJwQlRfmv1H%2FYBN5ATekSvgDss9RSqgKIlHOYPYLhAIhAN9Bc7MeisHjCLeqcOP2gsbb%2FroDfRT2lVyRaAxCFYR0Kv8DCC8QABoMNjM3NDIzMTgzODA1IgwZsam3YkhiL97p91Yq3AMEksowZ8tnzIkuymXjm8SZELxdAjjFyD%2Bt06oU6DA3gcfEpjbr3f453mMnMDg9o73lg4AghoiR%2FJPnVDrc4pvt3sTbEc2rTNnbrByI%2FN1FmYjvUVnlz%2BueGL8%2FxtXr3dEl%2BFYU09l6AL78sy9H%2BcguKQ7FCRKoG5URPUE5WozioGHzmIKiMtWrVxEasy88xqinZcIWoR6CgzzcUAUuMnKCzz%2FXO3heJtn%2BD27YEnRUIuznScd4z5W2ocfgvtZeLAxM2L%2BS274kHZT4yO%2FUuWUR7nPE%2Bo37GRnov%2FwuZKSlhDZ2oM%2FTcUVgYwzcfqb%2BNwSdN87lFmky57QKTPKmIrFazyWckb8kQcc67JKA25HNGPYS6NE%2Bp6CaPoM6imWOWhhf54aQdU8aLihnbZINkMTHnNBhcxYXxv3hRlh%2FeflHGoA2nHypk%2FtpePp9FVQNE6h8%2B%2BrI8QAoF6OvSU84Zp5%2F3Qd5d8K1IW5bEDOAbPKgfVdDJEINk20VtaDVows1Ua54WA%2BQUOUWZUT2xl8FjzblDAPqHev8iW0qyN4uDOlEjsxpfW8buvLUt7COX%2BxiOeTkNOmiBek5RjKW%2BoJDebPK4i2N%2Bkh0Jfnk1%2BDGcITY3waYKEYzKhlR1Pc%2FPDD0n9rLBjqkAd8j2BO6AwWc1dCvyqHHKh9UYU8jZmkuIJeOyOd8PiRGsrFck8d%2FqlVm8anMq1yxAQ2s2E9O8qOA6e5tU%2F6uF4Oqg71pSAC%2Bfbti6zcPnU6RX6rsSW4dQON0HLzy7oi2tZRZPeEig%2FCF9pcauvhviJ0rUDdX7xOg64h6on8z%2Fwk5MVze9OQOnObXPuvIbOZX7pUCyJjyOmKeZUD%2BbYepPEn6BACh&X-Amz-Signature=5b8c788bda83441f016fa2efe733dc8e05c01091fa0d32ffb5afb70b3615810d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAPEXEDC%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDuOLJ3hdYj2MB45UDiodqZJYvYNtMFuV7sfRNG6geY2wIhAMA3tYSrAH18AFWC7uRBO9hyJsdny6KRdwgDhkOGoxGPKv8DCC8QABoMNjM3NDIzMTgzODA1IgyccbLfNKjUMbnhEWsq3APL7sTWBrmW6X3H%2B0dzeBCyQUxL0dBTjyqDS2VrvnVY29g7TFsGr2qyDK3XQW2cgktO2a2CG6ccFPi%2FA%2FAwXJu5Xy0wLApwBGQlqewi1VmKzoZy%2FjuBzn2EdoTlf3EeN0XfypqpVuN%2BIknwuh%2BMOD9KP5PZ1Yi93HC1hLkRuVkxoNq%2FQxLDO%2FuoKUQoKr60JXO3%2BFLAvxh2F6a15BMeJSlFAaieXPMydFh7N0vZtRitDA8GksIurgXG0MCg9yshHckFTkBokVbqQ8X0Tk6RcDwQC2hyY0rnRAxawG%2FmJZPGRP%2BY81ma0VcChgp2xn8d1y9aTjZmk7ctgrp4MPwcd8VKOgt7bm9jcLZ6ktT0cMLSgNp56wMNde%2F8aXGb%2F3zTxuuMrlo%2FDmBjDxL8G2sAncjNIw9aXmqiy940q9PqZoljSrIH9aUdFxkZW%2BXE%2F09grkbD4zaRPnXLoG%2BHQA2KEN%2F177Pdpea0Wjwh9eR6dw3pRzKPgALD2yPcztF2pkAu0cJo3%2FCRrzXkm2m30AqxytJHA08P0UD0EcV7sIC8SN1ui4so6RCHq4WZ5qkLCyjvPPpq%2BDAw00DeQ71RdqweDOwj3SAIG4CtHx%2F3Kh0UG3weU3O90x7O19KkHLshqjCqoNrLBjqkAXuIPLQMMQrP3DRTOPr2M%2BvrYIySIqbFR6agOvj%2F7It9EoWoInqRCJGybLNPIou9GB9sBa%2FD6WC5mwUUTkIdlrhwRAAwrNOjJyphGF%2FnHZJYSsI3HJT3PZ8wkqyIYrSgSR8Fqp%2FI1aQNCFQzO5eXXROMRJvWdDU%2B5V422ITBYIPW80lZnvpaOM1doeulOgmczf2nVaNFzTFS738wPc4IIeXQTmTA&X-Amz-Signature=56eec41772044df4a041bc8608b10e6d84d93ae3f41f721637f7070836758f53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

