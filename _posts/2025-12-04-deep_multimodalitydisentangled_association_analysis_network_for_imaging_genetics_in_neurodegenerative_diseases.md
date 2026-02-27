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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ENRNXDR%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIEzbU3oDCBaPq54N4QNNGFQl7vF9jbQR1IGu51z3s8CpAiEA7nSE%2FKrQzkooNHWW%2B1aWpbubc7b%2F9XX%2Bsruysiq5NfUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDEhnuRG7OFtCXafCiSrcA8VMWj8HAKA0G2l22%2FpRNAHjYHbbgKCoINLYuphbT6kTz51lb43SoiCqT1Doo3T%2FvIplaFDVw%2FH42ZYQtVqb6aullr9WDchIc5axBhC9Kwi44NnC8YEXmhtZCk1UCOARFrIY3huS4ys3TzhcR3yH10UXiAssrQnEj%2BaF0g%2BkwYT%2F9k0EXjT2PgWrT80D4gP7hDGDb5GvnbKVD4H%2BgC%2B8PlxLtFOEYEFmo4fML8fZfNXQwNfsYZ0pTbmdxW2iCVc7p5hPs7IF9enT6dAH6DRANVEmzmokqUqea6w1roZdZ3xiQT7%2FjranSxio8%2Fr9ls3HKtLF6r8FyRr46ytfNP4nL49fgEyquvbTlzTMmelpucJx8jxq5FWEmEmJaOMlmarf3XC5RuuxNKnvvhaSmhxhKju5w63ZH3qaR31BrYyN%2BH9drxhWSfBXbUtwwr7UWHdfeob%2FhXl75SfIrMIoJvtBm3GiD5DxCyc6Bih1yTtEriCM0ReWwIcIBgEWiifNSCBebAHZi5VsffZZ4lgi%2F1lWQTLtyTo1FTSvX71d7%2By3ot6Msbwya3WvtmN%2ByW0k9EEPotGVOjqCgt4wc%2BwHJY20wAYS7OCw9ugfW0mS4c5pQwWX04tAn0upPyRE8I7JMOvkhM0GOqUBclOCS0rnZQTt0cvJl2fcSmg3Xt8INGM8PtcZHleUQmS8gJNRr5rww920T6WF4d1a%2F1skZXKI0L8EYpWpecdn2gAoaxww7q3lFGYapYE3tUTCH7EAvU0U6%2BJHTIG6KJyycGUQVgcz0qWJ4wMaY9yzF3K0U7jsXan%2BidB7nCR55rlADpCncwFG2jYo9GXoQ7Hsb75NVrbRx71KMk7w4wo5ZRa%2F9Tx0&X-Amz-Signature=a2a7039e99ac94f86073d535418fd291610c6f66da117a9f9812bc32eb037ae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ENRNXDR%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIEzbU3oDCBaPq54N4QNNGFQl7vF9jbQR1IGu51z3s8CpAiEA7nSE%2FKrQzkooNHWW%2B1aWpbubc7b%2F9XX%2Bsruysiq5NfUq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDEhnuRG7OFtCXafCiSrcA8VMWj8HAKA0G2l22%2FpRNAHjYHbbgKCoINLYuphbT6kTz51lb43SoiCqT1Doo3T%2FvIplaFDVw%2FH42ZYQtVqb6aullr9WDchIc5axBhC9Kwi44NnC8YEXmhtZCk1UCOARFrIY3huS4ys3TzhcR3yH10UXiAssrQnEj%2BaF0g%2BkwYT%2F9k0EXjT2PgWrT80D4gP7hDGDb5GvnbKVD4H%2BgC%2B8PlxLtFOEYEFmo4fML8fZfNXQwNfsYZ0pTbmdxW2iCVc7p5hPs7IF9enT6dAH6DRANVEmzmokqUqea6w1roZdZ3xiQT7%2FjranSxio8%2Fr9ls3HKtLF6r8FyRr46ytfNP4nL49fgEyquvbTlzTMmelpucJx8jxq5FWEmEmJaOMlmarf3XC5RuuxNKnvvhaSmhxhKju5w63ZH3qaR31BrYyN%2BH9drxhWSfBXbUtwwr7UWHdfeob%2FhXl75SfIrMIoJvtBm3GiD5DxCyc6Bih1yTtEriCM0ReWwIcIBgEWiifNSCBebAHZi5VsffZZ4lgi%2F1lWQTLtyTo1FTSvX71d7%2By3ot6Msbwya3WvtmN%2ByW0k9EEPotGVOjqCgt4wc%2BwHJY20wAYS7OCw9ugfW0mS4c5pQwWX04tAn0upPyRE8I7JMOvkhM0GOqUBclOCS0rnZQTt0cvJl2fcSmg3Xt8INGM8PtcZHleUQmS8gJNRr5rww920T6WF4d1a%2F1skZXKI0L8EYpWpecdn2gAoaxww7q3lFGYapYE3tUTCH7EAvU0U6%2BJHTIG6KJyycGUQVgcz0qWJ4wMaY9yzF3K0U7jsXan%2BidB7nCR55rlADpCncwFG2jYo9GXoQ7Hsb75NVrbRx71KMk7w4wo5ZRa%2F9Tx0&X-Amz-Signature=a2a7039e99ac94f86073d535418fd291610c6f66da117a9f9812bc32eb037ae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KVLP2D7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCrY1VSQ25P%2BgOqwJh51jqnD%2FitR%2FBV%2BEeSURm189ucHgIhALFDO1jD9WDRi8RUveo7kHD7zmLPkYi425XkihutshUmKv8DCDcQABoMNjM3NDIzMTgzODA1Igwts%2FwUHI%2BuIPzMw0Yq3ANN%2FFCmj1nYLbmvABV9TcteXpkTRqIUAQgkRaMubyB6BzOQ%2FHoknPZItVl3tGee7y7JFtplkfvHqRRevJ4Z2w%2BPBoq6%2Bpu6gmq%2BBN42H4%2B2z%2FMPggsBy77VUziDL2jRS8HcObS0SimVeyYAeifpst95Rm%2FlhjgiiuUcy3%2BReu8oPbTn%2FEjsAT%2BCjemsg5sYn3KSXhLI96p1kVVTgQZaKEyjSHk%2Fa%2FTro4Zy7ipq%2FqSYNxQQ4JOCskkunI6eGOoATlgWmBLqGhBXzDdz%2BIQPa6n9UHgDXomYgV4vCWHbo%2BDS5S%2BtXYMcCEn6XrqXmnWXmJbfF6L49QrdeAF6d%2FCuC9LHFMhPfb%2FbeDkszxaxFBMx0CwpJdthw3NgGYzvOGQztjOmM2rxcDgmFB5%2Fs9qXDUHuyVhjVeEApHAJgUFEwXiF68ADPnLFf95nEe%2Fz2IwLOU6yjMQkf7%2F8JU7RFNZ2%2FdCMCl5uCBpp8SPCf%2BtD%2Brp4WxuCfYyw4%2BOgZoNB907dGvQ0AGpQu2g%2B9qKDA6Iwt3PNgPoO06qjYNxIPoMuPvqmnX4SKqhjjqn%2BtGk9XMJQq%2BE9agUv2O70xAeGARxd9fj3j6G3wsnD2cSf%2FsyDqKI6JCCZPw68mwtFi2pzRTDJ5ITNBjqkAYCb03dRlUoQZg4KNX4DvddHA0Z1%2Bh4VSH1o8OJ36pTPdhTTCtWKgXJnlLHYnjwNyUg9BPIZ9a%2BNgEpjUEgR4EU3t7ulcOGuHuQVOTX7dl13PA5swsSzGzkl0cSKiTI5RRr6A50DYmaIfv4LeIn1FoC%2Biz5Z7%2BGJa8JmDDkhk5VYsgReVkfnymlZelNa%2BVYZqCwalm97elR6vRv3wgeQyIe2fuGz&X-Amz-Signature=bcfcf02fc198ef9fec0a1ce3d3cda6a8b9aeba2e2ebcb41aa6293b28ce580071&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSLFGMDC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDn81Wz2BhoVWY6%2BEChiotdIpZBWBgReKmB8ezBxf4DKQIgaBHy%2FJloGtakY0%2ByF4BCmLL87gtTFa6D%2F99Q%2Bi3%2BYBQq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDNmpePTTzTMG6%2FPj%2FircA70wHGAdwemec9FPCyxWveCmm0P%2FZAdqI3Gp7nb2vbbTuqIc7A5PPV1Blq4bJmDAQ1vV8oeeidej5ynkgwmnXMxbSqvxx2CUVsb0qToA73WjAwF7B%2B0VLWL%2BXS%2FTiBEg5dtq7Q2mQ8gqnVn%2F%2FjZK%2BpoFwjYfeHUnIuYXyx2NFhEOgCQuiEkLKCaVuRmPYGr1Tqn4fmD4mZYgcEfiTPX%2B%2BzH%2FzrzQiA7TxeFjsuAx6UDnoCPn7qbPSAkx8mWbJKY1JlsGZd%2FxWHECYYNWp6mx2XUFPo58eR9sXY26Q6BHjUAbAGk0q91tW%2FLIaJho5Q5nJjtrTr0YirF3MNf9PyuESrX9fUlF9DPLRc414hxqM0mxSocvAaXoXc7y5F6HqXbf6y0E89TNJy45UewNubslHRYYhpdUCaTHYwJrU2e2tUtF66E8k4w1BYCjxc4LNt5IohycL6GGYO%2BIDkGcdXqb5mHwhp1zdxGWftlmV0ajQE87DOjPyAFvwCixw%2F4S3zt%2BPvwU940DDvAjOduLBeu1ALaeKTri%2FFejQaFOIjHbS%2BsbelGsuuVtbjLsYpCcfXriCW6GEiD690CDOt6EUYoJUOoUb30DTA8vh22b0495OfUlQ%2BO7Vkf%2BXZd%2FN7qJMPbwhM0GOqUB5OPEGpr73BhokWvBWYA5UBm84fPLj7ImHTydEUZRTsygs5YpbXsG4rqhb5R7Ou9vUKNqNi7nQWfHo7xjeTn9morHBgMJ4IohLnVAAIPHfLZxSoerAblzfgdzxgQXaKxJDSLOJCzwp6wh%2BJTTF80%2FCpao9WNtY1P%2BfrW35ehxUaRYVQpDgd4rtmTSAUBoGn7NxzDTcaBfRJht1FfZaXOz9BLYrwRj&X-Amz-Signature=bedf7ccccc51d1b0c62676cd9c25eb4e6b702ad546cd4c8eaf1e78d8c71f609a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSLFGMDC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQDn81Wz2BhoVWY6%2BEChiotdIpZBWBgReKmB8ezBxf4DKQIgaBHy%2FJloGtakY0%2ByF4BCmLL87gtTFa6D%2F99Q%2Bi3%2BYBQq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDNmpePTTzTMG6%2FPj%2FircA70wHGAdwemec9FPCyxWveCmm0P%2FZAdqI3Gp7nb2vbbTuqIc7A5PPV1Blq4bJmDAQ1vV8oeeidej5ynkgwmnXMxbSqvxx2CUVsb0qToA73WjAwF7B%2B0VLWL%2BXS%2FTiBEg5dtq7Q2mQ8gqnVn%2F%2FjZK%2BpoFwjYfeHUnIuYXyx2NFhEOgCQuiEkLKCaVuRmPYGr1Tqn4fmD4mZYgcEfiTPX%2B%2BzH%2FzrzQiA7TxeFjsuAx6UDnoCPn7qbPSAkx8mWbJKY1JlsGZd%2FxWHECYYNWp6mx2XUFPo58eR9sXY26Q6BHjUAbAGk0q91tW%2FLIaJho5Q5nJjtrTr0YirF3MNf9PyuESrX9fUlF9DPLRc414hxqM0mxSocvAaXoXc7y5F6HqXbf6y0E89TNJy45UewNubslHRYYhpdUCaTHYwJrU2e2tUtF66E8k4w1BYCjxc4LNt5IohycL6GGYO%2BIDkGcdXqb5mHwhp1zdxGWftlmV0ajQE87DOjPyAFvwCixw%2F4S3zt%2BPvwU940DDvAjOduLBeu1ALaeKTri%2FFejQaFOIjHbS%2BsbelGsuuVtbjLsYpCcfXriCW6GEiD690CDOt6EUYoJUOoUb30DTA8vh22b0495OfUlQ%2BO7Vkf%2BXZd%2FN7qJMPbwhM0GOqUB5OPEGpr73BhokWvBWYA5UBm84fPLj7ImHTydEUZRTsygs5YpbXsG4rqhb5R7Ou9vUKNqNi7nQWfHo7xjeTn9morHBgMJ4IohLnVAAIPHfLZxSoerAblzfgdzxgQXaKxJDSLOJCzwp6wh%2BJTTF80%2FCpao9WNtY1P%2BfrW35ehxUaRYVQpDgd4rtmTSAUBoGn7NxzDTcaBfRJht1FfZaXOz9BLYrwRj&X-Amz-Signature=39fea1d3faecc27f32bfe6ccba1ea777cfdc16e98d47dedd4a8ddce270bf4535&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5OO5ZE3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCU0yzOvNxJoNIv%2BopqpQEa0yqBACevXdjclRyNGZnZGQIhANW36l%2FoKqlQOZd%2BBsnA85fSXsJFExfcMfovwNT5vm2DKv8DCDcQABoMNjM3NDIzMTgzODA1IgyGzCIz0KlfL1U7bkEq3AP5JDeue%2FsG57m6M86oZrf56vn83N78nUVBoXgZf5%2B1AfzF%2FEruwCaHvsPHkT6JUSYkxo7fwJPko2fjG0VXO9kXFJ8isLtTN7DOQ8F49w9zoDNUeCWoj5k60e48JZymzCHjt3Nof6LcXXL%2B6Wkqtu%2Fdojgn9oJipp2b6yyT2TRTq1Npe2rHwxqoW%2F3fZU5fPjnQwJlP9gVDOcBCnZ4w5KlzjLcC5nLlizJx7aMymRs90CGzMwfcv2Uz6HwEn8PraiEDkUxcpZxVvUi5KE6F2gBlgvoWHVKNP0IZ92JULJ435XKbeEVfx0fxjWpOBJVDabTMxR8m7Lx53VSXo6aJohyDl4KgxT6da0b401VlU0lVPLKjLN9Ay4fiMMFmrMNQvr6fBpGJosDHEC6CUYevpD00G7q2dF%2F2GDHB0ds7SlJDyYOk%2FtMJO2NovzXRogBh7Gvx%2B7oC6Myotp%2B7LRiuTeqmdy4XPGW8QKP2D6di%2F%2FKPaqxgHEGRO%2BdsRH8NKL3LC63hB56rMNq9cDxcWIbjj0dpF3j7JdLPNwPOu4YfJPtD2x52UXks3ed8GTpT67fK%2BOJVMOkPTGjiqgIxTO%2FuF31T2%2BMwy9TBhwnxuQYxpDdzjJr1sRxat7PDXZh%2FszDr5ITNBjqkAc9QJtyG4z70M6bFxvtal5dL7%2Bio7G%2FbO3cIkoYvVav46omkbEY16j8dHHB3wcU%2BLrCeVPx9JEm3wwCwKm3eX6IQlFeSda219%2F1hKHb%2FaMHH8KsejCpl6XNiebCTUHbUYvIXMvfPhlOAYJ15GBXLSumLvKiP7kDzDL4stEWbwoD%2BcfxnGjwVZW2AlOmQdtsO5%2BGySvT2IsnGphbm%2BNlAFWRmzZI6&X-Amz-Signature=29fb2bccdb852ebf22b1adec60778b2c5b8a3bc9464bf133fa9ca7fb608e84f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBFJ3XEF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQD%2FPTD%2BtsEIY9Gv62z5tvtPOPsgOeXzGusAQsueoszjSgIgDCm6DnMonJH2YcccrEeQ4JPNmVQhaMwIvsl%2Bx8RT3xIq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDF2WPWfUuLNxR%2BYaPCrcAyjSjYBeWVKelUhbj5U4ZVDlcPXOxulWLGKaGwZmWOIvsP3BkVAQZiYFWU1M9I%2FLqOxx%2BATIMDuj8%2FgnIK40s5gS%2Bzt9pYPqP4CsfK84UjTFPsXmMB3waNGpZJx7Rg0DKlGOwe%2BydM6Yaz8QHZb1Spp0bJpVBHcSWhvqz7cYgV27Zr7vFe3EWQN3m7SrVnaJ4zjJmLymdtpQVC%2B8iCVG39QEfkFgWCXuh2tYhpAyxKLNiR6s8twaGatiIe96zpGVXjB8GVJz8zC17wy1%2FP455kAS6En70kwh7t78ig%2B9a5AVlHkmfGDwCsoxQ0q5e5WkrUHyqL28Z3Rrf2shy%2BMVvNwJPIe6eJaWEXCQ%2FmxVyq9B7RIOsk2ioJbe%2F%2FI%2Bwq1MxHGRN9OMXPhoMN%2B7T56GpBGfNKaNY6LXquGRRMdydE9s0pe8AXemZ5rettvk1uS%2FW6pCSOT5vsLrs1NeubNDaNXXSNXu%2F%2BBKyLnS08U91B9OXqtxtcEUjxPp96XvREOrLzp0zCqCyyRM1p%2B7MKW7bIBnh%2BP3U2VFyQp2e%2B3P0olHTT5cj7m%2B0UrLLlJHtb0aPIaKMP2t39owjbNezy1JYLBEW4SmPGF%2Fd8mvRRFdz7iUXrJQ0pfeVfgdzDyTMLnlhM0GOqUBofpyghV1x2SO8o7ESBfl7JmTV6pZO%2Fldugkv1xXaVFEpwTL%2FTGuwLE6H%2FQLWajIoeFamKMWD3VD1fyFTU9v1ZHgANSbX4bt9PnnalDG3eWkLlL38oIylkZr52Bl9ECgoDICwkD%2Bji9nh78l6sRQi7d40rPYuvIvFIL9sx1HZTxnqWMb55X%2F4jMUDyo9bXwLYzM9a0fNRxsMrjRPeVJHiPwlCLneD&X-Amz-Signature=53d2675f4dd4f5c85169d2e4c310d27e8746606f8e4ae427a4517c9f3f55e354&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XU53PQ26%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIAdXL7zWW05mkBIaAXczqfM%2BgA%2BT2FO1PTOxGXBGnw2wAiBuwNyIL%2Bv5AmHDHUF81guVFxUlGW5kFUCQ8fgmBWxxVCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMVzcNPtBSp0ZsYTBDKtwDRvrVUbV76ejWIk48aOMuw6%2Fz0MDRzqWUUzJtlv7JpdIbEMzmE%2Fr330kqjJLQXKtIbVqlLml3VUhqnTi0%2B2Wn3PqNQQpsylIcIWU4Ldh33ctesgw2%2BLsNiANPBCEGiEZ%2FSUzxdIMkhqjaVsJRL%2FJJGkVnuBPFZGFU3Jx2FbvUUaYI23nCoANzFSjGksmXW7GHJwbjsJwaR48bVCod3CVIXiLuPoQF0qcsUO0XIA5yxRPbZZLaZUEmpMdiX6JuFdvhfu4Rz0a4gawXgnqkgLHDujhc2S1tkjRth%2BPyaIafNg9ZhI77Ti4tPPwujalVb%2BEyFnNWc%2FfQ%2BlW0QWtvYwPNGHZ4m8c8YOfnljlSMqLUPFvQ0OUzrOp%2BQMTYWMRyKaOQ9ncy23Bp8XiEZsXRMxFShnKbvHmpCUAUipse5lWsdv65VhxzlG1GsbOuAAiH6B6%2B%2B3oNluwKCGEpHXCigE2EGihpoH4XZ9hHWKVNNTCJknIGZQYy7MnwFCZ0O58G5FZMtckvZRwy4Yb1%2FKPtWHk6dWW6OHaGwHO6hHC5TUxrmsbTG%2BmOcFIq%2BzQD0MQ2aX6qh8n2Y9kwIo48I1HnHNXjuKAYkRjCmYMkno8gsRXNYHtBxYrJj7xMeHXckHcw%2BeSEzQY6pgGZ5E1q9%2FbvicQ9Xl%2Bplbvusf5yZvJPeImgcDqjAPKISE%2FG8BIZyO5zqxWrgnM83Z%2FMQBb0ITFVEJ49bBXgIzlvDNorD9Eh9jyg70gBETN8PJdm8d1pUfMcjmDGvx168H0XYfVPvQHGRuMcFWBMqLXSBKO1aht4py%2FusUDnMdGQht4agAziIa1w6Bcv644m1rj6MxmUT%2BPYCSa%2B6T4izm7hC4KMXzOi&X-Amz-Signature=cb93481391afd38360811ffb6e39fcbac08ed94198820819fe44c1e9e4f69243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJEATTM2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCl6U7yOfzp1vm0XVBxJkC5J6F45Bn6AN2UHY5CjuYdjAIgM%2FdxRR%2B5DxqQSNiV1NWXY%2Bdn6I91MUhCJi2OeD9ykd0q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDE%2FXb%2BBvCRn9Tx6sjyrcA88suT%2BS%2BWIinW6xdpNM9kEQMJ47Ld%2Fp%2FSQ%2F8iLDSZKnAUG7YLqdwiNIA24HXHxSgCDdA1sLif8ZieudIe8740h535p6tgPXjOMkT6EXABVEPF0pT45wu3G3S98CJY3yUc%2FPDS4Y8Q8gsmWeEZ8Ig47ohXR%2Fm2r8Jx1uWNeZL8WB7aBOIeMmNvpxO5VyWb%2F5rs19KrkD7IeC%2FzdtZTfKyc7JT9BLPsuwtowDGd60C1Q%2Bqc1uQ4zc4Kz3JfDR9rs10NCKm8GmKLQKqcev%2F8%2FQGfwh0Gkc6gcASOnrK6UlXzCvJobYD3hIDajl3GRC7PnQb9Wt4fgOIv7XZNl2iSxBnCf7PY9t%2Fo23CTQhWxzWQ4pglsxv3%2Bvyc0RYAeBjzJN2S1tqisVA53y7bMZrZ6WZbq7UuiRRKr8gOw0BYE8lgunQF6NKgCNM5lR%2Bs03XXYa226p2w33zFg%2Fvd2frNnj2YCijhIZXcEbQcu0huz0B7gB8iLVhkCZZsXY9LJ3lKK0U65tVFkE%2FlU5XNbjO1YQQtPz4CcpXr3soRcgnpgkp%2B6LmnRwprk%2FkZoweYPaDpFO6qE9%2B6eRtMTZ3eCPnNlIUcw0zkygSthZfjlKTVkYoKRp5%2FlSOE%2BTzKi%2FekWvWMPTkhM0GOqUBuSNgfW0Tim9wc10FNzIvzclfeUbS5rgOvXh5sntHi6hhrN%2BDftSbjTrWapOWmZJ51xQWaq0dT47r5C5r7K0U83vUvf%2Bq9s8zQXxs6XP3FYgSuad2T7lVZchK%2BHBMBt2mfqujXfjzHAHKj6WOeJLQ3zRBgZOJVj6vfTW2hr91n0e1cgeCkUYfDE%2BEj%2Ba61fQ%2Bvs7BonEkfdqohaDgmlLFNxWC7ETC&X-Amz-Signature=f6ff4f2a7aaf478893d7bcf7301d8e4089a3cd92ccecaa4d23947db328840900&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJEATTM2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQCl6U7yOfzp1vm0XVBxJkC5J6F45Bn6AN2UHY5CjuYdjAIgM%2FdxRR%2B5DxqQSNiV1NWXY%2Bdn6I91MUhCJi2OeD9ykd0q%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDE%2FXb%2BBvCRn9Tx6sjyrcA88suT%2BS%2BWIinW6xdpNM9kEQMJ47Ld%2Fp%2FSQ%2F8iLDSZKnAUG7YLqdwiNIA24HXHxSgCDdA1sLif8ZieudIe8740h535p6tgPXjOMkT6EXABVEPF0pT45wu3G3S98CJY3yUc%2FPDS4Y8Q8gsmWeEZ8Ig47ohXR%2Fm2r8Jx1uWNeZL8WB7aBOIeMmNvpxO5VyWb%2F5rs19KrkD7IeC%2FzdtZTfKyc7JT9BLPsuwtowDGd60C1Q%2Bqc1uQ4zc4Kz3JfDR9rs10NCKm8GmKLQKqcev%2F8%2FQGfwh0Gkc6gcASOnrK6UlXzCvJobYD3hIDajl3GRC7PnQb9Wt4fgOIv7XZNl2iSxBnCf7PY9t%2Fo23CTQhWxzWQ4pglsxv3%2Bvyc0RYAeBjzJN2S1tqisVA53y7bMZrZ6WZbq7UuiRRKr8gOw0BYE8lgunQF6NKgCNM5lR%2Bs03XXYa226p2w33zFg%2Fvd2frNnj2YCijhIZXcEbQcu0huz0B7gB8iLVhkCZZsXY9LJ3lKK0U65tVFkE%2FlU5XNbjO1YQQtPz4CcpXr3soRcgnpgkp%2B6LmnRwprk%2FkZoweYPaDpFO6qE9%2B6eRtMTZ3eCPnNlIUcw0zkygSthZfjlKTVkYoKRp5%2FlSOE%2BTzKi%2FekWvWMPTkhM0GOqUBuSNgfW0Tim9wc10FNzIvzclfeUbS5rgOvXh5sntHi6hhrN%2BDftSbjTrWapOWmZJ51xQWaq0dT47r5C5r7K0U83vUvf%2Bq9s8zQXxs6XP3FYgSuad2T7lVZchK%2BHBMBt2mfqujXfjzHAHKj6WOeJLQ3zRBgZOJVj6vfTW2hr91n0e1cgeCkUYfDE%2BEj%2Ba61fQ%2Bvs7BonEkfdqohaDgmlLFNxWC7ETC&X-Amz-Signature=45986066f5d81f7c6ef6fada37940170b667b9845d1664a32dbfe5f305674d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUCGXSOW%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIQDZosFuq32kBFMWCKi0XPtR%2BasP9Z5JdhiL4%2Bf9G05wlAIgEEzFNY9dsJEJ2zhGMU3vk3lf7V4vDHRLT9MsobDVDJQq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDFe5lcs0JJcDY4eH5CrcA%2BnKpyUFqPxTRvhK6uevJmaVLd25W24M5sUZWwvZq4WDhbsRVh3T6W5Cxn6H%2BEyBb%2FfHqw3HEMzUgQJA9XHI4KteAPb5yAnG%2FLnURPrW0gy2YcVCm4owUaXR2fD8ZzMtvLDcXdJMm1BZAClkVZzTpK1uvd8TdnemtETFUa%2FwV2ukOKhcHo%2BHO4NSmsGYPRUg66%2FREf4jwB%2FwkgtrmI9ew%2BSt7rur%2FIVOXhbZWv%2BWhJB7eXR7KSEaRCn%2FWyixqrcXiOfhtCcAN6DRaW%2FPeh422J725zGNhDyHZuPoZo3FP00R%2BQqragZJuJcApdku%2BoG2s6P3R%2BYOWAePt0ofxNHCsV9ejFb0ylaUJUZHXBKmPtg90AEOQ0xPfa78TL43kH6apvx3h7xkOpytfn9F8IMtLECMe4JGRtoVNI%2FuJS6Zw5GRpvP6rMs0dxdUBdhsw1n0HjfG2EOrHQo5bKMNGc9K5yIjvg%2BpKttS6YFusX0b3Oek8iE7M9lyjLJPa0X8UkldkYCuZXKhCi56jD77j10SvZNiku%2BskJyoLatEd5S9%2BxxrTNzs4hqxhL6dsYDHodbbHtHVu1OGHZ3WmxmBTBOJYUB4GICycA1CthJHRIylgaeWVQ%2BvTVclRc2XZPtuMPvlhM0GOqUBwwlKmtgHB7udc%2Fz%2BZdK7jl%2BUqZzIMtz0jLvlai6wvKUb8d6dpq1dM7ey8Adk8qWniAvxwGy7JZiZkFL2cRs79GtEqmGlhM9mdgWrq4EZlOGvE9YWOP26MEigL%2B1ao4MqGQk%2FwbSkoUNEVy0QHRPOhKiYfbq7cPjsEV%2B%2BDTPN%2Bokgsyh8ub3ITVSmdJhgka7rlp66nIjg%2BS8G0qHkgTknypHLzAYe&X-Amz-Signature=c74d913ac68cd500fd874693cc1fafc9cf0e1788450116e7eb30486741146608&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6GZWNIC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDTtb0oTA72vjwDQrHSYxgAQkU0RelC0QfgaGgg5%2B4IsAIhANKMM4XbqcED%2BUXgjwF9qlxp%2FRXnMaZZEBTL1lLV30HLKv8DCDcQABoMNjM3NDIzMTgzODA1IgxR6Z%2F%2B3e2DHKYyY0gq3APGhPjJervAqNE5Uh9y9LiwNELLVzOMUI%2BmKr5JxFsMmx%2FvLrzf2cK4O11XOgHdZ%2BHNxr9rZIFr2nz4xQnj7dw9FfjaxZwJgFACctO97IhRlKd9DIMe9pS1fxqYOVkQDgq6jfruSOxLrf31yP0vjYYE%2FuJVbAcZnszYCCEF%2Bl5xetwgDFV5b6tyUjb1Tb3sRZ%2Byr7xg8gTFu3sX8eDgp9BFWuXqcZ1xjpquZm03MfdxUFfwInnqaQxJHDWsphBB0dddhLy56Hm9dOUOgHc8WJIG1jrKrLz%2BbtPwVMzloO6Pr%2FNzH3MrbZwIWxCeyIt6MjWJkU%2BAHqzIMruy9lskpqkMpPb0%2F3oDOCNzINB97rnRfRJ7CoMXDfK6PgVMxFp7O4AGV%2B8x0ma830jmIBJyGMLZABnzgIaFDLN91RQOWkw3COCt7%2B1O6NPeZzfxQtJoo%2Fqk6h%2F%2F0krMhr6aemJmJPx5IKOgfZAXagayNmP62bcWrOahFUvtjGv00qQuPcIzBj1ugPx0jyGIp%2F1AfbH5h6sLbZRGtpECzdPvYnDvNl8vtqc%2Fa9cnNHsvUkoXPMzzx6tgqrPYN%2FH1J%2BHE7r4jiP2G1Ldm0kfKSJtCBv81lMHCyRGdNOBo65ccfq8LcTDH5ITNBjqkAQEs4OEgLaVD3elSi1RRDYivXLi1mEZLZsorqpn5vKdVL9GpElq%2BUX7s25BwF7pTBiqWlkTa8q2YgCJvnX7WSh%2B4wzJ56rsVIug3wQlCLmb5BNsyecZvtHz6qhiSan%2BlPA1YKhjujDZOKbBtJ6t%2FpZCL43OQYGH9RrVulubzh7B%2Bczm48gGsgyAz9oRtnBUCgCCEsnO7mMu%2F5YdnsMUmXvC82315&X-Amz-Signature=e95d792d57f5b6ad98417ef85314a28f518758e3111c67e19ec4a7ed78a7fd9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6GZWNIC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDTtb0oTA72vjwDQrHSYxgAQkU0RelC0QfgaGgg5%2B4IsAIhANKMM4XbqcED%2BUXgjwF9qlxp%2FRXnMaZZEBTL1lLV30HLKv8DCDcQABoMNjM3NDIzMTgzODA1IgxR6Z%2F%2B3e2DHKYyY0gq3APGhPjJervAqNE5Uh9y9LiwNELLVzOMUI%2BmKr5JxFsMmx%2FvLrzf2cK4O11XOgHdZ%2BHNxr9rZIFr2nz4xQnj7dw9FfjaxZwJgFACctO97IhRlKd9DIMe9pS1fxqYOVkQDgq6jfruSOxLrf31yP0vjYYE%2FuJVbAcZnszYCCEF%2Bl5xetwgDFV5b6tyUjb1Tb3sRZ%2Byr7xg8gTFu3sX8eDgp9BFWuXqcZ1xjpquZm03MfdxUFfwInnqaQxJHDWsphBB0dddhLy56Hm9dOUOgHc8WJIG1jrKrLz%2BbtPwVMzloO6Pr%2FNzH3MrbZwIWxCeyIt6MjWJkU%2BAHqzIMruy9lskpqkMpPb0%2F3oDOCNzINB97rnRfRJ7CoMXDfK6PgVMxFp7O4AGV%2B8x0ma830jmIBJyGMLZABnzgIaFDLN91RQOWkw3COCt7%2B1O6NPeZzfxQtJoo%2Fqk6h%2F%2F0krMhr6aemJmJPx5IKOgfZAXagayNmP62bcWrOahFUvtjGv00qQuPcIzBj1ugPx0jyGIp%2F1AfbH5h6sLbZRGtpECzdPvYnDvNl8vtqc%2Fa9cnNHsvUkoXPMzzx6tgqrPYN%2FH1J%2BHE7r4jiP2G1Ldm0kfKSJtCBv81lMHCyRGdNOBo65ccfq8LcTDH5ITNBjqkAQEs4OEgLaVD3elSi1RRDYivXLi1mEZLZsorqpn5vKdVL9GpElq%2BUX7s25BwF7pTBiqWlkTa8q2YgCJvnX7WSh%2B4wzJ56rsVIug3wQlCLmb5BNsyecZvtHz6qhiSan%2BlPA1YKhjujDZOKbBtJ6t%2FpZCL43OQYGH9RrVulubzh7B%2Bczm48gGsgyAz9oRtnBUCgCCEsnO7mMu%2F5YdnsMUmXvC82315&X-Amz-Signature=e95d792d57f5b6ad98417ef85314a28f518758e3111c67e19ec4a7ed78a7fd9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OEOPWS6%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T063559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQCj8ltJ8yYoWogqoJGjUt55yXPkPcaw2rcoI7o6CciE2gIhAMkZRJ%2FiW4ktbtevbLUjanhDDAksx4%2F%2FNji4q5S8YYz1Kv8DCDcQABoMNjM3NDIzMTgzODA1IgxGy51HWC70LMLHOM4q3AOSnWgaOA4iaLZK2HuNinpG8vbxZR10lR2qkn1XSXi1JtYrX%2FDmmPTgn0GEhMzhtZuLqh8YRZCNP6mAvD0RsdvYKIUhVpyaQzUqkBZ71Tj3KhwnC2q2xV5VoZLAXcfD0zHv6PgqC7ZKu02e8cLKQQ0de32zrzucpKbQhoTm9JtKRnbgLNKrbgKw6ZAdGAiE1Yj%2BgcaMhaGbLt8w7fnZ7PgZDtsXRWCZcbmBqIsj47g%2BYjSZE2oZ0HqfXPhGOPseYCBURFJu09dSom5HcdqTB9SIgKxh3Tjn2ktwHeyLZvP6YtiV9ag2KfMzGouqL9THWZ0hxhodheApi%2FmoDc0uSAAMgXN2fwHHsE%2BdRt0gR2hnf1PdjZn0PXtFIezwp20UE7jGwS4rRSjnjTDt0jQN1h%2FfQz1Hz6q1znbVci6JZiGTi3IA%2Fx6ouJ%2BQ536%2Bs4OKNwuv%2BV2zDY0PefzaTm9ij%2Bn%2B4pfek1eZRfi8yGQiRsyJWzJui2AyF92SFyQGV4NIuaDYw5OLFGw6yIUotV1%2Boq%2FaquktCICcCw0weuLzTkFZlu3RW0DACHbT6Xfl3cqe%2FwvN62iPSDCeKJszrkZo8Tsfovnn03zhmcmyn4RosyCaNkqH9b5Qsdi9XJNKBjDF5YTNBjqkAapkq3udaU%2BhDZXm3%2FIK7FMzm79JwyRqPXVzDwM1D1ZPnLMg%2FCLNUZZIRhfHJrsqzN18ICnkIwQ%2BbAESg2YZngwKH0V0ygyr%2BbEO%2FN9OMvD8GYDTzG0z1%2F57g%2BZhpMeCP3GvZ%2Bq21fjU9Bkk5wBQ2jXdW6alSFGjiLByrJ7XILnZK0H3W5vEWnz0e8B54PxmhCdwPHrdIvq8QX5sRy00ZBce2Pcb&X-Amz-Signature=c9ca64ca0769ec9c995265de845a6a5cf82d8d058fe6bae66cfe68ddf8f8872d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

