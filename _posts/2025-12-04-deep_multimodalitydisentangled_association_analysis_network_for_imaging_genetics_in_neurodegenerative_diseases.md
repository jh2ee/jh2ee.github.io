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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JMLJ6BA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQDFoFyezep8R%2FNQJfwzxmPjy02nPVhgFV1dqzCYPsFCDQIhAOsM1GOc%2FqudijCvcO2fOfvhWiIm1Tfhge71Xt29LDx8Kv8DCAgQABoMNjM3NDIzMTgzODA1Igx%2FWJJwEHgl8eVEkhcq3AM7%2FX%2BQ4MUCij7cxkOrAZeqmpiNf7JluZ%2B4C%2FT8fla8QPEURUaSyorO1W75uILxGTnUFWZiBRs%2F56tBIylZeOs1JmT4gGJOBP%2B3CoO7FyZ0PAZfR1GjrTFCEo%2B9B1WUzxnO68d3We4HHGix4nn6n8lzB6LrfiSQLjOm2UQASKZUnxBkQPiugU9xtoB4lnuGwUrWkz2naX2Plqt9nSfoSv%2BnaxinC6DF7EHpD6OuYGzlShJs1gtvvsQeppENb62%2B6S2YQFLCZ%2B0v6JVnf16ikBRo0IRycLdCSZTijaWEnbp98AkdKkwa7OiX20Yqs%2FLbVScgmLqUMHNiaahWtHTHQTnu3wGJCzr2z%2BZtfQsKgiX4wdTA4OaN1NVGEJ%2F7yoBiRvPHPkjDISLu9wQGNSGs44YZW7YZQvrSFpL8PzPkw9cs9wS%2FC1ZilwsBNIfBWgXEPGePj%2FKOF0GtH3GR%2F%2BmpTxp2nTdSB1x9uF49XXrYByWTNe4Pv%2Fk%2FvBgLli6%2F8%2BHGO3o7tXpAG6ia7BGSxF2FhBCg%2FHNNwq3KvXL6PA35AzAXCAohfXzO9BsARfUJ5YMOkSZak5P5LPonbeNp2N4j0a1eJv2zcHsSq2SlNSymmfuqDWpFtiLKEryqEJIN4jDwlqPOBjqkAfWOteVtGQc0bfF%2FqbeWYHEo5ngrBcM2hva6aSgZGOaA9kqWGFm35iqQ72Cudp0SDVDg6mrI92SvnBMW%2BG2nTHaMiGVvnb5Or2N%2Bso97tOE9Yg1ngceorPaRJDULBQudP%2BHnGLFayGpqCPaRIKYNyCATw0WQTtqIDrPcnmJPYeITFKtARI3cBIQCnsHXXQaZKlriYr%2FnUrKh81t3yhK2fEwxbmsS&X-Amz-Signature=259a70fc990f09239cd5a1b47e58a1d3406321bf9555c5dfdbc4300f1e3d71b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JMLJ6BA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQDFoFyezep8R%2FNQJfwzxmPjy02nPVhgFV1dqzCYPsFCDQIhAOsM1GOc%2FqudijCvcO2fOfvhWiIm1Tfhge71Xt29LDx8Kv8DCAgQABoMNjM3NDIzMTgzODA1Igx%2FWJJwEHgl8eVEkhcq3AM7%2FX%2BQ4MUCij7cxkOrAZeqmpiNf7JluZ%2B4C%2FT8fla8QPEURUaSyorO1W75uILxGTnUFWZiBRs%2F56tBIylZeOs1JmT4gGJOBP%2B3CoO7FyZ0PAZfR1GjrTFCEo%2B9B1WUzxnO68d3We4HHGix4nn6n8lzB6LrfiSQLjOm2UQASKZUnxBkQPiugU9xtoB4lnuGwUrWkz2naX2Plqt9nSfoSv%2BnaxinC6DF7EHpD6OuYGzlShJs1gtvvsQeppENb62%2B6S2YQFLCZ%2B0v6JVnf16ikBRo0IRycLdCSZTijaWEnbp98AkdKkwa7OiX20Yqs%2FLbVScgmLqUMHNiaahWtHTHQTnu3wGJCzr2z%2BZtfQsKgiX4wdTA4OaN1NVGEJ%2F7yoBiRvPHPkjDISLu9wQGNSGs44YZW7YZQvrSFpL8PzPkw9cs9wS%2FC1ZilwsBNIfBWgXEPGePj%2FKOF0GtH3GR%2F%2BmpTxp2nTdSB1x9uF49XXrYByWTNe4Pv%2Fk%2FvBgLli6%2F8%2BHGO3o7tXpAG6ia7BGSxF2FhBCg%2FHNNwq3KvXL6PA35AzAXCAohfXzO9BsARfUJ5YMOkSZak5P5LPonbeNp2N4j0a1eJv2zcHsSq2SlNSymmfuqDWpFtiLKEryqEJIN4jDwlqPOBjqkAfWOteVtGQc0bfF%2FqbeWYHEo5ngrBcM2hva6aSgZGOaA9kqWGFm35iqQ72Cudp0SDVDg6mrI92SvnBMW%2BG2nTHaMiGVvnb5Or2N%2Bso97tOE9Yg1ngceorPaRJDULBQudP%2BHnGLFayGpqCPaRIKYNyCATw0WQTtqIDrPcnmJPYeITFKtARI3cBIQCnsHXXQaZKlriYr%2FnUrKh81t3yhK2fEwxbmsS&X-Amz-Signature=259a70fc990f09239cd5a1b47e58a1d3406321bf9555c5dfdbc4300f1e3d71b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665D7E5GUT%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIAOPbI8VAITXO%2Fi6VuHnNmz%2Bb3eLOAjok17vUp1Ods3KAiB2zSLb5%2FGz4jrAG%2BDWdFzP7CkOS6JW3oBJlhbJBClhACr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIM1vbCpnvYG3GQxJ8wKtwD0wF%2Fcd6%2BRtWt4%2FhdR02viQHbwMhhJKdyKYqTGLJzSyhwGvKX6pssrhWAsKhDyhcmob2AIVa4vNU7MsY0S5NrQaXSZnSPCPkpo4VnjaUVX3hDv8k0WOzq0luCX3rTIXleRk4gwi7i0CloT5rVS83li4gDcdwOHozwrQJvju%2B%2Bcl0%2BWrP5RhrNDyrwYOJjWTdfT3p6Y4iuoj%2BkZ8WuNpSDW3YGMkQ5AG3bVNx1LbbQiZhAtP32SplptLK06lwuHEFR1z5cyBzPqF90EO67m%2BpAZ1D3H9Y4TCsaPt7r8ujTBRxpqFUyv%2Fk%2FwkkmOe7btwsYa%2F8nZTWs7MlpJUL8asN0a0YJHyx1y6ruB7ahWFP%2ByJgpBlFDYjQ173NovMk3o0MRB4qiurBj6mK25zNJi2wJdBivojIcMd5QsZyAnBWOogZIqfNffhRzAZegzRshM2%2BluClNG4Za8b8B7LDQPR2wX7OGR%2F9XcsjHfz9tu4Lgf6fQMYwCyer4V932C3MJLU24R%2FK4oCkm41bGGfuxEvdtt1A8n80ZCPpw%2FUaKi6MgDjAeXLP6rwmCiCKU%2BdoscNl5DVpv2tI6qQZ%2BcLqkFR6nbHt3msnQ5z2xoKX1rEPozMgB%2FjIFFw6FFwNIGZ4wwZajzgY6pgGZAVEhV0GcUIkvRwPDeAePuk2kC1k5MpW93jr1hXO9zD8nKsa0%2BYm4UrTxyPjAFG7AEGhbZgcYJCgWGEW%2BB%2BLh6IVVrWpNGMS5%2FPCia%2BxgKLLQp%2BdwAErBuZyesMpENCACfJ12TXYmxhdHIn3iVGjvcVWcA1wZaiCcLxcQrG%2BKhlO66ncpBMmlcp6iPfp0LXHmujyXE7beHI6G6tr%2B7ELgWUR41uQT&X-Amz-Signature=8a7a915264e6cba349e14fb9b2063efca1c19272b8c753c71105f070b87a0c58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUFWO4P6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIQChvNGoJ7A4saYTabsn08juIi24%2FxHXzXb1Slv929wkjgIgIpf%2FeJcGFRaipaTHOOziz8djc4lVm%2F94JlbZkOumOIEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDHG5%2FrFQQigTraRsAircA7QGL0mweaeZ0RCJUqmzN5bCjZMm3vcWYDAJ1oDBwq7FbstsoslR%2FiCNnRaOUCX%2B7z%2FqoM%2BgzJ0j3q9ST6wBT8sGGtKuDFY9ifQmzXol%2BRGLcNi7vTeBPq%2FBQk2V09kiC8NTtTOnHmppPd%2FTrZwqQkEbaRscYSBb2E58zDus%2FDAC7RYiD10fjn1R0LSE23cEk7fbIRs1GNG%2B5EtXSt9fv3vAY29dq14vK50bUptkh%2B8LO9nEHSUeBPJXH5TXro1dGlg88twcGLmxEs%2B19FbTGusmriS3QWVSZZteDgSvak4O3Rz22cgUBa3DrYXo8%2BJ2QEGvGPmUR8oPuvsnnlboX50CINQS5Bc6ZWHtoRNPq5zJTVxRpUpqD6Yj4pl3EzY44V9grHH%2BuTRL06rj9%2BXNZV3unqF6YaaYdXPt4VSKSDgMwtsRxOAUqcY7bnV5DiDpwcEbtUl4%2BfvofkCN55wOtDm%2Bdl4Rya8zfCb%2BxjmecOpV1fBnIHTXEytWs0gaoFkaPDYTjGfn3ujkDaRRbCNH1Y6uNtpAWU53ap5S0t9qop2ou8qXntaD4ZjpqT3Vvc73nGuBdhPKgToc0kKHL%2BZ7ockL21ms7u5FQ3IYytKQWUfLeyJuBK8bwcyc95JOMLGso84GOqUBavwvjVZfMws2UoepuZ0tbHgwTjVnWcYC%2B4AKixm6xDZ8i9iCikdS%2FrKu%2FCYtKtcmyL3Er8di2yV26HtKfJqsEc%2FtOo3AuNZqypBIdTj5UdI8REilNEky8RgS7H3gqqC4GhTEli3QbRxX6Svj216okk1qkM%2B5kpTqKancHp8R%2BwpswCxWqEtYOQ5I9J5gHxu7%2Bc4jPs2gkxtHdeeLdASmQy7oxSnd&X-Amz-Signature=16c95722ae546da2e36e36ede1b8a31633fa1b0dd0b3d0bcb4d6098376993660&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUFWO4P6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCIQChvNGoJ7A4saYTabsn08juIi24%2FxHXzXb1Slv929wkjgIgIpf%2FeJcGFRaipaTHOOziz8djc4lVm%2F94JlbZkOumOIEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDHG5%2FrFQQigTraRsAircA7QGL0mweaeZ0RCJUqmzN5bCjZMm3vcWYDAJ1oDBwq7FbstsoslR%2FiCNnRaOUCX%2B7z%2FqoM%2BgzJ0j3q9ST6wBT8sGGtKuDFY9ifQmzXol%2BRGLcNi7vTeBPq%2FBQk2V09kiC8NTtTOnHmppPd%2FTrZwqQkEbaRscYSBb2E58zDus%2FDAC7RYiD10fjn1R0LSE23cEk7fbIRs1GNG%2B5EtXSt9fv3vAY29dq14vK50bUptkh%2B8LO9nEHSUeBPJXH5TXro1dGlg88twcGLmxEs%2B19FbTGusmriS3QWVSZZteDgSvak4O3Rz22cgUBa3DrYXo8%2BJ2QEGvGPmUR8oPuvsnnlboX50CINQS5Bc6ZWHtoRNPq5zJTVxRpUpqD6Yj4pl3EzY44V9grHH%2BuTRL06rj9%2BXNZV3unqF6YaaYdXPt4VSKSDgMwtsRxOAUqcY7bnV5DiDpwcEbtUl4%2BfvofkCN55wOtDm%2Bdl4Rya8zfCb%2BxjmecOpV1fBnIHTXEytWs0gaoFkaPDYTjGfn3ujkDaRRbCNH1Y6uNtpAWU53ap5S0t9qop2ou8qXntaD4ZjpqT3Vvc73nGuBdhPKgToc0kKHL%2BZ7ockL21ms7u5FQ3IYytKQWUfLeyJuBK8bwcyc95JOMLGso84GOqUBavwvjVZfMws2UoepuZ0tbHgwTjVnWcYC%2B4AKixm6xDZ8i9iCikdS%2FrKu%2FCYtKtcmyL3Er8di2yV26HtKfJqsEc%2FtOo3AuNZqypBIdTj5UdI8REilNEky8RgS7H3gqqC4GhTEli3QbRxX6Svj216okk1qkM%2B5kpTqKancHp8R%2BwpswCxWqEtYOQ5I9J5gHxu7%2Bc4jPs2gkxtHdeeLdASmQy7oxSnd&X-Amz-Signature=604020f9cf6ec44b7af645d6e641df65ed89fd48df830564d20e32ebbd35ded1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XE33OUXN%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIDl9HdGwHPfCUFYPc2J5K1GPc1S9%2FuQmojRbZuMO3WoHAiA4DE79RwL%2BspUD5gf7CUQN%2BN%2Bm5dfMd0M81%2BR6lpW83Sr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMGae%2BFZZa5kvxk8N7KtwDAU44nFjUfA0GqQjrJShh3hxv9eWgbWHgAboaE0qvgO5%2BqBpmv6Q6SlgpPLQ3ATGTpRh3yWQemKF2ISdli84zV5qP%2B5CUq8fS1HS6LaN9OipVVbkPaa59O0a07qN63mYc2tzpAXzPWevQ6RMKgIvfVAvRrTm7OP4zEHqFRRkImFNhTG2wsK472kOz%2FD5nnWGViKVkH%2FtllAgwhZXolmZ3Jn4ekD6q6bmuTixsaKAfJbM%2B5b%2BTciQvLAkDS2y1MVeOXQtdC%2BxqoItEUM%2BdepFBJnIVXHehG6X4HEm%2BqRNNP2YlTgF4V%2F3HTub9qiaTyBJBCOxNQ%2FF5Hy9AkUC9msn96GQQfmDRBfQBbaXvoZ67Frd5bBuNJPC7Nj4obgQeBYZJSrdiZSxQyQ0hlZcVO0WptMfmE0vN97ZQexPxy1FabdxOSROCQUqAj2YuEgwMx02VbxtZ2mjXA5KiOpwHR1YuyQSflnmYwZRf2%2FYEMcj3u%2FbyZnr85Er2Dl70NMdPC48k%2BzBR3lhsho%2FthSK%2FDOOBpuWCojTwXK2IJmqjsLvb1x9gxLIawDj%2F0Uc4MO7tLPJojA1kVze3RoE%2BzLG%2FYit5DDi27SICSwd3MpxUCPiiH%2FNfTcohi325MmGjMnkwjK%2BjzgY6pgGROvVB41KRQU3VX5hgGDfMgPGFqLVwKeAK7DGNsg5PwgJnEgvIqfYlOnVW4ecXwQco7zC1%2BCbJVZlln1b42jfoaiL4XK3mT5Jg6TLjTEN2UPSAqqerS%2BBtsEkoWF2OOeVp2nVAd0dVx08vTFlSlVOUEovI7ajPyZygt3tmC4c11fBm5Cc2Wy97P2%2BWp0nWzmiapaLoshMqXxlwm7PzK19iiUt6bMdh&X-Amz-Signature=3761fa81f6e1b750768ba7c319900c137bedcf999af91fc549dc038d1a20e8d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXLPIRBF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIGNvxib0Kmij5182uiI22%2BXt1n7QHWA%2BouZC5IgLDwQZAiALE68Fy6rDSs%2FRSGcQZqoKhG0%2F6%2BNl50Gthv2E4AXkiyr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIM%2BCQRNWcz8orppT3qKtwDr06f7zjzAUdXPz1q5jmaOGwfL298bmF%2BjFHxE1eIoMBiv6K3w4rk2xcKXewJb4i1vVJKEHyUog6gh0VTQtCz4k5RL3c2xu%2BbPMp5%2BBSJHFSXlgBuRovPLi%2FH1K%2B%2Bxr1tKCB8DrAH1hCHD%2F04qYS0FdMwF6P1QQ4UtZU%2B2TUB8Ct9TBqi35p9TjTbD4axid%2BHNWxDUjrwym3Yo6xwltEyJIadlNmkmfnsu4sESFSFLEmyKXacPSCY%2FyFbdFFFxKNZHATV7xQWel2hOW9Q8rphhZ3CdYfLpFbvKD%2FMY4Dd2vR3QRuAMwIDwavd6b8F%2FszhSWinzCA5uYglVWO%2FGTRTEWdKRjrbJ914YUYDiVQoYbkY5E3Bd1L6Xjk2RD7xWgEhZTSGVf4S2TWRtE%2FxcG2tfPrkrKRxupvbwWq7VDIIwyFueF88k1EM%2BOKZaz95G2c3C9fngJeZnEUG26pbueyWyujt9dRenPhIG%2FTroODVDyZjWpaR4dkDH7%2FGcVLQzXq%2B0Z84WWF0NYAW17CELeDOiVE%2BeNd0a7lqlRvOqf0DNn0B2G69YzY%2BNqVbxBT8YbHFYFfg8UtR85d%2F3e2F4Lfs5vUKDhrHgPv90yLwVi1IAxuxNonswqktDPVdtkQwjpajzgY6pgFg1%2FjsjdpP5o%2BHZJgHVoMAMeFrT4fYXWjiwMbt2BZvQ7Be9u78dJGupcRISJeTFHR0cz%2FFtF7XyD74Tnoarwoey5XiyGYHyjaDMQKJOJYaTMNQpKQsF2MRrt3KuP0mWVi2FXWe0iFZflzIYDsOFBr%2F4cKGUAbEKTrSKNT34B5ZRvj8gg6IM7E9ySlGJWQVJ68e%2BaJOzi%2FM38W%2FTARORiPLO%2BWHqxm4&X-Amz-Signature=c4e48feb8e815d976be718819e82a6960316fbe5da92e4ead73fcf891548dc4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LX4BETP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082522Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQD9KgRwIuMq3XxkOMmi7CnBGRYQJc1%2FltqG1WPRrFBEJAIhAJSU4T9nELGmdJvI%2BjyUje%2BX%2BRBr9KFEl4VHABaHv7dxKv8DCAgQABoMNjM3NDIzMTgzODA1Igzk%2FPny2p9CIodp2N4q3AP6eaEF0Stf0B%2FlZVlHSeu8Me9yxsmXTALEtioc5wya4vFiCik6kqLeDPyi%2F0aeGKNgzkGrBu2HIlRL3yEF8T4UWSaHi1%2F70eqoHXK%2FgSvCMdqhrT0S0S44wTz%2Br%2FX7ek40J3aG46ukE5DmziKqSfj9oRu2qbgufC7Y%2BbwN1eoMyG%2B3HGqGea7O9M%2BT7Lwsv4CNT14JaGCwoYNswGA9OagRUslQ%2Fe3NZwRlN81XumAP5mYDqpt3U0yQPmWE0nuWJvEGVj3U2AkoXAvbpVPDoySJ1XFHFbmxLuccFjaCAlWUnuhIySxro4ncLdrn00Ck2oUU0K7b6tzoc9xQlzNulFZhKDnOl%2FHMFZ7bgHg0b9Y1H9kfYQoKGLLCn8VIsw0%2ByjzmucxzRL1y1mETFTWnAdBVaxDurZk9XxcYl3rfM%2BMbXaCUo%2F7liiqtsuVOt4qR6gC3JK4PbBPMmplqTO93Uzhp7aa%2BSlbTa4K%2BuFgBGowPztn%2FV7GCZjs5pxxRJxWD9S86se6%2FkXrCru215F61tAyLYPoXyUAmDGwaPDUIxkhSH5NnTCrZKWicdVGyJFiz3vbf1JL1zlafFbUfAm05CUX2pMfJ7KJvdEdCdFas82XZO6mqlHePPOalXlNf9jDklaPOBjqkATB4Cbggiu%2BIMhI1Ov5JZu8CiA1Z5xPIOB7gd%2BYhRzyvWE6rMypqbcBdWy2Ts77TOex0uBvMeapf%2BXcvFF5bHYkacfPUij7uBmEi%2FgpfRodpg1UTEzYttGJ2cWMglcd8nmKmbOBcM2E09eOUFEhHoi%2BtyOTi1OnNk%2FiltIpUfGjDk9BIpPuiBstfjV%2F1W1Atk2RKATRiJrM377AmsYVzVjooR1C8&X-Amz-Signature=a6f1ea765e08b66a72983eb9df2a4ac60d6b27fdea05b70d7273119c51f768e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN6J5XWD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQC9NU02AqdVgszO7HsBwgrzKMAlmioEQc1QHe7kyU6nnAIhAKgdhl8A8jqevjq7r5%2BUGqCXbLDQSBdlxCkegBM5QZDMKv8DCAgQABoMNjM3NDIzMTgzODA1IgwPtBHSLqkFoGf0bG0q3ANDM3BKfc84zDAwA1Agwj9EoNgreFbhGEvcOWqGGRMtmuHsoEKxJ7YUDuQJlruZVNOCoT7VtEmHkdy9M320kWs%2FIstvtes5s22VyO1TXTUfjjZuaZyF0OzO%2FfnAFpB9K%2BZgZwSkqKpEdxMw3psunLJ3ddkyZtl61TN7ZimwicE9AxCo9FIxEYmRCtjbyrNMn3%2BEHNIkxIqpwBwpaTKRhl8N9EmWGMBWgyC6X5NMfC5F27Dl1Qd7PigZ2zZudM2YtEYTGeDaHBpGbH8%2BMZD%2FEcGlwasyIk1k19eV4FwkbO0zX%2F%2FjvmrhoOeNQLAhUV6BvkpmO8uN8FoSwyqIVckyEab78DJ6CTXXh%2FauXVnIdkGB93LdFfB6ygydKAq5g%2FhiKeyo1x%2Fzhi5nS7hq50T%2BvIrFw0v6laumasSidlds2T7TeT3pOtdyTuf5bth9%2Bmzvg%2B2wncc52m66iDQYUggSlO4XKHOPhjTIKJ75JDlm6Z3%2BOYYJkkPs%2FAoCR5WQWgLDRKwfIAsV29suaeVEkxnBVyW%2BZMmiJN9TZ41RJwoLGBOe8T62Eu10u3D5vKz3BIpOM8AtsD38ffifRU6oEMv%2FfHVZaBGQkoDr9mQZOTY%2BsbDUIYLSJklJOxqbvfj9TzDvlqPOBjqkAWsntGkc8Ahhe7TZXythSp5NZJMfte5Q1%2FVTJvUOxvz0bau9usrIWBG4JMd7zxllJ%2BjndG2q1tLj%2BP6R9JtJrE8%2BmNioaE3NQj7ESWoPyzDUireJtSfN0KM0XW%2F20Yn0N9OkuNaOO1wh%2BpDvlMQnKDwIymq%2BULKkKOZWzuc2H2kgqBSvwErK1aEVsx%2B85rs36lo5codXTjh7xWdBk%2F%2BB61Up8u15&X-Amz-Signature=4adf20ababa73358ecd2eee24b436df6f7f32e647adae9987c3bebd009c007b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN6J5XWD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQC9NU02AqdVgszO7HsBwgrzKMAlmioEQc1QHe7kyU6nnAIhAKgdhl8A8jqevjq7r5%2BUGqCXbLDQSBdlxCkegBM5QZDMKv8DCAgQABoMNjM3NDIzMTgzODA1IgwPtBHSLqkFoGf0bG0q3ANDM3BKfc84zDAwA1Agwj9EoNgreFbhGEvcOWqGGRMtmuHsoEKxJ7YUDuQJlruZVNOCoT7VtEmHkdy9M320kWs%2FIstvtes5s22VyO1TXTUfjjZuaZyF0OzO%2FfnAFpB9K%2BZgZwSkqKpEdxMw3psunLJ3ddkyZtl61TN7ZimwicE9AxCo9FIxEYmRCtjbyrNMn3%2BEHNIkxIqpwBwpaTKRhl8N9EmWGMBWgyC6X5NMfC5F27Dl1Qd7PigZ2zZudM2YtEYTGeDaHBpGbH8%2BMZD%2FEcGlwasyIk1k19eV4FwkbO0zX%2F%2FjvmrhoOeNQLAhUV6BvkpmO8uN8FoSwyqIVckyEab78DJ6CTXXh%2FauXVnIdkGB93LdFfB6ygydKAq5g%2FhiKeyo1x%2Fzhi5nS7hq50T%2BvIrFw0v6laumasSidlds2T7TeT3pOtdyTuf5bth9%2Bmzvg%2B2wncc52m66iDQYUggSlO4XKHOPhjTIKJ75JDlm6Z3%2BOYYJkkPs%2FAoCR5WQWgLDRKwfIAsV29suaeVEkxnBVyW%2BZMmiJN9TZ41RJwoLGBOe8T62Eu10u3D5vKz3BIpOM8AtsD38ffifRU6oEMv%2FfHVZaBGQkoDr9mQZOTY%2BsbDUIYLSJklJOxqbvfj9TzDvlqPOBjqkAWsntGkc8Ahhe7TZXythSp5NZJMfte5Q1%2FVTJvUOxvz0bau9usrIWBG4JMd7zxllJ%2BjndG2q1tLj%2BP6R9JtJrE8%2BmNioaE3NQj7ESWoPyzDUireJtSfN0KM0XW%2F20Yn0N9OkuNaOO1wh%2BpDvlMQnKDwIymq%2BULKkKOZWzuc2H2kgqBSvwErK1aEVsx%2B85rs36lo5codXTjh7xWdBk%2F%2BB61Up8u15&X-Amz-Signature=41cf8683481599a0245ad5de5799470465a1ce96f897b1507172a46a9627f50e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625SIP2VB%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQD1Yb6XJNgRtO2zLEXIw0Om04cPcjejr0t90X5Q50CXYAIhAMZsPoXwd3EOjfb4tHUcp4qH7gGAhRzd23AyRlwlL7qwKv8DCAgQABoMNjM3NDIzMTgzODA1Igys1dxDqnOfGIf%2BIw8q3APOlhuxofDBTR%2FGWDslL%2BwC4mspYCv7xPzqmGZnhQoUYRdMeG3ALTflnPRhQMNFl0Zz8ZYKdBv343OvD9BoKMNZCJzYLPxzUl0Qq1i08DGyLDUCRE4bhM5XplWn3d6IUR%2FhXPqt%2BXHKPdBn9M8ZdXgi1NkzghSDNXiM2kWKCeanHlxBiBvYeUeTjUTqU6SPNazVolQxb5LKnu2V7Ctmap30%2BqJvrbmcBAVFxNvp9lL3QImMEdwGYSckmy9Kyzses6CVPu2c59EnxP7YqQ%2BAixmOuqNy2qtK3K0exgHjPcU7M9OkR99CQ2d9dmpTqGSGo8nkKiuA905dLpUI4tS2jf3o5WhahqGSbrgFF6fEOIt47sD4i4H9yq9GVPbsiVKI%2BH4Hv5lm%2Br5%2Bx0TMBVwaEhbXHyED2W3fDWdjGVwX67ai2jHN%2BVU3WVorpEMj%2BvEAafrMaHNlM4Z1KXcbKabHFfXnNM4%2BTLUynkqOOEGc8Jc%2B7bHT8neegxxjAnC43Z2oUDMgNZ7bBXc%2FEE4HKGzBhRLJjV%2BeE1DVFWLpItjCsIZnrW3COr8HrxuCeusyoCQ2079Co6Bbjxwif05U3wTbyUwEYM8oTTsNxQMLJYgjhm2zuq7JxAlExrVXTPh9%2BjCZlqPOBjqkAcVNOJ9U8aN5IvVfDTnhJv4mEWalCLzTd%2BEKjejirB2FF0gsKEwIhktkOyI3l7hvFiDt8v1ZwdWdBgrvV%2FMO0%2FjKsGG2kNtEqiRIwYgPoCwmEgzg%2Bhjz%2F9qzpEbYnOen3Zpap5z%2BpS5rLFEPVIunTcmBFyB2DfFkU2JRWY31NgnXFCi2kUrlNwTV4zG17hQ08Rj7uUxub%2Fgz4S%2BWIEnMmUmSAho2&X-Amz-Signature=fe733f8185df7a81facbf8fd3bba5932f7782ac347722fa719e308271872fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBZWHMFN%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIEEpAG4ORBiYGvTOofABQhANzZjT8TQeXo2CPsMTREVkAiB3Z8EN%2FCb9XuyY3jkjn39xACN3TY4tJn5LuE2SF3MpGCr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMDHD6jsIZFMlDbwNjKtwDQwQvoF12ruXfnxHB3%2BL02%2FRwSIf1As8U%2FsdNTK%2B2OXRFcQACaQqNxFsw73kF36CW8Jbf1e%2BxOBh53zeHvHmxWb3R2hncz2y6kpr9Uj%2BC4GIPZDTcwXtP2cFiNNPt2VnROPpfN7p%2Fc28ZKJh3mcgvndQBYU6kJofi5ckYb9uv0M3l1STj5YsDM1Die1RUD2%2BAnWNIpHo9Ma2BGLNHa%2FfAooLUIoWp5XaALf%2FVIwGvgvF4qD7k8iDVZvXQG2z%2BbieTPe9350ikp8zkIUYexxORqclHPdy44WaUBdP8nlyipMxYnchdXpHEtEX1GeZKZs%2Bfr3h8Y4Q2npP6pAyuMxG7s9GFGLyRPu%2BDgJo9C8FCDkhHtJ9lnPCvziEcpnVHxLreQpiLrMvjS%2BVbLvshjntqxxqN3I4ee6t%2FlsEI3oLSdEkudTjhjHr%2BNMZ8IkXsijoksBo5mu2v3Jau43WmB%2FYEYw%2BRkr%2BmYUDezkACP6DFoGlOg2DeiH5rI87fJyPNy%2Fxd1XtQFQPrdZFYaN1gi3pVNG9im5kjoVOpBC4dPimSCi78Ms1%2FYF%2BDfnI00DzK7wYOUzoM5NSHeS%2BvtM1wHyRBUt90yaByA3%2BJArs1vl%2FY52%2FiDEprDuCiTFi2rGgwjpajzgY6pgHFnAOvgiLt2tnlp4ed0%2BRRCeREMvH%2BHe4lkQxu75s1394OfHMcCX5UJIuGybGRFMijOtNkQqdUVe9eFDzQMLsxCWrTBO6SWvK%2FJ45u0RxWhmtHauYQLtX8SLKOYHGj3BwkByEAYw8dTcMMMnjMJ3dCCD5YA1pb%2Bo%2B8mQDGz763ANDbj39hR7dPhqdO5jfPGpPfeG3Xax00%2BZaE4T%2BSQEq5gmLVF48X&X-Amz-Signature=c9f04b5700509c99309750187127c0d4807f41bdbbf89e54445c45d843d2a2ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBZWHMFN%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIEEpAG4ORBiYGvTOofABQhANzZjT8TQeXo2CPsMTREVkAiB3Z8EN%2FCb9XuyY3jkjn39xACN3TY4tJn5LuE2SF3MpGCr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMDHD6jsIZFMlDbwNjKtwDQwQvoF12ruXfnxHB3%2BL02%2FRwSIf1As8U%2FsdNTK%2B2OXRFcQACaQqNxFsw73kF36CW8Jbf1e%2BxOBh53zeHvHmxWb3R2hncz2y6kpr9Uj%2BC4GIPZDTcwXtP2cFiNNPt2VnROPpfN7p%2Fc28ZKJh3mcgvndQBYU6kJofi5ckYb9uv0M3l1STj5YsDM1Die1RUD2%2BAnWNIpHo9Ma2BGLNHa%2FfAooLUIoWp5XaALf%2FVIwGvgvF4qD7k8iDVZvXQG2z%2BbieTPe9350ikp8zkIUYexxORqclHPdy44WaUBdP8nlyipMxYnchdXpHEtEX1GeZKZs%2Bfr3h8Y4Q2npP6pAyuMxG7s9GFGLyRPu%2BDgJo9C8FCDkhHtJ9lnPCvziEcpnVHxLreQpiLrMvjS%2BVbLvshjntqxxqN3I4ee6t%2FlsEI3oLSdEkudTjhjHr%2BNMZ8IkXsijoksBo5mu2v3Jau43WmB%2FYEYw%2BRkr%2BmYUDezkACP6DFoGlOg2DeiH5rI87fJyPNy%2Fxd1XtQFQPrdZFYaN1gi3pVNG9im5kjoVOpBC4dPimSCi78Ms1%2FYF%2BDfnI00DzK7wYOUzoM5NSHeS%2BvtM1wHyRBUt90yaByA3%2BJArs1vl%2FY52%2FiDEprDuCiTFi2rGgwjpajzgY6pgHFnAOvgiLt2tnlp4ed0%2BRRCeREMvH%2BHe4lkQxu75s1394OfHMcCX5UJIuGybGRFMijOtNkQqdUVe9eFDzQMLsxCWrTBO6SWvK%2FJ45u0RxWhmtHauYQLtX8SLKOYHGj3BwkByEAYw8dTcMMMnjMJ3dCCD5YA1pb%2Bo%2B8mQDGz763ANDbj39hR7dPhqdO5jfPGpPfeG3Xax00%2BZaE4T%2BSQEq5gmLVF48X&X-Amz-Signature=c9f04b5700509c99309750187127c0d4807f41bdbbf89e54445c45d843d2a2ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKAF3P56%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T082528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIH9j9okGwiPROrN8qE60w1qrbCrcUOoH5JsMR7buXCgJAiEAqQcbShyE%2BvA3IoWrj09J0Cl%2FwZOWuQ3FfhDPot8gg2Yq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDN%2FrbAOQMuGWLbf2%2ByrcAymoApBuEInQ9I83H10ZYncqVqwVNwChMgbVpJrJrp%2F7xkyDuxAdntuUFgIGynAZeNONsdTSynDwfw%2BpFXyAAaGHJhtjhOBorDoY%2FwSTiiN%2Fbv796CCmPeoQNZtMvuUomHmBIUNeynb947kNGY1gyPGI9%2BSc1SDiX07P9YfTFXR4ldX0%2FaLeH44Ny6UhToze8XERPr9D4qcMpQyqIe4FBJDlJI9FTl2MH4ZmqTs2uGDwGBveWaeUsaXi4Vpyg2TyIx47D5DghXGB1kjAI5QL6u8megO6bTeYDL93ZxoJIaZ1zSys4Z72gEqJ1ymnmq7rpHYSzMAC6zrmRwYDkKIXmJTQjOSa5HuJ1caP50wNMMdDt32RBhHyETY%2Fjr4S2amf5aWljq9L6k5Jx%2FSZ9Z776uqd3ilPotrMvo79J%2BLP3cGgiDr8ZMw3Hhg5BLp45UWw3gqw%2BcQpm%2BTZgERaz0If3WEP0EAJD3DMUbYEtrzR9lalOLMIxXQOInq20Iks40r4TSbS3RxnyhTKBUhEYYsXlMo%2FqwASMIxVUDGnLCH%2BfQvRelXfJRaMkYEBEzsovdxE0VRL5MOsse8OjO7WR2owK1URYI%2BdIP66eghNuhG9iHZYgtnGHc5AqirgUaSSMLaWo84GOqUB4feTGImCJg5o%2BAurmAcD71tYxp5KbqVi17bpnLEL4yxqa94BO1oakfoIwroOyyNM%2FtJI7K8kiFDaS8MoGA4VZdccJF5JT1NZbgVClNz0gZNwfFXuVe%2Bme2vsEGx8JOOZTVo5BV%2BfhpCQE6qYQmhrxUmt6R6x8A%2FmtHRtmz6qkDZVD%2BYgXRKb6D82w6A6V3hdtEpzbnBZaI0Sn57gs4oM82qZAA7%2B&X-Amz-Signature=5b21bcc2c25f08ca5db839dcfbe51a25a8e5127ba6fb041ecb0744badba4f801&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

