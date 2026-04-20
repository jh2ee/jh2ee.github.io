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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K4L22JI%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIGTxHzbqCYf19eoeIHkF%2Ba1JcpSDdBRTKWqQuGD4ylaXAiEApcO7c%2ByCxNItN8TtObAclVv37tjXK%2FtC2bUKF57tcjEq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDN9X%2FE1cRDuiKsj2tyrcA1NmuX4sSX2AkrjEPuZQXVz34adeVdFuZGKLInpXi8gGveW5TZJhTKLoeK%2Bqai88DC%2FCZcwe2pVTTFsMWrOOa9L9Af6Lt9nzl0OHLgageedXJ0yhtQQEhIX5JE80tPc85iJ%2FBUv8u1jeGkCbAbaqsH5Wb2mYdYHMhM0gaCGf0%2BKFAlNp%2FPvtJIbGkbpAO5RnF7I%2FIShszxLI4oCqSZ9jQV4i6POikOGZBqMXYaT1wrwasxl6RcGWr09olfrQAHMN7Mn7PUIXpTu0s%2BM7IdzYEppn6%2FoWI3bN7NzhbsxyQ4dMv3ej1Yp6R5Hwu1SN8EZY%2BjvpEeN3uUsyynvBbM2AzBDlxu6m9CXbUlSY4P2%2B3KFbekWH8dPtXHpH1i7ZN8FLizRgs3Xjty%2F%2BkYJcspMW9N0azpvEBWxFu4soXjji85U41dxtOS3BjQw2UTfbM%2FFGhkXnO0nNVBasYydSECWcE%2BxBGocZehiyJk%2F%2FVfqK8TzXsCKmDWjpcERlso3Mz88djQ27sazkzMCdgwRMvYCW9a%2BEdkBCY%2F%2BLaZlI5%2B8CevLKA4y6Onwv9TVr5X0ms59zG6%2BRw%2BOwRSV46j3hxDFUtCDHr3mDr7u7sBKUxHtVlyKCyVOE4v5nM6bWC2r0MNWJms8GOqUBh6c1jztmhmZ83yIF8MUnnOY2Hnzen6Xx96qlTJx28mXNHuvANnFLHvbxp72IctrpPWMZYJA%2B657%2BFUsNeona9usE6suZMEB8Of1ublPk1Re5H865tp8TlrXjz5d%2F2RfxsgI79WTmJoDUiTWhGUuYYv7Vq0eWDDKtrKuYqNLVPCf91xzJFsTyHjoAAdo0BMrObKDsPSvLiz9LtXnkKKr%2BZVujPPKr&X-Amz-Signature=4d97bd2a18521d7ac5469f0c9fffd6fe440d727e610935402370cbf2f83f9710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K4L22JI%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIGTxHzbqCYf19eoeIHkF%2Ba1JcpSDdBRTKWqQuGD4ylaXAiEApcO7c%2ByCxNItN8TtObAclVv37tjXK%2FtC2bUKF57tcjEq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDN9X%2FE1cRDuiKsj2tyrcA1NmuX4sSX2AkrjEPuZQXVz34adeVdFuZGKLInpXi8gGveW5TZJhTKLoeK%2Bqai88DC%2FCZcwe2pVTTFsMWrOOa9L9Af6Lt9nzl0OHLgageedXJ0yhtQQEhIX5JE80tPc85iJ%2FBUv8u1jeGkCbAbaqsH5Wb2mYdYHMhM0gaCGf0%2BKFAlNp%2FPvtJIbGkbpAO5RnF7I%2FIShszxLI4oCqSZ9jQV4i6POikOGZBqMXYaT1wrwasxl6RcGWr09olfrQAHMN7Mn7PUIXpTu0s%2BM7IdzYEppn6%2FoWI3bN7NzhbsxyQ4dMv3ej1Yp6R5Hwu1SN8EZY%2BjvpEeN3uUsyynvBbM2AzBDlxu6m9CXbUlSY4P2%2B3KFbekWH8dPtXHpH1i7ZN8FLizRgs3Xjty%2F%2BkYJcspMW9N0azpvEBWxFu4soXjji85U41dxtOS3BjQw2UTfbM%2FFGhkXnO0nNVBasYydSECWcE%2BxBGocZehiyJk%2F%2FVfqK8TzXsCKmDWjpcERlso3Mz88djQ27sazkzMCdgwRMvYCW9a%2BEdkBCY%2F%2BLaZlI5%2B8CevLKA4y6Onwv9TVr5X0ms59zG6%2BRw%2BOwRSV46j3hxDFUtCDHr3mDr7u7sBKUxHtVlyKCyVOE4v5nM6bWC2r0MNWJms8GOqUBh6c1jztmhmZ83yIF8MUnnOY2Hnzen6Xx96qlTJx28mXNHuvANnFLHvbxp72IctrpPWMZYJA%2B657%2BFUsNeona9usE6suZMEB8Of1ublPk1Re5H865tp8TlrXjz5d%2F2RfxsgI79WTmJoDUiTWhGUuYYv7Vq0eWDDKtrKuYqNLVPCf91xzJFsTyHjoAAdo0BMrObKDsPSvLiz9LtXnkKKr%2BZVujPPKr&X-Amz-Signature=4d97bd2a18521d7ac5469f0c9fffd6fe440d727e610935402370cbf2f83f9710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZT5RVKF%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCX%2FqBeB84w1nfjaPhVi7awh347QpPvr%2BWbCUEJvaY96wIgBQW6ugRFo7kqxhiiMRz8ZEC3fqLh21qvTndiRXF%2F%2FjQq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDO%2FWzmyBeY%2FI02wIWSrcA8%2FXLq862Vl1Ir0Xmn37Mok%2BK4yhY6SRzfoN%2FDnEsCVVPoEyKfJjQu1zbtclwWHpB%2F%2FIgWtMKc6IxXJipjl7IvlRbbvXgHtbjODWmOZ2HznGJCyeKQlwZTFKvs%2B4sG6ix8x9lNBeW5PSkyTlxaeOYbIPkOljlfpYyEPL3q1VjCsuKmja4fhDqKCREhgh2PpS2X%2BfJ0TykAZ0k%2Fv6Uo55fij1hR%2FKmiCoEaaH2pv4HSUgI1lMQf3V3EfBUIVCNTovrlICTIC35m3Jy5NM9dNyTmzRFYxlJ6bJAxYhWK3BSOxYQdfpya%2Fbfi2FgpnIFsAiJy4UGq8t4SXmxQBdiJlQ6VEgnzBT8yc%2BP1KtxuCQjmOhFs3pczSEH%2B%2BpK1Z4rbS5THXxzSWXomnqngVBtY%2BDdCpKpTE5uOetaQYY0jMcX1V97J3AU6Bj1cIwaEx6MlASkzg%2BXWFP73F3cBJV9sD2d2HjXHXx3Fnn1x%2BKH2kdH%2BIRgshUNRxH8HKjlwWIAxOIiSYaLQRmIw2L4GxPRQ7R3PDr3RN9P10zaXxvCm4Yo7hpCkcgDIBv1vCjvOoQy5iOWieYdbVdw4HxXBEj0UBAr82UW2CYq7mBUAuSFHq5P2jWXGXXPEsE0ET11KNaMIKJms8GOqUBJ5cBuy%2BeR0UWsxQdi%2BcB0dZ0Hy30ltjloHLof0xfKOFYZKxcg6SpiLr1B4AaucoPHaAYZp6MxpKizVC5JhR%2FuPFihBPD2U%2BSiP%2FRXSDqd%2FJV2KtT5Z9M7QuEkZxqwW23fhcXB0Q1Enb0StZa0No5LnGB8J%2FkuchhApBdTdn11OO%2Bhg8uN%2BS2iBv%2FfxJTET1PYhYCp669fMmWLQm2wZ1SZD11Y0nF&X-Amz-Signature=1504048deb5865901b424b0e49f92e49deee773da6c51748bfb7b395f2f768c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F4PVKNC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIFvCYxGxMY9%2Fgvn3pliZLN%2FgUP1xi9rwE%2Bl9chARkeJnAiEAz1VtDZFkGLRzxu1AWpdBCPDGLy4xbmNVmJn5oGmLcVYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDGB6PhsENbghiVMZtyrcA7DZZ7graY90qfYAFmBB4Qo6sxWR%2BpwcRedF38yVHA9b7Htm2%2FH1XdAPuDEcQiOKuPyV4d%2F3AL0jVXHQIuimy8hRCRORInKnP0YDftSSFzf6O3017khHmUXaieue8cdajjAYew0Ow%2BAcMcf7ssi%2F6ix80IVPHCt2OmKg0qqYEL27Zc8c6lSTj9zL0ejXlxdWUcgmbvVc4hm5XcWs4EBnxCcx7wGS6UEjs8T6cflfY8VkuVr2tQh%2FS97bhVtJQVS5D5pE0X9VHVhIV2T98odbEk5gxuc3LNKFlpOY0ZFk3eLFCkpFVNg%2BGT2rElNCIIqLZlsn%2FkqPtXdV9JkSXYeA18GEWh0rmEBLaAQGGzJVn7J1sSiOO95BzF9u0y2j2QgWYV9A7SK1y5Xo5nCnpQRLwvJrYata32EhyfOrEyVMCqwpPd8EHdc3dLUm%2BHj2h8XmY6Ef6mUKUKTepiEXWdUJ9xxaF7DDio0TEKEjvhjUwWfl0FXAOVqVxso%2FW1WUYbhzSm7bwHSm3utUye5WwXKVL8QBP2XS%2ByF5CzDG2HJG97mFZTJNLkv5EW2vtTqveOA1BROgczPNgtN%2FYP9jP2PUyvh480nzmcwKGQRzkvHR%2FkRfv3oVrTobNBrepJw3MOyKms8GOqUBvgS6MaXodcH1w67xHtaaEWl11MmbE1YqQYG16g1r0e6sxHkOlPeIFvs%2FuSFU6P3ZvScYob77ICt7YYZer8V2tfVAJ2b85728UFEeAll5DwbicWhKKMFYrKCGMboyDzssbzyRjNBk%2BZNaors6manzb%2BujE3rC2UOsxWn36BcYsIDZPHsuYrxH4dCXW%2FzIO0J%2FYkICfvGYF8ZngEf9h%2FZRuvqKMOp9&X-Amz-Signature=46db64744756406bb16edb65023540a63d91cbe49c1347800c603a79964d0ec4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F4PVKNC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIFvCYxGxMY9%2Fgvn3pliZLN%2FgUP1xi9rwE%2Bl9chARkeJnAiEAz1VtDZFkGLRzxu1AWpdBCPDGLy4xbmNVmJn5oGmLcVYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDGB6PhsENbghiVMZtyrcA7DZZ7graY90qfYAFmBB4Qo6sxWR%2BpwcRedF38yVHA9b7Htm2%2FH1XdAPuDEcQiOKuPyV4d%2F3AL0jVXHQIuimy8hRCRORInKnP0YDftSSFzf6O3017khHmUXaieue8cdajjAYew0Ow%2BAcMcf7ssi%2F6ix80IVPHCt2OmKg0qqYEL27Zc8c6lSTj9zL0ejXlxdWUcgmbvVc4hm5XcWs4EBnxCcx7wGS6UEjs8T6cflfY8VkuVr2tQh%2FS97bhVtJQVS5D5pE0X9VHVhIV2T98odbEk5gxuc3LNKFlpOY0ZFk3eLFCkpFVNg%2BGT2rElNCIIqLZlsn%2FkqPtXdV9JkSXYeA18GEWh0rmEBLaAQGGzJVn7J1sSiOO95BzF9u0y2j2QgWYV9A7SK1y5Xo5nCnpQRLwvJrYata32EhyfOrEyVMCqwpPd8EHdc3dLUm%2BHj2h8XmY6Ef6mUKUKTepiEXWdUJ9xxaF7DDio0TEKEjvhjUwWfl0FXAOVqVxso%2FW1WUYbhzSm7bwHSm3utUye5WwXKVL8QBP2XS%2ByF5CzDG2HJG97mFZTJNLkv5EW2vtTqveOA1BROgczPNgtN%2FYP9jP2PUyvh480nzmcwKGQRzkvHR%2FkRfv3oVrTobNBrepJw3MOyKms8GOqUBvgS6MaXodcH1w67xHtaaEWl11MmbE1YqQYG16g1r0e6sxHkOlPeIFvs%2FuSFU6P3ZvScYob77ICt7YYZer8V2tfVAJ2b85728UFEeAll5DwbicWhKKMFYrKCGMboyDzssbzyRjNBk%2BZNaors6manzb%2BujE3rC2UOsxWn36BcYsIDZPHsuYrxH4dCXW%2FzIO0J%2FYkICfvGYF8ZngEf9h%2FZRuvqKMOp9&X-Amz-Signature=4aac742189f15a37dc7a9623fdc1631d35f9683fa7c426c3b56dbbdeac8573eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWW32IIL%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDgiYT0PIZ36X%2FFHTfhWo%2B7q%2FIuWUX7Fphp63hqikURmAIgbEd2DUvWhwEPC8YWBva1tmayocBTlwsXg0nA3pLV9lcq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDFARlK81squTnhedDCrcA7efz%2FyvkD9tz93buccVfKakOz5FbTtYzCkwivn2SFcRrhiyqxlBgZIPPsmheAHlJX%2FgABe1RgYjP%2F895IgXBdIrJ1tRD%2B9rcLZxQu9Z1%2BFVRnJ4EzeXfu9tH051eMo5THZBai5GHJEuZFLUDC%2FF2M1lDLLIHE7%2FSIQQSjWBCPXWUfQ5t29RtdVwrezzTYBjAjx7xYL9XAsQVZmgYzgp8MU4eR%2FtS6ifJwg1W9jQkXbf2ujvnWbjCdH2UN2qh98p%2FdFmtRDkSn47IwmABnZLQZ8KjKMmzJKFE0%2BclxuC4yszV%2B0VhjjtSox35dBArPsN0nXp5BmX4qWJUJjaBDGkvyCVA8XHtK7%2Br9x2em7%2B3Mq912izojJLCgdPbIS%2BF%2BF9Af2raoH661cLP83FnIhy8m1SHsE12Yfb97I7Lebf1Z5QVTkdcWKVaFAKncdXqxFBJMRnS73heX2EDBAUTqS%2BuIC3sp9OsBme6lvG%2Fy%2BlRiNQQBB9m3bJI7WwuoDSBe%2FyiZlklvQPyXagsGVelXW%2FTST5480CkWFZZbEIfy6ESjxAYFLbjGqESr1TZCzGQEfSL7JjVEGZufJoM51vEt59F1XSJeZGeoPm%2FvdT7ALCfyxEnHLKsZ5HM0Gj%2FGC2MO6Kms8GOqUBvBOhnpZ6HocSHKVeD0IoSdySYmlgufAq%2FDGQG8mFI6ljx3PgB%2FEBKflu1CX2Ww2f7%2FN9V3ykYU%2FIYX8W7ENZ02%2BFmgbWTShYgIyxuAAcS1wZZuL7icEZJ8kZVhYDx2KfraEAgAgT3eMIVAJG%2FC4fobvuvdgHbMsMM7uyJB%2BHyivjNsVge%2BWVuA%2BHZIE0qsHb5%2BZLRYBcyEI4AsRqKczlvMfwOV2p&X-Amz-Signature=1dadbe8f1a1b7e1f367b872752792a9673d7ab454bbc3980bc2c5fc90c9e93a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBNMJC4Y%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDZZxoSmoN6%2Ff2H2vB6kxb2txjkgtXqgVEjfin7iVlaFwIgA9N5otl5Y9EmWPQFnjVb6pPARZ0kVkEmrxS%2BZsQG71Mq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDOEZv9ywpXQ2tBSKDircA8QRoMb4ZrRoq8Bmv1rXmPcR7iXNnhLxxIQJ5xFPth1rEVkJKH1flzVCOtNfE341OMHBkfS3fahvKQvJ6saH2uHcKFx%2F31LQHtYk7flia8NNYaYktCz4gg4Vi5yUaWndQd3LRDQK3LXdLG%2BwtgVyezKoXbe7n5XHx5Wd0dznHWvdg3eLVslZPgAwijXFH9Azyv%2FtzJ5kHoHk1Hgr0iSZnePN4TJ34TJG3t1Oa9uZAqbWIQUBVKr53N3lyHEbYwR4HMBLB0ogZW8f%2Bc5cvwcLFdtAfiJOn6i5LXoHsoslRfEmx5mKW1FjkrSOA4tnboTM1nB%2FwQ1ejIqo8kMJLaXSy39Ju3rWFzQiHhD%2BpJls5Oje1BitXgNxXA04vbFqV9bI2DYwfqgzFtU4I5YtkCVB%2F%2BY%2FIsPpF2lrBC3oSqt57U8V58jcTx8ifveuK8bEz2S1nyA82inux6iTtJx1nVMxYHP%2BqTfL0UPzuem%2FVSv71aKCU63%2BlrGrKy3JwgMLvScDou7LwChHr8arh6c6vkIkvJE0TluMxAoXN0AGvWMnh6Ur7veoDYm%2F9KCKlCgCcl5XV7o09hZW31HYmr91RIX6PpUFCn8OOE2c6e6EI%2BOEoZQRFPf19RTKtg1y9DSIMJ%2BLms8GOqUBucHvrQH23NvY6Q7le8sg%2Fwdw9GoD6aDffffK4PXrrfzyYJz%2FbyAlAALJi38iLdwD%2FdClIUAj%2FvyMdKmO%2FURFFCfRMR66CktLVYNJpW4kznAoXeUh1DxIxRtA%2BLSNAQ9Q90qk8L2CZ4%2BsCIcppCAHwzPbLqjKROWVFtkFjwlA89Ae48KrgCafZJ4GKVvsO2uhZojv2OyQYaxZaBD%2FVFcAruMlaP4Y&X-Amz-Signature=59f2d73e507e514507332d96fb29923213f66a57f168222ad602472d1ab25ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7CMFGOV%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIFrHbrPt9byxBFQxXds417T8oeH7I4oAC6G6yVvD61emAiB1s%2FOMLsMvXTiXF7M2HqO%2B%2F58Q8AJUFD5PuUuETcrZhyr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMXb%2BOxnQAOIUhxLYTKtwD2QemCC9ZQaSaQBtQqPtW68H7jGij8S0k94f7sbiyMQp06ASrOz%2B3mM0Hdb9qyeisdP79nCBLdsrai8EdbJLISjVwopzlwCfPx0CSBw21rXSCAHhmGMPs8qr8CunQ6CX7jP6ad74hAv%2FFdIi8t9ZJMMp4XY9Jq2cGzhw%2Fx7BFxpp8m6legEpoRSLPvJAkrI93QSD7MDrfJ9aHgNWWHPLcGmhykQLhPpAbvZB79gJdOkjMZ%2Bik6KvefMNRM6VBIe4ac0rxjD1rdzC98t2SaG9MG2juPMbp9sEmk0GFX19DyxlcbEW5tydJl2d%2Brb59mf3DaVSY4KFWvdnklj63CBLAfoeMbRePu4uTJc%2Fw7d7NdaR59eNpNlB2efV%2B98t4mwPdpM4YOHYxHR%2F8G5ObbCaHwGPFYoYRw%2FdJyybaWFd%2ByVUqQzhLsUfcJbPWFxMpRi9qEfkrBpzJvOkTxWYyUXq9vXobbmkXt8x17rURRxD10kSUQKZihyvNhtLFNKJVJjQ8ImM%2BIo4g9sPo0W1ND60ige0%2FZiJFLCS%2BMG0Y%2FaCzANAvmPS7LKL%2BxeFZYBrtdAU3jHEG5gkPeyWrJMWK7j%2FSqD%2FOLohlCWxkTRXqPKfrUiGCjxbPxKyIl4UzyGEwiomazwY6pgGQO4vZ25gY9tae8zhJKDIcldhVm0%2BcQxbQU2snKgma73uWLnr4C7%2F9F0IB9G2Urm8kUGh%2BvWixtZY%2Fn72z9WnVf6mvrqkhIcZv3AetCqj1b%2BzfjmnREZeWJzrtf%2B%2B8x1liwVhSn9uEwkwEhFk475Q2UzJkZZFSOkLRElliIGgHiZmsQ860MiJwWwzZkT7CqcQPRctbnz5NspJxVrd9opS27zsStPkm&X-Amz-Signature=9b0444db66e05b48d526168c8a925c72ae3dd40531a574959541ca31bbd03f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623RZHIJP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDLQXNC82SqBd0RbY23hbMmVMEpGCLlZH1k0bQT%2BPgaFQIgCMRXcCUWEqWOPZutOKMR%2BdVQ2pSh7cgfF4UZttv%2BVHIq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDMrB0Xiy7UZC9Kh50CrcA2jl9Tajse1fwAEtc7YCY%2F8FpuSAe6OqQShCmhuy%2B5waZ%2B9xBKPjd8TLUFCWzmmjfRMqgRz0P81n%2BZH85CODiLmCOgA1ZoylsZYop3BKZmOPEmfQFDYumvT6sVrcqvu82WwIiZmYfSlHQ74uyEsabHmAcEK4ankRRs6buBhvqMqgIMdziean8qUUQys95tGlO2hAhqhOjRfUMC5HJFPwjYM9aWnaJNc5Wgxlhj%2BkKNMz%2FDziiRkVaX8RjreVAJSguf0OGAEsBQFHQlEOtxKcj9X%2BA6KB3%2FKnKiZz3bSuIFbs%2FrEXnO6TzxaIew%2FkJD%2Bw590Z0SYaKoGnhown5A9gkY%2BR3XfWnLnKjcx2jF18Nm8n8rtzUgzR0XDmsJY9lj5nslMAXJ1KCBV0Y9ulAzpQPdrxJceM2GcCW%2F7c6nDaiSNutETrM8rEFd7JrpbITdEJSTGoBc%2B2%2BSGU2aHNO6FyHt4couNWDUJrZmzyC6uHz5Wv9tKAf4JY5xR%2Bu9O8xryp8NAD4eNpV%2BmaY0YGP%2FnqyiG1zxPlQZ1EY4NYLAIbJ0IxNDi5yvb0D%2BzS1TzkgYodCzDDFwfKvhfwQRYa7Iz9XFygIkQRdBWY2oDF%2BuTrNR7wx%2Fg6uo%2FBz4aUegoFML2Kms8GOqUBvdhuMHur5lusQCYxYTXFgPXKkqzXTyJdG30yZTUeDpvxN8LjNkSPaD30uwqupgVoZvQD6FP2eb0auPRR1m2E5GYkjnj%2FjfAEDNENBRR5gscfNy5r4VC0BZbBTw7%2FZp7zeMR2Vxi%2FFFLp%2BMYqOU2HmbPagAEy41VkOqlbK9tEZJ1Kmc0Cu5cWRHZcUuq07M63qp8v%2B6GACr45iUJAh3xbTcaZBlmm&X-Amz-Signature=bf1c7dcdc6a767e357a49bc8006675cbc816af81376cfa90180b315c0924ceac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623RZHIJP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDLQXNC82SqBd0RbY23hbMmVMEpGCLlZH1k0bQT%2BPgaFQIgCMRXcCUWEqWOPZutOKMR%2BdVQ2pSh7cgfF4UZttv%2BVHIq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDMrB0Xiy7UZC9Kh50CrcA2jl9Tajse1fwAEtc7YCY%2F8FpuSAe6OqQShCmhuy%2B5waZ%2B9xBKPjd8TLUFCWzmmjfRMqgRz0P81n%2BZH85CODiLmCOgA1ZoylsZYop3BKZmOPEmfQFDYumvT6sVrcqvu82WwIiZmYfSlHQ74uyEsabHmAcEK4ankRRs6buBhvqMqgIMdziean8qUUQys95tGlO2hAhqhOjRfUMC5HJFPwjYM9aWnaJNc5Wgxlhj%2BkKNMz%2FDziiRkVaX8RjreVAJSguf0OGAEsBQFHQlEOtxKcj9X%2BA6KB3%2FKnKiZz3bSuIFbs%2FrEXnO6TzxaIew%2FkJD%2Bw590Z0SYaKoGnhown5A9gkY%2BR3XfWnLnKjcx2jF18Nm8n8rtzUgzR0XDmsJY9lj5nslMAXJ1KCBV0Y9ulAzpQPdrxJceM2GcCW%2F7c6nDaiSNutETrM8rEFd7JrpbITdEJSTGoBc%2B2%2BSGU2aHNO6FyHt4couNWDUJrZmzyC6uHz5Wv9tKAf4JY5xR%2Bu9O8xryp8NAD4eNpV%2BmaY0YGP%2FnqyiG1zxPlQZ1EY4NYLAIbJ0IxNDi5yvb0D%2BzS1TzkgYodCzDDFwfKvhfwQRYa7Iz9XFygIkQRdBWY2oDF%2BuTrNR7wx%2Fg6uo%2FBz4aUegoFML2Kms8GOqUBvdhuMHur5lusQCYxYTXFgPXKkqzXTyJdG30yZTUeDpvxN8LjNkSPaD30uwqupgVoZvQD6FP2eb0auPRR1m2E5GYkjnj%2FjfAEDNENBRR5gscfNy5r4VC0BZbBTw7%2FZp7zeMR2Vxi%2FFFLp%2BMYqOU2HmbPagAEy41VkOqlbK9tEZJ1Kmc0Cu5cWRHZcUuq07M63qp8v%2B6GACr45iUJAh3xbTcaZBlmm&X-Amz-Signature=469f58b9f5d95726fb1f680b35479f2c489b93f81e673db46b52cc2a9ac8d897&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYRN3BH7%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDn%2Fd5SYCnrUQnvALt2lWhnOsecuOf03mL6lHr5c%2B3ZsgIgdQZsPeP3oNjtsXFnrovTmILVvwcWTN9pXOgThsSr9uAq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDL9lTBtPzrv%2FG0bpcircA6MlA8PAJzHRMoK8sZNEGwJdBpkm0EB8H7xELsLZRNS0qy3hbkoSkJqSy%2F47X7f40MxBGGBnPHjQBI%2FZqwM1IPK5g8mH%2BhNsVj6Wr%2FnvwONbdHeesizEp5%2FIZdttjFyE0ULMaT2KC%2FZfoSRP7OjfYMKl9MCLfZZ5nGADXv2NjQaNUsDZriqOhFo1XrTbtvUYxDAKV1P9IBmYJSCl5Arnuoh9B6YRiluxj12T6vh0KvAYRbXne%2FDyCRVMmUWiQ8KqssJ31Hx6olDeyJ2PmHBOImW0SODd40zQ7XcMRuq4KX5W09GVMh1p0OVcCfzQ%2B%2Fu9leLM1%2BV%2FsUQInzKxzfXV8q0o827tLSiijRdT1yySx3vbaxVa5kHH84bLQkjWNd3BAIbAuXsC%2FX6iSe3PgEAhOL5BbBKg05M0FVKipQ9gyR0hDPjaIYx5TiP3tOkCsojPf%2BLgy8eVIU%2FHONM2pTBa76fYZ6Nj2rG878iWkkkZJzYBmF%2F1XHUWt%2F1%2Fz%2BZIJeUr0SybaEJfg7eBTbYdQbn3eRBRHBM6X4%2FvCT7dC%2BCYUc6FvtlIwBNhbskzCmmFA%2B6hK1XyUI0zuWSbOV2dwfwQzBPlet2DOczOC9REQ0HX%2Fd7Fl4qIEeSGHnhXTgd8MIuJms8GOqUBbC9dzgAQat995mHKiVXWgidTwwUMFbqApYjR6K0XsBK3xED8HvX%2BVVHZadnNSoj%2FfGxworYK2bK%2FDQsvE9aannLcatyUZoibWAdCT4gFsnE%2BvfCNO5zMqw6yyNb3g9ZvXFrZjO1FTBHogGqd0wG9RCcVZZ0E18PlEEK%2BDe%2BxJ6jRsm8VROQLliTBnRRAru4hYvsjV0Xs5eaQHjk5KpV3SO1DNGdz&X-Amz-Signature=0c9983f6db544c206234a3ff4b66ca4f6b2f76588d46f7b8aeecf5036a5ee731&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X6LRQGM%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCi%2FPsWvO0mWZ4sNGWAul3jo%2B8vbCQdij35J05IDmQsDgIgWxnA%2FurMzDTAdobaqA2gtmZBJ7D87Xt6tLPUQCHmgJYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDHv7F61UBb6KiXJLLyrcA3L%2BV9ujuUqLd2wTafUL11DgSv582Oj%2B0%2BuRWJooU00saZ9mFtpQaaAprMWQSBXq231N8BWX%2BKgVey9pVnwKMP7Ck7BKWXupvrX%2FmaOWMIz9fA4wpzcrTfVfCsEPNCuz2I21jdp1ZYGjLTXdasa9Pym4vzt8CKVnqmN9D%2FGzFGWYpzMBhk1KBAH8pf92eJMWh7pJ4X1p%2FzZLd2rVf%2BKEpOcByulbLcUdXzL6%2Bxnt6EidQcCsaCo3C%2FmwNkBXQMNm7ai42oerr5Upfko5MUNViEomkJ8EPYXTZWatiDW9sxALIgJjwyWcFPuDgdJ1hznxFQ0YHgIa91LoHnk2mcEKi7UWwzT8bSpzzed1d1wniFc2IEFakNwqVAxjTnlTsx1j%2B%2F5RtsklttRiY66RUlKGeGlXfFKrVWzUSTvhpZXh%2FASSKSX69LyboF0HHRg9697eHrj0x11odqCP9BWvPFHqOG3Kul6tcGOP%2B4bm9ayLAUPIi3NKQ0GTyaIAYWZxZEed3kalSB17uzsvP3d4fF2105K8JuFHtSrw7zP9d8cOrXg6lSetTwo4axulM%2FcLAhAbeGEhqlGeX6NxIvjIqiN0DH68UTRSXYnHnVj%2BIcxCQM7mjK%2FOFdqHPX%2Fx6ik8MO2Kms8GOqUB9WCC%2Bo%2FUOd8HrLjvSEFh42pR4L%2BGrBzwZXCEPV0BrEfpCr2BuqFHnfTNsgXu24F2LI74qUBryvtb2qXsHARCTGY60VJrl0684stJp5FHYz0BO8INf37R0CegPtoPGi%2FzmqU7X6a8NpmuKBN5MBzJOPDIxR%2BAETxnQvgiyk5jiLpfXc6VFLlY501g3Qr1zsZJFDtXVW92Ge68aH25KNkY2LaRUGsF&X-Amz-Signature=1704f38f2fd8bcb3d0a21d86af1fd61c56cc5d4f9c3a1d2a25ffdde5164502ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X6LRQGM%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCi%2FPsWvO0mWZ4sNGWAul3jo%2B8vbCQdij35J05IDmQsDgIgWxnA%2FurMzDTAdobaqA2gtmZBJ7D87Xt6tLPUQCHmgJYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDHv7F61UBb6KiXJLLyrcA3L%2BV9ujuUqLd2wTafUL11DgSv582Oj%2B0%2BuRWJooU00saZ9mFtpQaaAprMWQSBXq231N8BWX%2BKgVey9pVnwKMP7Ck7BKWXupvrX%2FmaOWMIz9fA4wpzcrTfVfCsEPNCuz2I21jdp1ZYGjLTXdasa9Pym4vzt8CKVnqmN9D%2FGzFGWYpzMBhk1KBAH8pf92eJMWh7pJ4X1p%2FzZLd2rVf%2BKEpOcByulbLcUdXzL6%2Bxnt6EidQcCsaCo3C%2FmwNkBXQMNm7ai42oerr5Upfko5MUNViEomkJ8EPYXTZWatiDW9sxALIgJjwyWcFPuDgdJ1hznxFQ0YHgIa91LoHnk2mcEKi7UWwzT8bSpzzed1d1wniFc2IEFakNwqVAxjTnlTsx1j%2B%2F5RtsklttRiY66RUlKGeGlXfFKrVWzUSTvhpZXh%2FASSKSX69LyboF0HHRg9697eHrj0x11odqCP9BWvPFHqOG3Kul6tcGOP%2B4bm9ayLAUPIi3NKQ0GTyaIAYWZxZEed3kalSB17uzsvP3d4fF2105K8JuFHtSrw7zP9d8cOrXg6lSetTwo4axulM%2FcLAhAbeGEhqlGeX6NxIvjIqiN0DH68UTRSXYnHnVj%2BIcxCQM7mjK%2FOFdqHPX%2Fx6ik8MO2Kms8GOqUB9WCC%2Bo%2FUOd8HrLjvSEFh42pR4L%2BGrBzwZXCEPV0BrEfpCr2BuqFHnfTNsgXu24F2LI74qUBryvtb2qXsHARCTGY60VJrl0684stJp5FHYz0BO8INf37R0CegPtoPGi%2FzmqU7X6a8NpmuKBN5MBzJOPDIxR%2BAETxnQvgiyk5jiLpfXc6VFLlY501g3Qr1zsZJFDtXVW92Ge68aH25KNkY2LaRUGsF&X-Amz-Signature=1704f38f2fd8bcb3d0a21d86af1fd61c56cc5d4f9c3a1d2a25ffdde5164502ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TZCDWQV%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T203224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCliLmHFgM6IcdfNSVP1h1zvKoIAxPZYZj7dB3AsjX%2BWQIgLo%2BuYx35BBk65OjT1jjEaQTpZw2nnLG8o%2FG7P1QmBo8q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDJFXY%2Bxu%2B6PugymEVyrcAykhQolggvT0RqEtKAYrtOwAOrc%2BnS7zHf22L%2BmykZI2tZDCso%2BR2QnL7xRAeNi%2BcBSRagIjB6GTApHescxNpAeocEnHOPRwIwp2YCyxrAgdr1VZwei5Q%2Bm3aEKXvwNBUl8UP6CZeXduWl9fEKWCTRjiqq0JqbHto4yTRTCBJwwGiynfnMbPApjhOZctO000i3BzivYZiP40qIhpYEQZx4MBln8B2dgnxnGiqP9DliF292nGMMR585lTFSqNYuVAPDbH4rqscLaEknhQSlmSHJTnKXDOVuhIewqxUB6G6XHgYIovSz78kxfhZZGGjLLjJXho9JtTB3D9lbLL%2B5dyyED3stzFoPh6AfKfZhqFvGhuWEVnREJwakp7HTexMZhfzsOgXOXrjayA%2FPd6Yxt%2BwB5W6FikR%2FVHl87dYWJpzFCdfZtMwO5NTXHmcoL1%2FRhj7AK9%2BJNmt7KNL%2B7Qsn6Bjy46C4rXfNFPA9aQUJKqgmsyd2FNJNENhriX1AI%2Fk7UhOoUGM%2BdamswqX0m6uoEVQgp1CJSptDjTgRodSGENZfs3QhfePINSgAe2gtYoJ8JnrcaaWx%2FmMxVzxoY087W11s6iPjhK3d08AMczZ0qak2M22mbnJgs58%2Fbz29xdMO2Kms8GOqUBOCP%2F2P7QX%2BZfA%2F%2F1GyBZifOhuTZBnhYFuOGKXJXZtHfVxD3wUZwGwvFrXODtZgRJomg7tMpKmpxf7Vn6DcraI8qcxi6QBm5G%2FmoBM9DO0P0bnXtkCKycJU8cMMwAlcXirEEKlTcUQqtvjBEnzNcd3FqwjmciEuFi5FIGXO%2BsuUIIzNdCmknBL9wtesx3%2Bja1pc%2FVXZtYepWMcQcFJYfKaI1LaCQG&X-Amz-Signature=eaf5f0295b1894d6d375055c9a27b1b2fb6ef42eb2126d7c4edb4272fe160543&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

