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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK4FTFSW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCq2wT0xaVroLDa7jZ18DMLuZxdOkSNiQFPE19mzAJiwAIhAOhgkh6CUJcuL0RyW3KVKIZtmv878uGZhtIE6EBbO3I1Kv8DCCoQABoMNjM3NDIzMTgzODA1Igxpflzrb7wm06R7XM4q3AO7sNLry7nm4jSl95nqwETY70sGizZ7Pi31QjyBPqoxjS7Nz5zleNWIy%2F39CWLqay6mwXkRI9ibEiXnEDTKyjChiyZoqtQwmYQ8pDOe%2FQaAmjgrBkgHUGqH3sArnQQXiC2OoF9emr6%2B%2BkpX%2F4vROjmAh1dVpaUjHfeVN1CrEi766%2BueV5Ml4cDWSZOgZ8tNg8P90qyXpHgKGJXD5bMuyb87%2FZFpKwKwNtKwisheInD2Ayf6rLEzAWosGKw%2F8mRhItj%2BgPX%2BTPR8z2p9mL2kdJ0s%2Byk3WoRzOJQ8zp%2BqrbpLnRe%2FE5Hb1L11KWoXoAGbsa%2F71zQqRHTqX%2FFo8F3pocCYmlHDL2vsu5rolexsyi8IEe6B4hpHFWt5qcnL61LY%2B1QVPcToCc0Gvyh8v4iVVNz9O03uh8vGtjJEhlxukz7BinX8x71Mdpp7GpD7AoNB3cnlQHXc6%2B6b7kQKuHp8aXmMfiN2TmCDmf%2B7pxzZ5hrpwxHPwhiJqF3rTtTMpbBah4LkZNZ5vQgLHdH3%2BM%2F%2BYPF%2Bx3gcSTg5xQZFHi9tEafBpz9ZGWV09QRr6FfRn1JYlWu6jOByTr%2BbC%2BJbOVwiSA02WYdSoD6ZdFSNlmeUi7RfxYv4QDlq7ZRUSJ%2BemzDkyqrOBjqkAWFAOeRsOK2aGNLSVQbKZ69WhU4R3Nx5Z328xwgfPQk76sMuRIl4D4FQ7s8AqTiEY8aEzAtG6C6bBdKeNWHtrw1w5XUCvERHhWpNBnTxL6YziXRw9QvF4szuYcS7kDvOZ5XbCWMtq8T6DonUqFum%2BBa8a8y5EWa7EMb8EcIPcew%2B5d4uBm8DvIVi%2FMY5hdlqxKXrs%2FlBf38YtXA6iM7W9U09IZPF&X-Amz-Signature=2934b654e06991dacc14da5cfd65ffc92ef2c37a73f5dd87ed440c45e37d68d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK4FTFSW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCq2wT0xaVroLDa7jZ18DMLuZxdOkSNiQFPE19mzAJiwAIhAOhgkh6CUJcuL0RyW3KVKIZtmv878uGZhtIE6EBbO3I1Kv8DCCoQABoMNjM3NDIzMTgzODA1Igxpflzrb7wm06R7XM4q3AO7sNLry7nm4jSl95nqwETY70sGizZ7Pi31QjyBPqoxjS7Nz5zleNWIy%2F39CWLqay6mwXkRI9ibEiXnEDTKyjChiyZoqtQwmYQ8pDOe%2FQaAmjgrBkgHUGqH3sArnQQXiC2OoF9emr6%2B%2BkpX%2F4vROjmAh1dVpaUjHfeVN1CrEi766%2BueV5Ml4cDWSZOgZ8tNg8P90qyXpHgKGJXD5bMuyb87%2FZFpKwKwNtKwisheInD2Ayf6rLEzAWosGKw%2F8mRhItj%2BgPX%2BTPR8z2p9mL2kdJ0s%2Byk3WoRzOJQ8zp%2BqrbpLnRe%2FE5Hb1L11KWoXoAGbsa%2F71zQqRHTqX%2FFo8F3pocCYmlHDL2vsu5rolexsyi8IEe6B4hpHFWt5qcnL61LY%2B1QVPcToCc0Gvyh8v4iVVNz9O03uh8vGtjJEhlxukz7BinX8x71Mdpp7GpD7AoNB3cnlQHXc6%2B6b7kQKuHp8aXmMfiN2TmCDmf%2B7pxzZ5hrpwxHPwhiJqF3rTtTMpbBah4LkZNZ5vQgLHdH3%2BM%2F%2BYPF%2Bx3gcSTg5xQZFHi9tEafBpz9ZGWV09QRr6FfRn1JYlWu6jOByTr%2BbC%2BJbOVwiSA02WYdSoD6ZdFSNlmeUi7RfxYv4QDlq7ZRUSJ%2BemzDkyqrOBjqkAWFAOeRsOK2aGNLSVQbKZ69WhU4R3Nx5Z328xwgfPQk76sMuRIl4D4FQ7s8AqTiEY8aEzAtG6C6bBdKeNWHtrw1w5XUCvERHhWpNBnTxL6YziXRw9QvF4szuYcS7kDvOZ5XbCWMtq8T6DonUqFum%2BBa8a8y5EWa7EMb8EcIPcew%2B5d4uBm8DvIVi%2FMY5hdlqxKXrs%2FlBf38YtXA6iM7W9U09IZPF&X-Amz-Signature=2934b654e06991dacc14da5cfd65ffc92ef2c37a73f5dd87ed440c45e37d68d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFVFQIEC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDC6qoOyJkm4ZP%2F6q%2FyzZg8uU7HxE7IvR6NwS5pi6zEEwIgAMsgXv4FBt3jawE%2FSqnbSYvelAWlIBwSkUOcVdVtKLAq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDJESmUPggoQfRSX%2FuircAzeFP%2F5P56%2BNR98p3%2Bq7On8muW1ntiaQeKZgLgIoNHEJ8f0v5hbn8d2TD8lH98QtUASDCM1KiVCoAzfFOcPHf0ocOs90LivrmpRoGll6G%2F36wErWDfamn11RW6X07odKnmXVSGRQXrNRvxCZMGXA1IoxilGtIkZwnENE7bIkC7jvxJkGp0gAFzkiJVK3sGtWPhgTlE6%2BxAjPJumpI3wYmXy%2BF3eGRyDmGOmRML80tE2GesFDL9uzf88aUm6beIfGidFFccPvCilppzNrvT6mG8JQNUqwbPx3iTg451JnmC9ceHqecwpVC6SIinFsiNG2UogvVf3OU8gY0ag0y1FdI7ppg0yvy2CAL9PgatwIOqpWKlt2kxn77loHC9SjDSob63X0ahMx1%2BMSQwPUf%2Bktcr7YbZAOKm8t4bvNcT0A1bc0ycFjJ7m7Q6oRr0VXFBEBxDl7eXy9CFgWygly%2BZEvWJaekZygUDMkkXLzSiUOcUogz3PJVo2dxt9nCcQZNK%2FXgv9EUPEX%2B8UyIMBhiHhPaDGdBYUs7X%2BgzQ40VLMOX9qjeJbrcJcMZFdX2n73t0SlM4n3S62qx4gmcnSfqZ6dGJLTURehBDUColv%2Fd5yAv12KTto2jc0tnqvaWDdIMNHLqs4GOqUBTR7%2FtqzJM3MzTKdcOi9pFgWdKzh5EZFzDYQXreZc%2BbUYiM%2FeWztATNtn5JwF7kIAAvbxMk2Qt8VH821ayFC5gUBfGpzSCOn5Vp%2B8OGjIZaSXweer%2FDZ1G8M15hWoIy0ktm%2FsEchq45NfoeWrFE%2ByBwYQEXhqzbc5JYaDYw9JKBDidddMrVtE7XfvOZO5B6uAsn7gHw%2BxiLHX%2FS7UkkvGZNxt2wHg&X-Amz-Signature=a25757637edb36ce00ce49376459c9ab10c617b442cc57da2cd197cee6d91b98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MJ34RNC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQC6zLEW7fj6Lcs%2BDTWdS8xdcieYxQlAtg8mWrPmWm57xwIhAMSgfH5DusRSdsxMUVY3TVqZ%2FdYPFXf7itygr5yvpHeQKv8DCCoQABoMNjM3NDIzMTgzODA1IgzZTnf017vaYhf76ocq3AOr8eXeLoxw%2FB88E3n59TW5fluQwNQofozjx1F0XK8SSlURL9BuMfZFqrIk8Bi7oQyCO1s3jfA9lbj5YtEolDAcuY8OqnuAhcHFeZ64%2FunfZiF99j3UPhjDrsdPj%2BjZJX62lGQRjFFr2iu7uZTGguQFZgPgwf5fxXoA%2FS1JkPEE%2FDvQRf6QceQB80qhOzvV434ecyXacp8aOZEdM8HcLrFBHjGGCaB4SZ9LJj5eMbaliIXnF10oJEsdIpUbZJ05sNpb7ijiN0C%2Bmzyo0q2Et1DkZvaRJOsi1iXY5zBVjjX3QVjKH%2FwZz9jZQPxOS%2FsqmEFt5NmevRwvrz0eTZGjUdXRyQtxnFcWGE9DQlkH8e5f4y6NzwlMCl7Kit3S7oYNaqmE%2BhcHyuPYKamrHJIQXfC4ISLpchpBhRSXdZ8QcnXisYhzYv3ILOdfl9BvGuVWay1Ft%2FZci2dv3wV15DIx7WDAuiRIVy281M3t3IULZ2WiK%2Biroho0gvc28OdUX8KoA0aELq%2FMto%2BFRQpw4OVfqGQSZKEGq4zzPjhhF%2B8hSnkrZRuMQ7T9M3q2XobAYzpHuqykNVakRZpdwoI%2F3J3umq43h5alzbGCAFOPpBk4nvVhVb6v%2B5dZSGiJFnwDajDwyqrOBjqkAb8yZNwp1aF5XFjUGDapwE%2F4AorII0D%2FA7vdLcJ8hr1xtNoJkM%2BFB7rY4uLzpO5etrjhrA3tN7hLPpw1tJ4oDQbV%2BK6yApmmU%2FZeRE%2FiGeW5%2BNNPtFUG7PwkfGz187%2FY3bLNnYy8Gq%2BuCuZlww1TIWjQ4JKrilH%2Bb0nR0Va53AYJUW3nNJahBkVGvakOc9%2BfW4NmpdIjnLU65yDdYthtU%2FrKBliW&X-Amz-Signature=bba384b31e5081f3d15e4786c1b276f4c284e6af20e7395ad40ed4b29c44f505&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MJ34RNC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQC6zLEW7fj6Lcs%2BDTWdS8xdcieYxQlAtg8mWrPmWm57xwIhAMSgfH5DusRSdsxMUVY3TVqZ%2FdYPFXf7itygr5yvpHeQKv8DCCoQABoMNjM3NDIzMTgzODA1IgzZTnf017vaYhf76ocq3AOr8eXeLoxw%2FB88E3n59TW5fluQwNQofozjx1F0XK8SSlURL9BuMfZFqrIk8Bi7oQyCO1s3jfA9lbj5YtEolDAcuY8OqnuAhcHFeZ64%2FunfZiF99j3UPhjDrsdPj%2BjZJX62lGQRjFFr2iu7uZTGguQFZgPgwf5fxXoA%2FS1JkPEE%2FDvQRf6QceQB80qhOzvV434ecyXacp8aOZEdM8HcLrFBHjGGCaB4SZ9LJj5eMbaliIXnF10oJEsdIpUbZJ05sNpb7ijiN0C%2Bmzyo0q2Et1DkZvaRJOsi1iXY5zBVjjX3QVjKH%2FwZz9jZQPxOS%2FsqmEFt5NmevRwvrz0eTZGjUdXRyQtxnFcWGE9DQlkH8e5f4y6NzwlMCl7Kit3S7oYNaqmE%2BhcHyuPYKamrHJIQXfC4ISLpchpBhRSXdZ8QcnXisYhzYv3ILOdfl9BvGuVWay1Ft%2FZci2dv3wV15DIx7WDAuiRIVy281M3t3IULZ2WiK%2Biroho0gvc28OdUX8KoA0aELq%2FMto%2BFRQpw4OVfqGQSZKEGq4zzPjhhF%2B8hSnkrZRuMQ7T9M3q2XobAYzpHuqykNVakRZpdwoI%2F3J3umq43h5alzbGCAFOPpBk4nvVhVb6v%2B5dZSGiJFnwDajDwyqrOBjqkAb8yZNwp1aF5XFjUGDapwE%2F4AorII0D%2FA7vdLcJ8hr1xtNoJkM%2BFB7rY4uLzpO5etrjhrA3tN7hLPpw1tJ4oDQbV%2BK6yApmmU%2FZeRE%2FiGeW5%2BNNPtFUG7PwkfGz187%2FY3bLNnYy8Gq%2BuCuZlww1TIWjQ4JKrilH%2Bb0nR0Va53AYJUW3nNJahBkVGvakOc9%2BfW4NmpdIjnLU65yDdYthtU%2FrKBliW&X-Amz-Signature=ca812c7623d085d3dcd0e59148878e22de014401ad2565d0ff74a24835090f05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CWK4CYW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQCUjXSTwrSe5mWcsJ53JGB99GhVfaXSoTjkaCYBO2uJ0AIhANZEQ2N2M496BW6ovdNRD3oEPzT1RY9fsvW6cZU%2F4CKbKv8DCCoQABoMNjM3NDIzMTgzODA1IgwQ3JqLlBQVq%2F7AC%2Boq3AOC1LQ86MFLjGD8BiZKplgwKgsvQ7BFFfHNG%2Bax5%2FMxeO3zFT%2FYvxfAnLjw4osWNzYkj2yEj41XId6raXLHbjchLHCXMfUkS0J5TJBBPqAGxtFMp4DtM14yKL8EL6B9ptwx1ipe9v3Db0f0sDipu5qXLHMqHA8zl6vi3kiKrwzlemSLHJBihrWxRRucfbpVxlEBKbGT1xnKjYmnw%2BiRANowy13RD24S0vWgn17JYsQfhzGEDEej26qPEv8Gt1S0rVOlUKlNufH2O26vh0XcdDBy%2BguVRIQrKbB7vOvAmV8wyBNt%2Fwp6%2BaSgRUB5bDT910ToidVWdwTLyptFPbtyhpAHQorl0DKS1d0QBCbHQupjFdmI22t5oROYVKImz5sN67O4rC%2Ft9yPJlyGgB%2FrAp4YxZx5q3FYTDGn58XceeeCmCGx1XX%2F6u4EtzVESAXf1ILkDaNhQAnaTsVvsuBYFQTBXnBt6BurlhlJ2X4zhMm3TUsIUTJNWL6yrEtFhRm6MIDAd9h4Y81TnZV4S%2Fi1hRICUT71qD%2F%2BT9KAvii4VLIWmuWZ8kMmZcbU%2BUk9bsAkKfhtpGQ14TXSDsPgkoK3lOLd%2FYuvV0lZoyR7YpwA%2FYkapcxtikoqpP71olQ80%2BDCDy6rOBjqkAW1AEWUYmtukK431xLY5hbWrUe51M1dsSZy9MeneEl2ccwhq7gmCeQaoeUb8nCwrLAEegq7GUavcIIi%2FFbkXt7w%2FOQwHx4wCF92cUwBsH4XPIySUt6UVRw5cNDgRWT0cdTp5ttlpkeLAfWKcVlP5RjiXgoHUDfhbFzEkvTYYObzuudpbHEWZW3zLoilv409PK0LDqe9oGcancldssmFMkq15BTE%2B&X-Amz-Signature=d4951eea5b0126f5dcea950801dc0a74258b39bd16b9130c67933756f9e83bd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIB5WHHI%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQC%2BYr6WiDzBcP0%2F8c4nvofy9kBG1p%2BxKSyz0Dji0CFTkAIhAKdbovensmXGAQ9U92buDkgi3A8G3l%2FtxiXMF%2BpFaqgCKv8DCCoQABoMNjM3NDIzMTgzODA1Igw7M0Sc%2BRnMPKLJRQgq3APS9nFhSKLw7krje6C9Qray2Lc6qEGqO8YodP4i6yEf%2FwkSyo4lM9AuitxVsztANyE750HnJpepLVOQw%2Fy7guFbOTqwfdKjnlx%2B8SlP8zYfexqSwoYpSeBMNf0J2oudmb%2B5llY4gTLjfX9%2BpAUtv5PJ216tcg2BjFePUyRfmzBMP9cQsTY6NLU6j6%2BXmgLd3Xe8LlJXEekHp%2BurH%2Bd0yibXIfYOmbeifNQx4TG8R07xcTpokUS3dYCP9WyiVg0OXk5McBX%2FhPKqphns01Kb%2BgjLocdrRVEdrqXwgGkcv9bjpk70CnpMTL0y5hZoygloI33WBH3Guiy%2FhNUTQBvmZAIK0DlqkUxnYgs7%2BOdWL0leI70ddsil1KjUJHl8mVpn9Sw%2F8woxbXNJZpUhPiKCnb6T4PVM3iiFf4ylg9kATnPRe4iJ2dCzvxW%2BsAqWCCXRhY1P1%2FxWZmaJ6DwZKkjDpJronnDA%2BOA%2BPfHsuzTHZpJYlXNLad1TLwF7UuEhxYZk1zP4K%2BYcp3iueXg1Z20sgNP7dMV9U2w3bzgIqrgDcOLPsELQum6hsZj2yp%2Fdc804WSIQI%2BtEKBh14T91hBEF8XVYZ3zN4UX88K1FWWzQJi4FVJgxCADv561ZVF9YDzDhyqrOBjqkAb6mpYwJXccIuytHlJuNLV5UeuF0VgXJlh2%2BZr4jS64xd2%2FndDwzz0sHmB%2FabX%2Fnum2UCl1cRkX34f1OCZWa0Pw8tpc6pFCorzsZDULtbkpKmG4FeDOrzbutrMmnCMO5cjBzwZafJEvWNEwbr4K8gwQgVzP47D%2FafOGwZgm2DkZL6Q78plPOoWv12ytCNaslYh1kb6KIbE%2Fj4TI2b3JKoM9mb%2Fk3&X-Amz-Signature=00c4561c7cfc8183de1b54a133b0acdbb59c327b9957b3042ce7930e383f834d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIOLA6QL%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIHb0uDA6Nmb4HIBfZ61Nvce%2FDWBJ9%2FnZW0q3u7WLLcGeAiEAxtJ%2B3%2FGJcMmTumXfI%2BzFR1UaSNtAkhGzhRjk6zwR%2Fwoq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDBNPMFkFfGhFOyg14yrcA%2F787evyxPiEnUjZhgPzW7IZWzRJsdO8pNWCLiIjkJ4%2Fc8nSMwhihG4QwtdbiUJ1OBwE0B7D6ppVgKf9wZdFTD60HtReekUiXddEKPao01yZi5GocBOlMyvY6KxOXyC7hh1nIurunoOU89nJYjozPLzQeENrH2TXqZ%2Bsp3JLljDKQrHyDCcK8hNnjywOgn6PlKFVXPBWMeVfsvWuB1Wkfgu0z%2BQ1VDD8jc9VwIl04aI7XckE6gaZ9E8CdUlTgyHVmjARUlca%2FPi1kg%2FHN00vu8KcdBW9b7a3E%2FeuDV6ddJai4RsWY%2Bal2C0wzmDdnd%2FqjXHR6agNPoxCpe3LKafhTfjQQiBolOi6LBqn%2Bi8uQV2xxXgUR1EXX7iN5r80%2BtcYWmbXl0iDvJuJ%2FsDnj7Fv%2B6dXjdpGKk7xWlzV1jP2%2BTO7PF7O16iexhn7Oln%2Bp9L2zoFzzfu8TTcDZtx1T7ILpsEN5TIssDlW0%2FuHcTtzkrULmRq0T88G6ylepPdmrK5Sn0uh187ujQOMnRRvQ%2FcrbbdY%2BQ%2F%2BsIbHgpuoz8UUFgEW5XDZ6XwaYUwlldJ2L9q2JBsy3LCa%2BDiNtLEjDUCZbUw%2FEypE6FOh3442wwF3m6wq9hVzectbb1Cf94oEMOTKqs4GOqUBdMu08lXkkcp59Cexg0YyHql7%2FjPlS%2F5e8WOXG9%2BnasHlr46NeUmKqNC%2BBJoum09GYRZQUDRNRfqJROGK5iljPqM8Nmvg1o5i9d2d0SXoQg%2FIyup8H4u3If7%2FCMM3cauTAUwN985Twp0i1qKjFzVC%2FuZcKidIrApQ%2FfR9IAYqrAm%2BySv2mkz1a3khHdrNX8PtW3hu%2BZQKuRocdnqaWTR6u68XM1R8&X-Amz-Signature=edea8ff538d43117bbe8f4b297a1983f56c665af4fcb891b4f47c5c60c506879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OA4IL5K%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDlsePdORPS3kyhlawasw8ub01k%2FBRUFxohpQZT3BWbuAIgPNU4a61J6eiCmBJhCR6n949e%2Fw%2Fu%2Bv%2FW8wTz5mNUyrEq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMd5ryEEt2HaT%2FX3WCrcA8wBB3haMX1jj7kPvnwRU%2BSvvKHAMeCMR6slU%2BP5iwZO6TvUH6YC3Ja9ca31onb8HH7L4xQQzq2VhdHrB89LM5hm%2FvpNk6EwRfaOjcgJB1vwJTFWH305BqvB%2FJsJS26cAuWg5zBLJs%2F0gbMk3r4SRkfIqJH%2BOY5B%2BlzGKI%2FrR7U3x58zq7%2FKEw5RIKLeLfy6K4t8GJH4z4aq6dyMt0E3wHQkC684QGGQkjLP24jw0wOXCv%2FFjWIaixJq5EUX2FSRtMeLS8k0zHbQnwMpOqmo43DmPM1jZPoFZS2pxVRSfzIjFEhcE6MQARd4zJ1Zguc2sHOkE81BmL9FsgXOmcbhH9iYQeE8qabd2c5yQPtZkQ8EixROIFBNRpICgOHLcdYkdBOF90ezV5v7fea9ubUuPIvy2FqCA9rYcClOVhg26%2F5HoqpTtbqh0Ztj9bzlAqeNyEX6AOWw7uudAJL3e2plR%2B91M7QQ2mfq5zoRSUtBCDAjhJ2FSpgI90%2Bx8qU7B2rqhJWZjyPKqZ%2BGQ1q99KcSZ1%2F%2FU5mhK7sQnmZ6vRitABpnIh4q1wle%2Bj2Ot%2BAjkPXcItN7GC%2B2BLeWphFP%2Fz2QCa1RXVdUcctZ%2FaIHvMMd5wMCUAf1L%2F7HQn1JVdXbMPnJqs4GOqUB7fxiX7plXnnGLRi9k2q8JLDi%2FoumQtgqrjfnlz0jT5u8R%2B6gzwl3TlM9zDvTyizP5mVgcalsmER6paFOTVmyb2tGkhIircaxEvMnv5NGdiV32nu%2BFLXfceNJp82o64n5Wv%2FVko328crbi0HlJMJu%2BpOZ%2F509CXKBZ2OUDDv9oCmRCdNNLLb9M482F385Qi8SdJMDZlunbAoDcFzpUC7YnMXbwVBX&X-Amz-Signature=8f5d3f006df2d16f88f8b14adf16324c933202795e123499405d3f5e38df4672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OA4IL5K%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQDlsePdORPS3kyhlawasw8ub01k%2FBRUFxohpQZT3BWbuAIgPNU4a61J6eiCmBJhCR6n949e%2Fw%2Fu%2Bv%2FW8wTz5mNUyrEq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDMd5ryEEt2HaT%2FX3WCrcA8wBB3haMX1jj7kPvnwRU%2BSvvKHAMeCMR6slU%2BP5iwZO6TvUH6YC3Ja9ca31onb8HH7L4xQQzq2VhdHrB89LM5hm%2FvpNk6EwRfaOjcgJB1vwJTFWH305BqvB%2FJsJS26cAuWg5zBLJs%2F0gbMk3r4SRkfIqJH%2BOY5B%2BlzGKI%2FrR7U3x58zq7%2FKEw5RIKLeLfy6K4t8GJH4z4aq6dyMt0E3wHQkC684QGGQkjLP24jw0wOXCv%2FFjWIaixJq5EUX2FSRtMeLS8k0zHbQnwMpOqmo43DmPM1jZPoFZS2pxVRSfzIjFEhcE6MQARd4zJ1Zguc2sHOkE81BmL9FsgXOmcbhH9iYQeE8qabd2c5yQPtZkQ8EixROIFBNRpICgOHLcdYkdBOF90ezV5v7fea9ubUuPIvy2FqCA9rYcClOVhg26%2F5HoqpTtbqh0Ztj9bzlAqeNyEX6AOWw7uudAJL3e2plR%2B91M7QQ2mfq5zoRSUtBCDAjhJ2FSpgI90%2Bx8qU7B2rqhJWZjyPKqZ%2BGQ1q99KcSZ1%2F%2FU5mhK7sQnmZ6vRitABpnIh4q1wle%2Bj2Ot%2BAjkPXcItN7GC%2B2BLeWphFP%2Fz2QCa1RXVdUcctZ%2FaIHvMMd5wMCUAf1L%2F7HQn1JVdXbMPnJqs4GOqUB7fxiX7plXnnGLRi9k2q8JLDi%2FoumQtgqrjfnlz0jT5u8R%2B6gzwl3TlM9zDvTyizP5mVgcalsmER6paFOTVmyb2tGkhIircaxEvMnv5NGdiV32nu%2BFLXfceNJp82o64n5Wv%2FVko328crbi0HlJMJu%2BpOZ%2F509CXKBZ2OUDDv9oCmRCdNNLLb9M482F385Qi8SdJMDZlunbAoDcFzpUC7YnMXbwVBX&X-Amz-Signature=74e994570ac075887178cf7bc08211a735a89809042eba545134a432a8adbd51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466522AXS2K%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIDuQw2GkiEcTMeNuGQMbmz1ke4APifp7AxXaMSDzUNsEAiEAggFpL2XQc3VpZLs5zyPCYTEDvHm6h4xO82Eq37HS1woq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDDdLGeBlxP5g4jCDYSrcA67L7Z74mprpRMmfXlAS2K0bXeFzWwQ5IWxnzjswamcIMOaGWl5fRHQxM9n5tEp3d%2F8ZJHHl1Va6FEaIvZzUpkoBhlSURHx1poCwY00837v4adrmTZSAZ2IWu3xpG%2FK5aPqPYiISgSVnRB5NMtBixMjM7U4tQUnUNFa3dsTf1pipydsN4LyaZJwm0eCcTd42rdulk5O6ACvZTxgsawxcUBc1SJCwrdT2YTmxJv3HlVKS0oQ63JPujM5YrhwQ7%2FBdBWbg3zLmHR1pzrST0iu9nPWk2a%2BoegSxsZTGPKsYU%2FQBeHBP8lbS7dfEHCEvkX2DVkNxDTV%2BQ3eWv2E9YfCyN1kjfpg%2B%2B9Ms3R8rWDly6C6ytv2E9rOz303K%2F%2FUJQHMsM1L2cKIG2jOVnNhbbwQn%2BrbUtLRzdfwERbP86Sa45ZhcNbN%2FjkE0Y5qWyX9EoYX6G%2Bmmc%2BnPs5Gdz%2FQeH8lMUo%2Bz6W6WM2vgYLEzF9CHVbNLWyyKpkIhfhUQbp995OcQhqYsXuanl4pwJJUVQLGMHq2QEQs%2B5GJxsLImDiOZRYxw6ssjA8FKJ3gVw9U4vY6zs6t%2BI8gn9uSCNavgmOBEP%2FY8hX1ixBaRWEfNGoOMJz8hcqAJRYTdAt8TxeiLMPnJqs4GOqUB42Ye38null5ALsZ8yB%2B1otOrymnvUQsFNnIOAah8AyQK%2FmWys2pD1WtRM9yyTaW8jcqKDc6NdUJ9Wi84x5DQUw5bfZLXwkKAza8zflwxQRvmFP%2FqsK3hVLzu8601E4AUkKQZz9t4UW7SVLjnspasx2bJn861P18usIXx4gIl4%2F1xvFvnlh%2FBFPOtl9NkCe8pTDNI1oYITOkCJ73eAtQu74tZxHsh&X-Amz-Signature=c421b48e6a36c7a2cd7ba1d354e1f7b3a913fb102561afa881a36318d44dd760&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LNMAARW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQC%2BvW0k%2BlWsDzcERCkKAj%2FzHXxUZ7uPxhmoxEtI0CJdEgIgOdQvkrJywfbYN9lYNYogXKiH7H8NA3HhYjZorRHnp3Iq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDK%2F8cziy3MKDmxZ4dircA6bEbBCvbWrHVXrbMSLqgsi0a4%2FPmQiXkBcUYtVjsFQ8lOlpTdALHvi3uTFqFUL067Bzud7rbaTMXDAG5djyPoUs6%2FXfpof%2BHkhudRKh9nrRfnbr4zn6GO6e%2FQIA%2FSefGmiMmHs8%2BxlGuNXzkIVwxN%2BkMNiv0wHA1qC0vLbO07TDoZ4B2N6qHpx7OIFk32kP0smg1AaJQ0j8bX%2FWJMeB0MTGB5lC5VH5YKsdoeDJ3vqHYqxYtSnyBgph%2FXQkzOsLDc808rP2EiHGdcMmkCvW3k7VSBtUGImmX7FcZWFW7avpFHv%2BEzUsiaAwb0GaGLZvmVI656Q9LNNub1%2FL6piozjpYAHD2uOHZo4N7vaGccmd7GAogLahdrAEr8wvJuOu7HloVdmCdf%2BjVp4YcaRJG%2BBgqPBM02W1YHIy3EXTqMdkWqB%2B1aWJ2ngb2w78KGVScaKUN%2BA%2FMZMPhVzxO%2FLo1jqAIP0%2BmGTw5pOWQeQ%2F1XFAHvGuPGnUMzb8TeUgFtpuKWlf39gYAm3bEiwyFAN48URInWS5H%2FhizPgFB92wMXCvcDmctMvHHnkbhm%2F3l8IPLlAUQ3TDQETAJ8tDIICZWbMNRjHjSmROOTOoKvOhGIRMASPBDPLUPaWA1Ec6NMJfKqs4GOqUBPhyqRSfWh8qAu6WN3HQLR8XsCw%2Bxw1Xmo9RgV9FQASRsCa%2Byivdep%2BY3vg7CaXuyZoVkdJFdVBV4aeMwr%2BcSoXxhivY4eOvgVwlawo5ZMk4I8lyiCvafKQISTHHUptOFNsn%2F5O23dHFgICpacUFImoXfeTBs8OjKJnxW53TLLWL6mzAMm2ui3f%2FjrM9uZnUQnaS8z0gD%2BI0tSVYMwDsCdnyeBvDW&X-Amz-Signature=fe871ef74af491b356472978f426d9f1fdd7e4ce4c697a95c34bfc8c9ead6214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LNMAARW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJHMEUCIQC%2BvW0k%2BlWsDzcERCkKAj%2FzHXxUZ7uPxhmoxEtI0CJdEgIgOdQvkrJywfbYN9lYNYogXKiH7H8NA3HhYjZorRHnp3Iq%2FwMIKhAAGgw2Mzc0MjMxODM4MDUiDK%2F8cziy3MKDmxZ4dircA6bEbBCvbWrHVXrbMSLqgsi0a4%2FPmQiXkBcUYtVjsFQ8lOlpTdALHvi3uTFqFUL067Bzud7rbaTMXDAG5djyPoUs6%2FXfpof%2BHkhudRKh9nrRfnbr4zn6GO6e%2FQIA%2FSefGmiMmHs8%2BxlGuNXzkIVwxN%2BkMNiv0wHA1qC0vLbO07TDoZ4B2N6qHpx7OIFk32kP0smg1AaJQ0j8bX%2FWJMeB0MTGB5lC5VH5YKsdoeDJ3vqHYqxYtSnyBgph%2FXQkzOsLDc808rP2EiHGdcMmkCvW3k7VSBtUGImmX7FcZWFW7avpFHv%2BEzUsiaAwb0GaGLZvmVI656Q9LNNub1%2FL6piozjpYAHD2uOHZo4N7vaGccmd7GAogLahdrAEr8wvJuOu7HloVdmCdf%2BjVp4YcaRJG%2BBgqPBM02W1YHIy3EXTqMdkWqB%2B1aWJ2ngb2w78KGVScaKUN%2BA%2FMZMPhVzxO%2FLo1jqAIP0%2BmGTw5pOWQeQ%2F1XFAHvGuPGnUMzb8TeUgFtpuKWlf39gYAm3bEiwyFAN48URInWS5H%2FhizPgFB92wMXCvcDmctMvHHnkbhm%2F3l8IPLlAUQ3TDQETAJ8tDIICZWbMNRjHjSmROOTOoKvOhGIRMASPBDPLUPaWA1Ec6NMJfKqs4GOqUBPhyqRSfWh8qAu6WN3HQLR8XsCw%2Bxw1Xmo9RgV9FQASRsCa%2Byivdep%2BY3vg7CaXuyZoVkdJFdVBV4aeMwr%2BcSoXxhivY4eOvgVwlawo5ZMk4I8lyiCvafKQISTHHUptOFNsn%2F5O23dHFgICpacUFImoXfeTBs8OjKJnxW53TLLWL6mzAMm2ui3f%2FjrM9uZnUQnaS8z0gD%2BI0tSVYMwDsCdnyeBvDW&X-Amz-Signature=fe871ef74af491b356472978f426d9f1fdd7e4ce4c697a95c34bfc8c9ead6214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJLLLPKQ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T164557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGEaCXVzLXdlc3QtMiJIMEYCIQDvAHtalSytkEVhLx2hvkwID8h%2FXxYwcZIHRId4wZl3ZAIhAKbPgZ1%2B7vE7lC1n1HcWUAmteahxUXsRbnkk5MXjsFUHKv8DCCoQABoMNjM3NDIzMTgzODA1Igx1wHtt2vO6%2BArP11kq3AMdyuVPTB16lS5acLjRVDvXDhPQAd5ayf%2BVwQf87UKpIrprZx52yONHloPmnTe4dQ6UqaC69qwOJD15tGwQ688seeiIMiFrBLuCYjupA8UZKjyek67KJTKwHLn4psKzyO%2BQh0KKzHrRJ0CPWGveL6%2FkxLYPPWKAA936hshdUH7tDqG%2Fkhz0Qmbc3Ovq9zYMXcrmXsN%2Bi%2BK8dEmHQlwoOFxJcs9ForeyGFP00czBD9RaB9syY7ZNLjCzFZpWauJewlQb703lw5CfHhHx7WVo0juJ2%2F6PrhJ59rOj7a2x5DPDWrHWMpNbYBhQdrlUq0%2F%2Fe%2BaRrgyysfwBIyN9vnQS8fBXItxjDUAZ8KywQ7Tn%2F%2FWj%2Bpxt%2BYK4GSk%2FMDh78GQ7%2BvfEqnEgCeUmIEdw2Tr9gFQAGL%2FzxkNwoimDtciRztueMPXDogdNdb6OEtoTg4kvznaBbe6mJPvtK5GDxz%2F8Jc5kbPkaQ%2B51Ixn9GLRToQk2XgCxxlduepkAo%2BKAh0dcoJN%2BGYsPzl5jLzndXB2oNksw%2FqMcnHzICYnUOI0we1zKuIPzBJ4PLLVPcO%2FRdKicdapz7DOXSR6USzaLYErDKxaeHdWvEgZj4rV3kqFvxi2V3soKjU7YYDt9FZnuZzCDy6rOBjqkAQOtj0olQikaxEx8%2Bn0U7oOkXagNVRXifA0FAO3jVW5k0gZdscf4QdwTzSKyzFq5XUSJ%2FE9wVqnHEswtCyEggd5rSGr1CSkcrT6GFp5Wj55SRq6%2B4TCAilTHOnsgNmSfMqwMNyB5dAPgnkdHcVXdK6JTa48hN4wQ4XtR%2B%2BmgrBvp5WqP2WECakzLemc9UZIdy%2BFUfVVsdspdZbDw0pi6UXoIFUzJ&X-Amz-Signature=2f4226eaa2122259cd33b7fb4d3712112aba1dc1ced55e87b75145ac563a1189&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

