---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663WDSO7I%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDXWbUB7cLIKOEoc1fOxT9%2FEanKTqLQEseQCBKMNyXjbAiEAwZbOu%2Fuu1vp7v1G5pY6tHD6TkGLyIRD4JgThwrsbU1Yq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDB0Rk5b2Q8gyMGRpfyrcA1La%2FYRQAA%2BXaoafTY7t1WwZik%2BIeN20rMIR9tFaolpK4gZzui7QspaYSHczkd%2Bpyj%2BgSZt0He3NqxX5sS23aP9o3IcR%2B40fq2nZ%2BC1CXC2Xi%2BTQ%2FuFB6CLFYjOjRz7%2FMtrv7%2BX17wuNNOjM2xRxHwfpJKqHkvOaRppTrI0zVeoBPUKbBhierPTNCW2aL4S6vZmvdOyV2B6SdFCBnqTJzPm2J1ztEJQfuU3zlgH0Hp0mFAc0ZHoB92RN5%2F6NLrf7H0KzYgavfw1QG8JJi2ine3RG2kSH8rbNnBgur2eORcy9tiH%2FpG3FGiCceFwvSlQt0YXvDiI4764T9Od4jabR5MO0abOIH2q9OCtkqOiPvP8iZhyfNlbaAU3fBO7FWaJvR5D4tjGkHBgBWt2kcrIddApEqNBvESLPKDjn7l7ETG14Cmps%2BsQ1HD8tDrhatgmTR3jB7b1G91yzxmuEHilSxwqV94mTzwn8htyl4klRRd2rqEjVQSD48TSKcN5XYa9sIVTTdmVR0tR7uAE2zvHth9tkm75VzRiD8DTwGEwPmEyBZlzmS320xjfBxeJA84jisCHNRivQTpkhYc2aBaBHgET4fws1rtlKAfKOJFE8rTSZ9cboeTEwJG4FzNCDMNmjuckGOqUBUteLcSljiXdiTZYviECdpXuoNPi465iianKXXc5TztayuKEN3wKt%2Bbnz5orVCaSLfy4gFlT45wMGS3L2vesRQ5E3CyalZfpbm98YqsTLjrNV7bFsX%2FlAeXz3UfpicnBLcPTsKs39F4ZRD%2B9fBlOM91Cp7MM7Naa9sIH6T3Nh6YevaXtx1RdOYMzf0ahsRuW7l7HFaVEbENw3%2FJegyzHgUWIAjEcb&X-Amz-Signature=a58d9263e8b1a322d771dca4763d64e16b061e1fb3932b27fcbc21adaeb2c992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663WDSO7I%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIDXWbUB7cLIKOEoc1fOxT9%2FEanKTqLQEseQCBKMNyXjbAiEAwZbOu%2Fuu1vp7v1G5pY6tHD6TkGLyIRD4JgThwrsbU1Yq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDB0Rk5b2Q8gyMGRpfyrcA1La%2FYRQAA%2BXaoafTY7t1WwZik%2BIeN20rMIR9tFaolpK4gZzui7QspaYSHczkd%2Bpyj%2BgSZt0He3NqxX5sS23aP9o3IcR%2B40fq2nZ%2BC1CXC2Xi%2BTQ%2FuFB6CLFYjOjRz7%2FMtrv7%2BX17wuNNOjM2xRxHwfpJKqHkvOaRppTrI0zVeoBPUKbBhierPTNCW2aL4S6vZmvdOyV2B6SdFCBnqTJzPm2J1ztEJQfuU3zlgH0Hp0mFAc0ZHoB92RN5%2F6NLrf7H0KzYgavfw1QG8JJi2ine3RG2kSH8rbNnBgur2eORcy9tiH%2FpG3FGiCceFwvSlQt0YXvDiI4764T9Od4jabR5MO0abOIH2q9OCtkqOiPvP8iZhyfNlbaAU3fBO7FWaJvR5D4tjGkHBgBWt2kcrIddApEqNBvESLPKDjn7l7ETG14Cmps%2BsQ1HD8tDrhatgmTR3jB7b1G91yzxmuEHilSxwqV94mTzwn8htyl4klRRd2rqEjVQSD48TSKcN5XYa9sIVTTdmVR0tR7uAE2zvHth9tkm75VzRiD8DTwGEwPmEyBZlzmS320xjfBxeJA84jisCHNRivQTpkhYc2aBaBHgET4fws1rtlKAfKOJFE8rTSZ9cboeTEwJG4FzNCDMNmjuckGOqUBUteLcSljiXdiTZYviECdpXuoNPi465iianKXXc5TztayuKEN3wKt%2Bbnz5orVCaSLfy4gFlT45wMGS3L2vesRQ5E3CyalZfpbm98YqsTLjrNV7bFsX%2FlAeXz3UfpicnBLcPTsKs39F4ZRD%2B9fBlOM91Cp7MM7Naa9sIH6T3Nh6YevaXtx1RdOYMzf0ahsRuW7l7HFaVEbENw3%2FJegyzHgUWIAjEcb&X-Amz-Signature=a58d9263e8b1a322d771dca4763d64e16b061e1fb3932b27fcbc21adaeb2c992&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C7OG6J2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCnToddztkvDrdmNCGT5Joko26hpsDwsBaTgwCJOcckGQIgWZ32Fn2oHHnw7eYTvwYlhcXXsdjrYIl8n9mZMpp71dIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCHhK0gUn1eSgvOGFCrcAynFyFqGJxMrJyqFEfddtnx3stUloM5lNVZ%2Fy1SqgCtE5bVImOjp3ZoaexOFFwvGECT7IszLRD1GbcI1YyIm%2F2liFK02m29WtborJVDKrGrs3TAbY1M%2FfwChfZsToymPTefipZQIhgnIuEowF9WFKddUwE%2Bd7zXOflcVZH%2BA6igLZRKMsfFTzE6tzElo%2BqsT67QlYV8Hpmo7YV1aYkRO2gf%2Fa%2BOD0bjczNi5cfT5r9J1BoJLl%2FNk2%2FxaRkSrJcWE1%2FFu8TfVmVVi5gjAMLMYa4MqniX1iKlEGnIeG7y6CjRGINqKN8eqtEPKzKGG%2F%2FPdoQv4m%2FocNrSskK%2FLJWkdrPWRIS9FPY4yiZVgNujGS2LJmcZmCKZDFNmBKFAURiPk3Ss81y7nC3MV3XG%2BOzu%2FHn7yAWtOBcYm3RVB7jzeci8nMFYNOb9c%2B8axpLH3KKT0xkHKkmMemceP0UXHZsujcfTlJdI54%2B3PoYU5sAHUJSNWOYjBW7jKrf4TKWFRMUKbk1ijddibZF41YaQ32rh63othtRx5S%2BxJuNkXZNrGeojdHhfymkXZmwc4ZACqEiT9Moz5iz3qBGaXpKVZ6MMUb9ZCeXx%2Fv9juCI0%2BPWaWqpzXsXfYuY5PeMpUR2zlMPCiuckGOqUBfp1BlPaiXrUwhVa7CM6TvrtpcGnXtmnqUw9VcESRbBQYOyBdA7zljzIgg4ZADCbBLzgegyJTp9otBB7G5oEAizORCnkt43aVR5izXprD4EtOMdyhBl3xn0rfYRfualvx3r5T9lm%2F5y9HQsQw65vN3XgA0lvG%2B2h5Hk5NNngLj9gWChnRfjc%2BjJ66t4PRLdlXG7nL3%2BQRZN%2F8%2Bi1iSj5CbNWdOTCg&X-Amz-Signature=1b949b611114c6c5c37a856d1a4d767f02c6d66db6e31264d85bf807d89c1f61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C7OG6J2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCnToddztkvDrdmNCGT5Joko26hpsDwsBaTgwCJOcckGQIgWZ32Fn2oHHnw7eYTvwYlhcXXsdjrYIl8n9mZMpp71dIq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDCHhK0gUn1eSgvOGFCrcAynFyFqGJxMrJyqFEfddtnx3stUloM5lNVZ%2Fy1SqgCtE5bVImOjp3ZoaexOFFwvGECT7IszLRD1GbcI1YyIm%2F2liFK02m29WtborJVDKrGrs3TAbY1M%2FfwChfZsToymPTefipZQIhgnIuEowF9WFKddUwE%2Bd7zXOflcVZH%2BA6igLZRKMsfFTzE6tzElo%2BqsT67QlYV8Hpmo7YV1aYkRO2gf%2Fa%2BOD0bjczNi5cfT5r9J1BoJLl%2FNk2%2FxaRkSrJcWE1%2FFu8TfVmVVi5gjAMLMYa4MqniX1iKlEGnIeG7y6CjRGINqKN8eqtEPKzKGG%2F%2FPdoQv4m%2FocNrSskK%2FLJWkdrPWRIS9FPY4yiZVgNujGS2LJmcZmCKZDFNmBKFAURiPk3Ss81y7nC3MV3XG%2BOzu%2FHn7yAWtOBcYm3RVB7jzeci8nMFYNOb9c%2B8axpLH3KKT0xkHKkmMemceP0UXHZsujcfTlJdI54%2B3PoYU5sAHUJSNWOYjBW7jKrf4TKWFRMUKbk1ijddibZF41YaQ32rh63othtRx5S%2BxJuNkXZNrGeojdHhfymkXZmwc4ZACqEiT9Moz5iz3qBGaXpKVZ6MMUb9ZCeXx%2Fv9juCI0%2BPWaWqpzXsXfYuY5PeMpUR2zlMPCiuckGOqUBfp1BlPaiXrUwhVa7CM6TvrtpcGnXtmnqUw9VcESRbBQYOyBdA7zljzIgg4ZADCbBLzgegyJTp9otBB7G5oEAizORCnkt43aVR5izXprD4EtOMdyhBl3xn0rfYRfualvx3r5T9lm%2F5y9HQsQw65vN3XgA0lvG%2B2h5Hk5NNngLj9gWChnRfjc%2BjJ66t4PRLdlXG7nL3%2BQRZN%2F8%2Bi1iSj5CbNWdOTCg&X-Amz-Signature=1b949b611114c6c5c37a856d1a4d767f02c6d66db6e31264d85bf807d89c1f61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REFI55NN%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQDx%2BbnTbG8DiXtbZsV6hXWXfOs0lEaL36zLJUEDvC%2B0uQIgGs2Ho3GMLTNOG9DgCDFa84T3X7Y%2BB499ThMXYLz1Yfcq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDLFGCKbu7lTcRTB5MCrcA347V55%2FeaXZNOJf4QIX59fgHdkrLEXkFU4MrRIdINp6r8vdO5cWCtEQzfeRy39Z7cqTeICQzLUOY2SI7oiTerrNhK6cgyCWjk7VMyt%2FMSNXgFZMcEQOy5pkyjdZoFUHZkrjR2SKn8nqQsGRduVOOZltnH66aeoucqJ%2FPPR5fY1RuridPsh3KNzHoOvY3J3lVOteDs52nJrI1XK8oQuJxk%2F7MlrWwOpPJ0qN%2BKkybBdmBs5qC%2FuthODv7kxD1HeD5UThtK4t%2BtGEKL3tIQpC3ga9NZFcjRl7zxIBQ%2FlA2mPXjJKdhYWBvcU56V9xyaLVTdW9%2FphSiW%2Bcz4oKVMVzt5WGV38EISgzwlX0XN4rCLU5dLaaKFffvQO7Vj5%2BwoCQ8cKL2XAcJzdOTJN1%2BtEgVm94s%2FtUQ%2B6BF5BHeCTvsuIrugODlIx3RZ924wyxhFIlEDSWKPcmLNMdMlqcFqVI2DaHB2hqjZMkU%2B7uzq1tqzKRG%2Fb7Q9KCYsVR76HTovQH7RtGDRDYTAlmoMjYWDHXG591RxfirjM8xzbcEn%2FNr7gxrP%2BcGYSPC3JCiP51w%2FtCfMFSuOSswH3AidcxJBU6fORQcR7Wv3YUiHphes%2Fa9jt7Twg8yZbRojSbRGOKMJijuckGOqUBpUTNgkDMrLhtczpZn2hl%2BjHnNhtLaTXOk4JXw7nsd5TbSnhx8JcVkWE%2BzESHEmvt%2F6OL8BSGzPd52WTqjOFWMRfECIdEdHpasJOdHibIZUT%2FHGExhjKtWNR99GVNeB6bA0iuJ0t1%2B3smMuW4d6209mzMT0yX9vhva%2B3esaLaiVDoIM9qka8wDVCyh56vnF4gh%2B6GnxGaLPfoxOeAzfCQCG%2BfVvwc&X-Amz-Signature=df1370d488be52e0760c75e3638a48f7afe4f02391b0b1164dbb0a623ee03d66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KEQYZZ2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCt%2FTxhysBQ50SJ9t6e3tzFcDD%2Ff327jj4EhRabuy02TAIgKHIiJKyPOT%2BQ%2BMNWBn90pfhrsHFjW1DP42H0%2F9ShPiYq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDPomXPvXu0sKBIoGPCrcA4CbG4VaTN0ZK3G%2FU34x%2Fr3puSn%2FwgU%2FDAExbuEyjMlz6%2BkXz3bT1PsPwDGXHphfU4hmaisUfKpCcKn80lXLdddwx1tZcoVJ1PX9WQO8yuN65V9rRYXDnPvIbYoPmPzXppfVberQVIJb0ceH82N%2Bz8b9JkdNauKCefbc3jwfxCDndioyMkxsNvT0X5wJkf23vtbA7CDWo0nV1HMPTBAZB4nNJqOXalT5DqyT8Tf3VZUBKe7xIm3sor%2Fnqe7PpGkvybe0jaujINNciB9o%2Bfua6KCP17gIKqbmR23P%2FtypGwZNZYSYfmA0108Wjcn0qf1Jcj46nprlo0oxiWrLBbwzMxz6XHi%2FdxuaWCxjP8qaBqCqO1a8RYRrp3GKbQvAmcsMlplrStIXMe1Tonf8ih8FH%2F04zOSZSzZCnln%2BbHrJBZWslssFsyFCvd%2BPOZQjm6TpfbNrZEmGAOKkNI9tnwkVdNShmTEZ0SFRs0eLVtq5EetlvOumwMdvuMHn1Nf96lfL0lhbIOCcr7cKr5QMIMKDgk5BLIR3AfkdSmOI%2F0DEqfu6WvIAcc9bywNGBz8Ttno6TipfZKxi4%2F6YeT%2Bc%2BcX1OsFn8s%2BSQa6G6PvCHmIrGqLve4L%2FBXE9St%2BFO8wPMISjuckGOqUBQzUbgQew5rn9Vb5d3j92MgPMfGpMxteOrtuYBJhGmJI6gKX5KPUzHy0l3YROBg0cPiri8KF%2F5nQiBJuOrhDuLR1ygpTiLnUr2PTAhr3Ic9W4sPVzhG7TfLX0KB%2FvrzlBeYqtOxQ9bQMFODR33x4U5Xnh2Al3n9ZbqsmuP0tJ2AGu3rKJxHWiOUyhECrfHdTv18o2OG%2FWlSz74wn0S4GDuJdwSP9v&X-Amz-Signature=a7beb970b902f197f7f1663a4dbf1a0bd26314e6d3cd9aba85c20f4aa66f464b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KEQYZZ2%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T041928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCIQCt%2FTxhysBQ50SJ9t6e3tzFcDD%2Ff327jj4EhRabuy02TAIgKHIiJKyPOT%2BQ%2BMNWBn90pfhrsHFjW1DP42H0%2F9ShPiYq%2FwMIDBAAGgw2Mzc0MjMxODM4MDUiDPomXPvXu0sKBIoGPCrcA4CbG4VaTN0ZK3G%2FU34x%2Fr3puSn%2FwgU%2FDAExbuEyjMlz6%2BkXz3bT1PsPwDGXHphfU4hmaisUfKpCcKn80lXLdddwx1tZcoVJ1PX9WQO8yuN65V9rRYXDnPvIbYoPmPzXppfVberQVIJb0ceH82N%2Bz8b9JkdNauKCefbc3jwfxCDndioyMkxsNvT0X5wJkf23vtbA7CDWo0nV1HMPTBAZB4nNJqOXalT5DqyT8Tf3VZUBKe7xIm3sor%2Fnqe7PpGkvybe0jaujINNciB9o%2Bfua6KCP17gIKqbmR23P%2FtypGwZNZYSYfmA0108Wjcn0qf1Jcj46nprlo0oxiWrLBbwzMxz6XHi%2FdxuaWCxjP8qaBqCqO1a8RYRrp3GKbQvAmcsMlplrStIXMe1Tonf8ih8FH%2F04zOSZSzZCnln%2BbHrJBZWslssFsyFCvd%2BPOZQjm6TpfbNrZEmGAOKkNI9tnwkVdNShmTEZ0SFRs0eLVtq5EetlvOumwMdvuMHn1Nf96lfL0lhbIOCcr7cKr5QMIMKDgk5BLIR3AfkdSmOI%2F0DEqfu6WvIAcc9bywNGBz8Ttno6TipfZKxi4%2F6YeT%2Bc%2BcX1OsFn8s%2BSQa6G6PvCHmIrGqLve4L%2FBXE9St%2BFO8wPMISjuckGOqUBQzUbgQew5rn9Vb5d3j92MgPMfGpMxteOrtuYBJhGmJI6gKX5KPUzHy0l3YROBg0cPiri8KF%2F5nQiBJuOrhDuLR1ygpTiLnUr2PTAhr3Ic9W4sPVzhG7TfLX0KB%2FvrzlBeYqtOxQ9bQMFODR33x4U5Xnh2Al3n9ZbqsmuP0tJ2AGu3rKJxHWiOUyhECrfHdTv18o2OG%2FWlSz74wn0S4GDuJdwSP9v&X-Amz-Signature=a7beb970b902f197f7f1663a4dbf1a0bd26314e6d3cd9aba85c20f4aa66f464b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

